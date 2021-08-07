function login(){
    console.log("log in called")
    var email=document.getElementById("username").value
    var password=document.getElementById("password").value
    console.log(email)
    console.log(password)

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/user/login",
       headers:{
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "team_name": email,
            "password": password
        }),
        success: function (result){
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            //console.log(result.token)
            var token=result.token
            // console.log(token);
            document.cookie=`token=${token}`;
            console.log(document.cookie);
           // alert( document.cookie)
            window.location = 'Index.html';
        }
        });
        $.ajax({
            type: 'POST',
            url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/f1_desc",
           headers:{
                "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10",
               'content-type':'application/json'
           },
            data:JSON.stringify( {
                "team_name": "Pavan"
            }),
            success: function (result){
                // var request=new XMLHttpRequest();
                // token=request.getResponseHeader("x-mstr-authtoken")
                //console.log(result.token)
                //var token=result.token
                // console.log(token);
                //document.cookie=token;
                console.log(result);
                var res=result[1].description;
                console.log(result[1].description);
                console.log(result[1].task_name);
                console.log(result[1].f1_score);
                console.log(result[1].submission_name);
                
            
                //alert( document.cookie)
               
            }
            });
        
 
}
function team_data(){
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/timestamp_desc",
       headers:{
            "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10",
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "team_name": "Pavan"
        }),
        success: function (result){
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            //console.log(result.token)
            //var token=result.token
            // console.log(token);
            //document.cookie=token;
            console.log(result);
            for(var i=0;i<result.length;i++){

                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = result[i].timestamp
            
                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name
            
                cell3 = newRow.insertCell(2)
                cell3.innerHTML =result[i].task_name
            
                cell4 = newRow.insertCell(3)
                cell4.innerHTML =result[i].f1_score
            
                cell5 = newRow.insertCell(4)
                var data='<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML =data
                
                cell6 = newRow.insertCell(5)
                cell6.innerHTML =' <td><button class="btn btn-info"><a href="Leader_Board.html" style="text-decoration: none; color: white;">Rank</a> </button></td>'
            }
        
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);
            
        
            //alert( document.cookie)
           
        }
        });
}

