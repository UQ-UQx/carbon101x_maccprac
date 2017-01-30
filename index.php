<?php

    require_once('inc/header.php');

    //Content
   // include('Pages/Content/modals.php');
    require_once('Pages/Content/tasbank.php');
    require_once('Pages/Content/enerco.php');
    require_once('Pages/Content/swanson.php');


    // Assign default values for all possible LTI Variables
    $lti_variable_A = "Variable A default";
    $lti_variable_B = "Variable B default";
    // LTI variables can pass numbers, however they will be passed through as strings
    $lti_variable_C = "3100";
    // LTI variables can pass comma separated values, however they will be passed through as strings
    $lti_variable_D = "Speed, velocity, distace";




    // LTI Variables are now attached to $ltivars object,
    // IMPORTANT: ensure that all possible LTI variables are assinged a default value above
    $ltivars = $lti->calldata();

    $lti_id = $lti->context_id()."_".$lti->resource_id();
    $user_id = $lti->user_id();



    // Check to see if the lti has provided values for the possible variables,
    // if yes then assign the new value to the variables.
    if(isset($ltivars{'custom_lti_variable_A'})){
        $lti_variable_A = $ltivars{'custom_lti_variable_A'};
    }

    if(isset($ltivars{'custom_lti_variable_B'})){
        $lti_variable_B = $ltivars{'custom_lti_variable_B'};
    }

    if(isset($ltivars{'custom_lti_variable_C'})){
        $lti_variable_C = $ltivars{'custom_lti_variable_C'};
    }

    if(isset($ltivars{'custom_lti_variable_D'})){
        //$lti_variable_D = $ltivars{'custom_lti_variable_D'};
    }

    require_once('scripts/model.php');

    $state = getState($lti_id);

    if($state){
        $json_state = json_decode($state->state);
        $state = $json_state;
    }

    $companies = array(
        array('id'=>'tasbank', 'data'=>$tasbank["pages"], 'logo'=>$tasbank["logo"], 'companyprofile'=>$tasbank["companyprofile"], 'progress'=>0),
        array('id'=>'enerco', 'data'=>$enerco["pages"], 'logo'=>$enerco["logo"], 'companyprofile'=>$enerco["companyprofile"],  'progress'=>0),
        array('id'=>'swanson', 'data'=>$swanson["pages"], 'logo'=>$swanson["logo"], 'companyprofile'=>$swanson["companyprofile"],  'progress'=>0)
    );



?>
</head>
<body>
 <!-- DELETE THE FOLLOWING ON RELEASE -->
<!--
        <button type="button" class="lti_call_data_button">LTI Call Data</button>
        <div class="lti_call_data" hidden>
            <dl>
            <dd><pre><?php print_r($lti->calldata());?></pre></dd>
            </dl>
        </div>
-->
    <!-- /////////////////////////////// -->

<script type="text/javascript">
// only use this section for passing LTI vars to the global scope.
// All Javascript coding should be done withing the www/js/ folder, with app.js being your main controller

    $lti_id = "<?php echo $lti_id ?>";
    $user_id = "<?php echo $user_id ?>";
    $oauth_consumer_key = '<?php echo $lti->oauth_consumer_key(); ?>';
    $lis_outcome_service_url = '<?php echo $lti->grade_url(); ?>';
    $lis_result_sourcedid = '<?php echo $lti->result_sourcedid(); ?>';
    $context_id = '<?php echo $lti->context_id(); ?>';
    $initState = <?php echo json_encode($state) ?>;

    $companies = <?php echo json_encode($companies) ?>;

</script>



<div class="company_select">

</div>

<div id="content" hidden>


    <div class="page_title">


    </div>
    <div class="nav">

    </div>

    <div class="pages">

        <div class="page_content"></div>
        <div class="page_activity"></div>

    </div>

    <div class="modals"></div>



</div>

 <!-- DELETE THE FOLLOWING ON RELEASE -->
<!--
        <button type="button" class="state_button">State</button>
        <div class="state_content" hidden>
            <dl>
            <dd><pre>

            </pre></dd>
            </dl>
        </div>
-->
    <!-- /////////////////////////////// -->


<script type="text/javascript" src="build/js/app.js"></script>

</body>


</html>
