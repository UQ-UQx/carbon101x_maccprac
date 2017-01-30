//var tasbank = $_TASBANK;
//var enerco = $_ENERCO;
var Handlebars = require('handlebars');
var interaction = require('./interaction.js');
var activityButtons = require('./activity_buttons.js');
var maccprojectActivity = require('./maccproject/maccproject_activity.js');
var maccprojectAnalysis = require('./maccproject/maccanalysis_activity.js');
var maccprojectInterpretation = require('./maccproject/maccinterpretation_activity.js');


require("../../node_modules/jquery-ui-dist/jquery-ui.js");


module.exports = {
  init:function(){

    return "success";

  },
  generate:function(company, activity, callback){

    $(".page_activity").find("quiz_container").remove();

    var act_type = activity.type;
    activity["company"] = company;

    if( act_type == "multichoice"){

        generate_multichoice(activity);
    }else if( act_type == "checkbox"){

        generate_checkbox(activity);
    }else if(act_type == "scale"){

        generate_scale(activity);
    }else if(act_type == "carbon_footprint_calculation"){

        generate_footprint(activity);
    }else if(act_type == "draganddrop"){

        generate_draganddrop(activity);
    }
    else if(act_type == "maccproject"){

        maccprojectActivity.generate(activity);
    }
    else if(act_type == "maccanalysis"){

        maccprojectAnalysis.generate(activity);
    }else if(act_type == "maccinterpretation"){

        maccprojectInterpretation.generate(activity);
    }

    activityButtons.init(activity);
    state.updateState(activity);

    callback();

  }

}


/**
 *
 *  ACTIVITY GENERATORS
 *
 */


function generate_multichoice(activity){


    ////console.log(activity.id, activity.type, activity.content.question, activity.content.options);
    //


    var source = "<div class='quiz_container'>"+
           //'<div class="activity_title">{{name}}</div>'+
                    '<div class="points_available_container"></div>'+

                   '<div class="quiz_question_container"></div>'+
                    '{{#content.options}}'+
                    '<div class="input_container"><label class="input_container_label" data-label_val="{{.}}">'+
                    '<input class="activity_input" type="radio" name="{{../id}}_option" value="{{.}}" > {{.}} <span class="status"></span></br></br>'+
                    '</label></div>'+
                    '{{/content.options}}'+
                    '<div class="quiz_status">quiz_status</div>'+
                    "</div>";

    var template = Handlebars.compile(source);

    var result = template(activity);

    state.setCompletionState(activity, 1);


    $(".page_activity").html(result);


    var questionText = activity.content.question;

    //console.log(questionText)

    var questionHTML = "<b>"+questionText+"</b>";
   $(".quiz_question_container").html(questionHTML);


    var activity_state = state.getActivityState(activity, "selected");

    if(activity_state){


      $("input[name='"+activity.id+"_option']").prop("checked", false);
      $("input[value='"+activity_state+"']").prop("checked", true);

    }

    interaction.watch(activity);
    state.updateActivityViewBasedOnLastSubmitted(activity);


}



function generate_checkbox(activity){

    ////console.log(activity.id, activity.type, activity.content.question, activity.content.options);



    var source = "<div class='quiz_container'>"+
           //'<div class="activity_title">{{name}}</div>'+
                    '<div class="points_available_container"></div>'+

                    '<div class="quiz_question_container"></div>'+
                    '{{#content.options}}'+
                    '<input type="checkbox" name="{{../id}}_option" value="{{.}}"> {{.}}<span class="status"></span></br></br>'+
                    '{{/content.options}}'+
                    '<div class="quiz_status">quiz_status</div>'+
                 "</div>";

    var template = Handlebars.compile(source);

    var result = template(activity);

    state.setCompletionState(activity, 1);


     $(".page_activity").html(result);

     var questionText = activity.content.question;

     //console.log(questionText)

     var questionHTML = $.parseHTML("<b>"+questionText+"</b>");

     $(".quiz_question_container").html(questionHTML);

     var activity_state = state.getActivityState(activity, "selected");


      if(activity_state){


        $("input[name='"+activity.id+"_option']").prop("checked", false);


        $.each(activity_state, function(ind, obj){


          $("input[value='"+obj+"']").prop("checked", true);


        });
      }

    interaction.watch(activity);
    state.updateActivityViewBasedOnLastSubmitted(activity);

}

