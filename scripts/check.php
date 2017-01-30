<?php



    header('Content-Type: application/json');

        ////////error_log("checking",0);


    define("ROOT",dirname(__FILE__).'/../' );

    require_once('../config.php');
    require_once(ROOT.'lib/lti.php');
    require_once(ROOT.'lib/grade.php');
    require_once('leaderboard.php');
    $lti = new Lti($config,true);
    if(isset($config['use_db']) && $config['use_db']) {
        require_once(ROOT.'lib/db.php');
        Db::config( 'driver',   'mysql' );
        Db::config( 'host',     $config['db']['hostname'] );
        Db::config( 'database', $config['db']['dbname'] );
        Db::config( 'user',     $config['db']['username'] );
        Db::config( 'password', $config['db']['password'] );
    }
    $vars = array('user_id'=>$_POST['user_id'],'oauth_consumer_key'=>$_POST['oauth_consumer_key'], 'lis_outcome_service_url'=>$_POST['lis_outcome_service_url'], 'lis_result_sourcedid'=>$_POST['lis_result_sourcedid'], 'context_id'=>$_POST['context_id']);
    $lti->setltivars($vars);

    require_once('model.php');

    $lti_id = $_POST['lti_id'];
    $state = $_POST['state'];

    $stateJSON = json_decode($state, true);



    require_once('../Pages/Content/tasbank.php');
    require_once('../Pages/Content/enerco.php');



    $answers = array(

        "tasbank"=>$tasbank["answers"],
        "enerco"=>$enerco["answers"]

    );

    $activities = array(

        "tasbank"=>getActivites($tasbank),
        "enerco"=>getActivites($enerco)

    );


    foreach($stateJSON as $company => $companyState) {



        foreach ($companyState as $activity_id => $activity_state) {



            if(isset($activity_state["activity_type"]) && isset($activity_state["lastSubmitted"])){


                //$attempted = $activity_state["attempted"];

                $attempted = 0;
                if(isset($activity_state["attempted"])){
                    $attempted = $activity_state["attempted"]+1;
                }

                $activity_type = $activity_state["activity_type"];
                $lastSubmitted = $activity_state["lastSubmitted"];
                $possible_score = $activity_state["possible_score"];
                $completion_state = $activity_state["completion_state"];
                //////error_log(json_encode($company.$activity_id),0);
                $answer = $answers[$company][$activity_id];
                $activity = $activities[$company][$activity_id];
                $toUpdate = array("lastSubmitted_status");

                ////error_log($attempted, 0);

                if($attempted == 0){

                    array_push($toUpdate, "leaderboardSubmitted_status");
                }


                if($activity_type == "multichoice"){


                    foreach($toUpdate as $ind => $keyname){

                        $activity_state[$keyname] = checkMultichoice($attempted, $answer, $activity_id,$activity, $lastSubmitted, $possible_score);

                    }

                    //$activity_state["lastSubmitted_status"] = checkMultichoice($answer, $activity_id, $lastSubmitted, $possible_score);



                }elseif($activity_type == "checkbox"){

                    foreach($toUpdate as $ind => $keyname){

                        $activity_state[$keyname] = checkCheckbox($attempted, $answer, $activity_id, $activity, $lastSubmitted, $possible_score);

                    }

                    //$activity_state["lastSubmitted_status"] = checkCheckbox($answer, $activity_id, $activity, $lastSubmitted, $possible_score);


                }elseif($activity_type == "draganddrop"){


                    foreach($toUpdate as $ind => $keyname){

                        $activity_state[$keyname] = checkDragAndDrop($attempted, $answer, $activity_id, $activity, $lastSubmitted, $possible_score);

                    }
                    //$activity_state["lastSubmitted_status"] = checkDragAndDrop($answer, $activity_id, $activity, $lastSubmitted, $possible_score);


                }elseif($activity_type == "scale"){


                    foreach($toUpdate as $ind => $keyname){

                        $activity_state[$keyname] = checkScale($attempted, $answer, $activity_id, $activity, $lastSubmitted, $possible_score);

                    }
                    //$activity_state["lastSubmitted_status"] = checkScale($answer, $activity_id, $activity, $lastSubmitted, $possible_score);


                }elseif($activity_type == "carbon_footprint_calculation"){

                    foreach($toUpdate as $ind => $keyname){

                        $activity_state[$keyname] = checkCFC($attempted, $answer, $activity_id, $activity, $lastSubmitted, $possible_score, $completion_state);

                    }

                    //$activity_state["lastSubmitted_status"] = checkCFC($answer, $activity_id, $activity, $lastSubmitted, $possible_score);


                }
                elseif($activity_type == "maccproject"){

                    foreach($toUpdate as $ind => $keyname){

                        $activity_state[$keyname] = checkMACCProject($attempted, $answer, $activity_id, $activity, $lastSubmitted, $possible_score, $completion_state);

                    }



                }
                elseif($activity_type == "maccinterpretation"){

                    foreach($toUpdate as $ind => $keyname){

                        $activity_state[$keyname] = checkMaccinterpretation($attempted, $answer, $activity_id, $activity, $lastSubmitted, $possible_score, $completion_state);

                    }



                }


            }


            $companyState[$activity_id] = $activity_state;
        }


            $stateJSON[$company] = $companyState;

    }

    //////////error_log(json_encode($stateJSON), 0);
    ///
