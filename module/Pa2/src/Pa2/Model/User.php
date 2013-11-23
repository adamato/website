<?php
namespace Pa2\Model;

use Zend\Db\Adapter\Adapter;
use Zend\Db\TableGateway\TableGateway;
use Zend\InputFilter\Factory as InputFactory;   
use Zend\InputFilter\InputFilter;               
use Zend\InputFilter\InputFilterAwareInterface; 
use Zend\InputFilter\InputFilterInterface;  

class User implements InputFilterAwareInterface
{
	public $username;
	public $firstname;
	public $lastname;
	public $password;
	public $email;
	protected $adapter;

    public function __construct($username,$adapter, $firstname = NULL, $lastname = NULL, $email = NULL, $password = NULL){
        $this->adapter = $adapter;
        $this->username = $username;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->email = $email;
        $this->password = $password;
        return $this;
    }

    public function exchangeArray($data)
    {
        $this->username = (isset($data['username'])) ? $data['username'] : null;
        $this->password = (isset($data['password'])) ? $data['password'] : null;
        return $this;
    }

     public function setInputFilter(InputFilterInterface $inputFilter)
    {
        throw new \Exception("Not used");
    }

    public function getInputFilter()
    {
        if (!$this->inputFilter) {
            $inputFilter = new InputFilter();
            $factory     = new InputFactory();

            $inputFilter->add($factory->createInput(array(
                'name'     => 'username',
                'required' => true,
                'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
                'validators' => array(
                    array(
                        'name'    => 'StringLength',
                        'options' => array(
                            'encoding' => 'UTF-8',
                            'min'      => 1,
                            'max'      => 100,
                        ),
                    ),
                ),
            )));

            $inputFilter->add($factory->createInput(array(
                'name'     => 'password',
                'required' => true,
                'filters'  => array(
                    array('name' => 'StripTags'),
                    array('name' => 'StringTrim'),
                ),
                'validators' => array(
                    array(
                        'name'    => 'StringLength',
                        'options' => array(
                            'encoding' => 'UTF-8',
                            'min'      => 1,
                            'max'      => 100,
                        ),
                    ),
                ),
            )));

            $this->inputFilter = $inputFilter;
        }

        return $this->inputFilter;
    }

	public function getAlbum($albumId){
		$albumTable = new TableGateway('Album',$this->adapter);
		$rowset = $albumTable->select(array('albumid' => $albumId))->current();
		$album = new Album($albumId,$rowset['title'],$rowset['created'],$rowset['lastupdated'],$rowset['username'], $rowset['access'], $this->adapter);
		return $album;
	}

	public function getAlbums(){
		$albumsTable = new TableGateway('Album',$this->adapter);
		$Data = $albumsTable->select(array('username' => $this->username));
		$albums = array();
		foreach($Data as $album){
			$albums[] = new Album($album['albumid'],$album['title'],$album['created'],$album['lastupdated'], $this->username, $album['access'], $this->adapter);
		}
		return $albums;
	}

    public function getAccessible(){
        //get accessible albums, excluding user's
        $accessTable = new TableGateway('AlbumAccess',$this->adapter);
        $data = $accessTable->select(array('username' => $this->username));
        $albumSet = array();
        foreach($data as $a){
            $album = $this->getAlbum($a->albumid);
            $albumSet[$album->username][] = $album;
        };
        $data = $accessTable->select(array('username' => 1));
        foreach($data as $a){
            $album = $this->getAlbum($a->albumid);
            if($album->username != $this->username)
                $albumSet[$album->username][] = $album;
        };
        natsort($albumSet);
        return $albumSet;
    }

	public function addAlbum($title = null, $access = null){
		$now = date('y-m-d');
		$album = new Album(1, $title,$now,$now,$this->username, $access);
		$data = array(
			'title' => $album->title,
			'created' => $album->created,
			'lastupdated' => $album->lastUpdated,
			'username' => $album->username,
			'access' => $album->access,
		);
		$albumTable = new TableGateway('Album',$this->adapter);
		$albumTable->insert($data);
		$album->albumId = $albumTable->getLastInsertValue();

        $accessTable = new TableGateway('AlbumAccess',$this->adapter);
        if($album->access == "public")
            $accessTable->insert(array('username'=>1,'albumid'=>$album->albumId));
        if($album->access == "private")
            $accessTable->insert(array('username'=>0,'albumid'=>$album->albumId));
		return $album;
	}

	public function deleteAlbum($albumId){
		$album = $this->getAlbum($albumId);
		$pics = $album->getPhotos();
		foreach($pics as $photo)
			$album->deletePhoto($photo->picId);
		$albumTable = new TableGateway('Album',$this->adapter);
		$albumTable->delete(array('albumid'=>$albumId));
        $accessTable = new TableGateway('AlbumAccess',$this->adapter);
        $accessTable->delete(array('albumid'=>$albumId));
	}
}