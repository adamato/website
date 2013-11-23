<?php
namespace Pa2\Model;

class Photo{
	public $picId;
	public $url;
	public $format;
	public $date;
	public $albumId;
	public $caption;
	public $sequenceNum;

	public function __construct($picId,$url,$format,$date,$albumId = NULL,$caption = NULL,$sequenceNum = NULL){
		$this->picId = $picId;
		$this->url = $url;
		$this->format = $format;
		$this->date = $date;
		$this->albumId = $albumId;
		$this->caption = $caption;
		$this->sequenceNum = $sequenceNum;
		return $this;
	}
}