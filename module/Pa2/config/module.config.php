<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'Pa2\Controller\Pa2' => 'Pa2\Controller\Pa2Controller',
        ),
    ),
    //calling $this->url([route]) will return the full literal route of the named route
    //child routes should be called as [route]/[child]
    'router' => array(
        'routes' => array(
            'home' => array(
                'type' => 'literal',
                'options' => array(
                    'route' => '/icum7d9/pa2/',
                    'defaults' => array(
                        'controller' => 'Pa2\Controller\Pa2',
                        'action' => 'index'
                    )
                ),
            ),
            'album' => array(
                'type' => 'literal',
                'options' => array(
                    'route' => '/icum7d9/pa2/album',
                    'defaults' => array(
                        'controller' => 'Pa2\Controller\Pa2',
                        'action' => 'album'
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'edit' => array(
                        'type' => 'literal',
                        'options' => array(
                            'route' => '/edit',
                            'defaults' => array(
                                'controller' => 'Pa2\Controller\Pa2',
                                'action' => 'album-edit'
                            )
                        )
                    )
                )
            ),
		    'pic' => array(
    			'type' => 'literal',
    			'options' => array(
    			    'route' => '/icum7d9/pa2/pic',
    			    'defaults' => array(
    				'controller' => 'Pa2\Controller\Pa2',
    				'action' => 'pic'
    			    ),
    			),
		    ),
            'albums' => array(
                'type' => 'literal',
                'options' => array(
                    'route' => '/icum7d9/pa2/albums',
                    'defaults' => array(
                        'controller' => 'Pa2\Controller\Pa2',
                        'action' => 'albums'
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'edit' => array(
                        'type' => 'literal',
                        'options' => array(
                            'route' => '/edit',
                            'defaults' => array(
                                'controller' => 'Pa2\Controller\Pa2',
                                'action' => 'albums-edit'
                            )
                        )
                    )
                )
            ),
            'user' => array(
                'type' => 'literal',
                'options' => array(
                    'route' => '/icum7d9/pa2/user',
                    'defaults' => array(
                        'controller' => 'Pa2\Controller\Pa2',
                        'action' => 'user'
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'edit' => array(
                        'type' => 'literal',
                        'options' => array(
                            'route' => '/edit',
                            'defaults' => array(
                                'controller' => 'Pa2\Controller\Pa2',
                                'action' => 'user-edit'
                            )
                        )
                    )
                )
            ),
            'login' => array(
                'type' => 'segment',
                'options' => array(
                    'route' => '/icum7d9/pa2/login[?url=:url]',
                    'defaults' => array(
                        'controller' => 'Pa2\Controller\Pa2',
                        'action' => 'login'
                    ),
                ),
            ),
            'logout' => array(
                'type' => 'literal',
                'options' => array(
                    'route' => '/icum7d9/pa2/logout',
                    'defaults' => array(
                        'controller' => 'Pa2\Controller\Pa2',
                        'action' => 'logout'
                    ),
                ),
            ),
        ),
    ),
    'view_manager' => array(
        'template_path_stack' => array(
            'pa2' => __DIR__ . '/../view',
        ),
    ),
);
