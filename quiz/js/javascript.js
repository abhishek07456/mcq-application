var globalData=[];
var totalQuestion=[];
var currentQuestion=0;
var selected=[];
var header="";
var stoptest=0;
function response(){
var skip=0;
var total=globalData.length;
for(i=1;i<selected.length;i++)
   {
      if(selected[i]==-1) //skipped
      skip++;
   }
if(selected.length>0)
var attempt=selected.length-1-skip;
else
var attempt=0;
var notvisited=total-(skip+attempt);
var body= `<table id="summary"  style="width:100%" class="table table-bordered summary">
    <thead class="summary_thead">
    <tr>
    <td>Section</td>
    <td>Attempted</td>
    <td>Skipped</td>
    <td>Not Visited</td>
    <td>Total</td>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>${header}</td>
    <td>${attempt}</td>
    <td>${skip}</td>
    <td>${notvisited}</td>
    <td>${total}</td>
    </tr>
    </tbody>
  </table>`;
  $("#response").append(body);
}
function submitTest(){
  stoptest=1;
  done();
  document.getElementById("openModel2").click();
}
function restartTest(){
  confirmation=document.getElementById("confirmation");
  if(confirmation)
  confirmation.style.display="none";
    $('#confirmation').modal('hide');
    globalData=[];
    totalQuestion=[];
    currentQuestion=0;
    selected=[];
    header="";
    window.location.reload();
}
function endTest(autoSubmit=0){
  confirmation=document.getElementById("confirmation");
  if(confirmation)
  confirmation.style.display="none";
     if(autoSubmit==1 || confirm("Are you sure to submit test?"))
       {
            $.ajax({
              type: "POST",
              url: "http://fakerestapi.azurewebsites.net",
              dataType: "jsonp",
              data : JSON.stringify(selected),
              success: function(data) {
                document.getElementById("openModel").click();
                response();
              },
              complete:function(){
                document.getElementById("openModel").click();
                response();
              }
          });            
      }

}
function done(){

  choices=globalData[currentQuestion]['choices'];
  choosen=[];
  any_selected=0;
  for(i=0;i<choices.length; i++){
      id="choice_"+(i+1);
      v= document.getElementById(id).checked;
      if(v){
      any_selected=1;
      choosen.push(i+1);
      }
  }
  if(choosen.length==0)
  selected[currentQuestion+1]=-1;
  else
  selected[currentQuestion+1]=choosen;
  return any_selected;
}
function prev(){
  any_choice= done();
  if(any_choice == 0 && !confirm("Are you sure to skip this Question ??"))
   return;
  currentQuestion--;
  getQuestion();
}
function next(){
  any_choice= done();
  if(any_choice == 0 && !confirm("Are you sure to skip this Question ??"))
   return;
  currentQuestion++;
  getQuestion();
}
function setHeader(header)
{
  document.getElementById("subject_header").innerHTML=header;
  document.getElementById("subject_header").style.display="block";

}
function getQuestion(){
     $("#frame").empty();
    document.getElementById("frame").style.display="block";

     var body=`<div class="row">
               <div class="col-sm-12 col-md-12"><h3>Question ${currentQuestion+1}</h3><hr></div>
              </div>
            </div>
             <div class="row">
               <div class="col-sm-6 col-md-6" >${globalData[currentQuestion]['question']}</div>
                <div class="col-sm-6 col-md-6">`;
                  id="choice-block-" + (currentQuestion+1);
                  body+=`<table class="table table-borderless table-dark" id=${id}>`;
                     choices=globalData[currentQuestion]['choices'];
                      for(i=0;i<choices.length; i++){
                        checked=(((currentQuestion+1)<selected.length && selected[currentQuestion+1]!=-1 && selected[currentQuestion+1].includes(i+1)) ? "checked" : "");
                                body+=`<tr>
                                <td data-index=${i+1} class="choice">
                                <input   type="checkbox" ${checked} id=choice_${i+1}>
                                <label    for=choice_${i+1}>${choices[i]}</label>
                                </td>
                                </tr>`;
                      }
         body+=`</table>
         </div>
        </div>
      <div class="row">
         <div class="col-sm-7" ><p class="warning">Choose more than one option and then select <b>Done</b>. To deselect an option, choose it a second time.</p></div>
    </div>
    <div class="row">
    <div class="col-sm-12">
    <center class="done-btn">
    <button class="btn btn-primary" id="prev" onclick="prev()">Previous</button>
    <button class="btn btn-primary" id="next" onclick="next()">Next</button>
    </center>
    </div></div></div>`;
    $("#frame").append(body);
    if(currentQuestion==0)
    document.getElementById("prev").disabled=true;
    else if(currentQuestion==globalData.length-1)
    document.getElementById("next").disabled=true;
}
function timeInterval(){
    const day=0,hour=0,min=1, sec=10;
    var deadline = new Date(); 
    deadline.setHours(deadline.getHours()+hour);
    deadline.setMinutes(deadline.getMinutes()+min);
    deadline.setSeconds(deadline.getSeconds()+sec);
    deadline = deadline.getTime(); 
    var x = setInterval(function() { 
      var now = new Date().getTime(); 
      var t = deadline - now; 
      var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
      var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
      var seconds = Math.floor((t % (1000 * 60)) / 1000); 
      if(stoptest==1)
      clearInterval(x);
      if(hours==0 && minutes==0 && seconds==0){
        submitTest(); // parameter to automatically submit without confim 
       clearInterval(x);
      }
      document.getElementById("hour").innerHTML = (hours<10 ? "0": "") + hours + " : "; 
      document.getElementById("minute").innerHTML = (minutes<10 ? "0": "") + minutes + " : "; 
      document.getElementById("second").innerHTML = (seconds<10 ? "0": "") + seconds;
  },1000);
}
function getapidata(){
      $.ajax({
        type: "GET",
        url: "http://www.mocky.io/v2/5e09c98830000057002444a9",
        crossDomain: true,
        dataType: "jsonp",
        success: function(data) {
          setHeader(data[0]["subject"]);
          header=data[0]["subject"];
          globalData=data[1];
          totalQuestion= globalData.length;
          getQuestion();
          timeInterval();
        }
    });
}
jQuery(document).ready(function($){
    document.getElementById("subject_header").style.display="none";
    document.getElementById("frame").style.display="none";
    getapidata();
});

  