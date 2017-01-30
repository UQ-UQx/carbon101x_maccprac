var maccprojectActivity = require('./maccproject/maccproject_activity.js');
var maccprojectInterpretation = require('./maccproject/maccinterpretation_activity.js');

var Handlebars = require('handlebars');

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

   // // //console.log("V1", v1, " - ", "V2", v2);

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

    Handlebars.registerHelper('pretify', function(key, val, activity_id, options) {

        console.log((typeof(val) == 'object'), "key",key,"val",val, activity_id);

        var possible = "";
        var attempt = "";



        if((typeof(val) == 'object')){
          if(val.possible){
            possible = " / "+val.possible
          }
          val = val.val;
        }

        function isFloat(n) {
            return n === +n && n !== (n|0);
        }


        if(key == "leaderboard"){
          if(isFloat(val)){
            return val.toFixed(2)+possible;
          }else{
            return val+possible;
          }
        }

        if(key == "edx"){

          if(isFloat(val)){
            return (val*100).toFixed(2) + "%";
          }else{
            return (val*100) + "%";
          }

        }


       // return (val*100).toFixed(2) + "%";

    });

    Handlebars.registerHelper('getCurrentAttempts', function(key, activity_id, options) {

		var company_id = state.getSelectedCompany();

		if(key == "edx" && activity_id != "Total"){

			return "<span style='color:darkgrey; font-size:12px;'>Attempt "+state.getActivityAttemptsByID(company_id, activity_id)+"</span>";


        }

		return "";


    });

    Handlebars.registerHelper('titleify', function(val, options) {



        if(val == "leaderboard"){
            return "Leaderboard Points <br><span style='color:darkgrey; font-size:12px;'>1st attempt only</span>";
        }

        if(val == "edx"){
            return "edX Grade <br><span style='color:darkgrey; font-size:12px;'>Latest attempt (maximum 3 attempts each)</span>";
        }

       // var name = state.getActivityStateByCompanyAndActivityId

       // return (val*100).toFixed(2) + "%";

    });

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

module.exports = {

  init:function(company, data, callback){



      // console.log(company, data, callback);
       //

        getAnswers(company, data, function(updatedData){

            generateSummary(company,data, updatedData, callback);

        });


  }



}

function getAnswers(company, data, callback){


    var toProcess = _.keys(data).length;
    var activity_ids = _.keys(data);
    var newData = {};

    var interval = setInterval(function(){

        if(toProcess == 0){

            clearInterval(interval);
            callback(newData);

        }


    })

    // //console.log(data);

    $.each(data, function(activity_id, obj){


        var activityLastSubmittedStatus = state.getActivityStateByCompanyAndActivityId(company, activity_id, "lastSubmitted_status");
        var activityLastSubmitted = state.getActivityStateByCompanyAndActivityId(company, activity_id, "lastSubmitted");
        var activityLastSubmittedIncorrect = state.getActivityStateByCompanyAndActivityId(company, activity_id, "lastSubmitted_status.incorrect");
        var activityLeaderboardSubmittedStatus = state.getActivityStateByCompanyAndActivityId(company, activity_id, "leaderboardSubmitted_status");

        var activityContent = state.getActivityStateByCompanyAndActivityId(company, activity_id, "content");
        var activityCurrentAttempts = state.getActivityStateByCompanyAndActivityId(company, activity_id, "attempted");
        var activityCurrentScore = state.getActivityStateByCompanyAndActivityId(company, activity_id, "lastSubmitted_status.score");
        var activityPossibleScore = activityContent.score;
        var activityAttemptsLimit = activityContent.attempts;

        var content = {
            "activity":activityContent,
            "lastSubmittedStatus":activityLastSubmittedStatus,
            "lastSubmitted": activityLastSubmitted,
            "leaderboardSubmittedStatus": activityLeaderboardSubmittedStatus
       }

       // //console.log(activity)

       if((activityCurrentAttempts == activityAttemptsLimit) || (activityLastSubmittedIncorrect.length == 0)){



            var data = {'data':{}};
            data['function'] = "getAnswerKey";
            data['activity_id'] = activity_id;
            data['company'] = activityContent.company;


            $.ajax({
              type: "POST",
              url: "scripts/answerkey.php",
              data: data,
              success: function(response) {

                  content["answer"] = response;
                  toProcess --;
                  newData[activity_id] = content;

              },
              error: function(error){
                    // //console.log('red');
                  // //console.log(error);
              }
            });




       }else{


            newData[activity_id] = content;
            toProcess --;

       }
    });



}

