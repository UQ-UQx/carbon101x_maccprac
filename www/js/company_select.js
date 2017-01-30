var Handlebars = require("handlebars");
var interaction = require("./interaction.js");

module.exports = {
  init: function(companies, callback){

    construct(companies, callback);

  }



}


function construct(companies, callback){

    //console.log(companies);


    var company_select_selector = "company_select_buttons"

    var currentState = state.getState();


    var currentProgress = state.getProgress(companies, currentState);
    //console.log('companies', companies);

    console.log(currentProgress);

    Handlebars.registerHelper("progress", function(id, type, options) {

      var progress = currentProgress[id];
       switch (type) {
        case "percent":
            return (progress*100).toFixed(0)+"%";
            break;
        case "number":
            return (progress*100).toFixed(0);
            break;
        case "show":
            if(progress == 0){
                return "hidden";
                break;
            }
            return "";
            break;
        default:
            return progress;
            break;
        }

    });

    Handlebars.registerHelper("companyButton", function(id, options) {

      var progress = currentProgress[id];

      var wording = "Select";

      if(progress > 0){

        wording = "Continue";

      }else if(progress == 1){

        return;

      }

        var cont = '<input class="btn btn-primary btn-sm  '+company_select_selector+' '+id+'_button" data-company="'+id+'" value="'+wording+'">';

        return new Handlebars.SafeString(cont);

    });

    var source = '<div class="company_select_options">'+

            '<div class="company_select_text"><h4>To get started, choose one of the Tasland companies below.</h4></div>'+

            '{{#.}}'+

                '<div class="company_container">'+
                    '<div class="{{id}}_container company_content_container" data-company="{{id}}">'+
                        '<img class="company_logo " data-company="{{id}}" src="assets/logos/{{logo}}" alt="{{id}} company logo"></img>'+
                        '<strong>Sector:</strong> {{companyprofile.sector}} <br/>'+
                        '<strong>Annual Revenue:</strong> {{companyprofile.annualrevenue}} <br/>'+
                        '<strong>Employees:</strong> {{companyprofile.noemployees}} <br/>'+
                    '</div>'+
                    '{{companyButton id}}'+
                    '<div class="progress_container" {{progress id "show"}}>'+
                        '<div class="progress" data-company="{{id}}">'+
                            '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="{{progress id "number"}}"'+
                            'aria-valuemin="0" aria-valuemax="100" style="width:{{progress id "percent"}}">'+
                            '{{progress id "percent"}} Complete'+
                            '</div>'+
                        '</div>'+

                    '</div>'+
                '</div>'+

            '{{/.}}'+

    '</div>';

    var template = Handlebars.compile(source);

    var result = template(companies);

    $(".company_select").html(result);

    if($companies.length == 1){
        $(".company_select_text").html("");
    }

    interaction.watchCompanySelect(company_select_selector, companies);

    callback();

}

/*
function getProgress(companies, currentState){

    console.log(companies, currentState);

    var progress = {};
    $.each(companies, function(ind, company){



        var pagesWithActivites = _.filter(company.data, function(page, key){
          return page.activity;
        });

        var submittedActivitesPages = state.getSubmittedActivitiesPages(company.id, pagesWithActivites);

        progress[company.id] = submittedActivitesPages.length/pagesWithActivites.length;


    });


    return progress;


}

*/