function logout(){
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    window.location='Login.html'
}
function changepassword(){
    var email=document.getElementById("Name").value
    var password=document.getElementById("Password").value
    var new_password=document.getElementById("NewPassword").value
    console.log(email);
    console.log(password);
    console.log(new_password);
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/user/change_password",
       headers:{
        "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10",
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "team_name": email,
            "password": password,
            "new_password":new_password
        }),
        success: function (result){
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            console.log(result)
        //     var token=result.token
        //     // console.log(token);
        //     document.cookie=`token=${token}`;
        //     console.log(document.cookie);
        //    // alert( document.cookie)
        //     window.location = 'index.html';
        }
        });
}
function team_data_f1_asc(){
    // var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
    // for(var i=0;i<table.length;i++){
    //     console.log(i);
    // }
   var raw=document.getElementsByTagName("tbody")[0]
   raw.parentNode.removeChild(raw)
   var x=document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/f1_asc",
       headers:{
            "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10",
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "team_name": "Pavan"
        }),
        success: function (result){
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            //console.log(result.token)
            //var token=result.token
            // console.log(token);
            //document.cookie=token;
          
            console.log(result);
            for(var i=0;i<result.length;i++){
                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = result[i].timestamp
            
                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name
            
                cell3 = newRow.insertCell(2)
                cell3.innerHTML =result[i].task_name
            
                cell4 = newRow.insertCell(3)
                cell4.innerHTML =result[i].f1_score
            
                cell5 = newRow.insertCell(4)
                var data='<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML =data
                
                cell6 = newRow.insertCell(5)
                cell6.innerHTML =' <td><button class="btn btn-info"><a href="Leader_Board.html" style="text-decoration: none; color: white;">Rank</a> </button></td>'
            }
        
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);
            
        
            //alert( document.cookie)
           
        }
        });
}
function team_data_f1_desc(){
    // var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
    // for(var i=0;i<table.length;i++){
    //     console.log(i);
    // }
   var raw=document.getElementsByTagName("tbody")[0]
   raw.parentNode.removeChild(raw)
   var x=document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/f1_desc",
       headers:{
            "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10",
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "team_name": "Pavan"
        }),
        success: function (result){
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            //console.log(result.token)
            //var token=result.token
            // console.log(token);
            //document.cookie=token;
          
            console.log(result);
            for(var i=0;i<result.length;i++){
                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = result[i].timestamp
            
                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name
            
                cell3 = newRow.insertCell(2)
                cell3.innerHTML =result[i].task_name
            
                cell4 = newRow.insertCell(3)
                cell4.innerHTML =result[i].f1_score
            
                cell5 = newRow.insertCell(4)
                var data='<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML =data
                
                cell6 = newRow.insertCell(5)
                cell6.innerHTML =' <td><button class="btn btn-info"><a href="Leader_Board.html" style="text-decoration: none; color: white;">Rank</a> </button></td>'
            }
        
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);
            
        
            //alert( document.cookie)
           
        }
        });
}
function team_data_timestamp_asc(){
    // var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
    // for(var i=0;i<table.length;i++){
    //     console.log(i);
    // }
   var raw=document.getElementsByTagName("tbody")[0]
   raw.parentNode.removeChild(raw)
   var x=document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/timestamp_asc",
       headers:{
            "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10",
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "team_name": "Pavan"
        }),
        success: function (result){
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            //console.log(result.token)
            //var token=result.token
            // console.log(token);
            //document.cookie=token;
          
            console.log(result);
            for(var i=0;i<result.length;i++){
                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = result[i].timestamp
            
                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name
            
                cell3 = newRow.insertCell(2)
                cell3.innerHTML =result[i].task_name
            
                cell4 = newRow.insertCell(3)
                cell4.innerHTML =result[i].f1_score
            
                cell5 = newRow.insertCell(4)
                var data='<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML =data
                
                cell6 = newRow.insertCell(5)
                cell6.innerHTML =' <td><button class="btn btn-info"><a href="Leader_Board.html" style="text-decoration: none; color: white;">Rank</a> </button></td>'
            }
        
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);
            
        
            //alert( document.cookie)
           
        }
        });
}

function team_data_timestamp_desc(){
    // var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
    // for(var i=0;i<table.length;i++){
    //     console.log(i);
    // }
   var raw=document.getElementsByTagName("tbody")[0]
   raw.parentNode.removeChild(raw)
   var x=document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/timestamp_desc",
       headers:{
            "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10",
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "team_name": "Pavan"
        }),
        success: function (result){
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            //console.log(result.token)
            //var token=result.token
            // console.log(token);
            //document.cookie=token;
          
            console.log(result);
            for(var i=0;i<result.length;i++){
                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = result[i].timestamp
            
                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name
            
                cell3 = newRow.insertCell(2)
                cell3.innerHTML =result[i].task_name
            
                cell4 = newRow.insertCell(3)
                cell4.innerHTML =result[i].f1_score
            
                cell5 = newRow.insertCell(4)
                var data='<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML =data
                
                cell6 = newRow.insertCell(5)
                cell6.innerHTML =' <td><button class="btn btn-info"><a href="Leader_Board.html" style="text-decoration: none; color: white;">Rank</a> </button></td>'
            }
        
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);
            
        
            //alert( document.cookie)
           
        }
        });
}
function leaderboard(){
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/timestamp_desc",
       headers:{
            "x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10",
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "team_name": "Pavan"
        }),
        success: function (result){
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            //console.log(result.token)
            //var token=result.token
            // console.log(token);
            //document.cookie=token;
            console.log(result);
            for(var i=0;i<result.length;i++){

                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = result[i].timestamp
            
                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name
            
                cell3 = newRow.insertCell(2)
                cell3.innerHTML =result[i].task_name
            
                cell4 = newRow.insertCell(3)
                cell4.innerHTML =result[i].f1_score
            
                cell5 = newRow.insertCell(4)
                var data='<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML =data
                
                cell6 = newRow.insertCell(5)
                cell6.innerHTML =' <td><button class="btn btn-info"><a href="Leader_Board.html" style="text-decoration: none; color: white;">Rank</a> </button></td>'
            }
        
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);
            
        
            //alert( document.cookie)
           
        }
        });
}