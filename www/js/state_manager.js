var maccprojectActivity = require('./maccproject/maccproject_activity.js');
var maccprojectAnalysis = require('./maccproject/maccanalysis_activity.js');
var maccprojectInterpretation = require('./maccproject/maccinterpretation_activity.js');

var state = {
    "tasbank":{
      "created":_.now()
    },
    "enerco":{
      "created":_.now()
    },
    "swanson": {
      "created":_.now()
    }
};
var selectedCompany = "";

var activity_buttons = require('./activity_buttons.js');

module.exports = {


  init: function(initState){


    state = initState;

    ////console.log(state);


  },
  removeCompanyState:function(company_id, callback){

    var newState = {};

    $.each(state, function(company_id_in_state, content){

      if(company_id_in_state != company_id){

          newState[company_id_in_state] = content;

      }


    });

    console.log("state", newState);

    state = newState;
    saveToServer(callback);
  },
  updateState:function(activity, callback){

    ////console.log("WHHHHAAATt", activity.type);


     switch (activity.type) {
      case 'multichoice':

        setMultichoiceState(activity);


        break;
      case 'checkbox':

        setCheckboxState(activity);


        break;
      case 'draganddrop':

        setDragAndDropState(activity);


        break;
      case 'scale':


        setScaleState(activity);
        break;
      case 'carbon_footprint_calculation':

        setCFCState(activity);

        break;
      case 'maccproject':

        maccprojectActivity.updateState(activity);
        break;
      case 'maccanalysis':

        maccprojectAnalysis.updateState(activity);

        break;
      case 'maccinterpretation':

        maccprojectInterpretation.updateState(activity);

        break;
      default:
    }

    setTypeInState(activity, activity.type);
    setKeyInState(activity, "possible_score", activity.score);
    setKeyInState(activity, "content", activity);


    setButtonsState(activity);
    setFeedbackState(activity);

    if(callback){
      callback();
    }



    $(".state_content").find("pre").html(JSON.stringify(state,null,2));


  },
  getActivityState:function(activity, key){
    //////console.log(state);
    //
    if(_.get(state[activity.company][activity.id], key)){

      return _.get(state[activity.company][activity.id], key);

    }
    return [];
  },
  getActivityStateByCompanyAndActivityId:function(company_id, activity_id, key){
  //  ////console.log(company_id, activity_id, key, state[company_id][activity_id][key]);
    if(_.get(state[company_id][activity_id], key)){

      return _.get(state[company_id][activity_id], key);

    }
    return [];
  },
  incrementActivityAttempts:function(activity){

    incrementActivityAttempts(activity);


  },
  getActivityAttempts:function(activity){
    return _.get(state[activity.company], "["+activity.id+"]attempted");
  },
  getActivityAttemptsByID:function(company, activity){
    return _.get(state[company], "["+activity+"]attempted");
  },
  getState:function(){
    return state;
  },
  getCompanyState:function(company){
    return state[company];
  },
  getProgress: function(companies, currentState){

      //console.log("GETTING PROGRESS", companies, currentState);

      var progress = {};
      $.each(companies, function(ind, company){



          var pagesWithActivites = _.filter(company.data, function(page, key){
            if (page.activity){
              if (page.activity.type != "maccanalysis"){
                return page.activity;
              }
            }
          });

          var submittedActivitesPages = module.exports.getSubmittedActivitiesPages(company.id, pagesWithActivites);

          progress[company.id] = submittedActivitesPages.length/pagesWithActivites.length;


      });


      return progress;

  },
  setCompletionState:function(activity,num_of_interactions){

    _.set(state[activity.company], "["+activity.id+"][completion_state]", num_of_interactions);

    if(activity.type == "carbon_footprint_calculation"){

      _.set(state[activity.company], "["+activity.id+"][availableLeaderboardPoints]", activity["points"]);


    }
    else if(activity.type == "maccproject"){

          _.set(state[activity.company], "["+activity.id+"][availableLeaderboardPoints]", activity["points"]);


        }
    else if(activity.type == "maccinterpretation"){

          _.set(state[activity.company], "["+activity.id+"][availableLeaderboardPoints]", activity["points"]);


        }
    else{

      _.set(state[activity.company], "["+activity.id+"][availableLeaderboardPoints]", num_of_interactions*activity["points"]);

    }


    $(".state_content").find("pre").html(JSON.stringify(state,null,2));

  },
  setSubmittedState:function(activity, flag){


    setSubmittedState(activity, flag);



    $(".state_content").find("pre").html(JSON.stringify(state,null,2));

  },
  getSubmittedState:function(activity){

    return getSubmittedState(activity);

        $(".state_content").find("pre").html(JSON.stringify(state,null,2));

  },
  getSubmittedActivitiesPages:function(company, activityPages){

//    ////console.log("state get", company, activityPages);

    var submitted = [];

    $.each(activityPages, function(ind, page){

       if(_.get(state[company], "["+page.activity.id+"]lastSubmitted_status")){
          if (page.activity.type != "maccanalysis"){
           submitted.push(page);
          }
       }

    });

    return submitted;


  },
  resetActivityState:function(activity,key){

   // ////console.log(activity.id);

    state[activity.company][activity.id][key] = {};
    state[activity.company][activity.id]["submitted"] = false;
    setButtonsState(activity);


    $(".state_content").find("pre").html(JSON.stringify(state,null,2));

  },
  setSelectedCompany: function(company_id){

    selectedCompany = company_id;
  },
  getSelectedCompany: function(){
    return selectedCompany;
  },
  sendToServer:function(callback){

    saveToServer(callback);


  },
  checkAnswer:function(activity, callback){


            var data = {'data':{}};
            data['user_id'] = $user_id;
            data['lti_id'] = $lti_id
            data['state'] = JSON.stringify(state);

            data['oauth_consumer_key'] = $oauth_consumer_key;
            data['lis_outcome_service_url'] = $lis_outcome_service_url;
            data['lis_result_sourcedid'] = $lis_result_sourcedid;
            data['context_id'] = $context_id;

            $.ajax({
              type: "POST",
              url: "scripts/check.php",
              data: data,
              success: function(response) {


                state = response;





                  $(".state_content").find("pre").html(JSON.stringify(state,null,2));



                  if(callback){
                    callback();
                  }

                  incrementActivityAttempts(activity);
                  updateActivityViewBasedOnLastSubmitted(activity);
                  setButtonsState(activity);

                  saveToServer();


              },
              error: function(error){
                    ////console.log('red');
                  ////console.log(error);
                  console.log("error from check");
                  console.log(error);
              }
            });




  },
  updateActivityViewBasedOnLastSubmitted:function(activity){

    updateActivityViewBasedOnLastSubmitted(activity);

  },
  setSelectedInState:function(activity, selectedOptions){

    setSelectedInState(activity, selectedOptions);
    saveToServer();
    $(".state_content").find("pre").html(JSON.stringify(state,null,2));

  }

}

