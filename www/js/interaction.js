var maccprojectActivity = require('./maccproject/maccproject_activity.js');
var maccprojectAnalysis = require('./maccproject/maccanalysis_activity.js');
var maccprojectInterpretation = require('./maccproject/maccinterpretation_activity.js');

module.exports = {
  numberWithCommas: numberWithCommas,
  numberNoCommas: numberNoCommas,
  configNextButton: configNextButton,
  watch:function(activity){
    switch (activity.type) {
      case 'multichoice':

        watchMultichoice(activity);


        break;
      case 'checkbox':

        watchCheckbox(activity);


        break;
      case 'draganddrop':

        watchDragAndDrop(activity);

        break;
      case 'scale':

        watchScale(activity);

        break;
      case 'carbon_footprint_calculation':

        watchCFC(activity);

        break;
      case 'maccproject':

        maccprojectActivity.watch(activity);

        break;
      case 'maccanalysis':

        maccprojectAnalysis.watch(activity);

        break;
      case 'maccinterpretation':

        maccprojectInterpretation.watch(activity);
      default:
    }
    //console.log("red");

  },
  watchButtons:function(activity){

    watchButtons(activity);

  },
  watchCompanySelect:function(company_selector, companies){

    watchCompanySelect(company_selector, companies)

  },
  watchNavigation: function(pages){

    watchNavigation(pages);

  },
  watchModal:function(type, modalButtonContainer, activity){

    switch (type) {
      case 'formula':

        watchFormulaModal(modalButtonContainer, activity);


        break;
      case 'ecfcf':

        watchECFCFModal(modalButtonContainer, activity);


        break;
      default:
    }

  }

}




function watchCompanySelect(company_selector, companies){

    $("."+company_selector).click(function(){

        var companyId = this.dataset.company;

        var content = {
            "type":"company",
            "data":_.find(companies, ['id', companyId])

        }

        state.setSelectedCompany(companyId);

        app.load(content, function(){

        });

    });

}

function watchNavigation(pages){

    //console.log(pages);
    $('.page_select').click(function(e){

        e.preventDefault();


        var button = $(this);

        if(!$(button).hasClass("disabled")){
            var selected_page = $(button).data("page");

            if(selected_page == "company_select"){

                //console.log("AHH");

                    var content = {
                        "type":"company_select",
                        "data":{
                            "companies":$companies
                        }
                    }
                app.load(content, function(){


                });


            }else{

                nav.setActive(selected_page);

                var content = {
                    "type":"page",
                    "data":_.find(pages,function(page){return page.page_id == selected_page})
                }

                //console.log("CONTENT",pages);
                app.load(content, function(){




                })


            }


        }

    });

}

function watchMultichoice(activity){

    $(".modalButton").click(function(e){

        modal.open(this.dataset.modal, $(this).parent(), activity);

    });

    $(".input_container").on("hover", function(){

        $(this).css('border',"1px solid blue");

    });

    $("input[name='"+activity.id+"_option']").change(function(event){

        //console.log("changing selection");

        updateAndSave(activity);


    });

}

function watchCheckbox(activity){

    $("input[name='"+activity.id+"_option']").change(function(event){

        updateAndSave(activity);


    });

}

function watchDragAndDrop(activity){


   // $(".draggable_object").attr("data-left", 0).attr("data-top", 0);

    $(".draggable_object").on("mousedown touchstart", function(e) {
        $(this).addClass('grabbing')
    })

    $(".draggable_object").on("mouseup touchend", function(e) {
        $(this).removeClass('grabbing')
    })


    $( ".draggable" ).draggable();
    $( ".droppable" ).droppable({
      drop: function( event, ui ) {

       //  ui.draggable.css({'background-color':'cyan'});

        $(ui.draggable).attr("data-selected", true);
        $(ui.draggable).attr("data-selected_zone", $(this).data("zone_id"));




       if($(this).hasClass("draggable_container")){


             $(ui.draggable).animate({
                    "left": 0,
                    "top": 0,
                },{

                  easing: "easeOutBounce", duration: 1000,

                  complete:function(){



                  },


                }).attr("data-selected", false).attr("data-selected_zone", "").css({

                    "background-color":"#797D7B",

                });


       }

        updateAndSave(activity);

      },
      out: function(event, ui) {

      //   ui.draggable.css({'background-color':'green'});
      //
        $(ui.draggable).css({

            "background-color":"#797D7B",

        })


        $(ui.draggable).attr("data-selected", false);
        $(ui.draggable).attr("data-selected_zone", "");


        updateAndSave(activity);
      }
    });




}

