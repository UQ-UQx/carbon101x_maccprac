var Handlebars = require("handlebars");
var interaction = require("./interaction.js");

module.exports = {
  open:function(type, modalButtonContainer, activity){

    //console.log(type, modalButtonContainer, activity);
    switch (type) {
      case 'formula':

        formulaModal(modalButtonContainer, activity);


        break;
      case 'ecfef':

        ecfefModal(modalButtonContainer, activity);


        break;
       case 'feedback':

        feedbackModal(modalButtonContainer, activity);

        break;

       case 'more_info':

        moreinfoModal(modalButtonContainer, activity);

      default:
    }

    $(".modal-dialog").css({
        "position":"absolute",
        "top":$(modalButtonContainer).position().top+20,
        "left":(($(window).width()/2)-($(".modal-dialog").width()/2))
    });

  },
}


function formulaModal(modalButtonContainer, activity){

  //console.log(modalButtonContainer.data(), activity.content.formulas);

  initBase("formula", "formulaModal", function(){



    var source =
    '<p><b>Choose the correct formula for each emission source by selecting it from the list below.</b></p>' +

    '<div class="list-group">'+
        '{{#.}}'+
        ' <div class="list-group-item modal_formula_container" data-dismiss="modal" data-formula_id="{{formula_id}}" data-formula_name="{{formula_name}}">'+
            '<img src="assets/formulas/{{formula_img}}" alt="{{formula_id}} formula image" class="formulas">'+
        '</div>'+
        '{{/.}}';

    '</div>'




    var template = Handlebars.compile(source);

    var result = template(activity.content.formulas);


    $(".modal-body-content").html(result);

    $('.formulaModal').modal('toggle');

    interaction.watchModal("formula", modalButtonContainer, activity);



  });
}

function feedbackModal(modalButtonContainer, activity){

  //console.log(modalButtonContainer.data(), activity.content.formulas);

  initBase("feedback", "feedbackModal", function(){



    var source =
    // '{{#.}}'+
    // '<div class="modal_formula_container" data-formula_id="{{formula_id}}">'+
    // '<img src="assets/formulas/{{formula_img}}" alt="{{formula_id}} formula image" class="formulas">'+
    // '<div class="formula_status">selected</div>'+
    // '</div>'+
    // '{{/.}}';


    '<div class="modal_feedback_container">'+
        '{{#.}}'+
        '<div class="feedback_response_container {{type}}_answer_container"><h4>{{{answer}}}</h4>'+
        '{{{feedback.content}}}</div>'+
        '{{/.}}'+
    '</div>'

    var feedback = state.getActivityStateByCompanyAndActivityId(activity.company, activity.id, "lastSubmitted_status.feedback")
    //console.log(feedback);
    var template = Handlebars.compile(source);

    var result = template(feedback);

    $(".modal-body-content").html(result);

    $('.feedbackModal').modal('toggle');



  });
}


