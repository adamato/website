<?php 
require_once 'openid.php';
session_start();

echo("<div class='container-fluid'>");
echo("<center>");
echo("<br>");
echo("<div class='hero-unit' style='padding: 20px !important; margin-bottom: 10px !important; margin-top: -15px !important;'>
    <font size='25'>Kappa Theta Pi Login <b>KTP</b></font><center><br>
    <br></div>");

echo('<br>');
if (isset($_SESSION['sessionMessage'])){
    echo("<h3>".$_SESSION['sessionMessage']."</h3>");
}


try {
    $openid = new LightOpenID(''); //Fill in the server hosting on? startupfrat.com? 
    if(!$openid->mode) {
        if(isset($_GET['login'])) {
            $openid->identity = 'https://www.google.com/accounts/o8/id';
            $openid->required = array('contact/email', 'namePerson/first', 'namePerson/last');
            $openid->optional = array('namePerson/friendly');
            header('Location: ' . $openid->authUrl());
        }
?>
    <form action="?login" method="post">
       <button class='btn-large btn-success'>Login with Google</button>
    </form>

<?php
    } elseif($openid->mode == 'cancel') {
        echo '<h4>User has canceled authentication!</h4>';
    } else if ( ! $openid->validate() ) {
        echo '<h4>You were not logged in by Google.  It may be due to a technical problem.</h4>';
    } else {
        $identity = $openid->identity;
        $userAttributes = $openid->getAttributes();
        $_SESSION['loggedIn'] = 'True';
        header('Location: index.html');

        //$firstName = isset($userAttributes['namePerson/first']) ? $userAttributes['namePerson/first'] : false;
        //$lastName = isset($userAttributes['namePerson/last']) ? $userAttributes['namePerson/last'] : false;
        //$userEmail = isset($userAttributes['contact/email']) ? $userAttributes['contact/email'] : false;
    }
} catch(ErrorException $e) {
    echo $e->getMessage();
}

?>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
<link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
</head>
<script src="http://code.jquery.com/jquery.js"></script>
<script src="js/bootstrap.min.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</html>