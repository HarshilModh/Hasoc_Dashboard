function validate(){
    var email = document.getElementById("username") 
    var password = document.getElementById("password")
    if(email.value==""){
    document.getElementById("Nameerror").innerHTML="Username Missing"
    }else{
        document.getElementById("Nameerror").innerHTML=""
    }
    if(password.value==""){
        document.getElementById("passerror").innerHTML="Password Missing"
        }else{
            document.getElementById("passerror").innerHTML=""
    
        }


}
function login() {
    console.log("log in called")
    var email = document.getElementById("username").value
    localStorage.setItem("User", email);
    var password = document.getElementById("password").value
    
    console.log(email)
    console.log(password)

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/user/login",
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": email,
            "password": password
        }),
        success: function(result) {
        
            var token = result.token
          
            document.cookie = `token=${token}`;
            console.log(document.cookie);

         
            window.location = 'Index.html';
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 402) {
                console.log(jqXHR.status);

                Swal.fire({
                    icon: 'error',
                    title: 'Invalid password',
                })
            }
            if (jqXHR.status == 404) {
                console.log(jqXHR.status);
                Swal.fire({
                    icon: 'error',
                    title: 'Team does not exist',

                })


            }
            if (jqXHR.status == 400) {
                console.log(jqXHR.status);

                Swal.fire({
                    icon: 'error',
                    title: 'Bad request',

                })


            }

        }
    });
  

}