function watchScale(activity){

    $("input[class='"+activity.id+"_scale_buttons']").change(function(event){

    $(event.currentTarget).parent().parent().find(".btn").css("background-color","");


        var activebtnclass = "";

        switch(event.currentTarget.dataset.option){

            case 'option_1':
                activebtnclass = "btn-primary"
                break;
            case 'option_2':
                activebtnclass = "btn-primary"
                break;
            case 'option_3':
                activebtnclass = "btn-primary"
                break;
            default:
                break;

        }
       $(".scope_button_group[data-source='"+event.currentTarget.name+"'] label").removeClass();
       $(".scope_button_group[data-source='"+event.currentTarget.name+"'] label").addClass("btn btn-default");


       $(this).parent().removeClass("btn-default");
       $(this).parent().addClass(activebtnclass+" active");
        updateAndSave(activity);


    });

}

function watchCFC(activity){

    $(".modalButton").click(function(e){
        //console.log($(this).parent().data());
        modal.open(this.dataset.modal, $(this).parent(), activity);

    });

    $("input[class='"+activity.id+"']").focus(function(event) {
        var val_no_comma = numberNoCommas($(this).val());
        $(this).val(val_no_comma);
    });


    $("input[class='"+activity.id+"']").blur(function(event) {
        var val_comma = numberWithCommas($(this).val());
        $(this).val(val_comma);
    });

    //Number validation
    $("input[class='"+activity.id+"']").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });


    $("input[class='"+activity.id+"']").keyup(function(event){

       updateAndSave(activity);

    });



    $("select").change(function(){

        //console.log($(this).val());

        updateAndSave(activity);


    });


    $(".more_info_toggle").click(function(event){

       var container_class = $(this).data("container");

       $("."+container_class).toggle();


    });



}


// function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function numberNoCommas(x) {
    return x.replace(/,/g, '');
}


function watchFormulaModal(modalButtonContainer, activity){



     $(".modal_formula_container").click(function(){

        $(".modal_formula_container").each(function(ind, obj){
            $(obj).removeClass("formula_selected");
        });

        $(this).addClass("formula_selected");

        var selectedFormula = "none";

        selectedFormula = this.dataset.formula_name;

        modalButtonContainer.attr("data-selected_formula", selectedFormula);
        modalButtonContainer.attr("data-selected_formula_id", this.dataset.formula_id);

        modalButtonContainer.find(".formula_name_container").html(selectedFormula);
        modalButtonContainer.find(".modalButton").html('<i class="fa fa-pencil" aria-hidden="true"></i> edit');
        modalButtonContainer.find(".modalButton").removeClass('btn-primary').addClass('btn-info');
        updateAndSave(activity);


    });



}



function watchButtons(activity){



    $(".content_buttons").click(function(event) {
        //console.log('button', this);

        if(!$(this).hasClass("disabled")){

            switch(this.dataset.button_id){
                case 'start':
                    startButtonInteraction();
                break;
            }
        }
    });



    $(".activity_buttons").click(function(event){


        if(!$(this).hasClass("disabled")){

            switch(this.dataset.button_id){
                case 'submit':
                    submitButtonInteraction(activity, this);
                    break;
                case 'save':
                    saveButtonInteraction(activity, this);
                    break;
                case 'reset':
                    resetButtonInteraction(activity, this);
                    break;
                case 'feedback':
                    feedbackButtonInteraction(activity, this);
                    break;
                case 'prev':
                    prevButtonInteraction(activity, this);
                    break;
                case 'next':
                    nextButtonInteraction(activity, this);
                    break;
                default:
                    break;

            }

        }
    });


}


function updateAndSave(activity){

   // if(!(state.getState())[activity.company][activity.id]["submitted"]){

        state.updateState(activity);
        state.sendToServer();

   // }

}



