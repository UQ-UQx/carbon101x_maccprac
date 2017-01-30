<?php 



    header('Content-Type: application/json');

    define("ROOT",dirname(__FILE__).'/../' );

    require_once('../config.php');
    require_once(ROOT.'lib/lti.php');
    require_once(ROOT.'lib/grade.php');
    $lti = new Lti($config,true);
    if(isset($config['use_db']) && $config['use_db']) {
        require_once(ROOT.'lib/db.php');
        Db::config( 'driver',   'mysql' );
        Db::config( 'host',     $config['db']['hostname'] );
        Db::config( 'database', $config['db']['dbname'] );
        Db::config( 'user',     $config['db']['username'] );
        Db::config( 'password', $config['db']['password'] );
    }
    $vars = array('user_id'=>$_POST['user_id'],'oauth_consumer_key'=>$_POST['oauth_consumer_key'], 'lis_outcome_service_url'=>$_POST['lis_outcome_service_url'], 'lis_result_sourcedid'=>$_POST['lis_result_sourcedid']);
    $lti->setltivars($vars);
    
    require_once('model.php');
    
    $user_id = $_POST['user_id'];
    $lti_id = $_POST['lti_id'];
    $state = $_POST['state'];

    //error_log($lti_id." - ".$user_id, 0);
    setState($lti_id, $state);


    // send_grade($score,$lti);
    
    echo json_encode('{"status":"'.json_encode($config).'", "lti":"'.json_encode($lti->calldata()).'"}');


?>