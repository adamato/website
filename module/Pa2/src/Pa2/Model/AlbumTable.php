<?php
namespace Pa2\Model;

use Zend\Db\Adapter\Adapter;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\TableGateway;

class AlbumTable extends AbstractTableGateway{

	protected $adapter;
	protected $table = 'Album';

    public function __construct(Adapter $adapter) {
        $this->adapter = $adapter;
    }

    public function getAlbums(){
        $res = $this->select();
        $albums = array();
        foreach($res as $a){
        	$albums[] = new Album($a['albumid'],$a['title'],$a['created'],$a['lastupdated'],$a['username'], $a['access'], $this->adapter);
        }
        return $albums;
    }

    public function getAlbum($albumid){
		if(!($a = $this->select(array('albumid' => $albumid))->current())){
			echo 'Album does not exist.';
			return;
		}
		$album = new Album($a['albumid'],$a['title'],$a['created'],$a['lastupdated'],$a['username'], $a['access'], $this->adapter);
		return $album;
	}

    public function getPublics(){
        $accessTable = new TableGateway('AlbumAccess',$this->adapter);
        $data = $accessTable->select(array('username' => 1));
        $albumSet = array();
        foreach ($data as $a){
            $album = $this->getAlbum($a->albumid);
            $albumSet[$album->username][] = $album;
        }
        natsort($albumSet);
        return $albumSet;
    }

    public function getAccessors($albumid){
        $accessTable = new TableGateway('AlbumAccess',$this->adapter);
        $data = $accessTable->select(array('albumid' => $albumid));
        foreach ($data as $a){
            $accessors[] = $a['username'];
        }
        return $accessors;
    }
}