function saveToServer(callback){


            var data = {'data':{}};
            data['user_id'] = $user_id;
            data['lti_id'] = $lti_id
            data['state'] = JSON.stringify(state);

            data['oauth_consumer_key'] = $oauth_consumer_key;
            data['lis_outcome_service_url'] = $lis_outcome_service_url;
            data['lis_result_sourcedid'] = $lis_result_sourcedid;

            $.ajax({
              type: "POST",
              url: "scripts/save.php",
              data: data,
              success: function(response) {

                  //////console.log(response);
                  ////console.log('blue');

                  if(callback){
                    callback();
                  }


              },
              error: function(error){
                    ////console.log('red');
                  ////console.log(error);
              }
            });

}


function incrementActivityAttempts(activity){

      if(_.get(state[activity.company], "["+activity.id+"]attempted")){
        _.set(state[activity.company], "["+activity.id+"]attempted", _.get(state[activity.company], "["+activity.id+"]attempted")+1);
    }else{
        _.set(state[activity.company], "["+activity.id+"]attempted", 1);
    }

    $(".state_content").find("pre").html(JSON.stringify(state,null,2));

    var attempted_state = state[activity.company][activity.id]["attempted"];

    setButtonsState(activity);
    setFeedbackState(activity);

}



function setMultichoiceState(activity){

    var selectedOptions = [];

    selectedOptions = $("input[name='"+activity.id+"_option']:checked").map(function() {
        return this.value;
    }).get();

    setSelectedInState(activity, selectedOptions);

    setStatusIcon(activity, "attempted");

}