function generateSummary(company,data, summary_data, callback){


  //console.log("red",summary_data, data);

 var summaryHTML = "" ;

 var test = {};

 var count = summary_data.length;

  $.each(summary_data, function(ind, obj){

    //content is the structure from tasbank.php or enerco.phpo
    //lastSubmittedStatus is the last state of the actvitiy when it was submitted
    //answer is only available when either the limits has reached max or when the answer is 100% correct;
    //


   // test[ind] = "";

    test[ind] = getGeneratedSummary(obj);


    //summaryHTML += getGeneratedSummary(obj);

  });


//this orders by order of keys in content file
    $.each(data, function(ind, obj){


      $.each(test, function(key, htmlstring){

          if(ind == key){

            summaryHTML += htmlstring;

          }

      });


    });



  var scoreSummaryHTML = generateScoringSummaryTable(company, data, summary_data);


  //  // //console.log("SUMMARY: ",summaryHTML);
  // Commented out for maccprac
  //  $(".summaries_container").html("<div style='text-align:center'>"+scoreSummaryHTML+"<br>Use the information below to compare your responses from your latest attempt of each activity with the correct answers.</div><br/>"+summaryHTML);

  $(".summaries_container").html("<div style='text-align:center'>"+scoreSummaryHTML+"</div>");

}

function generateScoringSummaryTable(company, data, summary_data){


  console.log("generate summary table", summary_data);

  var summary = {};

  var lTotal = 0;
  var eTotal = 0;
  var lTotalPossible = 0;
  var possibleScore = 0;

  $.each(data, function(ind, obj){

		  $.each(summary_data, function(activity_id, activitySummaryData){
			  console.log(ind, activitySummaryData.activity.id);
			  	if(ind == activitySummaryData.activity.id){
				    lTotal += activitySummaryData.leaderboardSubmittedStatus.points;
				    eTotal += activitySummaryData.lastSubmittedStatus.points;


				    lTotalPossible += activitySummaryData.leaderboardSubmittedStatus.possible_points;
				    //console.log(activitySummaryData.activity.score);
				    possibleScore += activitySummaryData.activity.score;

				    var ldata = {
				      "val":activitySummaryData.leaderboardSubmittedStatus.points,
				      "name":activitySummaryData.activity.name,
				      "possible":activitySummaryData.leaderboardSubmittedStatus.possible_points
				    };

				    var edata = {
				      "val":activitySummaryData.lastSubmittedStatus.score,
				      "name":activitySummaryData.activity.name
				    };

				    _.set(summary, "leaderboard."+activitySummaryData.activity.id, ldata);
				    _.set(summary, "edx."+activitySummaryData.activity.id, edata);

				}

		 });

    });


    var lTotalData = {
      "val":lTotal,
      "name":"Total",
      "possible":lTotalPossible
    };

    var eTotalData = {
      "val":(eTotal/lTotalPossible),
      "name":"Total"
    };

    _.set(summary, "leaderboard.Total", lTotalData);
    _.set(summary, "edx.Total", eTotalData);


  console.table(summary);


     var scoreSummaryTable =



      '<div class="scoreSummaryTableContainer">'+



          '<table class="scoreSummaryTable">'+

            '<thead>'+
              '<th colspan="1"></th>'+

              '{{#each edx}}'+
                '<th>{{name}}</th>'+
              '{{/each}}'+

            '</thead>'+

            '<tbody>'+

              '{{#each .}}'+

              '<tr>'+

                '<th>{{{titleify @key}}}</th>'+

                '{{#each .}}'+

                  '<td>{{{pretify @../key . @key}}}<br/>{{{getCurrentAttempts @../key @key}}}</td>'+

                '{{/each}}'+


              '</tr>'+

              '{{/each}}'+

            '</tbody>'+

          '</table>'+



      '</div>';




   var template = Handlebars.compile(scoreSummaryTable);

   var html = template(summary);


   return html;

}


