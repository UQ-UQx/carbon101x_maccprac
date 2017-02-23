var Handlebars = require('handlebars');

var MacCurve = require('./maccurve.js');

var financial_fns = require('./maccproject_calculations.js');

//var activityButtons = require('./activity_buttons.js');

module.exports = {

  generate:function(activity){

    generate(activity);

  },
  updateState:function(activity){

    updateState(activity);

  },
  watch:function(activity){

    watch(activity);

  },
  updateView:function(activity){

  },
  CheckedView:function(activity){
    CheckedView(activity);
  },
  generateSummary: function(data){
      var summary_info = generateSummary(data);
      return summary_info;
  }
}

var activity_MaccCurve;
var curr_activity;
var macc_data;

function generateSummary(data){

  html = "";
  return html;
}

function CheckedView(activity){

  var stateobj = state.getState();
  // todo - correctTick and incorrectTick duplicated in state_manager.js
  var correctTick = '<i class="fa fa-check" style="color:green;" aria-hidden="true"></i>';
  var incorrectTick = '<i class="fa fa-times" style="color:red;" aria-hidden="true"></i>';

  var lastSubmittedStatus = _.get(stateobj[activity.company][activity.id], "lastSubmitted_status");
  var lastSubmitted = _.get(stateobj[activity.company][activity.id], "lastSubmitted");

  $.each(lastSubmittedStatus["correct"], function(ind, val){

    var source_id = val.source_id;
    var status_id = "." + source_id + "_quiz_status";
    var grading_status_message = correctTick + " Correct";

    $(status_id).css("opacity",1);
    $(status_id).removeClass("text-valid");
    $(status_id).removeClass("incorrect_quiz_status");
    $(status_id).addClass("correct_quiz_status");
    $(status_id).html(grading_status_message);

  });

  $.each(lastSubmittedStatus["incorrect"], function(ind, val){

    var source_id = val.source_id;
    var status_id = "." + source_id + "_quiz_status";
    var grading_status_message = incorrectTick + " Incorrect";
    $(status_id).css("opacity",1);

    $(status_id).css("color","red");
    $(status_id).removeClass("correct_quiz_status");
    $(status_id).addClass("incorrect_quiz_status");
    $(status_id).html(grading_status_message);

  });

}

function watch(activity){

  $("input[name='q1_option']").change(function(event){
      state.updateState(activity);
      //state.sendToServer();
  });

  $("input[name='q2_option']").change(function(event){
      state.updateState(activity);
      //state.sendToServer();
  });

}

function updateState(activity){
  var q1_val = $('input[name=q1_option]:checked').val();
  var q2_vals = "";

  $('input[type=checkbox]').each(function () {
    q2_vals += (this.checked ? $(this).val() : "");
    q2_vals += ",";
  });

  if (q2_vals.charAt(q2_vals.length - 1) == ',') {
    q2_vals = q2_vals.substr(0, q2_vals.length - 1);
  }

selectedOptions = [
  {"source":"q1_macc","value":q1_val},
  {"source":"q2_macc","value":q2_vals},
  ]


  state.setSelectedInState(activity, selectedOptions);

  //setStatusIcon(activity, "attempted");
}



