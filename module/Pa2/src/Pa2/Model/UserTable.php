<?php
namespace Pa2\Model;

use Zend\Db\Adapter\Adapter;
use Zend\Db\TableGateway\AbstractTableGateway;

class UserTable extends AbstractTableGateway{

	protected $adapter;
	protected $table = 'User';

    public function __construct(Adapter $adapter) {
        $this->adapter = $adapter;
    }

    public function fetchAll(){
        $res = $this->select();
        $users = array();
        foreach($res as $u){
        	$users[] = new User($u['username'],$this->adapter,$u['firstname'],$u['lastname'],$u['email'],$u['password']);
        }
        return $users;
    }

    public function getUser($username){
		if(!($u = $this->select(array('username' => $username))->current())){
			echo 'User does not exist.';
			return;
		}
		$user = new User($username,$this->adapter,$u['firstname'],$u['lastname'],$u['email'],$u['password']);
		return $user;
	}

    public function addUser($username,$firstname,$lastname,$password,$email){
        $data = array(
            'username' => $username,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'password' => md5($password),
            'email' => $email,
        );
        $this->insert($data);
        $user = new User($username,$adapter,$firstname,$lastname,$password,$email);
        return $user;
    }


    //not sure if works
    public function editUser($username,$firstname = null, $lastname = null, $password = null, $email = null){
        if($user = $this->getUser($username)){
            if($firstname)
                $user->firstname = $firstname;
            if($lastname)
                $user->lastname = $lastname;
            if($password)
                $user->password = $password;
            if($email)
                $user->email = $email;
        }
        else{
            echo 'Not a user';
            return;
        }
        $data = array(
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'password' => md5($user->password),
            'email' => $user->email,
        );
        $this->update($data,array('username'=>$username));
        return $user;
    }

    public function deleteUser($username)
    {
        $user = $this->getUser($username);
        $albums = $user->getAlbums();
        foreach($albums as $album){
            $user->deleteAlbum($album->albumId);
        }
        $users = $this->fetchAll();
        //
        foreach ($users as $person){
            $personAlbums = $person->getAlbums();
            foreach ($personAlbums as $personAlbum){
                foreach($personAlbum->accessors as $accessor){
                    if($accessor == $username){
                        $personAlbum->deleteAccessor($username);
                    }
                }
            }
        }
        $this->delete(array('username'=>$username));
    }
}