function getGeneratedSummary(data){

        switch (data.activity.type) {
            case "multichoice":
                return generateMultiChoiceSummary(data);
                break;
            case "draganddrop":
                return generateDragAndDropSummary(data);
                break;
            case "scale":
                return generateScaleSummary(data);
                break;
            case "carbon_footprint_calculation":
                return generateCFCSummary(data);
                break;
            case "maccproject":
                return maccprojectActivity.generateSummary(data);
                break;
            case "maccinterpretation":
                return maccprojectInterpretation.generateSummary(data);
                break;
            default:
                break;
        }

}


function generateMultiChoiceSummary(data){


    Handlebars.registerHelper("showAnswer", function(user_selection, options) {
        var cross = '<i class="fa fa-times" style="color:red;" aria-hidden="true"></i>';
        var tick = '<i class="fa fa-check" style="color:green;" aria-hidden="true"></i>';
        var incorrect = false;

        if(data.answer){
          $.each(data.lastSubmittedStatus.incorrect, function(ind, obj){

              if(obj == user_selection){
                incorrect = true;
              }

          });

          if(incorrect){
            return cross;
          }else{
            return tick;

          }

        }
        return "";

    });

    var remainingAttemptsText = "Correct answer will be available once you have selected the correct answer or once you have reached your attempts limit";

    if((data.activity.attempts-state.getActivityAttempts(data.activity)) == 1){

        remainingAttemptsText += " ( "+(data.activity.attempts-state.getActivityAttempts(data.activity))+" attempt remaining )";

    }else{

        remainingAttemptsText += " ( "+(data.activity.attempts-state.getActivityAttempts(data.activity))+" attempts remaining )";

    }

    Handlebars.registerHelper("checkAnswer", function(key, options) {

      //  // //console.log(zoneID, allZonesData.answer);
       //
       if(key != "points"){
                return key;
       }

       return "";
    });

    var source = "<div class='multichoice_summary_container summary_container'>"+
                   '<div class="summary_activity_title">{{activity.name}}</div>'+

                    '<div class="row">'+

                        '<div class="statusContainer col-sm-6">'+
                            '<div class="statusContainerTitle col-sm-12">Your Response</div>'+

                                '<div class="col-sm-12">{{lastSubmitted}} {{{showAnswer lastSubmitted}}}</div>'+

                        '</div>'+


                        '<div class="statusContainer col-sm-6">'+
                            '<div class="statusContainerTitle col-sm-12">Correct Answer</div>'+

                            '{{#if answer}}'+

                                '{{#each answer}}'+


                                    '{{#ifCond @key "!=" "points"}}'+


                                        '<div class="col-sm-12">{{checkAnswer @key}}</div>'+


                                    '{{else}}'+


                                    '{{/ifCond}}'+


                                '{{/each}}'+


                            '{{else}}'+

                                remainingAttemptsText+


                            '{{/if}}'+


                        '</div>'+

                    '</div>'+
                 "</div>";

    var template = Handlebars.compile(source);

    var html = template(data);

    return html;
}