function generate(activity){
  var source = "";

  source += '<div class="row"><div class="points_available_container"></div><div class="quiz_question_container"></div></div>';
  source += '<div class="row">'; // row start
  source += '<h5>Q1. {{{content.question1}}}</h5>';
  source += '<div class="col-sm-8">'; // col start
  source += "<div><p><svg class='q1chart'></svg></p></div>";
  source += '</div>'; // col end
  // col start
  source += '<div class="col-sm-4"><br/><br/>';
  source += '{{#content.options}}';
  //source += '<div class="input_container">';
  source += '<input type="radio" name="q1_option" value="{{.}}" > {{.}} <span class="status"></span></br></br>';
  //source += '</div>';
  source += '{{/content.options}}';
  source += '</div>';// col end
  source += '</div>';// row end

  source += "<div class='row'>"+
            '<div class="q1_macc_quiz_status"></div>'+
            "</div>";

  source += '<div class="row">'; // row start
  source += '<h5>Q2. {{{content.question2}}}</h5>';
  source += '<div class="col-sm-8">'; // col start
  source += "<div><p><svg class='q2chart'></svg></p></div>";
  source += '</div>'; // col end
  // col start
  source += '<div class="col-sm-4"><br/><br/>';
  source += '{{#content.options}}';
  //source += '<div class="input_container">';
  source += '<input type="checkbox" name="q2_option" value="{{.}}"> {{.}}<span class="status"></span></br></br>';
  //source += '</div>';
  source += '{{/content.options}}';
  source += '</div>';// col end
  source += '</div>';// row end

  source += '<div class="row"><div class="quiz_container">'+
            '<div class="q2_macc_quiz_status"></div><br/>'+
            "</div></div>";

  var template = Handlebars.compile(source);

  var result = template(activity);

  state.setCompletionState(activity, 2);

  $(".page_activity").html(result);

  watch(activity);

      var correct_data;

      if (activity.company == "enerco")
      {
        correct_data = [
              {'id':1, 'project': 'Steam turbine retrofit', 'cost': 24.88, 'tonnes': 280000, 'selectedcolour': "#e6a62e", 'unselectedcolour': "#FFA600"},
              {'id':2, 'project': 'Electricity network upgrade', 'cost': -20.81, 'tonnes': 490000, 'selectedcolour': "#1e9884", 'unselectedcolour': "#00B295"},
              {'id':3, 'project': 'Lighting retrofit', 'cost': -121.29, 'tonnes': 26069, 'selectedcolour': "#ad214d", 'unselectedcolour': "#E8005D"},
              {'id':4, 'project': 'Truck driver education', 'cost': 46.19, 'tonnes': 29160, 'selectedcolour': "#42a2c5", 'unselectedcolour': "#76C3DE"}
            ]
/*
280,000 	 $ 24.88
490,000 	-$ 20.81
26,069 	-$ 121.29
29,160 	 $ 46.19 */
      }
      else {
        correct_data = [
              {'id':1, 'project': 'Lighting retrofit', 'cost': -35.29, 'tonnes': 50000, 'selectedcolour': "#e6a62e", 'unselectedcolour': "#FFA600"},
              {'id':2, 'project': 'HVAC upgrade', 'cost': -11.96, 'tonnes': 84000, 'selectedcolour': "#1e9884", 'unselectedcolour': "#00B295"},
              {'id':3, 'project': 'Install solar PV system', 'cost': 52.78, 'tonnes': 12976, 'selectedcolour': "#ad214d", 'unselectedcolour': "#E8005D"},
              {'id':4, 'project': 'Double-glazing', 'cost': 5.81, 'tonnes': 36496, 'selectedcolour': "#42a2c5", 'unselectedcolour': "#76C3DE"}
            ]
/*
50,000 	-$ 35.29
84,000 	-$ 11.96
12,976 	 $ 52.78
36,496 	 $ 5.81
*/
    }

      var chart = new MacCurve({
        "parent": ".q1chart",
        "showtitle": false,
        "showcarbonprice": false,
        "data"  : correct_data,
        "selectedcallback" : false,
        "name": "chart1"
      });

      chart.chart();

      var chart2 = new MacCurve({
        "parent": ".q2chart",
        "showtitle": false,
        "showcarbonprice": true,
        "carbonprice": activity.content.carbonprice,
        "data"  : correct_data,
        "selectedcallback" : false,
        "name": "chart2"
      });

      chart2.chart();

      //display previous feedback
      //financial_fns.load_lastsubmittedstatus_forinterpretation(activity, state.getState());
      state.updateActivityViewBasedOnLastSubmitted(activity);

      // bind data
      financial_fns.bind_formfields_interpretation(activity.company, state.getState(), activity);
}
