function logout(){
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    localStorage.clear()
    window.location='Login.html'
}
function password(){
    var new_password = document.getElementById("NewPassword").value
    var confirm_passowrd=document.getElementById("ConfirmPassword").value
    if(new_password==confirm_passowrd){
        document.getElementById("passworderr").innerHTML=""}
        else{
            document.getElementById("passworderr").innerHTML="Password doesnt match"  
        }
}
function changepassword() {
    var elements = document.cookie.split('=')

    var team = localStorage.getItem("User")
    var password = document.getElementById("Password").value
    var new_password = document.getElementById("NewPassword").value
    var confirm_passowrd=document.getElementById("ConfirmPassword").value
    console.log(password);
    console.log(new_password);
    console.log(confirm_passowrd);
    if(new_password==confirm_passowrd){
  // document.getElementById("passworderr").innerHTML=""

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/user/change_password",
        headers: {
            "x-access-token": elements[1],
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": team,
            "password": password,
            "new_password": new_password
        }),
        success: function(result) {
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            console.log(result)


            Swal.fire({
                icon: 'success',
                title: 'Password Changed'
            })

            //     var token=result.token
            //     // console.log(token);
            //     document.cookie=`token=${token}`;
            //     console.log(document.cookie);
            //    // alert( document.cookie)
            //     window.location = 'index.html';
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 402) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid password',

                })
            }
            if (jqXHR.status == 401) {
                window.location = "Login.html"
                }
            }
        
    });
}
else{
   //document.getElementById("passworderr").innerHTML="Password doesnt match"
}
}
function check_token(){
    var authtoken=document.cookie
    console.log(authtoken);
    if(authtoken.length==0){
        console.log("Inside Null");
        window.location = 'Login.html';
    }
    else{
        leaderboard()
        }
}
function leaderboard(){
    
    var team=localStorage.getItem("User")
    console.log(team);
    var elements = document.cookie.split('=')

    document.getElementById("navbarDropdownMenuLink").innerHTML=`Welcome ${team}`
    var task_name=localStorage.getItem("task_name")
    var tn=localStorage.getItem("tn")
    document.getElementById("Tname").innerHTML=tn
    if(task_name==null){
        console.log("Here");
        leaderboard_Eng()
    }
    

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
       headers:{
            "x-access-token":elements[1],
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "task_name": task_name  
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
                cell3 = newRow.insertCell(2)
                if(result[i].task_name=="1A_English"){
                    cell3.innerHTML = "English Subtask A"

                }if(result[i].task_name=="1B_English"){
                    cell3.innerHTML = "English Subtask B"

                }if(result[i].task_name=="1A_Hindi"){
                    cell3.innerHTML = "Hindi Subtask A"

                }if(result[i].task_name=="1B_Hindi"){
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if(result[i].task_name=="1A_Marathi"){
                    cell3.innerHTML = "Marathi Subtask A"

                }if(result[i].task_name=="2_ICHCL"){
                    cell3.innerHTML = "Subtask 2"

                }
            
                cell4 = newRow.insertCell(3)
                cell4.innerHTML =result[i].f1_score
            
                cell5 = newRow.insertCell(4)
                var data='<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML =data
                
              
            }
        
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);
            
        
            //alert( document.cookie)
           
        },  error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
            window.location = "Login.html"
            }
        }
        });
}
function set_task(td){
    selectedRow = td.parentElement.parentElement;
    var task=selectedRow.cells[0].innerHTML
    console.log(task);
}
function leaderboard_Eng(){
    console.log("scsa");
    document.getElementById("Tname").innerHTML="English Subtask A"

    var elements =document.cookie.split('=')

    var raw=document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x=document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
       headers:{
            "x-access-token":elements[1],
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "task_name":'1A_English' 
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
                cell3 = newRow.insertCell(2)
                if(result[i].task_name=="1A_English"){
                    cell3.innerHTML = "English Subtask A"

                }if(result[i].task_name=="1B_English"){
                    cell3.innerHTML = "English Subtask B"

                }if(result[i].task_name=="1A_Hindi"){
                    cell3.innerHTML = "Hindi Subtask A"

                }if(result[i].task_name=="1B_Hindi"){
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if(result[i].task_name=="1A_Marathi"){
                    cell3.innerHTML = "Marathi Subtask A"

                }if(result[i].task_name=="2_ICHCL"){
                    cell3.innerHTML = "Subtask 2"

                }
            
                cell4 = newRow.insertCell(3)
                cell4.innerHTML =result[i].f1_score
            
                cell5 = newRow.insertCell(4)
                var data='<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML =data
                
              
            }
        
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);
            
        
            //alert( document.cookie)
           
        },  error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
            window.location = "Login.html"
            }
        }
        });
}
function leaderboard_Hindi(){
    var elements = document.cookie.split('=')

    var raw=document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x=document.createElement("tbody")
     document.getElementById("team_data").appendChild(x)
     document.getElementById("Tname").innerHTML="Hindi Subtask A"

     
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
       headers:{
            "x-access-token":elements[1],
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "task_name": "1A_Hindi"  
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
                cell3 = newRow.insertCell(2)
                if(result[i].task_name=="1A_English"){
                    cell3.innerHTML = "English Subtask A"

                }if(result[i].task_name=="1B_English"){
                    cell3.innerHTML = "English Subtask B"

                }if(result[i].task_name=="1A_Hindi"){
                    cell3.innerHTML = "Hindi Subtask A"

                }if(result[i].task_name=="1B_Hindi"){
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if(result[i].task_name=="1A_Marathi"){
                    cell3.innerHTML = "Marathi Subtask A"

                }if(result[i].task_name=="2_ICHCL"){
                    cell3.innerHTML = "Subtask 2"

                }
            
                cell4 = newRow.insertCell(3)
                cell4.innerHTML =result[i].f1_score
            
                cell5 = newRow.insertCell(4)
                var data='<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML =data
                
              
            }
        
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);
            
        
            //alert( document.cookie)
           
        },  error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
            window.location = "Login.html"
            }
        }
        });
}
function leaderboard_Marathi(){
    var elements = document.cookie.split('=')

    var raw=document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x=document.createElement("tbody")
     document.getElementById("team_data").appendChild(x)
     document.getElementById("Tname").innerHTML="Marathi Subtask A"

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
       headers:{
            "x-access-token":elements[1],
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "task_name":'1A_Marathi'
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
                cell3 = newRow.insertCell(2)
                if(result[i].task_name=="1A_English"){
                    cell3.innerHTML = "English Subtask A"

                }if(result[i].task_name=="1B_English"){
                    cell3.innerHTML = "English Subtask B"

                }if(result[i].task_name=="1A_Hindi"){
                    cell3.innerHTML = "Hindi Subtask A"

                }if(result[i].task_name=="1B_Hindi"){
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if(result[i].task_name=="1A_Marathi"){
                    cell3.innerHTML = "Marathi Subtask A"

                }if(result[i].task_name=="2_ICHCL"){
                    cell3.innerHTML = "Subtask 2"

                }
            
                cell4 = newRow.insertCell(3)
                cell4.innerHTML =result[i].f1_score
            
                cell5 = newRow.insertCell(4)
                var data='<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML =data
                
              
            }
        
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);
            
        
            //alert( document.cookie)
           
        },  error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
            window.location = "Login.html"
            }
        }
        });
}
function leaderboard_1BEng(){
    
    var elements = document.cookie.split('=')

    var raw=document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x=document.createElement("tbody")
     document.getElementById("team_data").appendChild(x)
     document.getElementById("Tname").innerHTML="English Subtask B"

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
       headers:{
            "x-access-token":elements[1],
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "task_name": "1B_English"
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
                cell3 = newRow.insertCell(2)
                if(result[i].task_name=="1A_English"){
                    cell3.innerHTML = "English Subtask A"

                }if(result[i].task_name=="1B_English"){
                    cell3.innerHTML = "English Subtask B"

                }if(result[i].task_name=="1A_Hindi"){
                    cell3.innerHTML = "Hindi Subtask A"

                }if(result[i].task_name=="1B_Hindi"){
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if(result[i].task_name=="1A_Marathi"){
                    cell3.innerHTML = "Marathi Subtask A"

                }if(result[i].task_name=="2_ICHCL"){
                    cell3.innerHTML = "Subtask 2"

                }
            
                cell4 = newRow.insertCell(3)
                cell4.innerHTML =result[i].f1_score
            
                cell5 = newRow.insertCell(4)
                var data='<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML =data
                
              
            }
        
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);
            
        
            //alert( document.cookie)
           
        },  error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
            window.location = "Login.html"
            }
        }
        });
}
function leaderboard_1BHin(){
    var elements = document.cookie.split('=')

    var raw=document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x=document.createElement("tbody")
     document.getElementById("team_data").appendChild(x)
     document.getElementById("Tname").innerHTML="Hindi Subtask B"

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
       headers:{
            "x-access-token":elements[1],
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "task_name": "1B_Hindi"  
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
                cell3 = newRow.insertCell(2)
                if(result[i].task_name=="1A_English"){
                    cell3.innerHTML = "English Subtask A"

                }if(result[i].task_name=="1B_English"){
                    cell3.innerHTML = "English Subtask B"

                }if(result[i].task_name=="1A_Hindi"){
                    cell3.innerHTML = "Hindi Subtask A"

                }if(result[i].task_name=="1B_Hindi"){
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if(result[i].task_name=="1A_Marathi"){
                    cell3.innerHTML = "Marathi Subtask A"

                }if(result[i].task_name=="2_ICHCL"){
                    cell3.innerHTML = "Subtask 2"

                }
            
                cell4 = newRow.insertCell(3)
                cell4.innerHTML =result[i].f1_score
            
                cell5 = newRow.insertCell(4)
                var data='<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML =data
                
              
            }
        
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);
            
        
            //alert( document.cookie)
           
        },  error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
            window.location = "Login.html"
            }
        }
        });
}
function leaderboard_2ICHCL(){
    var elements = document.cookie.split('=')

    var raw=document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x=document.createElement("tbody")
     document.getElementById("team_data").appendChild(x)
     document.getElementById("Tname").innerHTML="Subtask 2"

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
       headers:{
            "x-access-token":elements[1],
           'content-type':'application/json'
       },
        data:JSON.stringify( {
            "task_name":"2_ICHCL"  
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
                cell3 = newRow.insertCell(2)
                if(result[i].task_name=="1A_English"){
                    cell3.innerHTML = "English Subtask A"

                }if(result[i].task_name=="1B_English"){
                    cell3.innerHTML = "English Subtask B"

                }if(result[i].task_name=="1A_Hindi"){
                    cell3.innerHTML = "Hindi Subtask A"

                }if(result[i].task_name=="1B_Hindi"){
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if(result[i].task_name=="1A_Marathi"){
                    cell3.innerHTML = "Marathi Subtask A"

                }if(result[i].task_name=="2_ICHCL"){
                    cell3.innerHTML = "Subtask 2"

                }
            
                cell4 = newRow.insertCell(3)
                cell4.innerHTML =result[i].f1_score
            
                cell5 = newRow.insertCell(4)
                var data='<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML =data
                
              
            }
        
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);
            
        
            //alert( document.cookie)
           
        },  error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
            window.location = "Login.html"
            }
        }
        });
}