function getMultichoiceState(activity){

    return state[activity.company][activity.id];

}


function setCheckboxState(activity){

    var selectedOptions = [];

    selectedOptions = $("input[name='"+activity.id+"_option']:checked").map(function() {
            return this.value;
     }).get();


    setSelectedInState(activity, selectedOptions);

    // if(_.get(state[activity.company][activity.id], "attempted")){
    //     _.set(state[activity.company][activity.id], "attempted", _.get(state[activity.company][activity.id])+1);
    // }else{
    //     _.set(state[activity.company][activity.id], "attempted", 1);
    // }


    //////console.log(activity.company, activity.id, selectedOptions);
    if(selectedOptions.length > 0){
        setStatusIcon(activity, "attempted");
    }

}

function getCheckboxState(activity){

    return state[activity.company][activity.id];

}


function setDragAndDropState(activity){

   // d32

    var selectedOptions = [];

    selectedOptions = $(".draggable[data-selected='true']").map(function() {
            return {

              "option_id":this.dataset.option_id,
              "option":this.dataset.option,
              "position":{"left":$(this).css("left"),"top":$(this).css("top")},
              "selected_zone":this.dataset.selected_zone
            };
     }).get();


     setSelectedInState(activity, selectedOptions);



    //////console.log(activity.company, activity.id, selectedOptions);
    if(selectedOptions.length > 0){
        setStatusIcon(activity, "attempted");
    }

}

function getDragAndDropState(activity){

    return state[activity.company][activity.id];

}

function setScaleState(activity){
        ////console.log("blue");

    var selectedOptions = [];

    selectedOptions = $("input[class='"+activity.id+"_scale_buttons']").map(function() {
            if($(this).parent().hasClass("active")){
              return {"id":this.id, "option_id":this.dataset.option_id, "scale":this.dataset.scale};
            }
     }).get();


    setSelectedInState(activity, selectedOptions);

    // if(_.get(state[activity.company][activity.id], "attempted")){
    //     _.set(state[activity.company][activity.id], "attempted", _.get(state[activity.company][activity.id])+1);
    // }else{
    //     _.set(state[activity.company][activity.id], "attempted", 1);
    // }

    if(selectedOptions.length > 0){
      setStatusIcon(activity, "attempted");
    }
}

function getScaleState(activity){

    return state[activity.company][activity.id];

}

function setCFCState(activity){


    //////console.log($(".amountInputContainer"));

    ////console.log("NOOOOOO!!!");
    var selectedOptions = [];

    var amounts = [];
    var formulas = [];
    var ecfefs = [];
  //  var ecf =


    amounts = $("input[class='"+activity.id+"']").map(function() {

            if(this.value){
                return {
                    "source":this.dataset.source_id,
                    "type":$(this).parent().parent().data("type"),
                    "value":parseFloat(numberNoCommas(this.value))
                }
            }

     }).get();

    function numberNoCommas(x) {
    return x.replace(/,/g, '');
    }


    ecfefs = $("select").map(function() {

            if(this.value){
                return {
                    "source":this.dataset.source_id,
                    "type":this.dataset.type,
                    "value":this.value
                }
            }

     }).get();

    formulas = $(".modalButtonContainer").map(function(){

            if(this.dataset.selected_formula != "none"){

                return {
                    "source":this.dataset.source_id,
                    "type":this.dataset.type,
                    "value":this.dataset.selected_formula_id
                }

            }


    });



    selectedOptions = _.union(ecfefs, amounts, formulas);


    ////console.log(activity.content.sources.length);

    var sourceids = [];

    $.each(activity.content.sources, function(ind, obj){

        sourceids.push(obj.source_id);

    });

    ////console.log(sourceids);




    setSelectedInState(activity, selectedOptions);


    setStatusIcon(activity);

}

