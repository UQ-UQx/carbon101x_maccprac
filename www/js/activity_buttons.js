var Handlebars = require('handlebars');
var interaction = require('./interaction.js');
var modal = require('./modals.js');

module.exports = {
  init:function(activity){
 //options: 
    /*
        submit:true/false
        showFeedback:true/false
        feedback:"feedback"
    */
   
    //generateButtons(activity);
    generateButtonDiv(activity);
    

  },
  show:function(type, activity){

    switch(type){

      case "feedback":

        $(".activity_buttons_container").append( generateFeedbackButton(activity) );
        interaction.watchButtons(activity);

        break;
      default:

        break;
    }


  },
  hide:function(type, activity){

    switch(type){

      case "feedback":

        $(".feedback_button").remove();

        break;
      default:

        break;
    }


  }

}



function generateButtonDiv(activity) {
  //console.log('activity', activity);

  var button_container = $('<div class="activity_buttons_container"></div>');

  var buttondiv1 = $('<div class="buttondiv1"></div>');
  var buttondiv2 = $('<div class="buttondiv2"></div>');

  var rules = activity.content.buttons;

  if(rules.submit) {
    buttondiv1.append(generateSubmitButton(activity));
  }
  if(rules.reset) {
    buttondiv1.append(generateResetButton(activity));
  }  
  if(rules.feedback) {
    buttondiv1.append(generateFeedbackButton(activity));
  }
  buttondiv1.append(generateAttemptsFeedback(activity));


  if(rules.next) {
    buttondiv2.append(generateNextButton(activity));
  }
  if(rules.prev) {
    buttondiv2.append(generatePrevButton(activity));
  }

  button_container.append(buttondiv1, buttondiv2);
  $(".quiz_container").append(button_container);
  interaction.watchButtons(activity);

}

/*
function generateButtons(activity){

  var buttons = "";

  //console.log(activity);

  var rules = _.get(activity,"content.buttons");

  ////console.log(activity);

  if(rules.submit){
    buttons += generateSubmitButton(activity);
  }

  if(rules.save){
   // buttons += generateSaveButton(activity);
  }

  if(rules.reset){
    buttons += generateResetButton(activity);
  }

  if(rules.feedback){
    
    buttons += generateFeedbackButton(activity);


  }

  // if((state.getActivityAttempts(activity) == activity.attempts) || ((state.getActivityStateByCompanyAndActivityId(activity.company, activity.id, "lastSubmitted_status.incorrect")).length == 0) ){

  //   buttons += generateFeedbackButton(activity);

  // }


  // //console.log(activity.company, activity, state.getActivityStateByCompanyAndActivityId(activity.company, activity.id, "lastSubmitted_status"));

  // if((state.getActivityAttempts(activity) == activity.attempts) || ((state.getActivityStateByCompanyAndActivityId(activity.company, activity.id, "lastSubmitted_status.incorrect")).length == 0) ){

  //   buttons += generateFeedbackButton(activity);

  // }

  // ////console.log(rules.feedback.on);
  // // if((rules.feedback) && (rules.feedback.on == "always")){
  // //   buttons += generateFeedbackButton(activity);
  // // }

  var attempts_feedback = generateAttemptsFeedback(activity);



  $(".quiz_container").append(attempts_feedback+"<div class='activity_buttons_container'>"+buttons+"</div>");
  interaction.watchButtons(activity);
  ////console.log("generating buttons",activity.content.buttons);

}
*/


function generateSubmitButton(activity){

  var source = "<button type='button' class='btn btn-primary submit_button activity_buttons disabled' data-next='{{submit}}' data-activity_id='{{id}}' data-button_id='submit'>Submit</button>";

  var template = Handlebars.compile(source);

  var result = template(activity);

  return result;
}

function generateFeedbackButton(activity){


  var source = "<button type='button' class='btn btn-default feedback_button activity_buttons modalButton' data-modal='feedback' data-activity_id='{{id}}' data-button_id='feedback' hidden>Show Feedback</button>";

  var template = Handlebars.compile(source);

  var result = template(activity);

  return result;

}

function generateSaveButton(activity){

  var source = "<button type='button' class='btn btn-default save_button activity_buttons' data-activity_id='{{id}}' data-button_id='save'>Save</button>";

  var template = Handlebars.compile(source);

  var result = template(activity);

  return result;

}

function generateResetButton(activity){

  var source = "<button type='button' class='btn btn-default reset_button activity_buttons disabled' data-activity_id='{{id}}' data-button_id='reset'>Reset</button>";

  var template = Handlebars.compile(source);

  var result = template(activity);

  return result;

}

function generatePrevButton(activity){

  var source = "<button type='button' class='btn btn-info prev_button activity_buttons' data-activity_id='{{id}}' data-button_id='prev' data-prev_page='{{prev}}'>Previous</button>";

  var template = Handlebars.compile(source);

  var result = template(activity);

  return result;
}

function generateNextButton(activity){

  var source = "<button type='button' class='btn btn-info next_button activity_buttons' data-activity_id='{{id}}' data-button_id='next' data-next_page='{{next}}'>Next</button>";

  var template = Handlebars.compile(source);

  var result = template(activity);

  //console.log('result', result);



  var next_button = $(result);

  interaction.configNextButton(activity, next_button);
  return next_button;
}

/*
function configNextButton(activity, next_button) {

  var next_a = $(".page_select[data-page='"+activity.next+"']");

  if(next_a.hasClass('disabled')) {
    next_button.addClass('disabled');
  }
  else {
    next_button.removeClass('disabled');
  }

  //return next_button;
}
*/

function generateAttemptsFeedback(activity){

  var source = "<span class='attempts_feedback' data-activity_id='{{id}}' data-button_id='reset'></span>";

  var template = Handlebars.compile(source);

  var result = template(activity);

  return result;

}