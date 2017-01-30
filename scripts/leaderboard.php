<?php

function upload_leaderboard($course_id, $student_id, $tool_name, $score) {
	    $db_config = array(
            'driver'=>'mysql',
            'hostname'=>'localhost',
            //'hostname'=>'127.0.0.1',
            'username'=>'root',
            'password'=>'root',
            'dbname'=>'leaderboard',
        	);
	    $table_name = 'leaderboard';
	    date_default_timezone_set('UTC');
	    $datetime = date("Y-m-d H:i:s");
	    $id = 0;
       	$db_leaderboard = new Db($db_config['driver'], $db_config['hostname'], $db_config['dbname'], $db_config['username'], $db_config['password']);
       	//Check if the record already exists
       	$result = $db_leaderboard->select($table_name, '*', array(
       		'course_id' => $course_id,
       		'student_id' => $student_id,
       	))->fetch();
       	if($result) {
       		//Update
       		$new_overall_score = $result->overall_score - $result->$tool_name + $score;
       		$record = array(
       			'course_id' => $course_id,
       			'student_id' => $student_id,
       			$tool_name => $score,
       			$tool_name . '_updated' => $datetime,
       			'overall_score' => $new_overall_score,
                        'overall_updated' => $datetime,
       		);
       		$db_leaderboard->update($table_name, $record, $result->id);
       		$id = $result->id;
       	}
       	else {
       		//Insert
       		$record = array(
       			'course_id' => $course_id,
       			'student_id' => $student_id,
	       		$tool_name => $score,
	       		$tool_name . '_updated' => $datetime,
	       		'overall_score' => $score,
                        'overall_updated' => $datetime,
       		);
       		//var_dump($record);
       		$db_leaderboard->create($table_name, $record);
       		$id = $db_leaderboard->id();
       	}
       	return $id;
	}


?>
