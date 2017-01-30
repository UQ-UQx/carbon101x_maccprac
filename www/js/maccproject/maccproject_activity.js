var Handlebars = require('handlebars');

var MacCurve = require('./maccurve.js');

var financial_fns = require('./maccproject_calculations.js');

require('./simple-expand.min.js');

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

  var npv_fields = ["macc_interestrate", "macc_capitalcost", "macc_cashflow", "macc_npv", "macc_projectlifetime"];
  var cost_fields = ["macc_abatementcost_avoidedannualemisions", "macc_totalabatement", "macc_cost"];

  $.each(lastSubmittedStatus["correct"], function(ind, val){

    var source_id = val.source_id;
    $('#'+source_id+'_status').html(correctTick);

  });

  var npv_feedback = "";
  var cost_feedback = ""
  $.each(lastSubmittedStatus["incorrect"], function(ind, val){

    var source_id = val.source_id;
    var feedback = val.feedback;

    console.log(source_id, feedback);

    $('#'+source_id+'_status').html(incorrectTick);

    if (feedback != "")
    {
      if ($.inArray( source_id, npv_fields ) > -1)
      {
        npv_feedback += '<li>' + feedback + '</li>';
      }
      else{
        cost_feedback += '<li>' + feedback + '</li>';
      }
    }

  });

  // Render Feedback inline
  if (cost_feedback!="")
  {
    $('#marginalcost_feedback').html("<div class=\"alert alert-warning\"><strong>Feedback: </strong><br/><ol>" + cost_feedback + "</ol></div>");
    $('#marginalcost_feedback').show();
  }

  if (npv_feedback!="")
  {
    $('#npv_feedback').html("<div class=\"alert alert-warning\"><strong>Feedback: </strong><br/><ol>" + npv_feedback + "</ol></div>");
    $('#npv_feedback').show();
  }

  var grading_status_message = "";

  if (activity.points == 0)
  {
    // handle ungraded 1st project
    if (lastSubmittedStatus["incorrect"].length>0 & lastSubmittedStatus["correct"].length>0)
    {
      grading_status_message += incorrectTick + " Partially Correct";
    }
    else if (lastSubmittedStatus["incorrect"].length>0 & lastSubmittedStatus["correct"].length==0)
    {
      grading_status_message += incorrectTick + " Incorrect";
    }
    else{
      grading_status_message += correctTick + " Correct";
    }
  }
  else{
    if (lastSubmittedStatus['score']>0 & lastSubmittedStatus['score']<activity.points){

      grading_status_message += incorrectTick + " Partially Correct";
    }
    else if (lastSubmittedStatus['score']==activity.points)
    {
      grading_status_message += correctTick + " Correct";
    }
    else if (lastSubmittedStatus['score']==0){

      grading_status_message += incorrectTick + " Incorrect";
    }
  }

  // reset classes
  $(".quiz_status").removeClass("text-valid");
  $(".quiz_status").removeClass("correct_quiz_status");
  $(".quiz_status").removeClass("incorrect_quiz_status");

  if(lastSubmittedStatus["incorrect"].length > 0){

    $(".quiz_status").css("opacity",1);
    $(".quiz_status").css("color","red");
    $(".quiz_status").removeClass("text-valid");
    $(".quiz_status").removeClass("correct_quiz_status");
    $(".quiz_status").addClass("incorrect_quiz_status");
    $(".quiz_status").html(grading_status_message);

  }else{

    $(".quiz_status").css("opacity",1);
    $(".quiz_status").addClass("text-valid");
    $(".quiz_status").removeClass("incorrect_quiz_status");
    $(".quiz_status").addClass("correct_quiz_status");
    $(".quiz_status").html(grading_status_message);

  }

}

