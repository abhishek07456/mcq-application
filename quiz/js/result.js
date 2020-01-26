function data(globalData){
         datapoint=[];
         arr=[];
        for(i=0;i<globalData.length;i++)
          {
              arr=[];
            arr["y"]=(globalData[i].correct/globalData[i].Totalquestion)*100;
            arr["label"]=globalData[i].subject;
            datapoint.push(arr);
          }
         
        var chart = new CanvasJS.Chart("chartContainer1", {
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0.00\"%\"",
                indexLabel: "{label} {y}",
                dataPoints: datapoint
            }]
        });
        chart.render();

        var body="";
        var table=`<table class="table table-hover" id="result_table">
        <tr id="result_table_tr">
          <th id="result_table_th" >Percentile</th>
          <td id="result_table_td"> 50%</td>
          </tr>
          <tr>
          <th id="result_table_th">Rank</th>
          <td id="result_table_td">2</td>
        </tr>
        <tr>
        <th id="result_table_th">Question</th>
        <td id="result_table_td">10</td>
        </tr>
        <tr>
        <th id="result_table_th">Correct</th>
        <td id="result_table_td">5</td>
        </tr>
        <tr>
        <th id="result_table_th">Wrong</th>
        <td id="result_table_td">5</td>
      </tr>
      </table> `;
      body+=`<div class="row">`;
         for(i=0;i<globalData.length;i++){
          body+=`<div class="col-sm-6 col-md-5" id="subject_details">
                <h4>${globalData[i].subject}</h4>
                <hr>
                <div class="row">
                     <div class="col-sm-6 col-md-5"><p><img src='image/images.png'> </p> </div>
                     <div class="col-sm-6 col-md-5">
                     <h4>We offer this subject :</h4>
                     <p>Price : 10$</p>
                     <p>Course : 1 month</p>

                     </div>
                </div>
                  <button class="btn btn-info" >View Details</button>
            </div>`;
    
         }
        
        $("#courses").append(body);
        $("#chartContainer2").append(table);

}

window.onload = function() {
    $.ajax({
        type: "GET",
        url: "http://fakerestapi.azurewebsites.net",
        dataType: "jsonp",
        success: function(data){       
            data();
        },
        complete: function(){
            //sample data
            var globalData=[];
            var arr=[];
            arr["subject"]="science";
            arr["Totalquestion"]=10;
            arr["correct"]=10;

            globalData.push(arr);
            arr=[];
            arr["subject"]="Math";
            arr["Totalquestion"]=10;
            arr["correct"]=5;
            globalData.push(arr);

            arr=[];
            arr["subject"]="English";
            arr["Totalquestion"]=10;
            arr["correct"]=5;
            globalData.push(arr);

            arr=[];
            arr["subject"]="Computer";
            arr["Totalquestion"]=10;
            arr["correct"]=5;
            globalData.push(arr);
            data(globalData);
        }
    }); 
    
 }