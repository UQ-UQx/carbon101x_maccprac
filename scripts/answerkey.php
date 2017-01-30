<?php 

    header('Content-Type: application/json');


    



    $function = $_POST['function'];

    if($function == "getAnswerKey"){
        $company = $_POST['company'];
        $key = $_POST['activity_id'];

        echo getAnswerKey($company, $key);

    }


    
    function getAnswerKey($company, $id){

    require_once('../Pages/Content/tasbank.php');
    require_once('../Pages/Content/enerco.php');


    $answers = array(

        "tasbank"=>$tasbank["answers"],
        "enerco"=>$enerco["answers"]

    );


        return json_encode($answers[$company][$id]);
    }



