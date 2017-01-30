var company_select = require("./company_select.js");
var activity_generator = require("./activities_generator.js");
var summary = require("./summary.js");
var interaction = require('./interaction.js');
global.nav = require("./navigation.js");


global.modal = require("./modals.js");

module.exports = {
  
  init:function(content, callback){

        //     var content = {
        //     "type":"company",
        //     "data":_.find(companies, ['id', companyId])
            
        // }

        // state.setSelectedCompany(companyId);

        // app.load(content, function(){

        // });
        // 
    
    console.log("content", content);

    var company_in_progress = null;
    var currentState = state.getState();

    console.log(content.data.companies, currentState, _.size(currentState));


    


    if(_.size(currentState) == 1){
        state.setSelectedCompany(Object.keys(currentState)[0]);

        loadCompanyContent(_.find(content.data.companies, ["id", Object.keys(currentState)[0]]), function(){



        });
    }else{

        loadCompanySelect(content.data, callback);

    }


  },
  load:function(content, callback){
    console.log(content);
    switch (content.type) { 
        case "company_select": 
            loadCompanySelect(content.data, callback);
  
            break;
        case "company": 
            loadCompanyContent(content.data, callback);
            //console.log(content.data);
            break;
        case "page": 
            loadPage(content.data, callback);

            break;
        default:
            break;
    }

  },
  getLoadedContent:function(){

    var loaded_content = "loaded content";

    var content = {

        "type":"loaded_content",
        "data":loaded_content

    };

    return content;
  },

}


function enableMainContent(flag){

    $(".company_select").prop('hidden', flag);
    $("#content").prop('hidden', !flag);  

}

function loadCompanySelect(data, callback){
    enableMainContent(false);

    company_select.init(data.companies, function(){

        callback();

    });


}

function loadCompanyContent(data, callback){
    enableMainContent(true);

    nav.init(data, function(page){

        if(page){

            var newData = {};
            newData["page_id"] = page;
            newData["data"] = data.data[page];
            $(".page_title").html("<img src='assets/logos/"+data.logo+"' alt='company logo'></img>");

            loadPage(newData, callback);
        }

    });

}

function generate_activity(company, activity, callback){

    activity_generator.generate(company, activity, callback);
    $(".page_activity").attr("data-activity_id", activity.id);

}


function generate_summary(company, data,  callback){

    summary.init(company, data, callback);
    //$(".page_activity").attr("data-activity_id", activity.id);

}

function loadPage(data, callback){

    //console.log("bak",data,company );

    var company = state.getSelectedCompany();
    var page_data = data.data;
    var page_id = data.page_id;

    $(".page_activity").html("");
    $(".page_content").html("");

    $(".page_content").html(page_data.page_content);
    $(".page_content").attr("data-current_page", page_id);
    $(".page_content").attr("data-current_company_name", company);

    //console.log('company', company);
    //console.log('data', data);
    //console.log('companies', $companies);


    //Add Start button
    if(page_id == 'page_1') {
        var currentState = state.getState();
        var currentProgress = state.getProgress($companies, currentState);

        //console.log('currentProgress', currentProgress[company] );

        var startButtonText = "Start";
        if(currentProgress[company] > 0) {
            startButtonText = "Continue";
        }

        var start_button = $("<div class='start_button_div'><button type='button' class='btn btn-primary content_buttons start_button' data-button_id='start'>"+startButtonText+"</button></div>");
        $(".page_content").append(start_button);
        interaction.watchButtons(null);

    }

    if(page_data.activity){
        generate_activity(company, page_data.activity, function(){


            




            callback();
        })
    }else if(page_data.summary){

        $(".page_content").append('<div class="summaries_container"></div>');
        
        generate_summary(company, page_data.summary, function(){
            callback();
        })


    }else{
    
        callback();


    }


}