function getCFCState(activity){


}

function setSelectedInState(activity, selectedOptions){

  if(!activityReachedAttemptsLimit(activity)){

    ////console.log("BOO", activity.company);

    _.set(state[activity.company], "["+activity.id+"][selected]", selectedOptions);
  }

}

function setTypeInState(activity, type){

  //if(!activityReachedAttemptsLimit(activity)){
    _.set(state[activity.company], "["+activity.id+"][activity_type]", type);
  //}

}

function setKeyInState(activity, key, value){

  //if(!activityReachedAttemptsLimit(activity)){
    _.set(state[activity.company], "["+activity.id+"]["+key+"]", value);
  //}

}


function activityReachedAttemptsLimit(activity){
    var attempted_state = state[activity.company][activity.id]["attempted"];

    ////console.log(attempted_state, activity.attempts);
    if(attempted_state >= activity.attempts){
       return true;
    }
    return false;
}


function setButtonsState(activity){


    var completion_state = state[activity.company][activity.id]["completion_state"];
    var selected_state = state[activity.company][activity.id]["selected"].length;
    var submitted_state = state[activity.company][activity.id]["submitted"];
    var attempted_state = state[activity.company][activity.id]["attempted"];

    var incorrect = _.get(state[activity.company][activity.id], "[lastSubmitted_status][incorrect]");
    var correct_state = false;
    if(incorrect){

      if(incorrect.length == 0){
        correct_state = true;
      }
    }



    ////console.log(completion_state, selected_state, submitted_state, attempted_state);

    if(!attempted_state){
        attempted_state = 0;
    }

    if((selected_state >= completion_state) && (attempted_state < activity.attempts)){
        $(".submit_button").removeClass("disabled");
    }else{
        $(".submit_button").addClass("disabled");
    }

    if((attempted_state == activity.attempts)){
        $(".save_button").addClass("disabled");
    }

    if((selected_state >= 1) && (attempted_state < activity.attempts)){
        $(".reset_button").removeClass("disabled");
    }else{
        $(".reset_button").addClass("disabled");
    }

    if(correct_state && submitted_state){
        ////console.log("reddssdf");
        $(".feedback_button").show();

    }else{
        $(".feedback_button").hide();


    }

    if(attempted_state >= activity.attempts){
        //$(".activity_buttons").hide();
        $(".submit_button").hide();
        $(".reset_button").hide();
        $(".feedback_button").show();
    }




    //submit - enable only when completion_state is true and activity has NOT been submitted
    //save - enable only when selected options length is greater than 1 and activity has NOT been submitted
    //reset - enable only when selected options length is greater than 1 and activity attempts is max activity.attemps limit
    //feedback - only show when the user has submitted atleast once and has nothing wrong or when activity is out of attempts


}

function setSubmittedState(activity, flag){

    _.set(state[activity.company], "["+activity.id+"]submitted", flag);

    if((state[activity.company][activity.id]["attempted"] == 1) && activity.leaderboard){

        _.set(state[activity.company], "["+activity.id+"]leaderboard", state[activity.company][activity.id]["selected"]);

    }
    _.set(state[activity.company], "["+activity.id+"]lastSubmitted", state[activity.company][activity.id]["selected"]);


}