function generateDragAndDropSummary(data){
   // // //console.log(data);
   //


    Handlebars.registerHelper("showAnswer", function(user_source, options) {
        var cross = '<i class="fa fa-times" style="color:red;" aria-hidden="true"></i>';
        var tick = '<i class="fa fa-check" style="color:green;" aria-hidden="true"></i>';
        var incorrect = false;

        if(data.answer){
          $.each(data.lastSubmittedStatus.incorrect, function(ind, obj){

              if(obj == user_source){
                incorrect = true;
              }

          });

          if(incorrect){
            return cross;
          }else{
            return tick;

          }

        }
        return "";

    });


    Handlebars.registerHelper("zonedata", function(zoneID, allZonesData, options) {

       //console.log("da",zoneID, allZonesData.answer);
       //
       if(allZonesData.answer){

                return allZonesData.answer[zoneID];


       }

       return "";
    });

    var remainingAttemptsText = "Correct answer will be available once you have selected all the correct answers or once you have reached your attempts limit";

    if((data.activity.attempts-state.getActivityAttempts(data.activity)) == 1){

        remainingAttemptsText += " ( "+(data.activity.attempts-state.getActivityAttempts(data.activity))+" attempt remaining )";

    }else{

        remainingAttemptsText += " ( "+(data.activity.attempts-state.getActivityAttempts(data.activity))+" attempts remaining )";

    }

   // remainingAttemptsText += "<button class='goToActivityButton' data-activity_id='"+data.activity.id+"'>Go To Activity</button>";


    var source = "<div class='dragnanddrop_summary_container summary_container'>"+


                   '<div class="summary_activity_title">{{activity.name}}</div>'+

                   '<div class="row">'+

                        '<div class="statusContainer col-sm-6">'+
                            '<div class="statusContainerTitle col-sm-12">Your Response</div>'+

                            '{{#each activity.content.zones}}'+


                                '<div class="summary_zone_title col-sm-12">{{title}}</div>'+
                                '{{#each ../lastSubmitted}}'+

                                    '{{#ifCond ../id "==" selected_zone}}'+


                                        '<li class="zoneItem">{{option}}  {{{showAnswer option}}}</li>'+


                                    '{{else}}'+


                                    '{{/ifCond}}'+

                                '{{/each}}'+


                            '{{/each}}'+


                        '</div>'+


                        '<div class="statusContainer col-sm-6">'+
                            '<div class="statusContainerTitle col-sm-12">Correct Answer</div>'+
                            '{{#if answer}}'+

                                '{{#each activity.content.zones}}'+


                                    '<div class="summary_zone_title col-sm-12">{{title}}</div>'+


                                    '{{#each (zonedata id @../.)}}'+


                                            '<div class="zoneItem">{{ @key }}</div>'+


                                    '{{/each}}'+


                                '{{/each}}'+

                            '{{else}}'+

                                remainingAttemptsText+


                            '{{/if}}'+
                        '</div>'+

                    '</div>'+

                 "</div>";



    var template = Handlebars.compile(source);

    var html = template(data);

    return html;


}