//https://www.reddit.com/r/australia/comments/4tyi8j/centrelink_cut_off_with_no_warning_cant_pay_rent/d5ltiwf/

    function checkMultichoice($attempted, $answer, $activity_id, $activity, $selected, $maxScore){
        $points = 0;
        $correct = array();
        $incorrect = array();
        $completeFeedback = array();

        $currentScore = 0;
        //////error_log(json_encode(array_keys($answer)),0);
        $answerToCheck = array_keys($answer);
        foreach ($selected as $ind => $value) {

            $feedback = array();

            if(in_array($value, $answerToCheck)){

                array_push($correct, $value);
                $points += $activity["points"];

                    $feedback["type"] = "correct";
                    $feedback["answer"] = $value;
                    $feedback["user_response"] = $value;
                    $feedback["feedback"] = $answer[$value]["feedback"]["correct"];

                $currentScore++;

            }else{

                array_push($incorrect, $value);

                $answerVal = reset($answer);

                //////error_log(json_encode($attempted >= $answerVal["feedback"]["incorrect"]["atAttempt"]),0);



                if(($attempted >= ($answerVal["feedback"]["incorrect"]["atAttempt"])) || $attempted == $activity["attempts"]){
                    $feedback["type"] = "incorrect";
                    $feedback["answer"] = $value;
                    $feedback["user_response"] = $value;

                    $feedback["feedback"] = $answerVal["feedback"]["incorrect"];
                }else{

                    $feedback["type"] = "incorrect";
                    $feedback["answer"] = $value;
                    $feedback["user_response"] = $value;
                    $feedback["feedback"] = $answerVal["feedback"]["default"];

                }

            }

         array_push($completeFeedback, $feedback);

        }

        if(count($incorrect) == 0){
            $score = $maxScore;
        }else{
            $score = 0;
        }
      //  $score = (count($correct)/count($answer))*$maxScore;

        //return "hello";

        return array("correct"=>$correct, "incorrect"=>$incorrect, "score"=>$score, "possible_score"=>$maxScore, "points"=>$points, "possible_points"=>$activity["points"], "feedback"=>$completeFeedback);
    }



    function checkCheckbox($attempted, $answer, $activity_id, $activity, $selected, $maxScore){

        // UNSTABLE!! as of 22nd November 2016

        /**
         *
         *  A correct      x  50 1
         *  B correct         50 0
         *  C incorrect    x  50 0
         *  D incorrect    x  50 0
         *  E incorrect       50 1
         *  F incorrect       50 1
         *  F incorrect       50 1

         *  300
         *
         */

        $pointsForEachSelected = $activity["points"];
        $correct = array();
        $incorrect = array();
        $score = 0;
        $options = $activity["content"]["options"];
        $optionsLen = count($options);


        $points = $optionsLen*$pointsForEachSelected;

        foreach ($answer as $ind => $ans) {
            if(in_array($ans, $selected)){
                array_push($correct, $ans);
            }else{
                $points -= $pointsForEachSelected;
            }
        }

        foreach ($selected as $ind => $sel) {
            if(!in_array($sel, $answer)){
                array_push($incorrect, $sel);
                $points -=$pointsForEachSelected;
            }
        }


        $totalPoints = $optionsLen*$pointsForEachSelected;

        $score = ($points/($totalPoints))*$maxScore;


        return array("correct"=>$correct, "incorrect"=>$incorrect, "score"=>$score, "possible_score"=>$maxScore, "points"=>$points, "possible_points"=>$totalPoints);

    }


       function checkDragAndDrop($attempted, $answer, $activity_id, $activity, $selected, $maxScore){

        $selected_options = array();

        foreach ($selected as $key => $value) {

            if(isset($selected_options[$value["selected_zone"]])){

                $values = $selected_options[$value["selected_zone"]];
                array_push($values, $value["option"]);
                $selected_options[$value["selected_zone"]] = $values;

            }else{
                $selected_options[$value["selected_zone"]] = array($value["option"]);

            }

        }

        $selected = $selected_options;

        $correct = array();
        $incorrect = array();
        $score = 0;
        $zones = $activity["content"]["zones"];
        $optionsLen = count($activity["content"]["options"]);

        $pointsForEachSelected = $activity["points"];

        $points = $optionsLen*$pointsForEachSelected;
        $completeFeedback = array();


        foreach ($zones as $ind => $zone) {
            if(isset($selected[$zone["id"]])){

                $optionsInAnswer = array_keys($answer[$zone["id"]]);
                foreach ($selected[$zone["id"]] as $ind => $selected_option) {
                     $feedback = array();

                    if(in_array($selected_option, $optionsInAnswer)){

                        array_push($correct, $selected_option);

                        $feedback["type"] = "correct";
                        $feedback["answer"] = $selected_option;
                        //////error_log(json_encode($zone), 0);
                        $feedback["user_response"] = $selected_option;// +'( '+ $zone["id"] +' )';

                        $feedback["feedback"] = $answer[$zone["id"]][$selected_option]["feedback"]["correct"];

                    }else{

                        array_push($incorrect, $selected_option);
                        $points -= $pointsForEachSelected;




                        foreach ($answer as $zonesID => $options) {
                            if($zonesID != "points"){
                                foreach ($options as $optionID => $content) {
                                    if($optionID == $selected_option){
                                        if(($attempted >= $content["feedback"]["incorrect"]["atAttempt"]) || ($attempted == $activity["attempts"])){
                                            $feedback["type"] = "incorrect";
                                            $feedback["answer"] = $selected_option;
                                           // $feedback["user_response"] = $selected_option +'( '+ $selected[$zone["id"]] +' )';

                                            $feedback["feedback"] = $content["feedback"]["incorrect"];
                                        }else{
                                            $feedback["type"] = "incorrect";
                                            $feedback["answer"] = $selected_option;
                                          //  $feedback["user_response"] = $selected_option +'( '+ $selected[$zone["id"]] +' )';
                                            $feedback["feedback"] = $content["feedback"]["default"];
                                        }
                                    }
                                }
                            }
                        }


                    }


                    array_push($completeFeedback, $feedback);


                }
            }
        }

        $totalPoints = $optionsLen*$pointsForEachSelected;

        $score = ($points/($totalPoints))*$maxScore;

        return array("correct"=>$correct, "incorrect"=>$incorrect, "score"=>$score, "possible_score"=>$maxScore, "points"=>$points, "possible_points"=>$totalPoints, "feedback"=>$completeFeedback);

    }

    function getSourceName($source_id, $activity){

            //////error_log(json_encode($activity), 0);

            foreach ($activity["content"]["options"] as $ind => $option) {
                if($option["id"] == $source_id){
                    return $option["title"];
                }
            }


    }

    function checkScale($attempted, $answer, $activity_id, $activity, $selected, $maxScore){

        $selected_options = array();

        foreach ($selected as $key => $value) {

            if(isset($selected_options[$value["scale"]])){

                $values = $selected_options[$value["scale"]];
                array_push($values, $value["option_id"]);
                $selected_options[$value["scale"]] = $values;

            }else{
                $selected_options[$value["scale"]] = array($value["option_id"]);

            }

        }



        $selected = $selected_options;

        $correct = array();
        $incorrect = array();
        $score = 0;
        $scales = $activity["content"]["scale"];
        $optionsLen = count($activity["content"]["options"]);

        $pointsForEachSelected = $activity["points"];

        $points = $optionsLen*$pointsForEachSelected;

        $completeFeedback = array();

        foreach ($scales as $ind => $scale) {
            if(isset($selected[$scale])){


                $optionsInAnswer = array_keys($answer[$scale]);

                foreach ($selected[$scale] as $ind => $selected_option) {
                    $feedback = array();

                    $current = array(


                        "source_id"=>$selected_option,
                        "scale"=>$scale


                    );

                    if(in_array($selected_option, $optionsInAnswer)){

                        array_push($correct, $current);

                            $feedback["type"] = "correct";
                            $feedback["answer"] = getSourceName($selected_option, $activity);
                            $feedback["feedback"] = $answer[$scale][$selected_option]["feedback"]["correct"];

                    }else{

                        array_push($incorrect, $current);
                        $points -= $pointsForEachSelected;

                        foreach ($answer as $scaleID => $options) {
                            if($scaleID != "points"){
                                foreach ($options as $optionID => $content) {
                                    if($optionID == $selected_option){
                                        if(($attempted >= $content["feedback"]["incorrect"]["atAttempt"]) || ($attempted == $activity["attempts"])){
                                            $feedback["type"] = "incorrect";
                                            $feedback["answer"] = getSourceName($selected_option, $activity);
                                            $feedback["feedback"] = $content["feedback"]["incorrect"];
                                        }else{
                                            $feedback["type"] = "incorrect";
                                            $feedback["answer"] = getSourceName($selected_option, $activity);
                                            $feedback["feedback"] = $content["feedback"]["default"];
                                        }
                                    }
                                }
                            }
                        }

                    }

                    array_push($completeFeedback, $feedback);

                }
            }
        }

        $totalPoints = $optionsLen*$pointsForEachSelected;

        $score = ($points/($totalPoints))*$maxScore;

        return array("correct"=>$correct, "incorrect"=>$incorrect, "score"=>$score, "possible_score"=>$maxScore, "points"=>$points, "possible_points"=>$totalPoints, "feedback"=>$completeFeedback);


    }


    function checkCFC($attempted, $answer, $activity_id, $activity,  $selected, $maxScore, $completion_state){


        //error_log("Attempted in CFC ".$attempted, 0);


        $selected_options = array();



        foreach ($selected as $key => $value) {
                $val = null;
               if($value["type"] == "formula"){

                $val = $value["value"];

               }else{

                $val = floatval($value["value"]);

               }
                $selected_options[$value["source"]][$value["type"]] = $val;

        }

        //////////error_log(json_encode($selected_options), 0);

        $correct = array();
        $incorrect = array();
        $totals = array();
        $score = 0;
       // $scales = $activity["content"]["scale"];
        $optionsLen = 23;
      //  //$pointsForEachSelected = $activity["points"];

        $totalPoints = $activity["points"];
        $points = $totalPoints;

        // foreach ($answer as $source_id => $values) {
        //     if($source_id != "points"){

        //         foreach ($values as $type => $val) {
        //             //////error_log('RUUUUUUNN'.json_encode($activity["points"]).$type,0);

        //             $totalPoints += $activity["points"][$type];
        //             $points = $totalPoints;


        //         }

        //     }


        // }


         $completeFeedback = array();

               // ////////error_log(json_encode($answer), 0);


        foreach ($answer as $source_id => $values) {
            if($source_id != "points"){



            $checkNum = count($values);

            foreach ($values as $header => $value) {


                $checked = array(

                    "source_id"=>$source_id,
                    "type"=>$header

                );

                if($selected_options[$source_id][$header] == $value){

                    array_push($correct, $checked);

                }else{

                    array_push($incorrect, $checked);
                   // $points -= ($totalPoints/$completion_state);
                   //
                   //
                   ////error_log("Activity ID -".json_encode($activity["id"]), 0);
                   ////error_log("Total Points -".json_encode($totalPoints), 0);
                   ////error_log("completion_state -".$completion_state, 0);


                    $points = $points - ($totalPoints/$completion_state);

                    $checkNum --;


                        $feedback = array();

                        $feedback["source"] = $source_id;
                        $feedback["type"] = $header;


                        if($header == "formula"){
                            foreach ($activity["content"]["formulas"] as $formulaInd => $formulaObj) {
                                if($formulaObj["formula_id"] == $value){

                                    $value = $formulaObj["formula_name"];

                                }
                            }
                        }
                        $feedback["answer"] = $value;
                        array_push($completeFeedback, $feedback);


                }




            }

            //if($checkNum == count($selected_options[$source_id])){

                //defaults

                $ecf = 1;
                $amount = 0;
                $co2 = 0;
                $ch4 = 0;
                $n2o = 0;
                $ef = 0;

                //Removed
                $aircon_leakage = 1;


                if(isset($selected_options[$source_id]["amount"])){
                    $amount = $selected_options[$source_id]["amount"];
                }

                if(isset($selected_options[$source_id]["ecf"])){
                    $ecf = $selected_options[$source_id]["ecf"];
                }

                if(isset($selected_options[$source_id]["ch4"])){
                    $ch4 = $selected_options[$source_id]["ch4"];
                }

                if(isset($selected_options[$source_id]["n2o"])){
                    $n2o = $selected_options[$source_id]["n2o"];
                }

                if(isset($selected_options[$source_id]["co2"])){
                    $co2 = $selected_options[$source_id]["co2"];
                }

                $ef = ($co2+$ch4+$n2o);

                if(isset($selected_options[$source_id]["ef"])){
                    $ef = $selected_options[$source_id]["ef"];
                }


                if($source_id == "air_conditioners"){

                    $total = array(

                        "source_id"=>$source_id,

                        "total"=>$amount*$aircon_leakage*$ecf*$ef/1000

                    );

                }else{

                    $total = array(

                        "source_id"=>$source_id,

                        "total"=>$amount*$ecf*$ef/1000

                    );

                }

                array_push($totals, $total);


            }

        }

      //error_log("feedback array: ".json_encode($completeFeedback)." - ".$attempted." - ".$activity["attempts"],0);

        if(!(($attempted >= $activity["attempts"]) || (count($incorrect) == 0))){

            $completeFeedback = array();
        }

        $score = ($points/($totalPoints))*$maxScore;

        return array("correct"=>$correct, "incorrect"=>$incorrect, "score"=>$score, "possible_score"=>$maxScore, "points"=>$points, "possible_points"=>$totalPoints, "tco2e"=>$totals, "answer"=>$completeFeedback);


    }
    function checkMaccinterpretation($attempted, $answer, $activity_id, $activity, $selected, $maxScore){
        $points = 0;

        $completeFeedback = array();

        $score = 0;

        $totalPoints = $activity["points"];

        $macc_useranswers = $selected;

        $macc_useranswers = array();
        foreach ($selected as $entry) {
            $macc_useranswers[$entry['source']] = $entry['value'];
        }

        error_log("macc_useranswers",0);
        error_log(json_encode($macc_useranswers),0);

        $correct_vals = array();
        $incorrect_vals = array();

        foreach ($answer as $kkey => $iitem)
        {
            error_log($kkey,0);
            $val = "";
            $val_feedback = "";

            $user_answers = explode(",", $macc_useranswers[$kkey]);
            $answers = explode(",", $iitem['value']);

            error_log("user_answers",0);
            error_log(json_encode($user_answers),0);
            error_log("answers",0);
            error_log(json_encode($answers),0);

            $val_array = array(
                "source_id"=>$kkey,
                "value"=> $macc_useranswers[$kkey]
            );
            $array_interaction = array_intersect($user_answers, $answers);

            error_log("array_interaction",0);
            error_log(json_encode($array_interaction),0);

            if (count($array_interaction)==count($answers))
            {
                $score += $iitem['points'];

                $val_feedback = $iitem["feedback"]["correct"]['content'];

                array_push($correct_vals,$val_array);

                $feedback = array();
                $feedback["type"] = "Correct";
                $feedback["answer"] = $iitem["question"];

                $feedback["user_response"] = "";
                $feedback["feedback"]['content'] = $val_feedback;
                array_push($completeFeedback, $feedback);
            }
            else{
              array_push($incorrect_vals,$val_array);
              $val_feedback = "";
              if ($iitem["feedback"]["incorrect"] == $attempted)
              {
                $val_feedback = $iitem["feedback"]["incorrect"]['content'];
                $feedback = array();
                $feedback["type"] = "Incorrect";
                $feedback["answer"] = $iitem["question"];

                $feedback["user_response"] = "";
                $feedback["feedback"]['content'] = $val_feedback;
                array_push($completeFeedback, $feedback);
              }

            }
        }

        error_log("Correct Values",0);
        error_log(json_encode($correct_vals),0);
        error_log("InCorrect Values",0);
        error_log(json_encode($incorrect_vals),0);
        error_log("Score",0);
        error_log(json_encode($score),0);
        error_log("Completed Feedback",0);
        error_log(json_encode($completeFeedback),0);

        $points = $score;

        $score = ($points/$totalPoints);


        return array("correct"=>$correct_vals, "incorrect"=>$incorrect_vals, "score"=>$score, "points"=>$points, "possible_score"=>$totalPoints, "possible_points"=>$totalPoints, "feedback"=>$completeFeedback);
    }


    function within_tolerance($correct_value, $entered_value, $tolerance)
    {
       $min = $correct_value - $tolerance;
       $max = $correct_value + $tolerance;
       if (($entered_value >= $min) and ($entered_value <= $max))
       {
         return true;
       }
       else {
         return false;
       }
    }

    function checkMACCProject($attempted, $answer, $activity_id, $activity, $selected, $maxScore){
        $points = 0;
        $correct = array();
        $incorrect = array();
        $completeFeedback = array();

        $totalPoints = $activity["points"];

        $currentScore = 0;

        $score = 0;

        $npv_fields = array("macc_interestrate", "macc_capitalcost", "macc_cashflow", "macc_npv", "macc_projectlifetime");
        $cost_fields = array("macc_abatementcost_avoidedannualemisions", "macc_totalabatement", "macc_cost");
        $fields_to_format = array("macc_capitalcost", "macc_npv", "macc_cost");

        //
        //  . Map: 'source(activity) => value' for user data .
        //
        $userAnswers = array();
        foreach ($selected as $entry) {
            $userAnswers[$entry['source']] = $entry['value'];
        }

        $activity_feedback = array();;

        //error_log('useranswers',0);
        //error_log(json_encode($userAnswers),0);

        $npv_feedback = "";

        $cost_feedback = "";

        $feedback_val = "";

        foreach ($answer as $key => $item)
        {
            //error_log($key,0);
            $dynamic_key = $key;


            if (within_tolerance($item['value'], $userAnswers[$dynamic_key], $item['tolerance'])){
              // correct
              $score += $item['points'];

              $feedback_val = "";
              $vals = array(
                  "source_id"=>$dynamic_key,
                  "value"=>$userAnswers[$dynamic_key],
                  "feedback"=>$feedback_val
              );
              array_push($correct, $vals);
              //error_log($feedback_val,0);
            }
            else {

              if($attempted >= ($item['feedback']['incorrect']["atAttempt"])){
                $feedback_val = "";
                if ($item['feedback']['incorrect']['content']!="")
                {
                  $feedback_val = $item['feedback']['incorrect']['content'];
                }
                else{
                  // dynamically create feedback
                  $formatted_value = $item['value'];
                  if (in_array($key, $fields_to_format))
                  {
                    $formatted_value = "$" . number_format($item['value']);
                  }
                  $feedback_val = "The correct value for " . $item['name'] . " is " . $formatted_value . ".";
                }
              }
              $vals = array(

                  "source_id"=>$dynamic_key,
                  "value"=>$userAnswers[$dynamic_key],
                  "feedback"=>$feedback_val

              );
              array_push($incorrect, $vals);
            }
            /*
            if (in_array($key, $npv_fields)) {
                $npv_feedback .= "<li>". $feedback_val . "</li>";
            }
            else if (in_array($key, $cost_fields)) {
                $cost_feedback .= "<li>". $feedback_val . "</li>";
            }
            */
            //error_log($npv_feedback,0);
            //error_log($cost_feedback,0);
        }
        // Feedback is changed back to appear below the step forms
        /*
        if ($npv_feedback!="")
        {
          $npv_feedback = "<ul>".$npv_feedback."</ul>";
        }

        if ($cost_feedback!="")
        {
          $cost_feedback = "<ul>".$cost_feedback."</ul>";
        }

        if (($score == $activity["points"]) || ($attempted >=3))
        {
          if ($npv_feedback!="")
          {
            $feedback = array();
            $feedback["type"] = "incorrect";
            $feedback["answer"] = "Step 1: Calculate NPV";
            $feedback["user_response"] = "";

            $feedback["feedback"]['content'] = $npv_feedback;
            array_push($completeFeedback, $feedback);
          }
          if ($cost_feedback!="")
          {
            $feedback = array();
            $feedback["type"] = "incorrect";
            $feedback["answer"] = "Step 2: Calculate Marginal Abatement Cost";
            $feedback["user_response"] = "";

            $feedback["feedback"]['content'] = $cost_feedback;
            array_push($completeFeedback, $feedback);
          }
        }
        */
        /*
        error_log('correct',0);
        error_log(json_encode($correct),0);

        error_log('incorrect',0);
        error_log(json_encode($incorrect),0);

        error_log('score',0);
        error_log(json_encode($score),0);

        error_log('feedback',0);
        error_log(json_encode($completeFeedback),0);
        */
        $points = $score;

        if ($totalPoints!=0)
        {
          $score = ($points/$totalPoints);
        }
        else {
          $score = 0; // i.e. ungraded
        }


        return array("correct"=>$correct, "incorrect"=>$incorrect, "score"=>$score, "points"=>$points, "possible_score"=>$totalPoints, "possible_points"=>$totalPoints, "feedback"=>$completeFeedback);
    }

    function getActivites($company){

        $activities = array();
        foreach ($company["pages"] as $page => $content) {

            if(isset($content["activity"])){
                //array_push($activities, $content["activity"]);
                $activities[$content["activity"]["id"]] = $content["activity"];

            }

        }

        return $activities;

    }

    $pointsToLeaderboard = 0;
    $pointsForEdx = 0;

    $totalPointsPossible = 0;

    $gradeToEdx = 0;

    $status = array();

    foreach($stateJSON as $company => $companyState) {



        foreach ($companyState as $activity_id => $activity_state) {if(isset($activity_state["activity_type"])){

            if(isset($activity_state["leaderboardSubmitted_status"])){
                $pointsToLeaderboard += $activity_state["leaderboardSubmitted_status"]["points"];

            }

            if(isset($activity_state["lastSubmitted_status"])){

                $pointsForEdx += $activity_state["lastSubmitted_status"]["points"];

               // error_log($activity_id." -- ".$activity_state["lastSubmitted_status"]["points"], 0);
            }

        }};


        //set this manually based on manual calculation of toal available points for company
        if($company == "tasbank"){
            $totalPointsPossible = 2000;
        }elseif ($company == "enerco") {
            $totalPointsPossible = 2000;
        }

    };
    error_log($pointsToLeaderboard." > ".$pointsForEdx." > ".$totalPointsPossible);

    upload_leaderboard($lti->context_id(), $lti->user_id(), "footprint", $pointsToLeaderboard);
    send_grade(round(($pointsForEdx/$totalPointsPossible), 2), $lti);

    echo json_encode($stateJSON);

?>