function generate_draganddrop(activity){

    ////console.log(activity.id, activity.type, activity.content.question, activity.content.options);


    // var source = "<div class='quiz_container'>"+
    //                 '<div class="quiz_question_container"></div>'+
    //                 '{{#content.options}}'+
    //                 '<input type="checkbox" name="{{../id}}_option" value="{{.}}"> {{.}}</br></br>'+
    //                 '{{/content.options}}'+
    //              "</div>";



     var source =

     '<div class="quiz_container">'+
                         '<div class="points_available_container"></div>'+

       //'<div class="activity_title">{{name}}</div>'+
      '<div class="quiz_question_container"></div>'+

        '<div class="droppable_zones_container">'+
        '{{#content.zones}}'+
          '<div class="droppable_zone droppable" data-zone_id="{{id}}"><div class="droppable_title">{{title}}</div></div>'+
        '{{/content.zones}}'+
        '</div>'+
        '<div class="draggable_container droppable" id="return">'+
        '{{#content.options}}'+
          '<div class="draggable_object draggable" data-selected="false" data-selected_zone="" data-option_id="draggable_option_{{@index}}" data-option="{{.}}">{{.}} <span class="status"></span></div>'+
        '{{/content.options}}'+
        '</div>'+
        '<div class="quiz_status">quiz_status</div>'+

    '</div>'



    var template = Handlebars.compile(source);

    var result = template(activity);

    state.setCompletionState(activity, activity.content.options.length);


    $(".page_activity").html(result);

    var questionText = activity.content.question;

    //console.log(questionText)

    var questionHTML = $.parseHTML("<b>"+questionText+"</b>");

    $(".quiz_question_container").html(questionHTML);

   // $(".draggable_object").attr("data-left", 0).attr("data-top", 0);



    var activity_state = state.getActivityState(activity, "selected");

    //console.log("qreqwrqwer",activity_state);

    if(activity_state){


      $(".draggable[data-selected='true']").attr("data-selected", false);
      $(".draggable[data-selected='true']").attr("data-selected_zone", "");


      $.each(activity_state, function(ind, obj){



        $(".draggable[data-option='"+obj.option+"']").attr("data-selected", true);
        $(".draggable[data-option='"+obj.option+"']").attr("data-selected_zone", obj.selected_zone);
        $(".draggable[data-option='"+obj.option+"']").css({"left":obj.position.left, "top":obj.position.top});


      });
    }

    interaction.watch(activity);
    state.updateActivityViewBasedOnLastSubmitted(activity);

}

function generate_scale(activity){

    ////console.log(activity.id, activity.type, activity.content.question, activity.content.options, activity.content.scale);

    Handlebars.registerHelper("position", function(index_num) {
      return index_num+1;
    });

    Handlebars.registerHelper("buttonClass", function(index_num) {


        switch (index_num+1) {
        case 1:
            return "scope1-text-color";
            break;
        case 2:
            return "scope2-text-color";
            break;
        case 3:
            return "scope3-text-color";
            break;
        default:
            break;
        }
    });

    Handlebars.registerHelper("buttonSmile", function(index_num) {
        switch (index_num+1) {
        case 1:
            return "";
            break;
        case 2:
            return "";
            break;
        case 3:
            return "";
            break;
        default:
            break;
        }
    });

    var source = "<div class='quiz_container'>"+
           //'<div class="activity_title">{{name}}</div>'+
                    '<div class="points_available_container"></div>'+

                    '<div class="quiz_question_container"></div>'+

                    '<div class="container-fluid">'+

                        '{{#content.options}}'+
                        '<div class="col-md-3 col-xs-4 option_container">'+

                            '<img class="scale_icons" src="{{img_src}}" alt="{{title}} icon">'+
                            '</br></br>{{title}}</br>'+

                            '<div class="btn-group-vertical scope_button_group" data-source_id="{{id}}" data-source="{{title}}" data-toggle="buttons">'+

                                '{{#../content.scale}}'+

                                    '<label class="btn btn-default" data-source_id="{{id}}">'+
                                        '<span class="{{buttonClass @index}}">{{buttonSmile @index}}</span> &nbsp;&nbsp;&nbsp;'+
                                        '<input type="radio" data-option_id="{{../id}}" data-scale="{{.}}" name="{{../title}}" id="source_{{position @../index}}_option_{{position @index}}" data-option="option_{{position @index}}" class="{{../../id}}_scale_buttons" autocomplete="off">{{.}}'+
                                    '</label>'+


                                '{{/../content.scale}}'+

                            '<span class="status"></span></div></br>'+ // button-group

                        '</br></br></div>'+ //option_container

                        '{{/content.options}}'+


                     '</div>'+ //fluid_container
                    '<div class="quiz_status">quiz_status</div>'+

                 "</div>"; //quiz_container




    var template = Handlebars.compile(source);

    var result = template(activity);


     state.setCompletionState(activity, activity.content.options.length);

     $(".page_activity").html(result);

     var questionText = activity.content.question;

     //console.log(questionText)

     var questionHTML = $.parseHTML("<b>"+questionText+"</b>");

     $(".quiz_question_container").html(questionHTML);


      var activity_state = state.getActivityState(activity, "selected");

      //console.log(activity_state);

      $("."+activity.id+"_scale_buttons").parent().removeClass("active");


      if(activity_state){

        $.each(activity_state, function(ind, obj){

            $("input[id='"+obj.id+"']").parent().removeClass("btn-default");

            $("input[id='"+obj.id+"']").parent().addClass("btn-primary");

            $("input[id='"+obj.id+"']").parent().addClass("active");

        });

      }



     interaction.watch(activity);
    state.updateActivityViewBasedOnLastSubmitted(activity);





}