function moreinfoModal(modalButtonContainer, activity){

  //console.log(modalButtonContainer.data());

  initBase("more_info_"+modalButtonContainer.data("content"), "more_info_modal", function(){


    var consumption =


   ' <table>'+

        '{{#each more_info.consumption_data}}'+

        '<tr>'+

            '<td class="invoice">'+

                '<img src="assets/'+activity.company+'/{{img}}" style="width:200px;" alt="{{alt}}" class="sources_images {{id}}">'+

            '</td>'+
            '<td class="description">'+
                '{{description}}'+
            '</td>'+

        '</tr>'+

        '{{/each}}'+

    '</table>';

    var enerco_ef = '<table class="info_table">'+

   '<tr style="height:21px;">'+
        '<td class="s0" colspan="5">Liquid transport fuels</td>'+
    '</tr>'+
    '<tr style="height:23px;">'+
        '<td class="s1" rowspan="2">Fuel combusted</td>'+
        '<td class="s1" rowspan="2">Energy content factor (GJ/L)</td>'+
        '<td class="s1" colspan="3">Emissions Factor (kgCO<sub>2</sub>e/GJ)</td>'+
    '</tr>'+
    '<tr style="height:24px;">'+
        '<td class="s1">CO<sub>2</sub></td>'+
        '<td class="s1">CH<sub>4</sub></td>'+
        '<td class="s1">N<sub>2</sub>O</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Unleaded petroleum for use in aircraft</td>'+
        '<td class="s6">0.0331</td>'+
        '<td class="s6">67</td>'+
        '<td class="s6">0.05</td>'+
        '<td class="s7">0.7</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Ethanol for use in an internal combustion engine</td>'+
        '<td class="s6">0.0234</td>'+
        '<td class="s6">0</td>'+
        '<td class="s6">0.7</td>'+
        '<td class="s7">1.9</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Unleaded petroleum for use in motor vehicles</td>'+
        '<td class="s6">0.0342</td>'+
        '<td class="s6">67.4</td>'+
        '<td class="s6">0.02</td>'+
        '<td class="s7">0.2</td>'+
    '</tr>'+
    '<tr style="height:21px;">'+
        '<td class="s8">Diesel for use in motor vehicles</td>'+
        '<td class="s9">0.0386</td>'+
        '<td class="s9">69.9</td>'+
        '<td class="s9">0.01</td>'+
        '<td class="s10">0.5</td>'+
    '</tr></table>'+

    '<table  class="info_table">'+
    '<tr style="height:21px;">'+
        '<td class="s0" colspan="2">Electricity usage</td>'+
    '</tr>'+
    '<tr style="height:24px;">'+
        '<td class="s13">Country</td>'+
        '<td class="s1">Emission factor (kgCO<sub>2</sub>e/kWh)</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Cambodia</td>'+
        '<td class="s7">1.1708</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Canada</td>'+
        '<td class="s7">0.1798</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Europe</td>'+
        '<td class="s7">0.4538</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Mongolia</td>'+
        '<td class="s7">2.3109</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Mozambique</td>'+
        '<td class="s7">0.0004</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">New Zealand</td>'+
        '<td class="s7">0.1977</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Tasland</td>'+
        '<td class="s7">0.5793</td>'+
    '</tr>'+
    '<tr style="height:21px;">'+
        '<td class="s8">United States</td>'+
        '<td class="s10">0.5471</td>'+
    '</tr></table>'+


    '<table  class="info_table">'+
    '<tr style="height:21px;">'+
        '<td class="s0" colspan="2">Fugitive emissions from coal mining</td>'+
    '</tr>'+
    '<tr style="height:24px;">'+
        '<td class="s13">Activity</td>'+
        '<td class="s1">Emission factor (tCO<sub>2</sub>e/tonne raw coal)</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Underground mining</td>'+
        '<td class="s7">0.017</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Open cut mining</td>'+
        '<td class="s7">0.020</td>'+
    '</tr></table>'+


    '<table class="info_table">'+


                '<tr style="height:21px;">'+
                    '<td class="s0" colspan="2">Refrigerants</td>'+
                '</tr>'+
                '<tr style="height:24px;">'+
                    '<td class="s13">Gas type</td>'+
                    '<td class="s14">'+
                            'Emission factor (kgCO<sub>2</sub>e/kg)'+
                    '</td>'+
                '</tr>'+
                '<tr style="height:20px;">'+
                    '<td class="s5">CFC-11</td>'+
                    '<td class="s7">4,660</td>'+
                '</tr>'+
                '<tr style="height:20px;">'+
                    '<td class="s5">HCFC-122a</td>'+
                    '<td class="s7">945</td>'+
                '</tr>'+
                '<tr style="height:20px;">'+
                    '<td class="s5">HFC-125</td>'+
                    '<td class="s7">3,170</td>'+
                '</tr>'+
                '<tr style="height:20px;">'+
                    '<td class="s5">HFC134a</td>'+
                    '<td class="s7">1,300</td>'+
                '</tr>'+
                '<tr style="height:21px;">'+
                    '<td class="s8">HFC-143a</td>'+
                    '<td class="s10">4,800</td>'+
                '</tr></table>'+

    '<table class="info_table">'+

   '<tr style="height:21px;">'+
        '<td class="s0" colspan="5">Fuel combustion of solid fuel</td>'+
    '</tr>'+
    '<tr style="height:23px;">'+
        '<td class="s1" rowspan="2">Fuel combusted</td>'+
        '<td class="s1" rowspan="2">Energy content factor (GJ/L)</td>'+
        '<td class="s1" colspan="3">Emissions Factor (kgCO<sub>2</sub>e/GJ)</td>'+
    '</tr>'+
    '<tr style="height:24px;">'+
        '<td class="s1">CO<sub>2</sub></td>'+
        '<td class="s1">CH<sub>4</sub></td>'+
        '<td class="s1">N<sub>2</sub>O</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Bituminous coal</td>'+
        '<td class="s6">0.027</td>'+
        '<td class="s6">90.0</td>'+
        '<td class="s6">0.03</td>'+
        '<td class="s7">0.2</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Sub-bituminous coal</td>'+
        '<td class="s6">0.021</td>'+
        '<td class="s6">90.0</td>'+
        '<td class="s6">0.03</td>'+
        '<td class="s7">0.2</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Black coal</td>'+
        '<td class="s6">0.029</td>'+
        '<td class="s6">90.0</td>'+
        '<td class="s6">0.03</td>'+
        '<td class="s7">0.2</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Brown coal</td>'+
        '<td class="s6">0.010</td>'+
        '<td class="s6">93.5</td>'+
        '<td class="s6">0.02</td>'+
        '<td class="s7">0.4</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Coking coal</td>'+
        '<td class="s6">0.030</td>'+
        '<td class="s6">91.8</td>'+
        '<td class="s6">0.02</td>'+
        '<td class="s7">0.2</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Coal tar</td>'+
        '<td class="s6">0.038</td>'+
        '<td class="s6">81.8</td>'+
        '<td class="s6">0.03</td>'+
        '<td class="s7">0.2</td>'+
    '</tr></table>'+
    '<br/>'+
    '<b>NOTE:</b> The emission factors included above have been adapted from the Australian National Greenhouse Accounts (2015), and supplemented with other sources where necessary. When conducting a carbon footprint, it is essential to use the most relevant and up-to-date emissions factors. (In some countries, such as Australia and the United Kingdom, these may be issued by a government authority. The GHG Protocol provides general emissions factors where country-specific ones are not available.)'
;

    var tasbank_ef =


    '<table class="info_table">'+

   '<tr style="height:21px;">'+
        '<td class="s0" colspan="5">Liquid transport fuels</td>'+
    '</tr>'+
    '<tr style="height:23px;">'+
        '<td class="s1" rowspan="2">Fuel combusted</td>'+
        '<td class="s1" rowspan="2">Energy content factor (GJ/L)</td>'+
        '<td class="s1" colspan="3">Emissions Factor (kgCO<sub>2</sub>e/GJ)</td>'+
    '</tr>'+
    '<tr style="height:24px;">'+
        '<td class="s1">CO<sub>2</sub></td>'+
        '<td class="s1">CH<sub>4</sub></td>'+
        '<td class="s1">N<sub>2</sub>O</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Unleaded petroleum for use in aircraft</td>'+
        '<td class="s6">0.0331</td>'+
        '<td class="s6">67</td>'+
        '<td class="s6">0.05</td>'+
        '<td class="s7">0.7</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Ethanol for use in an internal combustion engine</td>'+
        '<td class="s6">0.0234</td>'+
        '<td class="s6">0</td>'+
        '<td class="s6">0.7</td>'+
        '<td class="s7">1.9</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Unleaded petroleum for use in motor vehicles</td>'+
        '<td class="s6">0.0342</td>'+
        '<td class="s6">67.4</td>'+
        '<td class="s6">0.02</td>'+
        '<td class="s7">0.2</td>'+
    '</tr>'+
    '<tr style="height:21px;">'+
        '<td class="s8">Diesel for use in motor vehicles</td>'+
        '<td class="s9">0.0386</td>'+
        '<td class="s9">69.9</td>'+
        '<td class="s9">0.01</td>'+
        '<td class="s10">0.5</td>'+
    '</tr></table>'+

    '<table  class="info_table">'+
    '<tr style="height:21px;">'+
        '<td class="s0" colspan="2">Electricity usage</td>'+
    '</tr>'+
    '<tr style="height:24px;">'+
        '<td class="s13">Country</td>'+
        '<td class="s1">Emission factor (kgCO<sub>2</sub>e/kWh)</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Cambodia</td>'+
        '<td class="s7">1.1708</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Canada</td>'+
        '<td class="s7">0.1798</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Europe</td>'+
        '<td class="s7">0.4538</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Mongolia</td>'+
        '<td class="s7">2.3109</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Mozambique</td>'+
        '<td class="s7">0.0004</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">New Zealand</td>'+
        '<td class="s7">0.1977</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Tasland</td>'+
        '<td class="s7">0.5793</td>'+
    '</tr>'+
    '<tr style="height:21px;">'+
        '<td class="s8">United States</td>'+
        '<td class="s10">0.5471</td>'+
    '</tr></table>'+

    '<table class="info_table">'+
    '<tr style="height:21px;">'+
        '<td class="s0" colspan="4">Natural Gas</td>'+
    '</tr>'+
    '<tr style="height:23px;">'+
        '<td class="s1" rowspan="2">Fuel combusted</td>'+
        '<td class="s1" colspan="3">Emissions Factor (kgCO<sub>2</sub>e/GJ)</td>'+
    '</tr>'+
    '<tr style="height:24px;">'+
        '<td class="s1">CO<sub>2</sub></td>'+
        '<td class="s1">CH<sub>4</sub></td>'+
        '<td class="s1">N<sub>2</sub>O</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Natural gas distributed in a pipeline</td>'+
        '<td class="s6">51.4</td>'+
        '<td class="s6">0.1</td>'+
        '<td class="s7">0.03</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Coal mine waste gas that is captured for combustion</td>'+
        '<td class="s6">51.9</td>'+
        '<td class="s6">4.1</td>'+
        '<td class="s7">0.03</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Coke oven gas</td>'+
        '<td class="s6">37</td>'+
        '<td class="s6">0.03</td>'+
        '<td class="s7">0.05</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Ethane</td>'+
        '<td class="s6">56.5</td>'+
        '<td class="s6">0.03</td>'+
        '<td class="s7">0.03</td>'+
    '</tr>'+
    '<tr style="height:21px;">'+
        '<td class="s8">Unprocessed natural gas</td>'+
        '<td class="s9">51.4</td>'+
        '<td class="s9">0.1</td>'+
        '<td class="s10">0.03</td>'+
    '</tr>'+
    '</table>'+


    '<table class="info_table">'+

    '<tr style="height:21px;">'+
        '<td class="s0" colspan="2">Waste management</td>'+
    '</tr>'+
    '<tr style="height:24px;">'+
        '<td class="s13">Waste type</td>'+
        '<td class="s14">'+
                'Emission factor (kgCO<sub>2</sub>e/ tonne)'+
        '</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Municipal solid waste to landfill</td>'+
        '<td class="s7">1.4</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Commercial and industrial waste to landfill</td>'+
        '<td class="s7">1.3</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Construction and demolition waste to landfill</td>'+
        '<td class="s7">0.2</td>'+
    '</tr>'+
    '<tr style="height:20px;">'+
        '<td class="s5">Rubber and leather to landfill</td>'+
        '<td class="s7">2.9</td>'+
    '</tr>'+
    '<tr style="height:21px;">'+
        '<td class="s8">Paper &amp; cardboard to landfill</td>'+
        '<td class="s10">2.9</td>'+
    '</tr>'+


    '</table>'+

    '<table class="info_table">'+


                '<tr style="height:21px;">'+
                    '<td class="s0" colspan="2">Passenger air travel</td>'+
                '</tr>'+
                '<tr style="height:24px;">'+
                    '<td class="s13">Travel type</td>'+
                    '<td class="s14">'+
                            'Emission factor (kgCO<sub>2</sub>e/km)'+
                    '</td>'+
                '</tr>'+
                '<tr style="height:21px;">'+
                    '<td class="s8">Passenger air travel (long haul/international)</td>'+
                    '<td class="s18">0.293</td>'+
                '</tr>'+







    '</table>'+

    '<table class="info_table">'+


                '<tr style="height:21px;">'+
                    '<td class="s0" colspan="2">Refrigerants</td>'+
                '</tr>'+
                '<tr style="height:24px;">'+
                    '<td class="s13">Gas type</td>'+
                    '<td class="s14">'+
                            'Emission factor (kgCO<sub>2</sub>e/kg)'+
                    '</td>'+
                '</tr>'+
                '<tr style="height:20px;">'+
                    '<td class="s5">CFC-11</td>'+
                    '<td class="s7">4,660</td>'+
                '</tr>'+
                '<tr style="height:20px;">'+
                    '<td class="s5">HCFC-122a</td>'+
                    '<td class="s7">945</td>'+
                '</tr>'+
                '<tr style="height:20px;">'+
                    '<td class="s5">HFC-125</td>'+
                    '<td class="s7">3,170</td>'+
                '</tr>'+
                '<tr style="height:20px;">'+
                    '<td class="s5">HFC134a</td>'+
                    '<td class="s7">1,300</td>'+
                '</tr>'+
                '<tr style="height:21px;">'+
                    '<td class="s8">HFC-143a</td>'+
                    '<td class="s10">4,800</td>'+
                '</tr>'+







    '</table>'+
    '<br/>'+
    '<b>NOTE:</b> The emission factors included above have been adapted from the Australian National Greenhouse Accounts (2015), and supplemented with other sources where necessary. When conducting a carbon footprint, it is essential to use the most relevant and up-to-date emissions factors. (In some countries, such as Australia and the United Kingdom, these may be issued by a government authority. The GHG Protocol provides general emissions factors where country-specific ones are not available.)'


    ;






    var source = "";
    switch (modalButtonContainer.data("content")) {
      case 'consumption_data':

      source = consumption;


        break;
      case 'emissions_factors':

        if(activity.company == 'tasbank') {
            source = tasbank_ef;
        }
        else {
            source = enerco_ef;
        }


        break;
      default:
        break;
    }

    var template = Handlebars.compile(source);

    var result = template(activity.content);


    $(".modal-body-content").html(result);
    //$(".modal-body").append('<div style="text-align:center; width:100%; margin-top:5px">Scroll Down to see more</div>');
    $('.more_info_modal').modal('toggle');



  });
}