function watch(activity){

  $("input[id^='macc_']").keyup(function(event){
     //console.log("Macc input changed");

     // perform validation
     var errors = financial_fns.validate_maccproject(activity);
     // calculate and populate dynamic form fields
     financial_fns.dynamic_formfields(activity, errors);

     var projectid_array = activity.content.projectids.split(',');
     financial_fns.generate_maccsummarytable(activity.company, state.getState(), projectid_array);

     state.updateState(activity);
     //state.sendToServer(); // Don't send back after each keypress



  });

  $("input[id^='macc_']").change(function(event){
     //console.log("Macc input changed");

     // perform validation
     var errors = financial_fns.validate_maccproject(activity);
     // calculate and populate dynamic form fields
     financial_fns.dynamic_formfields(activity, errors);

     var projectid_array = activity.content.projectids.split(',');
     financial_fns.generate_maccsummarytable(activity.company, state.getState(), projectid_array);

     state.updateState(activity);
     //state.sendToServer(); // Don't send back after each keypress

  });

 $("input[id^='macc_']").focusout(function(e) {
   var entered_value = e.target.value;
   // remove any commas added by the user
   entered_value = financial_fns.replaceAll(entered_value,',','');
   entered_value = financial_fns.numberWithCommas(entered_value);
  $('#'+e.target.id).val(entered_value);
});

}

function updateState(activity){
  var selectedOptions = [];

  selectedOptions = $("input[id^='macc_']").map(function() {
    if ($(this).attr('id') != "macc_abatementcost_npv"){
      return {
          "source":$(this).attr('id'),
          "value":financial_fns.replaceAll($(this).val(),',','')
      }
    }
  }).get();

  state.setSelectedInState(activity, selectedOptions);

}



