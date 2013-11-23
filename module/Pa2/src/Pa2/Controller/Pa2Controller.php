<?php
namespace Pa2\Controller;

use Pa2\Model\User;
use Pa2\Model\Album;
use Pa2\Model\Photo;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Db\Adapter\Adapter;
use Zend\Http\Request;
use Zend\Http\Response;
use Zend\Form\Element\File;
use Zend\Json\Json;

class Pa2Controller extends AbstractActionController{
    protected $dbAdapter;
    protected $userTable;
    protected $albumTable;
    protected $user;
    protected $authService;
    protected $ref;

//$this->getRequest()->getServer('HTTP_REFERER');
////////////////AUTH SERVICE////////////////

    public function loginAction(){
        $this->layout()->action = "login";
        if($this->getAuthService()->getStorage()->getSessionManager()->getSaveHandler()->read($this->authService->getStorage()->getSessionId()))
            return $this->redirect()->toRoute('home');
         
        $form = $this->getServiceLocator()->get('FormElementManager')->get('Pa2\Form\LoginForm');  
        $viewModel = new ViewModel();
         
        //initialize error...
        $viewModel->setVariable('error', '');
        //authentication block...
        $this->authenticate($form, $viewModel);
         
        $viewModel->setVariable('form', $form);
        return $viewModel;
    }
     
    protected function authenticate($form, $viewModel){
        $request = $this->getRequest();
        $ref = $request->getQuery('url');
        if ($request->isPost()) {
            $form->setData($request->getPost());
            if ($form->isValid()) {
                $dataform = $form->getData();
                 
                $this->getAuthService()->getAdapter()->setIdentity($dataform['username'])->setCredential($dataform['password']);
                $result = $this->getAuthService()->authenticate();
                if ($result->isValid()) {
                    //authentication success
                    $resultRow = $this->authService->getAdapter()->getResultRowObject();
                    
                    $this->authService->getStorage()->write(
                         array( 'username'  => $dataform['username'],
                                'ip_address'    => $this->getRequest()->getServer('REMOTE_ADDR'),
                                'user_agent'    => $request->getServer('HTTP_USER_AGENT'))
                    );
                    if($this->ref){
                        return $this->redirect()->toUrl($ref); 
                    }
                    return $this->redirect()->toRoute('home');      
                } else {

                    $viewModel->setVariable('error', 'Invalid username or password');
                }
            }
        }
    }
     
    public function logoutAction(){
        $this->getAuthService()->getStorage()->clear();
        return $this->redirect()->toRoute('home');
    }


/////////////View actions///////////////////

    public function indexAction(){
        $request = $this->getRequest();
        if(!$this->loadUser()){
            //if not a user, show all public albums anyway
            $this->layout()->username = false;
            $this->layout()->action = "home";
            $albumSet = $this->getAlbumTable()->getPublics();
            return array('publicAlbums' => $albumSet);
        }
        if($ref = $this->getRequest()->getServer('HTTP_REFERER'))

        $this->layout()->username = $this->user->username;
        $this->layout()->action = "home";

        $pubAlbums = $this->user->getAccessible();
        $usrAlbums = $this->user->getAlbums();

        return array('publicAlbums' => $pubAlbums,'userAlbums' => $usrAlbums, 'user' => $this->user);
    }

    public function albumAction(){
        $request = $this->getRequest();
        if(!$this->loadUser()){
            $this->layout()->username = false;
        } 
        else $this->layout()->username = $this->user->username;

        if($albumid = $request->getQuery('id',0)){
            $album = $this->getAlbumTable()->getAlbum($albumid);
            $photos = $album->getPhotos();
            if ($album->access == 'public')
                    return array('photos' => $photos, 'album' => $album);
            if ($album->access == 'private'){
                foreach($this->getAlbumTable()->getAccessors($albumid)  as $accessor){
                    if($accessor == $this->user->username)
                        return array('photos' => $photos, 'album' => $album);
                }
                if ($album->username == $this->user->username){
                    return array('photos' => $photos, 'album' => $album);
                }
                //If you get here, this person doesn't have access authority
                return $this->redirect()->toRoute('login',array('url'=> $request->getUriString()));
            }
            return array('photos' => $photos, 'album' => $album);
        }
        else return $this->redirect()->toRoute('login',array('url'=> $request->getUriString()));
    }

