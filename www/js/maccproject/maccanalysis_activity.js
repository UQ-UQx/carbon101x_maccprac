var Handlebars = require('handlebars');

var MacCurve = require('./maccurve.js');

var financial_fns = require('./maccproject_calculations.js');

var MacCurve = require('./maccurve.js');

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
  }

}

var activity_MaccCurve;
var curr_activity;
var macc_data;

function CheckedView(activity){


}

function watch(activity){


}

function updateState(activity){
  state.setSelectedInState(activity, "Macc Graph");
}



function generate(activity){

    curr_activity = activity;
    var projects_array = activity.content.projects.split(',');
    var projectid_array = activity.content.projectids.split(',');

    var source = "";

    var allcorrect = financial_fns.allProjectsCorrect(activity, state.getState());

    if (!allcorrect){
      source += "<p>A marginal abatement cost curve (MACC) is an economic decision making tool designed to assist managers to identify, rank and prioritise the implementation of emissions abatement projects. Projects are ranked from lowest (most desirable) to highest cost per tonne of CO<sub>2</sub>e reduced.<p>";
      source += "<p>The MACC graph directly below has been generated from the financial and abatement analyses you undertook for four potential emissions abatement projects. The corrected MACC is included at the bottom of the page, to allow you to compare your results. Because you did not get all the project calculations correct, you will see some differences between the two graphs.<p>";
      source += "<p><strong>The incorrect MACC graph with cost and abatement values from your calculations:</strong><p>";
      source += "<div><svg class='incorrectchart'></svg><p></p></div>";
      source += "<p><strong>The correct MACC graph:</strong><p>";
    }
    else{
      source += "<p>A marginal abatement cost curve (MACC) is an economic decision making tool designed to assist managers to identify, rank and prioritise the implementation of emissions abatement projects. Projects are ranked from lowest (most desirable) to highest cost per tonne of CO<sub>2</sub>e reduced.<p>";
      source += "<p>The MACC graph directly below has been generated from the financial and abatement analyses you undertook for four potential emissions abatement projects.</p>";
    }

    source += "<div><svg class='chart'></svg><p></p></div>";

    source += '<div class="row"><div class="quiz_container">'+
              "</div></div>";

    $(".page_activity").html(source);


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

    var correct_MaccCurve = new MacCurve({
      "parent": ".chart",
      "showtitle": false,
      "showcarbonprice": false,
      "data"  : correct_data,
      "selectedcallback" : false,
      "name": "chart1"
    });

    correct_MaccCurve.chart();

    if (!allcorrect)
    {
        var incorrect_data;

        incorrect_data = financial_fns.getMACCgraphdata(activity, state.getState());

        var incorrect_MaccCurve = new MacCurve({
          "parent": ".incorrectchart",
          "showtitle": false,
          "showcarbonprice": false,
          "data"  : incorrect_data,
          "name": "chart2"
        });

        incorrect_MaccCurve.chart();
    }

    state.setCompletionState(activity, 1);
}