function generate(activity){

    curr_activity = activity;

    var projects_array = activity.content.projects.split(',');
    var projectid_array = activity.content.projectids.split(',');
    var current_project = activity.content.projectname;

    var npv_points = activity.npv_score;
    var cost_points = activity.cost_score;

    if (npv_points=="0"){
      npv_points = "Ungraded";
    }

    if (cost_points=="0"){
      cost_points = "Ungraded";
    }

    var container = '<div class="quiz_container">';
    var container_close = '</div>';

    var steps = '<div class="row">'+
                '<div class="col-sm-12">'+
                ' <div class="panel-group" id="accordion">'+
                '   <div class="panel panel-default">'+
                '     <div class="panel-heading">'+
                '      <h4 class="panel-title">' +
                '        <a data-toggle="collapse" data-parent="#accordion" href="#1a">'+
                '        Step 1: Net Present Value Analysis</a>'+
                '         <i class="indicator glyphicon glyphicon-chevron-down  pull-right"></i>'+
                '      </h4>'+
                '     </div>'+
                '     <div id="1a" class="panel-collapse collapse">'+
                '      <div class="panel-body">'+
                '        <p><i>Net Present Value (NPV)</i> is a mathematical formula for assessing the profitability of undertaking a given project. It gives the value of a project in today\'s dollars, based on how much money the project is going to save or generate in the future (less the initial upfront cost of the project)</p>'+
                '        <p><i>NPV</i> is expressed in dollars; so if the <i>NPV</i> for a particular project is found to be positive - that is, greater than zero - then the benefits of the project outweigh its cost. If, on the other hand, the <i>NPV</i> is negative then the project\'s costs are greater than its financial benefits.</p>'+
                '        <p>There are two ways to calculate <i>NPV</i>: manually, or in Microsoft Excel using the \'<i>NPV</i>\' formula. In this practical exercise, we will use a simplified Excel method (Excel is most commonly used in the real world due to its efficiency).</p>'+
                '      </div>'+
                '     </div>'+
                '   </div>' +
                '   <div class="panel panel-default">'+
                '     <div class="panel-heading">'+
                '      <h4 class="panel-title">' +
                '        <a data-toggle="collapse" data-parent="#accordion" href="#2a">'+
                '        Step 2: Marginal Abatement Cost Analysis</a>'+
                '        <i class="indicator glyphicon glyphicon-chevron-down  pull-right"></i>'+
                '      </h4>'+
                '     </div>'+
                '     <div id="2a" class="panel-collapse collapse">'+
                '       <div class="panel-body">'+
                '        <p>The formula for calculating Marginal Abatement Cost involves dividing the project\'s Net Present Value (<i>NPV</i>) by the total Total Emissions Abatement, then multiplying by -1. Note: multiplying by "-1" must be undertaken for the purpose of expressing a "negative cost" which is important when graphing the MACC.</p>'+
                '        <p>For example, consider a project with a NPV of -$100,000 and a total emissions abatement of 270tCO<sub>2</sub>e:</p>'+
                '        <table border="0">'+
                '        <tr><td>Marginal Abatement Cost</td><td> = NPV/Total Emissions Abatement x -1</td></tr>'+
                '        <tr><td></td><td> = -$100,000/270tCO<sub>2</sub>e * -1</td></tr>'+
                '        <tr><td></td><td> = $370.37/tCO<sub>2</sub>e</td></tr>'+
                '        </table>'+
                '        <p>Total Abatement is calculated by multipling the annual emissions reduction by the project lifetime.</p>'+
                '        <p>For some projects, you may need to first calculate the annual emissions reduction. This is calculated by multiplying the avoided energy (e.g. diesel or electricity) consumption by the appropriate emissions factor. Be careful with units, and remember that you may need to divide by 1,000 to convert kgCO<sub>2</sub>e to tCO<sub>2</sub>e.</p>'+
                '       </div>'+
                '     </div>' +
                '    </div>' +
                '  </div>' + // close column
                '</div>'; // close row

    steps +=        '<div class="row"><div class="col-sm-12"><div class="points_available_container"></div></div></div>'+
                    '<div class="row">'+
                    '<div class="col-sm-6">'+
                    //'<div id="npv_box" style="margin-top:20px;" class="mainbox col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2">'+
                    '            <div class="panel panel-info" >'+
                    '                    <div class="panel-heading">'+
                    '                        <div class="panel-title">Step 1: Calculate NPV</div>'+
                    '                        <div style="float:right; font-size: 80%; position: relative; top:-10px">Points: ' + npv_points + '</div>'+
                    '                    </div>   '+

                    '                    <div style="padding-top:10px" class="macc-panel-body" >'+
                    '        <h4>Input the appropriate values for each term in the simplified NPV formula below:</h4>'+
                    '                      <p>NPV = NPV(Interest Rate, Net Annual Cashflow, Project Lifetime) - Capital Cost</p>'+

                    '<form class="form-horizontal">'+
                    '  <div class="form-group">'+
                    '    <label class="control-label col-sm-5" for="macc_interestrate">Interest Rate</label>'+
                    '    <div class="col-sm-7"><input type=text" class="form-control" size="4" id="macc_interestrate" class="npv_input"><span id="macc_interestrate_status"></span></div>'+
                    '  </div>'+
                    '  <div class="form-group">'+
                    '    <label class="control-label col-sm-5" for="macc_cashflow">Net Annual Cashflow:</label>'+
                    '    <div class="col-sm-7"><input type=text" class="form-control" size="12" id="macc_cashflow" class="npv_input"><span id="macc_cashflow_status"></span>' +
                    '    <div class="helpcontainer"><a class="expander" href="#" data-expander-target="#net_annual_cashflow_help" >Determine Net Annual Cashflow</a><div class="field_help" id="net_annual_cashflow_help"><br/>Net Annual Cashflow is calculated by the project\'s financial benefit (e.g. cost savings) minus Operational Expenditure (or “OpEx”, e.g. maintenance costs).</div></div></div>' +
                    '  </div>'+
                    '  <div class="form-group">'+
                    '    <label class="control-label col-sm-5" for="macc_projectlifetime">Project Lifetime:</label>'+
                    '    <div class="col-sm-7"><input type=text" size="4" class="form-control" id="macc_projectlifetime" class="npv_input"><span id="macc_projectlifetime_status"></span>'+
                    '    <div class="helpcontainer"><a class="expander" href="#" data-expander-target="#project_lifetime_help" >Determine Project Lifetime</a><div class="field_help" id="project_lifetime_help"><br/>Duration of the project lifetime in years.</div></div></div>' +
                    '  </div>'+
                    '  <div class="form-group">'+
                    '    <label class="control-label col-sm-5" for="macc_capitalcost">Capital Cost:</label>'+
                    '    <div class="col-sm-7"><input type=text" size="12" class="form-control" id="macc_capitalcost" class="npv_input"><span id="macc_capitalcost_status"></span>'+
                    '    <div class="helpcontainer"><a class="expander" href="#" data-expander-target="#capital_cost_help" >Determine Capital Cost</a><div class="field_help" id="capital_cost_help"><br/>Determine the upfront investment required to implement the project.</div></div></div>' +
                    '  </div>'+
                    '  <div class="form-group">'+
                    '    <label class="control-label col-sm-5" for="macc_npv">NPV:</label>'+
                    '    <div class="col-sm-7"><input type=text" size="12" class="form-control" id="macc_npv" class="npv_input" disabled> <span id="macc_abatement_npv_status"></span></div>'+
                    '  </div>'+
                    '<p><div id="npv_feedback" class="feedback"></div></p>' +
                    '</form>'+

                    '                    </div>'+
                    '            </div>'+
                    //'</div>';
                    '</div>';

    steps +=        '<div class="col-sm-6">'+
                    //'<div id="cost_box" style="margin-top:20px;" class="mainbox col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2">'+
                    '            <div class="panel panel-info" >'+
                    '                    <div class="panel-heading">'+
                    '                        <div class="panel-title">Step 2: Calculate Marginal Abatement Cost</div>'+
                    '                        <div style="float:right; font-size: 80%; position: relative; top:-10px">Points:  ' + cost_points + '</div>'+
                    '                    </div>   '+

                    '                    <div style="padding-top:10px" class="macc-panel-body" >'+
                    '        <h4>Input the appropriate values for each term in the formula below:</h4>'+
                    '                      <p>Marginal Abatement Cost = NPV/Total Abatement * -1</p>'+
                    //'        <p>Total Emissions Abatement = Annual Emmisions Reduction * Project Lifetime</p>'+

                    '<form class="form-horizontal">'+
                    '  <div class="form-group">'+
                    '    <label class="control-label col-sm-5" for="macc_abatementcost_npv">NPV: </label>'+
                    '    <div class="col-sm-7"><input type=text" class="form-control" size="12" id="macc_abatementcost_npv" class="npv_input" disabled></div>'+
                    '  </div>';


        if(activity.content.enable_electricity_saving == true){
          steps +=  '  <div class="form-group">'+
                    '    <label class="control-label col-sm-5" for="macc_avoidedannualemisions">Avoided Annual Emissions (tCO<sub>2</sub>e):</label>'+
                    '    <div class="col-sm-7"><input type=text" class="form-control" size="12" id="macc_avoidedannualemisions" class="npv_input"><span id="macc_avoidedannualemisions_status"></span>'+
                    '    <div class="helpcontainer"><a class="expander" href="#" data-expander-target="#avoidedannualemissions_help" >Determine Avoided Annual Emissions</a><div class="field_help" id="avoidedannualemissions_help"><br/>Avoided annual emissions (tCO<sub>2</sub>e) = (Expected kWh savings * Emissions factor). Because the emissions factor is in the unit of kgCO<sub>2</sub>e/kWh, we need to then divide by 1,000 to convert our emissions estimate to tonnes.</div></div></div>' +
                    '  </div>';
        }
        if(activity.content.enable_diesal_saving == true){
          steps +=  '  <div class="form-group">'+
                    '    <label class="control-label col-sm-5" for="macc_avoidedannualemisions">Avoided Annual Emissions (tCO<sub>2</sub>e):</label>'+
                    '    <div class="col-sm-7"><input type=text" class="form-control" size="12" id="macc_avoidedannualemisions" class="npv_input"><span id="macc_avoidedannualemisions_status"></span>'+
                    '    <div class="helpcontainer"><a class="expander" href="#" data-expander-target="#avoidedannualemissions_help" >Determine Avoided Annual Emissions</a><div class="field_help" id="avoidedannualemissions_help"><br/>Avoided annual emissions (tC0<sub>2</sub>e) = (Expected diesel savings * emissions factor) / 1000</div></div></div>' +
                    '  </div>';
        }

          steps +=  '  <div class="form-group">'+
                    '    <label class="control-label col-sm-5" for="macc_totalabatement">Total Abatement (tCO<sub>2</sub>e):</label>'+
                    '    <div class="col-sm-7"><input type=text" class="form-control" size="12" id="macc_totalabatement" class="npv_input"><span id="macc_totalabatement_status"></span>'+
                    '    <div class="helpcontainer"><a class="expander" href="#" data-expander-target="#total_abatement_help" >Determine Total Abatement</a><div class="field_help" id="total_abatement_help"><br/>For example, a 5-year project that achieves an <i>annual</i> emissions reduction of 270tCO<sub>2</sub>e will have a <i>lifetime</i> emissions abatement of 1,350tCO<sub>2</sub>e i.e. 5 * 270 = 1,350.</div></div></div>' +
                    '  </div>'+
                    '  <div class="form-group">'+
                    '    <label class="control-label col-sm-5" for="macc_cost">Marginal Abatement Cost ($/tCO<sub>2</sub>e)</label>'+
                    '    <div class="col-sm-7"><input type=text" class="form-control" size="12" id="macc_cost" class="npv_input" disabled> <span id="macc_cost_status"></span></div>'+
                    '  </div>'+
                    '</form>'+
                    '<p><div id="marginalcost_feedback" class="feedback"></div></p>' +
                    '                    </div>'+
                    '            </div>'+
                    '</div>'+
                    //'</div>'+
                    //'      </div>'+
                    '</div>'+ // end column
                    '</div>'; // end row

    var project_tbl_open = '<div style="clear: both;"></div><div><p>The table below provides a summary of each project as you calculate the NPV and marginal abatement cost:</p>'+
                           '<table class="table table-bordered table_macc">'+
                           ' <thead>'+
                            '  <tr class="info">'+
                            '    <th>&nbsp;</th>'+
                            '    <th class="text-center">Project</th>'+
                            '    <th class="text-center">Net Annual Cashflow</th>'+
                            '    <th class="text-center">Project Lifetime</th>'+
                            '    <th class="text-center">Capital Cost</th>'+
                            '    <th class="text-center">NPV</th>'+
                            '    <th class="text-center">Total abatement (tCO<sub>2</sub>e)</th>'+
                            '    <th class="text-center">$/tCO<sub>2</sub>e</th>'+
                            '  </tr>'+
                            '</thead>'+
                            '<tbody>';

    var project_tbl_close = '</tbody></table></div>';
    var tbl = "";
    var no_projects = projects_array.length;
    var project_no = 1;
    for (var i = 0; i < no_projects; i++) {
      var disabled = "";
      if (projectid_array[i]!=activity.id)
      {
        disabled = ""; //"disabled";
      }
      tbl = tbl + '<tr>'+
        '<td>' + (i+1) + '</td>'+
        '<td>' + projects_array[i] +'</td>'+
        '<td class="macc_cell"><span id="' + projectid_array[i] + '_macc_netannualcashflow_tbl" ' + disabled + '></span></td>'+
        '<td class="macc_cell"><span id="' + projectid_array[i] + '_macc_projectlifetime_tbl" ' + disabled + '></span></td>'+
        '<td class="macc_cell"><span id="' + projectid_array[i] + '_macc_capital_cost_tbl" ' + disabled + '></span></td>'+
        '<td class="macc_cell"><span id="' + projectid_array[i] + '_macc_npv_tbl" ' + disabled + '></span></td>'+
        '<td class="macc_cell"><span id="' + projectid_array[i] + '_macc_totalabatement" ' + disabled + '></span></td>'+
        '<td class="macc_cell"><span id="' + projectid_array[i] + '_macc_cost" ' + disabled + '></span></td>';

        tbl = tbl +  '</tr>';
    }

    //var project_feedback = '<p><div id="project_feedback" class="projectfeedback"></div></p>';
    var project_feedback = '<p><div class="quiz_status">quiz_status</div></p>';

    $(".page_activity").html(container + steps + project_tbl_open + tbl + project_tbl_close + project_feedback + container_close);

    // Hide Feedback
    $('#marginalcost_feedback').hide();
    $('#emmisionsabatement_feedback').hide();
    $('#npv_feedback').hide();
    $('#project_feedback').hide();

    var no_inputvalues = 7;
    if(activity.content.enable_electricity_saving == true){
      no_inputvalues += 1;
    }
    if(activity.content.enable_diesal_saving == true){
      no_inputvalues += 1;
    }

    state.setCompletionState(activity, no_inputvalues);
    //interaction.watch(activity);

    watch(activity);

    var activity_state = state.getActivityState(activity, "selected");

    if(activity_state){
       // Update display summary table
       financial_fns.bind_formfields(activity.company, state.getState(), activity);
       var errors = financial_fns.validate_maccproject(activity);
       financial_fns.dynamic_formfields(activity, errors);
       financial_fns.generate_maccsummarytable(activity.company, state.getState(), projectid_array);
     }

   state.updateActivityViewBasedOnLastSubmitted(activity);

    //financial_fns.load_lastsubmittedstatus(activity, state.getState());

    $('.expander').simpleexpand();

    $('[data-toggle="tooltip"]').tooltip();

    $('#accordion').on('hidden.bs.collapse', toggleChevron);
    $('#accordion').on('shown.bs.collapse', toggleChevron);

}


function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}
