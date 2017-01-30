// As JQuery will be used for majority of our JS code, you can attach it to the global scope
// Along with helpers such as mathJS and underscoreJS
global.$ = global.jQuery = require("jquery");
//npglobal.math = require('mathjs');
global._ = require("lodash");
global.state = require("./state_manager.js");
//global.nav = require("./navigation.js");
global.app = require("./app.js");

// Any special library you want to use can be installed through npm and imported into the specifc files.
// Most of these may not need variables attached in order to use them, see their documentation.
require('bootstrap');
require('twbs-pagination');
//require("blueimp-file-upload");
//require("jquery-knob");
require("twbs-pagination");







$(document).ready(function(){

    var content = {
        "type":"company_select",
        "data":{
            "companies":$companies
        }
    }



    if($initState){
        console.log("init state", $initState);
        state.init($initState);

    }
    app.init(content, function(selector){

       


    });




    // if($initState){
    //     console.log($initState);
    //     state.init($initState);
    // }


    // var max = 0;

    // $(".page_select").each(function(ind, obj){
    //     if(parseInt($(obj).css("height"), 10) > max){
    //         max = parseInt($(obj).css("height"), 10);
    //     }
    // });

    // $(".page_select").css("height", max+"px");

    
    // var current_page = "page_1";


    // setPageTitle(current_page);
    // setPageContent('tasbank', current_page);

    // $('.page_select[data-page="'+current_page+'"]').parent().addClass("active");

    // $('.page_select').click(function(e){

    //     var button = $(this);

    //     if(!$(button).hasClass("disabled")){
    //         var page = $(button).data("page");

    //         setPageContent('tasbank', page);
    //         setPageTitle(page)

    //         $('.page_select[data-page="'+current_page+'"]').parent().removeClass("active");
    //         current_page = page;
    //         $('.page_select[data-page="'+current_page+'"]').parent().addClass("active");
    //     }

    // });


    // function setPageTitle(page){

    //     var pagetitle = $_TASBANK[page].page_title;

    //     var image = "<img class='tasbank_logo_img' src='assets/tasbank_logo.png' alt='tasbank logo'/>";
    //     var title = "<h2>"+pagetitle+"</h2>";

    //     $(".page_title").html(image);


    // }


    // function setPageContent(company_name, page){
    //     $(".page_activity").html("");
    //     $(".page_content").html("");

    //     var company;
    //     if(company_name == "tasbank"){
    //         company = $_TASBANK;
    //     }else{
    //         company = $_ENERCO;
    //     }

    //     $(".page_content").html(company[page].page_content);

    //     $(".page_content").attr("data-current_page", page);
    //     $(".page_content").attr("data-current_company_name", company_name);




    //     if(company[page].activity){

    //        // //console.log("activity exists", company[page]["activity"].id);

    //         generate_activity(company_name, company[page]["activity"].id)
    //     }

    // }

    // function generate_activity(company, activity_id){



    //     if(company == "tasbank"){

    //         activity_generator.generateByID("tasbank", activity_id);

    //     }

    //     $(".page_activity").attr("data-activity_id", activity_id);



    // }



    var call_data_shown = false;
    $(".state_button").click(function(){

        if(call_data_shown){
            $(".state_content").hide();
            call_data_shown = false;
        }else{
            $(".state_content").show();
            $(".state_content").find("pre").html(JSON.stringify(state.getState()));
            call_data_shown = true;
        }

    });


     
    //////////// DELETE FOLLOWING ON RELEASE ////////////

    var call_data_shown = false;
    $(".lti_call_data_button").click(function(){

        if(call_data_shown){
            $(".lti_call_data").hide();
            call_data_shown = false;
        }else{
            $(".lti_call_data").show();
            call_data_shown = true;
        }

    });

    /////////////////////////////////////////////////////

});

