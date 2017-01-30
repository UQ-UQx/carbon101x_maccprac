var Handlebars = require('handlebars');
var interaction = require('./interaction.js');

module.exports = {

  init:function(company, callback){

    generateNavigation(company, callback);

  },
  enable:function(pageids){


  },
  disable:function(pageids){


  },
  ping:function(pageids){


  },
  setActive:function(page_id){
    setActive(page_id);
  }

}

function generateNavigation(company, callback){



    var availablePages = [];

    var companySelectPage = {};
    companySelectPage["page_id"] = "company_select";
    companySelectPage["data"] = {

      "page_title":"< <span>Select<br/> Company</span>"

    };

    if(_.size(state.getState()) > 1){
      availablePages.push(companySelectPage);
    }
        console.log("How?",availablePages);


    // var red = _.filter(availablePages, function(content, key){
    //   console.log(content.page_id);
    //   if(content.page_id != "page_select"){
    //     return content;
    //   }
    //   //return (content.page_id != "page_select");
    // });


    $.each(company.data, function(page, content){
      var pages = {};
      pages["page_id"] = page;
      pages["data"] = content;
      availablePages.push(pages);
    });



    var pagesWithActivites = _.filter(company.data, function(page, key){
      return page.activity;
    });

    var pagesToKeepEnabled = state.getSubmittedActivitiesPages(company.id, pagesWithActivites);

    var disabledPages = ["page_2"];
    $.each(pagesWithActivites, function(key, page){
    //  disabledPages.push("page_2");

      if(!_.includes(pagesToKeepEnabled, page)){
        disabledPages = _.concat(disabledPages, page.activity.submit);

      }else{

        _.pull(disabledPages, "page_2");
      }
    });



    // $.each(pagesWithActivites, function(key, page){


    //     if(_.includes(pagesToKeepEnabled, page)){

    //       console.log("key", key);
    //       _.pull(disabledPages, key);

    //     }

    // });


    Handlebars.registerHelper('disable', function(elem, options) {
        if(_.includes(disabledPages, elem)) {
            return "disabled";
        }
        return "";
    });


    console.log("WOAL",pagesToKeepEnabled, disabledPages);

    var source = "<ul class='pagination pagination-md'>"+
                  '{{#.}}'+
                 '<li class="{{disable page_id}}">'+
                   '<a class="page_select {{disable page_id}}" data-page="{{page_id}}" aria-label="Start" href="#">'+
                         '{{data.page_title}}'+
                   '</a>'+
                 '</li>'+
                  '{{/.}}'+
                "</ul>";


     var template = Handlebars.compile(source);

     var result = template(availablePages);

     $(".nav").html(result);

     var max = 0;
     $(".page_select").each(function(ind, obj){
        var text = $(obj).text();
        $(obj).html(text);
        if(parseInt($(obj).css("height"), 10) > max){
            max = parseInt($(obj).css("height"), 10);
        }
     });
    $(".page_select").css("height", max+"px");

    var initalActive = "page_1";

    $(".page_select[data-page='"+initalActive+"']").parent().addClass("active");

    callback(initalActive);

    interaction.watchNavigation(availablePages);


}


function setActive(page_id){

  $(".page_select").each(function(ind, obj){
      if($(obj).parent().hasClass("active")){
          $(obj).parent().removeClass("active");
      }
  })

  $(".page_select[data-page='"+page_id+"']").parent().addClass("active");
}
