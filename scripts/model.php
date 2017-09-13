<?php


    function setState($lti_id, $state){
        global $lti;
        $db = Db::instance();
        date_default_timezone_set('Australia/Brisbane');
        $modified = date('Y-m-d H:i:s');
        $existing = getstate($lti_id);
       // error_log($lti->user_id());
        if(!$existing) {
            $db->create('states', array('lti_id'=>$lti_id,'user_id'=>$lti->user_id(), 'state'=>$state,'created'=>$modified,'updated'=>$modified));
        } else {
           // $db->update('states', array('state'=>$state,'updated'=>$modified), 'lti_id', $lti_id);
            $db->query( 'UPDATE states SET state = :state WHERE lti_id = :lti_id AND user_id = :user_id', array( 'state' => $state, 'lti_id' => $lti_id, 'user_id' => $lti->user_id() ) );
        }
    }

    function getState($lti_id){
        global $lti;
        //error_log('get state '.$lti->user_id(),0);

        $db = Db::instance();
        $select = $db->query( 'SELECT * FROM states WHERE lti_id = :lti_id AND user_id = :user_id', array( 'lti_id' => $lti_id, 'user_id' => $lti->user_id() ) );
        while ( $row = $select->fetch() ) {
            return $row;
        }
        return null;
    }



?>
