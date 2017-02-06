module.exports = {

  calculateNPV: function(rate, yearcashflow, noyears, capitalcost){

    var npv_value = NPV(rate, yearcashflow, noyears, capitalcost);

    return npv_value;

  },
  numberWithCommas: function(x){

    var commaformatted_value = numberWithCommas(x);

    return commaformatted_value;

  },

  replaceAll: function(str, find, replace){

    var new_str = replaceAll(str, find, replace);

    return new_str;

  },

  calculateTotal_abatement: function(noyears, annual_abatement){

    var total_abatement_value = total_abatement(noyears, annual_abatement);

    return total_abatement_value;

  },

  calculateMarginal_abatement_cost: function(npv, total_abatement){

    var marginal_abatement_cost_value = marginal_abatement_cost(npv, total_abatement);

    return marginal_abatement_cost_value;

  },

  generate_maccsummarytable: function(company, state, projectid_array)
  {
    generate_maccsummarytable(company, state, projectid_array);
  },

  validate_maccproject: function(activity)
  {
    var error_obj = validate_maccproject(activity);
    return error_obj;
  },

  bind_formfields: function(company, state, activity)
  {
    bind_formfields(company, state, activity);

  },

  bind_formfields_interpretation: function(company, state, activity)
  {
    bind_formfields_interpretation(company, state, activity);

  },

  dynamic_formfields: function(activity, errors)
  {
    dynamic_formfields(activity, errors);
  },

  load_lastsubmittedstatus: function(activity, state)
  {
    load_lastsubmittedstatus(activity, state);
  },
  load_lastsubmittedstatus_forinterpretation: function(activity, state)
  {
    load_lastsubmittedstatus_forinterpretation(activity, state);
  },

  allProjectsCorrect: function(activity, state)
  {
    var obj = allProjectsCorrect(activity, state);
    return obj;
  },

  getMACCgraphdata: function(activity, state)
  {
    var obj = getMACCgraphdata(activity, state);
    return obj;
  }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function NPV(rate, yearcashflow, noyears, capitalcost) {

  var rate = parseFloat(rate);
  var yearcashflow = parseFloat(yearcashflow);
  var noyears = parseInt(noyears);
  var capitalcost = parseFloat(capitalcost);
  var npv = 0;
  // Initialize net present value
  var value = 0;

  // Loop on all values
  for (var j = 1; j < (noyears+1); j++) {
    value += yearcashflow / Math.pow(1 + rate, j);
  }

  // Return net present value
  npv = value - capitalcost;

  // Round to 2 decimal places
  npv = npv.toFixed(2);

  return npv
}

function total_abatement(noyears, annual_abatement) {

  var annual_abatement = parseFloat(annual_abatement);
  var noyears = parseInt(noyears);
  var total_abatement = 0;

  total_abatement = annual_abatement * noyears;

  // Round to 2 decimal places
  total_abatement = total_abatement.toFixed(2);

  return total_abatement
}

function marginal_abatement_cost(npv, total_abatement){

  var total_abatement = parseFloat(total_abatement);
  var npv = parseFloat(npv);

  var marginal_abatement_cost = 0;

  marginal_abatement_cost = (npv/total_abatement) * (-1);
  // Round to 2 decimal places
  marginal_abatement_cost = marginal_abatement_cost.toFixed(2);

  return marginal_abatement_cost

}

function validate_maccproject(activity)
{
  var activity_id = activity.id;

  var npv_interestrate = $('#macc_interestrate').val();
  var cashflow = $('#macc_cashflow').val();

  var npv_projectlifetime = $('#macc_projectlifetime').val();
  var npv_capitalcost = $('#macc_capitalcost').val();
  //var totalabatement_annualemmisions = $('#'+ activity.id + '_macc_totalabatement_annualemmisions').val();
  //var totalabatement_projectlifetime = $('#'+ activity.id + '_macc_totalabatement_projectlifetime').val();
  var abatementcost_npv  = $('#macc_abatementcost_npv').val();
  var abatementcost_totalabatement = $('#macc_totalabatement').val();
  var abatementcost_avoidedannualemissions = "";
  if (activity.content.enable_electricity_saving || activity.content.enable_diesal_saving){
    abatementcost_avoidedannualemissions = $('#macc_avoidedannualemisions').val();
  }

  npv_interestrate = replaceAll(npv_interestrate, ',', '');
  cashflow = replaceAll(cashflow, ',', '');
  npv_projectlifetime = replaceAll(npv_projectlifetime, ',', '');
  npv_capitalcost = replaceAll(npv_capitalcost, ',', '');
  abatementcost_npv = replaceAll(abatementcost_npv, ',', '');
  abatementcost_totalabatement = replaceAll(abatementcost_totalabatement, ',', '');
  abatementcost_avoidedannualemissions = replaceAll(abatementcost_avoidedannualemissions, ',', '');

  // setup validation feedback variables
  var marginalcost_feedback = "";
  var emmisionsabatement_feedback = "";
  var npv_feedback = "";

  // Hide Feedback
  $('#marginalcost_feedback').hide();
  //$('#emmisionsabatement_feedback').hide();
  $('#npv_feedback').hide();
  $('#marginalcost_feedback').html("");
  $('#emmisionsabatement_feedback').html("");
  $('#npv_feedback').html("");

  // Array with fields that have an error
  var error_fields = [];
  //var all_fields = ['#'+ activity.id + '_macc_npv_interestrate','#'+ activity.id + '_macc_cashflow','#'+ activity.id + '_macc_npv_projectlifetime','#'+ activity.id + '_macc_npv_capitalcost','#'+ activity.id + '_macc_totalabatement_annualemmisions','#'+ activity.id + '_macc_totalabatement_projectlifetime','#'+ activity.id + '_macc_abatementcost_npv','#'+ activity.id + '_macc_abatementcost_totalabatement'];
  var all_fields = ['#macc_interestrate','#macc_cashflow','#macc_projectlifetime','#macc_capitalcost', '#macc_npv','#macc_totalabatement', 'macc_avoidedannualemisions'];

  // Validation for values entered into the NPV equation
  if (!isNumeric(npv_interestrate) & (!isBlank(npv_interestrate)))
  {
    npv_feedback = npv_feedback + "<li>The interest rate must be a number.</li>";
    error_fields.push('#macc_interestrate');
  }

  // interest rate must be a float
  if (!isFloat(npv_interestrate) & (!isBlank(npv_interestrate)))
  {
    npv_feedback = npv_feedback + "<li>The interest rate must be a decimal value (e.g. for an interest rate of 10%, you would need to enter 0.10).</li>";
    error_fields.push('#macc_interestrate');
  }

  // cashflow must be a number
  if (!isNumeric(cashflow) & (!isBlank(cashflow)))
  {
    npv_feedback = npv_feedback + "<li>The cashflow must be a number.</li>";
    error_fields.push('#macc_cashflow');
  }

  // project lifetime must be a number between 1 and 7
  if (!isInt(npv_projectlifetime) & !isBlank(npv_projectlifetime))
  {
    npv_feedback = npv_feedback + "<li>The project lifetime must be an integer (whole number).</li>";
    error_fields.push('#macc_projectlifetime');
  }

  if (!isBetween(npv_projectlifetime,1,7) & !isBlank(npv_projectlifetime))
  {
    npv_feedback = npv_feedback + "<li>The project lifetime must be between 1 and 7 years.</li>";
    error_fields.push('#macc_projectlifetime');
  }

  // capital cost must be a number
  if (!isNumeric(npv_capitalcost) & (!isBlank(npv_capitalcost)))
  {
    npv_feedback = npv_feedback + "<li>The capital cost must be a number.</li>";
    error_fields.push('#macc_capitalcost');
  }

  // Validation for values entered into the Total Abatement equation
  /*
  // annualemmisions must be a number
  if (!isNumeric(totalabatement_annualemmisions) & (!isBlank(totalabatement_annualemmisions)))
  {
    emmisionsabatement_feedback = emmisionsabatement_feedback + "<li>The abatement annual emmisions must be a number.</li>";
    error_fields.push('#'+ activity.id + '_macc_totalabatement_annualemmisions');
  }


  if (!isInt(totalabatement_projectlifetime) & !isBlank(totalabatement_projectlifetime))
  {
    emmisionsabatement_feedback = emmisionsabatement_feedback + "<li>The project lifetime must be an integer (whole number).</li>";
    error_fields.push('#'+ activity.id + '_macc_totalabatement_projectlifetime');
  }

  if (!isBetween(totalabatement_projectlifetime,1,7) & !isBlank(totalabatement_projectlifetime))
  {
    emmisionsabatement_feedback = emmisionsabatement_feedback + "<li>The project lifetime must be between 1 and 7 years.</li>";
    error_fields.push('#'+ activity.id + '_macc_totalabatement_projectlifetime');
  }
  */
  // Validation for values entered into the Abatement Cost equation
  // npv must be a number
  if (!isNumeric(abatementcost_npv) & (!isBlank(abatementcost_npv)))
  {
    marginalcost_feedback = marginalcost_feedback + "<li>The NPV value must be a number.</li>";
    error_fields.push('#macc_abatementcost_npv');
  }

  if (activity.content.enable_electricity_saving || activity.content.enable_diesal_saving){
    // annual avoided emissions be a number
    if (!isNumeric(abatementcost_avoidedannualemissions) & (!isBlank(abatementcost_avoidedannualemissions)))
    {
      marginalcost_feedback = marginalcost_feedback + "<li>The total abatement value must be a number.</li>";
      error_fields.push('#macc_avoidedannualemisions');
    }
  }

  // total abatement must be a number
  if (!isNumeric(abatementcost_totalabatement) & (!isBlank(abatementcost_totalabatement)))
  {
    marginalcost_feedback = marginalcost_feedback + "<li>The total abatement value must be a number.</li>";
    error_fields.push('#macc_totalabatement');
  }

  var marginalcost_error = false;
  var emmisionsabatement_error = false;
  var npv_error = false;

  // Render Feedback
  if (marginalcost_feedback!="")
  {
    $('#marginalcost_feedback').html("<div class=\"alert alert-warning\"><strong>Validation Error: </strong><br/><ol>" + marginalcost_feedback + "</ol></div>");
    $('#marginalcost_feedback').show();
    marginalcost_error = true;
  }
  /*
  if (emmisionsabatement_feedback!="")
  {
    $('#emmisionsabatement_feedback').html("<div class=\"alert alert-warning\"><strong>Validation Error: </strong><br/><ol>" + emmisionsabatement_feedback + "</ol></div>");
    $('#emmisionsabatement_feedback').show();
    emmisionsabatement_error = true;
  }
  */

  if (npv_feedback!="")
  {
    $('#npv_feedback').html("<div class=\"alert alert-warning\"><strong>Validation Error: </strong><br/><ol>" + npv_feedback + "</ol></div>");
    $('#npv_feedback').show();
    npv_error = true;
  }

  apply_validationstyles(error_fields, all_fields);

  //return {'marginalcost_error':marginalcost_error, 'emmisionsabatement_error':emmisionsabatement_error, 'npv_error':npv_error};
  return {'marginalcost_error':marginalcost_error, 'npv_error':npv_error};

}

function isFloat(n){
  if (!isNaN(n) && n.toString().indexOf('.') != -1)
  {
    return true;
  }
  else {
    return false;
  }
}

function isBlank(n) {
  if (n=="")
  {
    return true;
  }
  else {
    return false;
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isInt(value) {
  if (isNaN(value)) {
    return false;
  }
  var x = parseFloat(value);
  return (x | 0) === x;
}

function isBetween(val,start_val, end_val) {
  if (val>=start_val & val<=end_val)
  {
    return true;
  }
  else {
    return false;
  }
}

function apply_validationstyles(error_fields, all_fields){

  // remove all the validation_error style from all fields

  all_fields.forEach(function(field) {
    $(field).removeClass("validation_error");
  });

  // apply the validation style to all error fields
  error_fields.forEach(function(field) {
    $(field).addClass("validation_error");
  });

}

function dynamic_formfields(activity, errors)
{

         var npv_interestrate = $('#macc_interestrate').val();
         var cashflow = $('#macc_cashflow').val();
         var npv_projectlifetime = $('#macc_projectlifetime').val();
         var npv_capitalcost = $('#macc_capitalcost').val();
         //var totalabatement_annualemmisions = $('#'+ activity.id + '_macc_totalabatement_annualemmisions').val();
         //var totalabatement_projectlifetime = $('#'+ activity.id + '_macc_totalabatement_projectlifetime').val();
         //var abatementcost_npv  = $('#macc_npv').val();
         var abatementcost_totalabatement = $('#macc_totalabatement').val();
         var npv_val = "";


         npv_interestrate = replaceAll(npv_interestrate,',','');
         cashflow = replaceAll(cashflow,',','');
         npv_projectlifetime = replaceAll(npv_projectlifetime,',','');
         npv_capitalcost = replaceAll(npv_capitalcost, ',','');
         //abatementcost_npv = replaceAll(abatementcost_npv, ',','');
         abatementcost_totalabatement = replaceAll(abatementcost_totalabatement,',','');
         //{'marginalcost_error':marginalcost_error, 'emmisionsabatement_error':emmisionsabatement_error, 'npv_error':npv_error}
         if (!errors.npv_error)
         {
           if (npv_interestrate != "" & cashflow != "" & npv_projectlifetime != "" & npv_capitalcost != "")
           {
             npv_val = NPV(npv_interestrate, cashflow, npv_projectlifetime, npv_capitalcost);
             var npv_val_formatted = numberWithCommas(npv_val);
             $('#macc_npv').val(npv_val_formatted);
             $('#macc_abatementcost_npv').val(npv_val_formatted);
           }
         }

         if (!errors.marginalcost_error)
         {
           if (npv_val != "" & abatementcost_totalabatement != "")
           {
             var cost_val = marginal_abatement_cost(npv_val, abatementcost_totalabatement);
             cost_val = numberWithCommas(cost_val);
             $('#macc_cost').val(cost_val);
           }
         }
}


function bind_formfields(company, state, activity)
{
  if (activity.id in state[company])
  {

    if ("lastSubmitted" in state[company][activity.id])
    {

      var macc_project_entered_vals = state[company][activity.id]['lastSubmitted'];
      for (j=0;j<macc_project_entered_vals.length;j++){

        var source_id = macc_project_entered_vals[j].source;
        var source_val = macc_project_entered_vals[j].value;
        source_val = numberWithCommas(source_val);

        // retrieve important entered values
        if (source_id.indexOf("macc_capitalcost")!=-1){
          $('#'+ source_id).val(source_val);
        }
        else if (source_id.indexOf("macc_cashflow")!=-1){
          $('#'+ source_id).val(source_val);
        }
        else if (source_id.indexOf("macc_projectlifetime")!=-1){
          $('#'+ source_id).val(source_val);
        }
        else if (source_id.indexOf("macc_interestrate")!=-1){
          $('#'+ source_id).val(source_val);
        }
        else if (source_id.indexOf("macc_npv")!=-1){
          $('#'+ source_id).val(source_val);
        }
        else if (source_id.indexOf("macc_totalabatement")!=-1){
          $('#'+ source_id).val(source_val);
        }
        else if (source_id.indexOf("macc_avoidedannualemisions")!=-1){
          $('#'+ source_id).val(source_val);
        }
/*
else if (source_id.indexOf("_macc_totalabatement_annualemmisions")!=-1){
  $('#'+ source_id).val(source_val);
}
else if (source_id.indexOf("_macc_totalabatement_projectlifetime")!=-1){
  $('#'+ source_id).val(source_val);
}
*/
      }
      }

  }

}

function bind_formfields_interpretation(company, state, activity)
{

  if (activity.id in state[company])
  {

    if ("lastSubmitted" in state[company][activity.id])
    {

      var macc_project_entered_vals = state[company][activity.id]['lastSubmitted'];
      for (j=0;j<macc_project_entered_vals.length;j++){

        var source_id = macc_project_entered_vals[j].source;
        var source_val = macc_project_entered_vals[j].value;

        if (source_id.indexOf("q1_macc")!=-1){
          $("input[name='q1_option'][value='" + source_val + "']").prop('checked', true);
        }
        else if (source_id.indexOf("q2_macc")!=-1){
          var checked_options = source_val.split(",");
          $.each(checked_options, function(i, val){

              $("input:checkbox[value='" + checked_options[i] + "']").prop('checked', true);

            });
        }

      }
      }

  }

}


function load_lastsubmittedstatus(activity, state)
{

  // reset status with tick or crosses

  $("[id$=_status]").html("");
  if (activity.id in state[activity.company])
  {
    if ('lastSubmitted_status' in state[activity.company][activity.id])
    {
      var lastSubmittedStatus = state[activity.company][activity.id]['lastSubmitted_status'];
      var interestrate_feedback = "";
      var npv_feedback = "";
      var total_abatement_feedback = "";
      var cost_feedback = "";
      var total_score = 0;
      var npv_points = 0;
      var cost_points = 0;

      var correctTick = '<i class="fa fa-check" style="color:green;" aria-hidden="true"></i>';
      var incorrectTick = '<i class="fa fa-times" style="color:red;" aria-hidden="true"></i>';

      $.each(lastSubmittedStatus["correct"], function(ind, val){

        source_id = val.source;
        points = val.points;
        total_score += parseInt(points);
        if (source_id.indexOf('_macc_npv') != -1)
        {
          npv_points += parseInt(points);
          $('#'+source_id+'_status').html(correctTick);
        }
        else if (source_id.indexOf('_macc_cashflow') != -1)
        {
          npv_points += parseInt(points);
          $('#'+source_id+'_status').html(correctTick);
        }
        else if (source_id.indexOf('_macc_npv_projectlifetime') != -1)
        {
          npv_points += parseInt(points);
          $('#'+source_id+'_status').html(correctTick);
        }
        else if (source_id.indexOf('_macc_npv_capitalcost') != -1)
        {
          npv_points += parseInt(points);
          $('#'+source_id+'_status').html(correctTick);
        }
        else if (source_id.indexOf('_macc_npv_interestrate') != -1)
        {
          npv_points += parseInt(points);
          $('#'+source_id+'_status').html(correctTick);
        }
        else if (source_id.indexOf('_macc_abatementcost_cost') != -1){
          cost_points += parseInt(points);
          $('#'+source_id+'_status').html(correctTick);

        }
        else if (source_id.indexOf('_macc_abatementcost_totalabatement') != -1){
          cost_points += parseInt(points);
          $('#'+source_id+'_status').html(correctTick);
        }
      });


      if (activity.npv_score == 0){
        points_str = " Points: Ungraded";
      }
      else {
        points_str = " Points: " + npv_points + "/" + activity.npv_score;
      }
      $('#npv_status').html(correctTick + points_str);

      if (activity.cost_score == 0){
        cost_points_str = " Points: Ungraded";
      }
      else{
        cost_points_str = " Points: " + cost_points + "/" + activity.cost_score;
      }

      $('#marginalcost_status').html(correctTick + cost_points_str);

      $.each(lastSubmittedStatus["incorrect"], function(ind, val){

        var source_id = val.source;
        var points = val.points;
        var feedback = val.feedback;


        //total_score += parseInt(points);
        if (source_id.indexOf('_macc_npv') != -1)
        {
          if (activity.npv_score==0){
            points_str = " Points: Ungraded";
          }
          else{
            points_str = " Points: " + points + "/" + activity.npv_score;
          }

          $('#npv_status').html(incorrectTick + " Points: " + npv_points);
        }
        else if (source_id.indexOf('_macc_abatementcost_cost') != -1){
          if (activity.cost_score==0){
            points_str = " Points: Ungraded";
          }
          else{
            points_str = " Points: " + points + "/" + activity.cost_score;
          }

          $('#marginalcost_status').html(incorrectTick + " Points: " + cost_points);
        }

        if (source_id.indexOf('_macc_npv_capitalcost') != -1)
        {
          if (feedback != "")
          {
            npv_feedback += "<li>" + feedback + "</li>";
          }
          $('#'+source_id+'_status').html(incorrectTick);
        }
        else if (source_id.indexOf('_macc_cashflow') != -1){
          if (feedback != "")
          {
            npv_feedback += "<li>" + feedback + "</li>";
          }
          $('#'+source_id+'_status').html(incorrectTick);
        }
        else if (source_id.indexOf('_macc_npv_projectlifetime') != -1){
          if (feedback != "")
          {
            npv_feedback += "<li>" + feedback + "</li>";
          }
          $('#'+source_id+'_status').html(incorrectTick);
        }
        else if (source_id.indexOf('_macc_npv') != -1){
          if (feedback != "")
          {
            npv_feedback += "<li>" + feedback + "</li>";
          }
          $('#'+source_id+'_status').html(incorrectTick);
        }
        else if (source_id.indexOf('_macc_npv_interestrate') != -1){
          if (feedback != "")
          {
            npv_feedback += "<li>" + feedback + "</li>";
          }
          $('#'+source_id+'_status').html(incorrectTick);
        }

        if (source_id.indexOf('_macc_abatementcost_cost') != -1){
          if (feedback != "")
          {
            cost_feedback += "<li>" + feedback + "</li>";
          }
        }
        else if (source_id.indexOf('_macc_abatementcost_totalabatement') != -1){
          if (feedback != "")
          {
            cost_feedback += "<li>" + feedback + "</li>";
          }
          $('#'+source_id+'_status').html(incorrectTick);
        }

      });

      // Render Feedback
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

      //Render global feedback
      var project_feedback = "";
      if (total_score==activity.score)
      {
        if (activity.score==0)
        {
          project_feedback = correctTick + '(Points: Ungraded)';
        }
        else {
          project_feedback = correctTick + ' Correct. (Points: ' + total_score +  '/' + activity.score + ')';
        }

        $('#project_feedback').html("<div class=\"alert alert-success\">" + project_feedback + "</div>");
      }
      else if (total_score>0)
      {
        project_feedback = incorrectTick + ' Partially Correct. (Points: ' + total_score +  '/' + activity.score + ')';
        $('#project_feedback').html("<div class=\"alert alert-danger\">" + project_feedback + "</div>");
      }
      else if (total_score==0)
      {
        project_feedback = incorrectTick + ' Incorrect. (Points: ' + total_score +  '/' + activity.score + ')';
        $('#project_feedback').html("<div class=\"alert alert-danger\">" + project_feedback + "</div>");
      }

      $('#project_feedback').show();
    }
  }
}

function load_lastsubmittedstatus_forinterpretation(activity, state)
{
  if (activity.id in state[activity.company])
  {
    if ('lastSubmitted_status' in state[activity.company][activity.id])
    {
      var lastSubmittedStatus = state[activity.company][activity.id]['lastSubmitted_status'];
      var q1_feedback = "";
      var q2_feedback = "";
      var q1_score = 0;
      var q2_score = 0;
      var total_score = 0;

      var correctTick = '<i class="fa fa-check" style="color:green;" aria-hidden="true"></i>';
      var incorrectTick = '<i class="fa fa-times" style="color:red;" aria-hidden="true"></i>';

      $.each(lastSubmittedStatus["correct"], function(ind, val){

        source_id = val.source;
        points = val.points;
        var feedback = val.feedback;
        total_score += parseInt(points);

        if (source_id.indexOf('q1') != -1)
        {
          q1_score += parseInt(points);
            if (feedback != "")
            {
              q1_feedback += "<li>" + feedback + "</li>";
            }
        }
        else if (source_id.indexOf('q2') != -1)
        {
          q2_score += parseInt(points);
          if (feedback != "")
          {
            q2_feedback += "<li>" + feedback + "</li>";
          }
        }
      });

      if (q1_score == 100){
        q1_str = correctTick +" Points: " + q1_score + "/100";
        //$('#q1_feedback').html(correctTick + points_str + q1_feedback);
      }

      if (q2_score == 100)
      {
        q2_str = correctTick + " Points: " + q2_score + "/100";
        //$('#q2_feedback').html(correctTick + cost_points_str + q2_feedback);
      }

      $.each(lastSubmittedStatus["incorrect"], function(ind, val){
        var source_id = val.source;
        var points = val.points;
        var feedback = val.feedback;

        total_score += parseInt(points);
        if (source_id.indexOf('q1') != -1)
        {
          q1_score += parseInt(points);
            if (feedback != "")
            {
              q1_feedback += "<li>" + feedback + "</li>";
            }
        }
        else if (source_id.indexOf('q2') != -1)
        {
          q2_score += parseInt(points);
          if (feedback != "")
          {
            q2_feedback += "<li>" + feedback + "</li>";
          }
        }
      });

      if (q1_score == 0){
        q1_str = incorrectTick + " Points: " + q1_score + "/100";
        //$('#q1_feedback').html(incorrectTick + points_str + q1_feedback);
      }

      if (q2_score == 0)
      {
        q2_str = incorrectTick +" Points: " + q2_score + "/100";
        //$('#q2_feedback').html(incorrectTick + cost_points_str + q2_feedback);
      }
      // Render Feedback
      if (q1_feedback!=""){
        q1_feedback ="<br/><div class=\"alert alert-warning\"><strong>Feedback: </strong><br/><ol>" + q1_feedback+ "</ol></div>"
      }
      if (q2_feedback!=""){
        q2_feedback = "<br/><div class=\"alert alert-warning\"><strong>Feedback: </strong><br/><ol>" + q2_feedback + "</ol></div>"
      }
        $('#q1_feedback').html(q1_str + q1_feedback);
        $('#q1_feedback').show();

        $('#q2_feedback').html(q2_str + q2_feedback);
        $('#q2_feedback').show();

    }
  }
}

function generate_maccsummarytable(company, state, projectid_array)
{
  for (i=0;i<projectid_array.length;i++){

    if (projectid_array[i] in state[company])
    {
      var capital_cost = 0;
      var cashflow = 0;
      var project_lifetime = 0;
      var rate = 0;
      var totalabatement_annualemmisions = 0;
      var npv = 0;
      var abatementcost_totalabatement = 0;
      var cost = 0;

      if ("selected" in state[company][projectid_array[i]])
      {
        var macc_project_entered_vals = state[company][projectid_array[i]]['selected'];
        for (j=0;j<macc_project_entered_vals.length;j++){
          var source_id = macc_project_entered_vals[j].source;
          var source_val = macc_project_entered_vals[j].value;

          // retrieve important entered values
          if (source_id.indexOf("macc_capitalcost")!=-1){
            capital_cost = source_val;
          }
          else if (source_id.indexOf("macc_cashflow")!=-1){
            cashflow = source_val;
          }
          else if (source_id.indexOf("macc_projectlifetime")!=-1){
            project_lifetime = source_val;
          }
          else if (source_id.indexOf("macc_interestrate")!=-1){
            rate = source_val;
          }
          else if (source_id.indexOf("macc_totalabatement")!=-1){
            abatementcost_totalabatement = source_val;
          }
          else if (source_id.indexOf("macc_npv")!=-1){
            npv = source_val;
          }
          else if (source_id.indexOf("macc_cost")!=-1){
            cost = source_val;
          }

        }
        if (capital_cost != ""){
          var formatted_capcost = "$" + numberWithCommas(capital_cost);
          $('#'+ projectid_array[i] + '_macc_capital_cost_tbl').html(formatted_capcost);
        }

        if (project_lifetime != ""){
          $('#'+ projectid_array[i] + '_macc_projectlifetime_tbl').html(project_lifetime);
        }


        if (cashflow != ""){
            $('#'+ projectid_array[i] + '_macc_netannualcashflow_tbl' ).html("$" + numberWithCommas(cashflow));
        }


        // Set the Capital Cost
        $('#'+ projectid_array[i] + '_macc_capital_cost').html(capital_cost);
        // Set NPV from calculation
        //if ((project_lifetime != "") & (cashflow != "") & (rate != "") & (capital_cost != "")){
        //  abatementcost_npv = NPV(rate, cashflow, project_lifetime, capital_cost);
        if (npv != "")
        {
          $('#'+ projectid_array[i] + '_macc_npv_tbl').html(numberWithCommas(npv));
        }
        //}
        // Set Abatement Cost from calculation

        //if ((npv != "") & (abatementcost_totalabatement != "")){
          //var marginal_abatement_cost_val = marginal_abatement_cost(abatementcost_npv, abatementcost_totalabatement);
        if (cost != "")
        {
          $('#'+ projectid_array[i] + '_macc_cost').html(numberWithCommas(cost));
        }
        //}

        // Set Total Abatement  from calculation
        //if ((project_lifetime != "") & (totalabatement_annualemmisions != "")){
        if ((abatementcost_totalabatement != "")){
          //var total_abatement_val = total_abatement(project_lifetime, totalabatement_annualemmisions);
          $('#'+ projectid_array[i] + '_macc_totalabatement').html(numberWithCommas(abatementcost_totalabatement));
        }

      }
    }

  }

}

function allProjectsCorrect(activity, state){
  // todo find these values dynamically
  var enerco_activities = ['enerco_proj1', 'enerco_proj2', 'enerco_proj3', 'enerco_proj4'];
  var tasbank_activities = ['tasbank_proj1', 'tasbank_proj2', 'tasbank_proj3', 'tasbank_proj4'];
  var current_activities;

  if (activity.company == "enerco")
  {
    current_activities = enerco_activities;
  }
  else {
    current_activities = tasbank_activities;
  }

  var total_finalscore = 0;

  for (i=0; i<current_activities.length; i++)
  {
    var finalscore = state[activity.company][current_activities[i]].lastSubmitted_status.points;
    console.log(i, finalscore);
    total_finalscore += finalscore;
  }
  console.log("total_finalscore", total_finalscore);
  if (total_finalscore == 1800)
  {
    return true;
  }
  else {
    return false;
  }
}

function getMACCgraphdata(activity, state){
  // todo find these values dynamically
  var enerco_activities = ['enerco_proj1', 'enerco_proj2', 'enerco_proj3', 'enerco_proj4'];
  var tasbank_activities = ['tasbank_proj1', 'tasbank_proj2', 'tasbank_proj3', 'tasbank_proj4'];
  var current_activities;

  var enerco_projnames = ['Steam turbine retrofit', 'Electricity network upgrade', 'Lighting retrofit', 'Truck driver education'];
  var tasbank_projnames = ['Lighting retrofit', 'HVAC upgrade', 'Install solar PV system', 'Double-glazing'];
  var current_projnames;

  var selectedcolors = ["#3366cc", "#dc3912", "#ff9900", "#109618"];
  var unselectedcolors = ["#C7D5F2", "#F59A9A", "#FADCAF", "#8FCC92"];

  if (activity.company == "enerco")
  {
    current_activities = enerco_activities;
    current_projnames = enerco_projnames;
  }
  else {
    current_activities = tasbank_activities;
    current_projnames = tasbank_projnames;
  }

  var macc_data = [];
  for (i=0; i<current_activities.length; i++)
  {
    var lastSubmitted = state[activity.company][current_activities[i]]['lastSubmitted']
    var total_abatement = 0;
    var cost = 0;
    for (j=0;j<lastSubmitted.length;j++){
      var source_id = lastSubmitted[j].source;
      var val = lastSubmitted[j].value;
      if (source_id.indexOf("macc_totalabatement") != -1){
        total_abatement = val;
      }
      else if (source_id.indexOf("macc_cost") != -1){
        cost = val;
      }
    }
    if (total_abatement=""){
      total_abatement = 0;
    }
    if (cost=""){
      cost = 0;
    }
    var tmpobj = {id: i, 'project': current_projnames[i], 'cost': parseFloat(cost), 'tonnes': parseFloat(total_abatement), 'selectedcolour': selectedcolors[i], 'unselectedcolour': unselectedcolors[i]};
    macc_data.push(tmpobj);
  }
  return macc_data;
}
