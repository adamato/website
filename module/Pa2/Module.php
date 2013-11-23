<?php
namespace Pa2;

use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Pa2\Model\UserTable;
use Pa2\Model\AlbumTable;
use Pa2\Model\PhotoTable;
use Pa2\Model\User;
use Zend\Db\Adapter\Adapter;
use Pa2\Storage\AuthStorage;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Adapter\DbTable as DbTableAuthAdapter;
 
class Module
{
    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\ClassMapAutoloader' => array(
                __DIR__ . '/autoload_classmap.php',
            ),
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . str_replace('\\', '/' , __NAMESPACE__),
                ),
            ),
        );
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getServiceConfig()
    {
        return array(
            'factories' => array(
                'UserTable' =>  function($sm){
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $table = new UserTable($dbAdapter);
                    return $table;
                },
                'AlbumTable' =>  function($sm){
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $table = new AlbumTable($dbAdapter);
                    return $table;
                },
                'AuthService' => function($sm){
                    $dbAdapter = $sm->get('Zend\Db\Adapter\Adapter');
                    $dbTableAuthAdapter = new DbTableAuthAdapter($dbAdapter, 'User', 'username','password', 'MD5(?)');
                    $storage = new AuthStorage('Pa2Albums');
                    $storage->setServiceLocator($sm);
                    $storage->setDbHandler();
                    $authService = new AuthenticationService($storage, $dbTableAuthAdapter); 
                    return $authService;
                },
            ),
        );
    }

}