function ecfefModal(modalButtonContainer, activity){



}


function initBase(id, clas, callback){

    var title = "Carbon Footprint Practical: tCO<sub>2</sub>e Formulas";
    var closeButton = "";

    if(id == "feedback"){

        title = "Feedback";
        closeButton = '<button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Close</button>';

    }else if(id == "more_info_consumption_data"){

        title = "More Information: Consumption Data";
        closeButton = '<button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Close</button>';


    }else if(id == "more_info_emissions_factors"){

        title = "More Information: Emissions Factors";
        closeButton = '<button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Close</button>';


    }


    var source =

    '<div class="modal fade '+clas+'" id="'+id+'" role="dialog">'+
      '<div class="modal-dialog">'+

        '<div class="modal-content">'+
          '<div class="modal-header">'+
          '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
          '<h4 class="modal-title">'+title+'</h4>'+
          '</div>'+
          '<div class="modal-body">'+
          '<div class="modal-notes-container" hidden></div>'+

          '<div class="modal-body-content"></div>'+

          '</div>'+
          '<div class="modal-footer">'+
            '<div class="bg-danger error_span"></div><br>'+
            closeButton+
            // '<button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Close</button>'+
            // '<button type="button" class="btn btn-primary modal_confirm_button" data-dismiss="modal"><i class="fa fa-check" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Confirm</button>'+

          '</div>'+
        '</div>'+


      '</div>'+
    '</div>';


    var template = Handlebars.compile(source);



    $(".modals").html(template);

    callback();


}













