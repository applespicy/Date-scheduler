// This is an array of IDs in HTML
var idsCollection=["#9", "#10", "#11","#12","#1", "#2","#3","#4","#5"];
// collection of time
var timeCollection=["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00"];
// Way to evaluate something in my code
var shiftedTimeSlotCollection=["10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00",  "18:00:00"];
// empty array to get the information in local storage
var plannerContent=[];

var getLocalStorage= JSON.parse(localStorage.getItem("planner-items"));
if (getLocalStorage !== null) {
    plannerContent = getLocalStorage;
   }
   for (var i=0;i<idsCollection.length; i++) {
    
     var descriptionEl = $(idsCollection[i]);

     var buttonEl = descriptionEl.parent().parent().find("button");
    //  IF statment is broken
     if ((moment().format('MMMM Do YYYY, HH:mm:ss')) < (moment().format('MMMM Do YYYY') +  ", " + timeCollection[i])) { 
       descriptionEl.attr("class", "future");
       console.log("hello")
       plannerContent.forEach((item) =>{ 
        console.log(idsCollection[i]);
         if (idsCollection[i] === ("#" + (item["input-id"]))) {
           descriptionEl.val(item["input-value"]);
         }
        });
     }
     else if (((moment().format('MMMM Do YYYY, HH:mm:ss')) >= (moment().format('MMMM Do YYYY') +  ", " + timeCollection[i])) &&  
             ((moment().format('MMMM Do YYYY, HH:mm:ss')) < (moment().format('MMMM Do YYYY') +  ", " + shiftedTimeSlotCollection[i])))
     {
       descriptionEl.attr("class", "present");
       $(".present").attr("disabled", "disabled");
       buttonEl.attr("disabled", true);
       plannerContent.forEach(function(item) {
         if (idsCollection[i] === ("#" + item["input-id"])) {
           descriptionEl.val(item["input-value"]);
         }
       });
     }
     else if ((moment().format('MMMM Do YYYY, HH:mm:ss')) > (moment().format('MMMM Do YYYY') +  ", " + timeCollection[i])) {
       descriptionEl.attr("class", "past");
    //    $(".past").attr("disabled", "disabled");
    //    buttonEl.attr("disabled", true);
     }
   }
   $("button").on("click", function() {
     event.preventDefault();
     var container = $(this).parent().parent();  
     var inputValue = container.find("input").val();
     var inputId = container.find("input").attr("id");
     var textObj = {
       "input-id": inputId,
       "input-value": inputValue };
     
     if (textObj["input-value"] !== "") {
       plannerContent.push(textObj);
       localStorage.setItem("planner-items", JSON.stringify(plannerContent));
     }
   });