function getSubmittedState(activity){

    if(_.get(state[activity.company], "["+activity.id+"]submitted")){
       return _.get(state[activity.company], "["+activity.id+"]submitted");
    }else{
        _.set(state[activity.company], "["+activity.id+"]submitted", false);
    }

}

function setFeedbackState(activity){

    if(state[activity.company][activity.id]["attempted"]){

    var attempt_num = state[activity.company][activity.id]["attempted"];

        if(attempt_num < activity.attempts){

            var attempt_feedback = 'You have used '+attempt_num+' of '+activity.attempts+' submissions';
            $(".attempts_feedback").html(attempt_feedback)

        }else if(attempt_num == activity.attempts){

            var attempt_feedback = 'You have used '+attempt_num+' of '+activity.attempts+' submissions';
            $(".attempts_feedback").html(attempt_feedback)

        }



    }else{

        var attempt_feedback = 'You have used 0 of '+activity.attempts+' submissions';
        $(".attempts_feedback").html(attempt_feedback)

    }

    $(".attempts_feedback").wrap("<i></i>");


}
function setStatusIcon(activity, status){
    //not attempted, attempted, submitted


    // if(state[activity.company][activity.id]){
    //      $(".activity_status[data-activity_id='"+activity.id+"']").find("i").html(status);
    //      if(state[activity.company][activity.id]["submitted"]){
    //          $(".activity_status[data-activity_id='"+activity.id+"']").find("i").html("submitted");
    //      }
    // }
}


function updateActivityViewBasedOnLastSubmitted(activity){
  $(".status").html("");

  ////console.log("&*^*&^*&^*&", (activity.type == 'carbon_footprint_calculation'));
  //


  var availablePoints = _.get(state[activity.company][activity.id], "availableLeaderboardPoints");

  $(".points_available_container").html(availablePoints + " Leaderboard Points Available &nbsp; <i class='fa fa-unlock-alt' aria-hidden='true'></i>");


  if(_.get(state[activity.company][activity.id], "lastSubmitted_status")){

        var completion_state = state[activity.company][activity.id]["completion_state"];
        var selected_state_length = state[activity.company][activity.id]["selected"].length;

      if(completion_state == selected_state_length){
          ////console.log(activity.type);
          switch (activity.type) {
            case 'multichoice':

              setMultichoiceCheckedView(activity);


              break;
            case 'checkbox':

              setCheckboxCheckedView(activity);


              break;
            case 'draganddrop':

              setDragAndDropCheckedView(activity);


              break;
            case 'scale':


              setScaleCheckedView(activity);
              break;
            case 'carbon_footprint_calculation':

              setCFCCheckedView(activity);

              break;
            case 'maccproject':

              maccprojectActivity.CheckedView(activity);

              break;
            case 'maccinterpretation':
              //console.log('Macc interpretation to run');
              maccprojectInterpretation.CheckedView(activity);

              break;
            default:
          }


      }


  }

  var pointsRecieved = _.get(state[activity.company][activity.id], "leaderboardSubmitted_status.points")
  //console.log(pointsRecieved);

    if(pointsRecieved || _.get(state[activity.company][activity.id], "leaderboardSubmitted_status")){
      if(pointsRecieved.toString().indexOf('.') != -1){
        pointsRecieved = pointsRecieved.toFixed(2);
      }
      $(".points_available_container").html(pointsRecieved + "/"+availablePoints+" Leaderboard Points &nbsp; <i class='fa fa-lock' aria-hidden='true'></i>");

    }


}

var correctTick = '<i class="fa fa-check" style="color:green;" aria-hidden="true"></i>';
var incorrectTick = '<i class="fa fa-times" style="color:red;" aria-hidden="true"></i>';