/**
var select_button;
var selected_formula;
var selected_formula_obj;

var Handlebars = require('handlebars');

$('#formulaModal').on('shown.bs.modal', function(e){

   // console.log("Modal Opened", e.relatedTarget.dataset.source_id);

    select_button = e.relatedTarget;

    console.log("RED", $(select_button).parent().data());

    generateFormulaPageContent($(select_button).parent().data());

});


$('#formulaModal').on('hidden.bs.modal', function(e){

    console.log("Modal Closed");


});



function generateFormulaPageContent(buttonData){

    $(".formulas-container").html("");

    var act_id = buttonData.activity_id;

    console.log(state.getSelectedCompany());

    var companyData = _.filter($companies, function(page, key){
          return page.id == state.getSelectedCompany();
        });

    companyData = companyData[0];

    var pagesWithActivites = _.filter(companyData.data, function(page, key){
          return page.activity;
    });

    var activity = null;

    $.each(pagesWithActivites, function(ind, page){

       if(page.activity.id == act_id){

            activity = page.activity;

       }

    });

    console.log(activity.content.formulas);




    console.log(state.pagesWithActivites());


    var source = "<div id='quiz_container'>"+
                    '<h5>{{content.question}}</h5>'+
                    '{{#content.options}}'+
                    '<input type="checkbox" name="{{../id}}_option" value="{{.}}"> {{.}}</br></br>'+
                    '{{/content.options}}'+
                 "</div>";

    var template = Handlebars.compile(source);

    var result = template(activity);

     $(".page_activity").html(result);

}
//
//

            // <div class="formula_container" data-formula_id="fuel">fuel<img src="assets/formulas/fuel_formula.png" alt="" class="formulas"></div>
            // <div class="formula_container" data-formula_id="natural_gas">natural<img src="assets/formulas/fuel_formula.png" alt="" class="formulas"></div>
            // <div class="formula_container" data-formula_id="aircon">aircon<img src="assets/formulas/fuel_formula.png" alt="" class="formulas"></div>
            // <div class="formula_container" data-formula_id="electricity">electricity<img src="assets/formulas/fuel_formula.png" alt="" class="formulas"></div>
            // <div class="formula_container" data-formula_id="air_travel">air<img src="assets/formulas/fuel_formula.png" alt="" class="formulas"></div>
            // <div class="formula_container" data-formula_id="waste">waste<img src="assets/formulas/fuel_formula.png" alt="" class="formulas"></div>



// $(".formula_container").click(function(event){


//     $(".formula_container").css({"border":"none"});

//     $(this).css({"border":"solid 2px red"});


//     var selected_formula = $(this).data("formula_id");
//     var selected_formula_obj = $(this);

//     console.log(selected_formula_obj);




// });

// function setSelected(formula){



// }

// $(".formula_select_button").click(function(event){


//   //  console.log($(this).find("img"));

//     var selected = select_button.dataset.formula_id;
//     var expected = $(this).parent().data("formula_id")

//     $('#formulaModal').modal('hide');

//     // $(select_button).html('Edit <i class="fa fa-pencil" aria-hidden="true"></i>');
//     // $(select_button).removeClass('btn-primary').addClass('btn-warning');

//     console.log($(this));


// //$(select_button).parent().html($(selected_formula_container).find("img").wrap("<div class='selected_formula_in_row formula_select_button' data-selected='"+selected_formula+"'></div>"));


// });

**/
