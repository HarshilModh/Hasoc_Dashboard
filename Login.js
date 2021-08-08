

function login(){
    console.log("log in called")
    var email=document.getElementById("username").value
    //document.cookie=`user=${email}`
    // User=email
    // console.log(User);
    localStorage.setItem("User", email);
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
            console.log(result);
            var token=result.token
            // console.log(token);
            document.cookie=`token=${token}`;
            console.log(document.cookie);
           // alert( document.cookie)
            window.location = 'Index.html';
        },   error: function(jqXHR, textStatus, errorThrown) {
            if(jqXHR.status==402){
                console.log(jqXHR.status);
                 
        Swal.fire({
        icon: 'error',
        title: 'Invalid password',
        
        })
        

            }


            if(jqXHR.status==404){
                console.log(jqXHR.status);
                 
        Swal.fire({
        icon: 'error',
        title: 'Team does not exist',
        
        })
        

            } if(jqXHR.status==400){
                console.log(jqXHR.status);
                 
        Swal.fire({
        icon: 'error',
        title: 'Bad request',
        
        })
        

            }
           
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