function setMultichoiceCheckedView(activity){

  var lastSubmittedStatus = _.get(state[activity.company][activity.id], "lastSubmitted_status");
  var lastSubmitted = _.get(state[activity.company][activity.id], "lastSubmitted");


  $.each(lastSubmittedStatus["correct"], function(ind, val){

   // $("input[value='"+val+"']").parent().find(".status").html(correctTick);
    $(".input_container").removeClass("correct_border");
    $(".input_container").removeClass("incorrect_border");

    $(".input_container_label[data-label_val='"+val+"']").parent().addClass("correct_border");


  });

  $.each(lastSubmittedStatus["incorrect"], function(ind, val){

    // $("input[value='"+val+"']").parent().find(".status").html(incorrectTick);
    $(".input_container").removeClass("correct_border");
    $(".input_container").removeClass("incorrect_border");

    $(".input_container_label[data-label_val='"+val+"']").parent().addClass("incorrect_border");

  });


////console.log("BO",lastSubmitted[0]);
  $(".input_container_label[data-label_val='"+lastSubmitted[0]+"']").css("border-color","red");

  var cross = '<i class="fa fa-times" aria-hidden="true"></i>';
  var tick = '<i class="fa fa-check" aria-hidden="true"></i>';

  var message = 'Incorrect, try again';

  if(_.get(state[activity.company], "["+activity.id+"]attempted") == activity.attempts){
    message = "Incorrect.";
  }

  if(lastSubmittedStatus["incorrect"].length > 0){

    $(".quiz_status").css("opacity",1);
    $(".quiz_status").css("color","red");
    $(".quiz_status").removeClass("text-valid");
    $(".quiz_status").removeClass("correct_quiz_status");
    $(".quiz_status").addClass("incorrect_quiz_status");
    $(".quiz_status").html(cross+" "+message);

  }else{

    message = 'Correct!';

    $(".quiz_status").css("opacity",1);
    $(".quiz_status").addClass("text-valid");
    $(".quiz_status").removeClass("incorrect_quiz_status");
    $(".quiz_status").addClass("correct_quiz_status");
    $(".quiz_status").html(tick+" "+message);

  }

}

function setCheckboxCheckedView(activity){

 var lastSubmittedStatus = _.get(state[activity.company][activity.id], "lastSubmitted_status");

  $.each(lastSubmittedStatus["correct"], function(ind, val){

   // $("input[value='"+val+"']").parent().find(".status").html(correctTick);

  });

  $.each(lastSubmittedStatus["incorrect"], function(ind, val){

   // $("input[value='"+val+"']").parent().find(".status").html(incorrectTick);

  });

  var cross = '<i class="fa fa-times" aria-hidden="true"></i>';
  var tick = '<i class="fa fa-check" aria-hidden="true"></i>';

  var message = 'Incorrect, try again';

  if(_.get(state[activity.company], "["+activity.id+"]attempted") == activity.attempts){
    message = "Incorrect.";
  }

  if(lastSubmittedStatus["incorrect"].length > 0){

    $(".quiz_status").css("opacity",1);
    $(".quiz_status").css("color","red");
    $(".quiz_status").removeClass("text-valid");
    $(".quiz_status").removeClass("correct_quiz_status");
    $(".quiz_status").addClass("incorrect_quiz_status");
    $(".quiz_status").html(cross+" "+message);

  }else{

    message = 'Correct!';

    $(".quiz_status").css("opacity",1);
    $(".quiz_status").addClass("text-valid");
    $(".quiz_status").removeClass("incorrect_quiz_status");
    $(".quiz_status").addClass("correct_quiz_status");
    $(".quiz_status").html(tick+" "+message);

  }


}