function submitButtonInteraction(activity, button){



    var buttonData = button.dataset;


    buttonData_array = buttonData.next.split(',');
    buttonData_array.forEach(function(value, index, ar) {
      $(".page_select[data-page='"+buttonData_array[index]+"']").removeClass("disabled").parent().removeClass("disabled");

    });


   var next_button = $(".next_button[data-activity_id='"+activity.id+"']");

   configNextButton(activity, next_button);


   state.setSubmittedState(activity, true);



    state.updateState(activity, function(){


	   	$(".activity_buttons").addClass("disabled");
	   	$(".submit_button").html("Submitting  <i class='fa fa-spinner fa-spin'></i>");


        state.sendToServer(function(){



            state.checkAnswer(activity, function(){



				$(".activity_buttons").removeClass("disabled");
				$(".submit_button").html("Submit");

                //$(".activity_buttons").removeClass("disabled");
                //$(".submit_button").html("Submit");

            });

        });

    });


}

function configNextButton(activity, next_button) {

  var next_a = $(".page_select[data-page='"+activity.next+"']");

  if(next_a.hasClass('disabled')) {
    next_button.addClass('disabled');
  }
  else {
    next_button.removeClass('disabled');
  }

  //return next_button;
}


/*

function submitButtonInteraction(activity, button){

    console.log("interact with submit button");

    var buttonData = button.dataset;
    console.log("button data: ", buttonData);


    $(".page_select[data-page='"+buttonData.next+"']").removeClass("disabled").parent().removeClass("disabled");



    state.incrementActivityAttempts(activity);
    state.setSubmittedState(activity, true);

    state.sendToServer(function(){

        console.log("DONE!!");

        state.checkAnswer(activity);


    });


}

*/


    // var newCompanies = [];

    // $.each($companies, function(ind, obj){

    //   if(obj.id == data.id){

    //     newCompanies.push(obj);

    //   }else{

    //     state.removeCompanyState(obj.id);

    //   }

    // });

    // $companies = newCompanies;

function startButtonInteraction() {
    $(".page_select[data-page='company_select']").hide();

    $(".page_select[data-page='page_2']").removeClass("disabled");
    $(".page_select[data-page='page_2']").parent().removeClass("disabled");
    $(".page_select[data-page='page_2']").trigger('click');
    $(window).scrollTop(0);

    var company = state.getSelectedCompany();

    var newCompanies = [];

    $.each($companies, function(ind, obj){

      if(obj.id == company){

        newCompanies.push(obj);

      }else{

        state.removeCompanyState(obj.id, function(){


        });


      }

    });


    $companies = newCompanies;

    //state.sendToServer(function(){

       //     $companies = newCompanies;


    //});

}

function saveButtonInteraction(activity, button){

    //console.log("interact with save button");

    state.sendToServer();

}


function prevButtonInteraction(activity, button) {
    //console.log('interact with prev button');
    var buttonData = button.dataset;

    $(".page_select[data-page='"+buttonData.prev_page+"']").trigger('click');
    $(window).scrollTop(0);
}

function nextButtonInteraction(activity, button) {
    //console.log('interact with next button');
    var buttonData = button.dataset;

    $(".page_select[data-page='"+buttonData.next_page+"']").trigger('click');
    $(window).scrollTop(0);

}


function resetButtonInteraction(activity, button){
    var activity_generator = require("./activities_generator.js");

    //console.log("interact with reset button");


    //console.log(activity.type);
    if(activity.type == "draganddrop"){
         $(".draggable").animate({
                "left": 0,
                "top": 0,
                "background-color":"#797D7B"
            },{

              easing: "easeOutBounce", duration: 1000,

              complete:function(){
                    state.resetActivityState(activity, "selected");
                    activity_generator.generate(activity.company, activity, function(){

                    });

                    state.sendToServer();


              },


        }).attr("data-selected", false).attr("data-selected_zone", "");

    }else{

            state.resetActivityState(activity, "selected");
            activity_generator.generate(activity.company, activity, function(){

            });

            state.sendToServer();
    }



}

function feedbackButtonInteraction(activity, button){

    //console.log("interact with feedback button");

    if(activity.type == "carbon_footprint_calculation"){

        $(".correct_answer_feedback").show();

    }else{

        //modal.open(button.dataset.modal, $(this).parent(), activity);
        modal.open(button.dataset.modal, $(button).parent(), activity);

    }


}