function generateScaleSummary(data){

    //console.log("scale summary data", data);


    Handlebars.registerHelper("showAnswer", function(user_source_id, options) {
        var cross = '<i class="fa fa-times" style="color:red;" aria-hidden="true"></i>';
        var tick = '<i class="fa fa-check" style="color:green;" aria-hidden="true"></i>';
        var incorrect = false;
        if(data.answer){
          $.each(data.lastSubmittedStatus.incorrect, function(ind, obj){

              if(obj.source_id == user_source_id){
                incorrect = true;
              }

          });
          if(incorrect){
            return cross;
          }else{
            return tick;

          }

        }
        return "";
    });


    Handlebars.registerHelper("zonedata", function(zoneID, allZonesData, options) {

        //console.log("HPOLA", zoneID,allZonesData,  allZonesData.answer[zoneID]);

       var sources = [];

        if(allZonesData.answer){

            var zone = [];



            $.each(allZonesData.answer[zoneID], function(inde, source_id){

               _.filter(allZonesData.activity.content.options, function(source, ind){
                     //console.log(inde, source.title);
                    if(source.id == inde){

                        zone.push(source.title);
                    }

                });

             });

            allZonesData.answer[zoneID] =  zone;

        return allZonesData.answer[zoneID];

       }

       return "";



    });

    Handlebars.registerHelper("sourceName", function(source_id, options) {

       var name = "";

       $.each(data.activity.content.options, function(ind, source){

          if(source_id == source.id){

            name = source.title;
          }

       });

       return name;

    });



    var remainingAttemptsText = "Correct answer will be available once you have selected all the correct answers or once you have reached your attempts limit";

    if((data.activity.attempts-state.getActivityAttempts(data.activity)) == 1){

        remainingAttemptsText += " ( "+(data.activity.attempts-state.getActivityAttempts(data.activity))+" attempt remaining )";

    }else{

        remainingAttemptsText += " ( "+(data.activity.attempts-state.getActivityAttempts(data.activity))+" attempts remaining )";

    }



    var source = "<div class='scale_summary_container summary_container'>"+

                   '<div class="summary_activity_title">{{activity.name}}</div>'+

                   '<div class="row">'+

                        '<div class="statusContainer col-sm-6">'+
                            '<div class="statusContainerTitle col-sm-12">Your Response</div>'+

                            '{{#each activity.content.scale}}'+


                                '<div class="summary_zone_title col-sm-12">{{.}}</div>'+
                                '{{#each ../lastSubmitted}}'+

                                    '{{#ifCond ../. "==" scale}}'+


                                        '<li class="zoneItem">{{sourceName option_id}} {{{showAnswer option_id}}}</li>'+


                                    '{{else}}'+


                                    '{{/ifCond}}'+

                                '{{/each}}'+


                            '{{/each}}'+


                        '</div>'+


                        '<div class="statusContainer col-sm-6">'+
                            '<div class="statusContainerTitle col-sm-12">Correct Answer</div>'+

                            '{{#if answer}}'+


                                '{{#each activity.content.scale}}'+


                                    '<div class="summary_zone_title col-sm-12">{{.}}</div>'+


                                    '{{#each (zonedata . @../.)}}'+

                                        '<li class="zoneItem">{{.}}</li>'+

                                    '{{/each}}'+


                                '{{/each}}'+


                            '{{else}}'+

                                remainingAttemptsText+


                            '{{/if}}'+


                        '</div>'+

                    '</div>'+

                 "</div>";



    var template = Handlebars.compile(source);

    var html = template(data);

    return html;


}


function generateCFCSummary(data){


    var remainingAttemptsText = "Correct answer will be available once you have selected all the correct answers or once you have reached your attempts limit";

    if((data.activity.attempts-state.getActivityAttempts(data.activity)) == 1){

        remainingAttemptsText += " ( "+(data.activity.attempts-state.getActivityAttempts(data.activity))+" attempt remaining )";

    }else{

        remainingAttemptsText += " ( "+(data.activity.attempts-state.getActivityAttempts(data.activity))+" attempts remaining )";

    }

    var correcttco2e = [];

    if(data.answer){


      $.each(data.answer, function(source, source_vals){
        if(source != "points"){


          // //console.log(source);
          var total = 1;
          var ecf = 1;
          var amount = null;
          var co2 = null;
          var ch4 = null;
          var n2o = null;
          var ef = null;

          var aircon_leakage = 0.09;


          var sourceAmount = {};


          $.each(source_vals, function(type, val){

           // // //console.log(source, type, val);

            if(val){

              switch(type){

                case "ecf":

                  ecf = val;

                break;
                case "amount":

                  amount = val;
                break;
                case "ef":

                  ef += val;
                break;
                case "co2":

                  ef += val;
                break;
                case "ch4":

                  ef += val;
                break;
                case "n2o":

                  ef += val;
                break;
               default:
                break;


              }

            }

          //  // //console.log("ef", ef);


          });


          if(source == "air_conditioners"){

            total = amount * ef/1000;

          }else{

            total = amount * ef * ecf /1000;

          }


          sourceAmount["source_id"] = source;
          sourceAmount["total"] = total;

      // //console.log("blue",sourceAmount);

          correcttco2e.push(sourceAmount);
      }

      });




    }

   console.log("AnSWER",data,  data.answer, correcttco2e);

    var userResponseChart = generatePie(data.lastSubmittedStatus.tco2e, data);
  //  var userResponseBar = generateStackedBar(data.lastSubmittedStatus.tco2e, data);

    var correctResponseChart = generatePie(correcttco2e, data);
   // var correctResponseBar = generateStackedBar(correcttco2e, data);
    //var correctAnswerChart = generatePie(data);
    //

   // console.log("totals",data.lastSubmittedStatus.tco2e, correcttco2e);

    var totalcarbonUser = 0;
    $.each(data.lastSubmittedStatus.tco2e, function(ind, obj){

      totalcarbonUser += obj.total;

    });
    totalcarbonUser  =  totalcarbonUser.toFixed(2);

    var totalcarbonCorrect = 0;
    $.each(correcttco2e, function(ind, obj){

      totalcarbonCorrect += obj.total;

    });
    totalcarbonCorrect = totalcarbonCorrect.toFixed(2);



    var source = "<div class='cfc_summary_container summary_container'>"+


                   '<div class="summary_activity_title">{{activity.summary_name}}</div>'+

                   '<div class="row">'+

                        '<div class="statusContainer col-sm-6">'+
                            '<div class="statusContainerTitle col-sm-12">Your Response</div>'+

                            '<div class="userResponseChart">'+userResponseChart+'</div>'+

                            '<table class="table table-bordered cfEstimate"><tr><th>Total CF estimate (tCO<sub>2</sub>e)</th><td>' + numberWithCommas(totalcarbonUser) + ' </td></tr></table>' +


                        '</div>'+


                        '<div class="statusContainer col-sm-6">'+
                            '<div class="statusContainerTitle col-sm-12">Correct Answer</div>'+
                            '{{#if answer}}'+

                            '<div class="correctAnswerChart">'+correctResponseChart+'</div>'+

                            '<table class="table table-bordered cfEstimate"><tr><th>Total CF estimate (tCO<sub>2</sub>e)</th><td>' + numberWithCommas(totalcarbonCorrect) + ' </td></tr></table>' +

                            '{{else}}'+

                                remainingAttemptsText+


                            '{{/if}}'+
                        '</div>'+

                    '</div>'+


                 "</div>";

    var template = Handlebars.compile(source);

    var html = template(data);

    return html;



}

    var d3 = require('d3');


