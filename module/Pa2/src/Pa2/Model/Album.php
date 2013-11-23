<?php
namespace Pa2\Model;

use Zend\Db\Adapter\Adapter;
use Zend\Db\TableGateway\TableGateway;
use Zend\Math\Rand;
use Zend\Db\Sql;

class Album{
	public $albumId;
	public $title;
	public $created;
	public $lastUpdated;
	public $username;
	public $access;
	public $accessors;
	protected $adapter;

	public function __construct($albumId, $title = null,$created = null,$lastUpdated = null,$username = null, $access = null, $adapter){
		$this->albumId = $albumId;
		$this->title = $title;
		$this->created = $created;
		$this->lastUpdated = $lastUpdated;
		$this->username = $username;
		$this->access = $access;
		$this->accessors = array();
		$this->adapter = $adapter;
		return $this;
	}

	public function getPhotos(){
		$contentTable = new TableGateway('Contain',$this->adapter);
		$contentSet = $contentTable->select(array('albumid' => $this->albumId));
		$photoSet = array();
		foreach($contentSet as $photo){
			$data = $this->getData($photo['picid']);
			$photoSet[] = new Photo($photo['picid'],$data['url'],$data['format'],$data['date'],
									$photo['albumid'],$photo['caption'],$photo['sequencenum']);
		}
		return $photoSet;
	}
	
	function getData($picId){
		$photoTable = new TableGateway('Photo',$this->adapter);
		$rowset = $photoTable->select(array('picid' => $picId))->current();
		return $rowset;
	}

	public function getPhoto($picId){
		$contentTable = new TableGateway('Contain',$this->adapter);
		$content= $contentTable->select(array('picid' => $picId))->current();
		$data = $this->getData($picId);
		$photo = new Photo($content['picid'],$data['url'],$data['format'],$data['date'],
									$content['albumid'],$content['caption'],$content['sequencenum']);
		return $photo;
	}

	public function addPhoto($format = null, $caption = null){
		//Generate hash and set it equal to picid
		$picId = Rand::getString(10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');

		//Set date to upload date
		$date = date('y-m-d');
		//Each picture in the folder will be saved as /pictures/{picid}.{type}, the pic's URL
		$url = "/pictures/$picId.$format";

		$contentTable = new TableGateway('Contain',$this->adapter);

		$set = $contentTable->select(array('albumid'=>$this->albumId));
		$max = 0;
		foreach($set as $pic){
			if($pic->sequencenum > $max)
				$max = $pic->sequencenum;
		}
		$pic = new Photo($picId, $url, $format, $date, $this->albumId, $caption, $max+1);

        $data = array(
        	'picid' => $pic->picId,
        	'url' => $pic->url,
        	'format' => $pic->format,
        	'date' => $pic->date,
        );
        $photoTable = new TableGateway('Photo',$this->adapter);
        $photoTable->insert($data);

		$content = array(
            'albumid' => $pic->albumId,
            'picid'  => $pic->picId,
            'caption' => $pic->caption,
            'sequencenum' => $pic->sequenceNum,
        );
        $contentTable->insert($content);

        return $pic;
	}

	public function deletePhoto($picId){
		//get the picId value from get/post
		$photo = $this->getPhoto($picId);

		$contentTable = new TableGateway('Contain',$this->adapter);
		$contentTable->delete(array('picid' => $picId));
		$photoTable = new TableGateway('Photo',$this->adapter);
        $photoTable->delete(array('picid' => $picId));

        unlink("/pictures/$picId.$photo->format");

        $albumTable = new TableGateway('Album',$this->adapter);
        $now = date('y-m-d'); 
        $albumTable->update(array('lastupdated'=> $now), array('albumid'=>$this->albumId));
	}

	public function changeAccess($newAccess)
	{
		$this->access = $newAccess;
		$albumTable = new TableGateway('Album',$this->adapter);
        $albumTable->update(array('access'=> $this->access), array('albumid'=>$this->albumId));
        $accessTable = new TableGateway('AlbumAccess',$this->adapter);

        //in database, albumid & 1 = public, albumid & 0 = private
        if($newAccess == "public")
        	$accessTable->update(array('username'=>1),array('albumid'=>$this->albumId));
        if($newAccess == "private")
        	$accessTable->update(array('username'=>0),array('albumid'=>$this->albumId));
        return $this;
	}

	public function setAccessors()
	{
		$contentTable = new TableGateway('AlbumAccess',$this->adapter);
		$contentSet = $contentTable->select(array('albumid' => $this->albumId));
		foreach($contentSet as $accessor){
			$this->accessors[] = $accessor->username; 
		}
		return $this->accessors;
	}

	public function addAccessor($username)
	{
		$albumAccessTable = new TableGateway('AlbumAccess',$this->adapter);
		$albumAccessTable->insert(array('albumid'=> $this->albumId, 'username'=> $username));
	}

	public function deleteAccessor($username)
	{
		$albumAccessTable = new TableGateway('AlbumAccess',$this->adapter);
        $albumAccessTable->delete(array('username' => $username), array('albumid'=>$this->albumId));
	}	
}