function setDragAndDropCheckedView(activity){


  var lastSubmittedStatus = _.get(state[activity.company][activity.id], "lastSubmitted_status");
  var currentAttempts = _.get(state[activity.company], "["+activity.id+"]attempted")

  if((currentAttempts == activity.attempts) || (lastSubmittedStatus["incorrect"].length == 0)){
    $.each(lastSubmittedStatus["correct"], function(ind, val){

      $(".draggable_object[data-option='"+val+"']").css({

          "background-color":"green",
          "color":"white"

      })


    });

    $.each(lastSubmittedStatus["incorrect"], function(ind, val){

      $(".draggable_object[data-option='"+val+"']").css({

          "background-color":"red",
          "color":"white"

      })

    });
  }

  var cross = '<i class="fa fa-times" aria-hidden="true"></i>';
  var tick = '<i class="fa fa-check" aria-hidden="true"></i>';

  var message = 'Incorrect, try again';

  if(currentAttempts == activity.attempts){
    message = "Incorrect.";
  }

  if(lastSubmittedStatus["incorrect"].length > 0){

    $(".quiz_status").css("opacity",1);
    $(".quiz_status").css("color","red");
    $(".quiz_status").removeClass("text-valid");
    $(".quiz_status").removeClass("correct_quiz_status");
    $(".quiz_status").addClass("incorrect_quiz_status");
    $(".quiz_status").html(cross+" "+message);

  }else{

    message = 'Correct!';

    $(".quiz_status").css("opacity",1);
    $(".quiz_status").addClass("text-valid");
    $(".quiz_status").removeClass("incorrect_quiz_status");
    $(".quiz_status").addClass("correct_quiz_status");
    $(".quiz_status").html(tick+" "+message);

  }



}