function generatePie(dataFromState, activityData){



    var data = {};
    data["data"] = dataFromState;

    // //console.log(activityData);
    if($(".temp")){
      $(".temp").remove();
    }
    $("body").append("<div class='temp' style='display:none'></div>");


    // //console.log();



    var width = 350,
    height = 350,
    radius = Math.min(width, height) / 2;

    var color = d3.scale.category10();


    var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.total; });

    var svg = d3.select(".temp").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


      var g = svg.selectAll(".arc")
          .data(pie(dataFromState))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.source_id); });

  var legend = svg.selectAll(".legend")
      .data(dataFromState)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 15 + ")"; });

  var legend_offset_x = 45;
  var legend_offset_y = 40;

  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("display", "none");

  // draw legend colored rectangles
  legend.append("rect")
      .attr("class", "legend_rect")
      .attr("x", 0-legend_offset_x)
       .attr("y", 0-legend_offset_y)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", function(d) { return color(d.source_id); });



  // draw legend text
  legend.append("text")
      .attr("x",  0-legend_offset_x+15)
      .attr("y",0-legend_offset_y+5)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .style("font-size", "10px")
      .text(function(d) {

        var source_name = d.source_id;

        $.each(activityData.activity.content.sources, function(ind, obj){
         //  //console.log(source_name, obj.source_id);
          if(source_name == obj.source_id){

            source_name = obj.source;
          }


        });


        return source_name;


      })


    function type(d) {
      d.total = +d.total;
      return d;
    }



    return $(".temp").html();

}


function generateStackedBar(data, activityData){

    var total = 0;

    $.each(data, function(ind, dat){

        total += dat.total;

    });


     var colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]

    Handlebars.registerHelper("getColor", function(colorIndex, options) {

        return colors[colorIndex];

    });

     Handlebars.registerHelper("getWidth", function(value, options) {

        return (value/total)*100;

    });


     var source = "<div class='cfc_summary_bar'>"+

                    "{{#each .}}"+


                      '<div class="source_bar {{source_id}}_bar" style="width:{{getWidth total}}%; height:100%; background-color:{{getColor @index}}"></div>'+



                    "{{/each}}"+



                 "</div>";

    var template = Handlebars.compile(source);

    var html = template(data);

    return html;



}