    public function albumEditAction(){
        $request = $this->getRequest();
        if(!$this->loadUser()){
            $this->layout()->username = false;
            return $this->redirect()->toRoute('login',array('url'=> $request->getUriString()));
        } 
        $this->layout()->username = $this->user->username;

        if($type = $request->getPost('op')){
            if($type == 'add'){                
                $album = $this->user->getAlbum($request->getPost('albumId'));

                $uploads = new \Zend\File\Transfer\Adapter\Http();
                $uploads->setDestination(dirname('/home/group29/zf2/public/pictures/.'));
                $files  = $uploads->getFileInfo();

                foreach($files as $file => $fileInfo) {
                    if ($uploads->isUploaded($file)) {
                        if ($uploads->isValid($file)) {
                            if ($uploads->receive($file)) {
                                $info = $uploads->getFileInfo($file);
                                $tmp  = $info[$file]['tmp_name'];
                                $data = file_get_contents($tmp);
                                // here $tmp is the location of the uploaded file on the server
                                // var_dump($info); //to see all the fields you can use
                            }
                        }
                    }
                }
                $imgInfo = explode('/', $info["image-file"]["type"]);
                $format = $imgInfo[1];
                $photo = $album->addPhoto($format);
                rename($info["image-file"]["tmp_name"],"/home/group29/zf2/public/pictures/$photo->picId.$photo->format");
            }
            if($type == 'delete'){
                $album = $this->user->getAlbum($request->getPost('albumId'));
                $album->deletePhoto($request->getPost('picId'));
            }

            if ($type == 'access'){
                $album = $this->user->getAlbum($request->getPost('albumId'));
                $album = $album->changeAccess($request->getPost('Access'));
            }

            if ($type == 'userAccessAdd'){
                $album = $this->user->getAlbum($request->getPost('albumId'));
                $album->addAccessor($request->getPost('AddAccess'));
                $album->setAccessors();
            }
            if ($type == 'userAccessRemove'){
                $album = $this->user->getAlbum($request->getPost('albumId'));
                $album->deleteAccessor($request->getPost('accessor'));
                $album->setAccessors();
            }
        }
        $albumid = $request->getQuery('id',0);
        $album = $this->getAlbumTable()->getAlbum($albumid);
        $photos = $album->getPhotos();
        $album->setAccessors();
	    return array('photos' => $photos, 'album' => $album);
    }

    public function albumsAction(){
        $request = $this->getRequest();
        if(!$this->loadUser()){
            $this->layout()->username = false;
            return $this->redirect()->toRoute('login',array('url'=> $request->getUriString()));
        } $this->layout()->username = $this->user->username;

        $albums = $this->user->getAlbums();
        return array('albums' => $albums, 'user' => $this->user);
    }

    public function albumsEditAction(){
        $request = $this->getRequest();        
        if(!$this->loadUser()){
            $this->layout()->username = false;
            $this->layout()->action = "myAlbums";
            return $this->redirect()->toRoute('login',array('url'=> $request->getUriString()));
        } 
        $this->layout()->username = $this->user->username;
        $this->layout()->action = "myAlbums";
        
        if($type = $request->getPost('op')){
            if($type == 'add')
                $album = $this->user->addAlbum($request->getPost('Add'), $request->getPost("Access"));
            if($type == 'delete')
                $this->user->deleteAlbum($request->getPost('albumId'));
        }
        $albums = $this->user->getAlbums();
        return array('albums' => $albums, 'user' => $this->user);
    }

    public function picAction(){
        $request = $this->getRequest();
        $picid = $request->getQuery('id',0);
        $photo = $this->getPic($picid);
        $albumid = $photo->albumId;
        $album = $this->getAlbumTable()->getAlbum($albumid);
        if(!$this->loadUser()){
                $this->layout()->username = false;
                if ($album->access == 'public')
                    return array('photo' => $photo, 'prev' => $photo->prv, 'next' => $photo->nxt);
                else
                    return $this->redirect()->toUrl('login');
        } $this->layout()->username = $this->user->username;

        if ($album->access == 'private'){
            foreach($this->getAlbumTable()->getAccessors($albumid) as $accessor){
                if($accessor == $this->user->username)
                    return array('photo' => $photo, 'prev' => $photo->prv, 'next' => $photo->nxt);
            }
            if ($album->username == $this->user->username){
               return array('photo' => $photo, 'prev' => $photo->prv, 'next' => $photo->nxt);
            }
            //If you get here, this person doesn't have access authority
            return $this->redirect()->toRoute('login');
        }

        return array('photo' => $photo, 'prev' => $photo->prv, 'next' => $photo->nxt);
    }