function setScaleCheckedView(activity){



    var lastSubmittedStatus = _.get(state[activity.company][activity.id], "lastSubmitted_status");
    var currentAttempts = _.get(state[activity.company], "["+activity.id+"]attempted")

    $("input[class='"+activity.id+"_scale_buttons']").parent().css("background-color","");

    if((currentAttempts == activity.attempts) || (lastSubmittedStatus["incorrect"].length == 0)){
        $.each(lastSubmittedStatus["correct"], function(ind, val){

                    ////console.log(val);

          $("input[data-scale='"+val.scale+"']").each(function(ind, obj){

              ////console.log($(obj).data("option_id"));
              if($(obj).data("option_id") == val.source_id){

                  $(obj).parent().css({

                    "background-color":"green"


                  });
              }

          });

        });

        $.each(lastSubmittedStatus["incorrect"], function(ind, val){
                    ////console.log(val);

          $("input[data-scale='"+val.scale+"']").each(function(ind, obj){
              ////console.log($(obj).data("option_id"));


              if($(obj).data("option_id") == val.source_id){

                  $(obj).parent().css({

                    "background-color":"red"

                  });

              }

          });
        });
    };

  var cross = '<i class="fa fa-times" aria-hidden="true"></i>';
  var tick = '<i class="fa fa-check" aria-hidden="true"></i>';

  var message = 'Incorrect, try again';

  if(_.get(state[activity.company], "["+activity.id+"]attempted") == activity.attempts){
    message = "Incorrect.";
  }

  if(lastSubmittedStatus["incorrect"].length > 0){

    $(".quiz_status").css("opacity",1);
    $(".quiz_status").css("color","red");
    $(".quiz_status").removeClass("text-valid");
    $(".quiz_status").removeClass("correct_quiz_status");
    $(".quiz_status").addClass("incorrect_quiz_status");
    $(".quiz_status").html(cross+" "+message);

  }else{

    message = 'Correct!';

    $(".quiz_status").css("opacity",1);
    $(".quiz_status").addClass("text-valid");
    $(".quiz_status").removeClass("incorrect_quiz_status");
    $(".quiz_status").addClass("correct_quiz_status");
    $(".quiz_status").html(tick+" "+message);

  }


}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function setCFCCheckedView(activity){

  //console.log(activity.id, "DLKAKJSDKASJDLKASJKDLASDJKLSAD");
  var lastSubmittedStatus = _.get(state[activity.company][activity.id], "lastSubmitted_status");
  var lastSubmittedTotals = _.get(state[activity.company][activity.id], "lastSubmitted_status.tco2e");
    var currentAttempts = _.get(state[activity.company], "["+activity.id+"]attempted")

  //$(".status").html("");

  $.each(lastSubmittedStatus["correct"], function(ind, val){

    $("tr").each(function(inde, obj){

      if($(this).hasClass(val.source_id)){

        $(this).find("td").each(function(){


          if($(this).data("type") == val.type){

            $(this).find("span[class='status']").html(correctTick);

          }

        });

      }

    });

  });

  var answerKey = _.get(state[activity.company][activity.id], "lastSubmitted_status.answer");

  //console.log(state[activity.company][activity.id]["lastSubmitted_status"]);

  $.each(lastSubmittedStatus["incorrect"], function(ind, val){

    $("tr").each(function(inde, obj){

      if($(this).hasClass(val.source_id)){

        $(this).find("td").each(function(){


          if($(this).data("type") == val.type){

              var correctAnswer = '';
              if(answerKey.length > 0){

                //console.log(answerKey);


                var answerItem = _.filter(answerKey, function(item){
                  return ((item.source == val.source_id) && (item.type == val.type));
                });


              //   //console.log(answerItem[0]);

                correctAnswer = "<span class='correct_answer_feedback' hidden>Answer: "+numberWithCommas(answerItem[0].answer)+"</span>";


              }

            $(this).find("span[class='status']").html(incorrectTick+" "+correctAnswer);

          }

        });

      }

    });

  });

  ////console.log((currentAttempts = activity.attempts), (lastSubmittedStatus["incorrect"].length == 0));
 // //console.log(_.get(state[activity.company][activity.id], "lastSubmitted_status.answer"))

  var answerKey = _.get(state[activity.company][activity.id], "lastSubmitted_status.answer");

  //console.log("ATTEMPTS: ",currentAttempts,activity.attempts );
  if((currentAttempts == activity.attempts) || (lastSubmittedStatus["incorrect"].length == 0)){

      $(".correct_answer_feedback").show();
  };


  var totalCFC = 0;

  $.each(lastSubmittedTotals, function(ind, val){
    ////console.log(val)


     $("tr").each(function(inde, obj){

      if($(this).hasClass(val.source_id)){

        $(this).find("td").each(function(){

              $(this).removeClass("correct_answer");

          if($(this).data("type") == "tco2e"){

            totalCFC += val.total;
            $(this).html(numberWithCommas(parseFloat(val.total).toFixed(2)));

              $(this).addClass("correct_answer");

          }

        });

      }

    });

  });


  $(".tco2e_container").each(function(ind, obj){



    if(!$(this).parent().hasClass("correct_answer")){

      $(this).parent().css({"background-color":"red"});

    }

  });

  $(".totalco2").html(numberWithCommas(parseFloat(totalCFC).toFixed(2)));



  var cross = '<i class="fa fa-times" aria-hidden="true"></i>';
  var tick = '<i class="fa fa-check" aria-hidden="true"></i>';

  var message = 'Incorrect, try again';

  if(_.get(state[activity.company], "["+activity.id+"]attempted") == activity.attempts){
    message = "Incorrect.";
  }

  if(lastSubmittedStatus["incorrect"].length > 0){

    $(".quiz_status").css("opacity",1);
    $(".quiz_status").css("color","red");
    $(".quiz_status").removeClass("text-valid");
    $(".quiz_status").removeClass("correct_quiz_status");
    $(".quiz_status").addClass("incorrect_quiz_status");
    $(".quiz_status").html(cross+" "+message);

  }else{

    message = 'Correct!';

    $(".quiz_status").css("opacity",1);
    $(".quiz_status").addClass("text-valid");
    $(".quiz_status").removeClass("incorrect_quiz_status");
    $(".quiz_status").addClass("correct_quiz_status");
    $(".quiz_status").html(tick+" "+message);

  }



}