function generate_footprint(activity){

    ////console.log(activity.id, activity.type, activity.content);

    Handlebars.registerHelper('ifObject', function(elem, options) {
        if($.type(elem) == "object") {
            return options.fn(this);;
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('ifMatches', function(elem,match, options) {
        if(elem == match) {
            return options.fn(this);;
        }
        return options.inverse(this);
    });

    var amounts = [];
    $.each(activity.content.sources, function(ind, obj){

        amounts.push(obj.amount);

    });

    var maxAmount = _.max(amounts);

    ////console.log("MAX", maxAmount);

    var source =
      '<div class="quiz_container">'+
                          '<div class="points_available_container"></div>'+

             //'<div class="activity_title">{{name}}</div>'+
                    '<div class="quiz_question_container"></div>'+

        '<table class="cf_table">'+
          '<tr>'+
            '<th class="td_headings" colspan="9"><h4>'+_.capitalize(activity.company)+' Carbon Footprint Calculation</h4></th>'+
          '</tr>'+
          '<tr>'+
          '{{#content.headers}}'+

                '{{#ifMatches header_id "ef"}}'+
                    '<td class="td_headings" colspan="3">{{header_content}}</td>'+
                '{{else}}'+
                    '{{#ifMatches header_id "tco2e"}}'+
                        '<td class="td_headings" rowspan="2">tCO<sub>2</sub>e</td>'+
                    '{{else}}'+
                        '<td class="td_headings" rowspan="2">{{header_content}}</td>'+
                    '{{/ifMatches}}'+
                '{{/ifMatches}}'+

          '{{/content.headers}}'+
          '</tr>'+
          '<tr>'+

            '<td class="td_headings">CO<sub>2</sub></td>'+
            '<td class="td_headings">CH<sub>4</sub></td>'+
            '<td class="td_headings">N<sub>2</sub>O</td>'+
          '</tr>'+
          '{{#content.sources}}'+
          '<tr class="source_row {{source_id}}">'+

              '<td class="content" data-type="source">{{source}}</td>'+
              '<td class="content" data-type="amount">'+

                    '<div class="amountInputContainer">'+

                          //'<input type="number" class="{{../id}}" data-source_id="{{source_id}}" name="amount" min="1" max="'+maxAmount+'" placeholder="Enter Amount">'+
                          '<input type="text" class="{{../id}}" data-source_id="{{source_id}}" name="amount" placeholder="Enter Amount">'+

                          '<span class="status"></span>'+
                    '</div>'+

              '</td>'+
              '<td class="content" data-type="unit">{{unit}}</td>'+

              '<td class="content" data-type="ecf">'+

                '{{#ifMatches ecf "N/A"}}'+

                'N/A'+

                '{{else}}'+

                '<select data-type="ecf" data-source_id="{{source_id}}" class="ecf_dropdown {{../id}}">'+
                  '<option value=""></option>'+
                  '{{#../content.ecf}}'+
                    '<option value="{{.}}">{{.}}</option>'+
                  '{{/../content.ecf}}'+
                '</select>'+

                '<span class="status"></span>'+

                '{{/ifMatches}}'+


              '</td>'+

              '{{#ifMatches ef "user"}}'+

                '<td class="content" data-type="ef" colspan="3">'+

                  '<select data-type="ef" data-source_id="{{source_id}}" class="ef_dropdown {{../id}}">'+
                    '<option value=""></option>'+
                    '{{#../content.ef}}'+
                      '<option value="{{.}}">{{.}}</option>'+
                    '{{/../content.ef}}'+
                  '</select>'+

                  '<span class="status"></span>'+


                '</td>'+

              '{{else}}'+


                '<td class="content" data-type="co2">'+

                '<select data-type="co2" data-source_id="{{source_id}}" class="ef_dropdown {{../id}}">'+
                  '<option value=""></option>'+
                  '{{#../content.co2}}'+
                    '<option value="{{.}}">{{.}}</option>'+
                  '{{/../content.co2}}'+
                '</select>'+

                  '<span class="status"></span>'+

                '</td>'+


                '<td class="content" data-type="ch4">'+

                '<select data-type="ch4" data-source_id="{{source_id}}" class="ef_dropdown {{../id}}">'+
                  '<option value=""></option>'+
                  '{{#../content.ch4}}'+
                    '<option value="{{.}}">{{.}}</option>'+
                  '{{/../content.ch4}}'+
                '</select>'+

                    '<span class="status"></span>'+

                '</td>'+


                '<td class="content" data-type="n2o">'+

                '<select data-type="n2o" data-source_id="{{source_id}}" class="ef_dropdown {{../id}}">'+
                  '<option value=""></option>'+
                  '{{#../content.n2o}}'+
                    '<option value="{{.}}">{{.}}</option>'+
                  '{{/../content.n2o}}'+
                '</select>'+

                    '<span class="status"></span>'+

                '</td>'+




              '{{/ifMatches}}'+

              '<td class="content" data-type="formula">'+
                '<div class="select_formula modalButtonContainer" data-activity_id="{{../id}}" data-source_id="{{source_id}}" data-type="formula" data-formula_id="{{formula}}" data-selected_formula="none">'+

                  '<div class="formula_name_container"></div>'+

                  '<span class="status"></span>'+


                  '<button type="button" class="btn btn-primary modalButton" data-modal="formula">'+
                      'Select <i class="fa fa-plus" aria-hidden="true"></i>'+
                  '</button>'+

                '</div>'+


              '</td>'+
              '<td class="content" data-type="tco2e"><span class="tco2e_container" data-source_id="{{source_id}}"></span></td>'+

          '</tr>'+
          '{{/content.sources}}'+
          '<tr>'+

            '<td colspan="7"></td>'+
            '<td class="td_headings" >Total</td>'+
            '<td class="content" colspan="7"><span class="totalco2"></span></td>'+

          '</tr>'+
        '</table>'+
        '<div class="quiz_status">quiz_status</div>'+

      "</div>"; //quiz_container


    var template = Handlebars.compile(source);

    //console.log(activity.company);

    if(activity.company == "enerco"){

      state.setCompletionState(activity, 27);

    }else{

      state.setCompletionState(activity, 23);

    }


    var result = template(activity);

    var parsedResult = $.parseHTML(result);

    ////console.log(result);
    $(".page_activity").html(parsedResult);

    var questionText = activity.content.question;

    ////console.log(questionText)

    var questionHTML = $.parseHTML("<b>"+questionText+"</b>");

    $(".quiz_question_container").html(questionHTML);

    var activity_state = state.getActivityState(activity, "selected");

    if(activity_state){

        var amounts = _.filter(activity_state, function(entry, key){
            return entry.type == "amount";
        });

        var ecfefs = _.filter(activity_state, function(entry, key){
            return (entry.type != "amount" && entry.type != "formula");
        });

        $.each(activity_state, function(ind, obj){


            if(obj.type == "amount"){
                $("input").each(function(ind, inp){

                    if(inp.dataset.source_id == obj.source){

                      $(inp).val(interaction.numberWithCommas(obj.value));
                    }

                });
            }

            if(obj.type == "formula"){
                $(".modalButtonContainer").each(function(ind, cont){

                    if(cont.dataset.source_id == obj.source){

                        var formula_name = "undefined";

                        $.each(activity.content.formulas, function(key, val){
                            if(obj.value == val.formula_id){
                              formula_name = val.formula_name;
                            }

                        });

                        $(cont).find(".formula_name_container").html(formula_name);
                        $(cont).attr("data-selected_formula_id", obj.value);
                        $(cont).attr("data-selected_formula", formula_name);
                        $(cont).find(".modalButton").html('<i class="fa fa-pencil" aria-hidden="true"></i> edit');
                        $(cont).find(".modalButton").removeClass('btn-primary').addClass('btn-info');

                    }

                });
            }

            if(obj.type == "ecf" || obj.type == "ef" || obj.type == "co2" || obj.type == "ch4" || obj.type == "n2o"){

                $("select[data-type='"+obj.type+"']").each(function(ind, sel){

                    if(sel.dataset.source_id == obj.source){

                        $(sel).find("option").each(function(ind, opt){

                            if($(opt).val() == obj.value){

                                $(opt).prop("selected", true);

                            }

                        });
                    }

                });

            }


        });




    }


   // $(".status").html("STATUS");



    interaction.watch(activity);
    state.updateActivityViewBasedOnLastSubmitted(activity);


}

// function activityButtons(activity, options){


//   //console.log("buttons",activity, options);

//     var submit = '<label class="btn btn-primary submitButton activityButton" value="Submit">Submit</label>';
//     var showFeedback  = '<label class="btn btn-default feedbackButton activityButton" value="Show Feedback">Show Feedback</label>';

//     return '<div class="activityButtons" data-activity_id="'+activity.id+'" >'+submit+showFeedback+'</div>';

// }
/** helpers docs */