    public function userAction(){
        $request = $this->getRequest();
        if($this->loadUser())
            return $this->redirect()->toRoute('user/edit');
        if($request->isPost()){
            $uname = $request->getPost('username',0);
            $users = $this->getUserTable()->fetchAll();
           foreach($users as $user) {
                if($user->username === $uname){
                    $error = 'User name already taken';
                    return array('error' => $error);
                }
            }
            $pwd = $request->getPost('pwd',0);
            
            $user = $this->getUserTable()->addUser($uname,$request->getPost('fname',0),
            $request->getPost('lname',0),$pwd,$request->getPost('emailAddr',0));

            $this->getAuthService()->getAdapter()->setIdentity($uname)->setCredential($pwd);
            $result = $this->getAuthService()->authenticate();
            if($result->isValid()){
                $resultRow = $this->authService->getAdapter()->getResultRowObject();    
                $this->authService->getStorage()->write(
                     array( 'username'  => $uname,
                            'ip_address'    => $this->getRequest()->getServer('REMOTE_ADDR'),
                            'user_agent'    => $request->getServer('HTTP_USER_AGENT'))
                );
            }
            return $this->redirect()->toRoute('home');
        }
        return array();
    }

    public function userEditAction(){
        $request = $this->getRequest();
        if(!$this->loadUser()){
            $this->layout()->username = false;
            $this->layout()->action = "myAcct";
            return $this->redirect()->toRoute('login',array('url'=> $request->getUriString()));
        }
        $this->layout()->username = $this->user->username;
        $this->layout()->action = "myAcct";

        if($request->getPost('type') == 'edit'){
            $user = $this->getUserTable()->editUser($this->user->username, $request->getPost('fname',0),$request->getPost('lname',0),$request->getPost('pwd',0),$request->getPost('emailAddr',0));
        }
        if($request->getPost('type') == 'delete'){
            $this->logoutAction();
            $this->getUserTable()->deleteUser($this->user->username);  
        }
        if($this->user)
            return array('user' => $this->user);
        return $this->redirect()->toRoute('home');
    }

///////////////Object instantiation methods//////////////
    function getUser($username){
        if(!$this->user)
            $this->user = $this->getUserTable()->getUser($username);
        return $this->user;
    }

    function getAlbum($albumid){
        if(!$this->album)
            $this->album = $this->getAlbumTable()->getAlbum($albumid);
        return $album;
    }

    function loadUser(){
        if(!$this->user){
            if(!($id = $this->getAuthService()->getStorage()->getSessionManager()->getSaveHandler()->read($this->authService->getStorage()->getSessionId())))
                return false;
            $info = \Zend\Json\Json::decode($id, \Zend\Json\Json::TYPE_OBJECT);
            $this->user = $this->getUser($info->username);
        }
        return $this->user;
    }

    function getPic($picId){
        $str = "select albumid,sequencenum from Contain where picid=\"".$picId."\";";
        $set = $this->getDbAdapter()->query($str)->execute()->current();
        $photos = $this->getAlbumTable()->getAlbum($set['albumid'])->getPhotos();
        $size = count($photos);
        $photo = $photos[$set['sequencenum']-1];
        if($size == $set['sequencenum']){
            $photo->nxt = $photos[0]->picId;
            $photo->prv = $photos[$size-2]->picId;
        }
        else if($set['sequencenum'] == 1){
            $photo->nxt = $photos[$set['sequencenum']]->picId;
            $photo->prv = $photos[$size-1]->picId;
        }
        else{
            $photo->nxt = $photos[$set['sequencenum']]->picId;
            $photo->prv = $photos[$set['sequencenum']-2]->picId;
        }
        return $photo;
    }
/////////////Database interaction methods/////////////
    function getUserTable(){
        if (!$this->userTable) {
            $sm = $this->getServiceLocator();
            $this->userTable = $sm->get('UserTable');
        }
        return $this->userTable;
    }
    function getAlbumTable(){
        if (!$this->albumTable) {
                $sm = $this->getServiceLocator();
                $this->albumTable = $sm->get('AlbumTable');
         }
        return $this->albumTable;
     } 

    function getDbAdapter() {
        if (!$this->dbAdapter) {
            $sm = $this->getServiceLocator();
            $this->dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
        }
        return $this->dbAdapter;
    }
    function getAuthService(){
        if(!$this->authService){
            $sm = $this->getServiceLocator();
            $this->authService = $sm->get('AuthService');
        }
        return $this->authService;
    }
}
