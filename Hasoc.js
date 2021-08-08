function check_token() {
    var authtoken = document.cookie
    console.log(authtoken);
    if (authtoken.length == 0) {
        console.log("Inside Null");
        window.location = 'Login.html';
    } else {
        team_data()
    }
}

function set_task(td) {
    selectedRow = td.parentElement.parentElement;
    var task = selectedRow.cells[2].innerHTML
    console.log(task);
    localStorage.setItem("task_name", task)


}

function setlang(str) {
    console.log(str);
    localStorage.setItem("Lang", str)
        //submit()
}

/*$('submissionForm').submit(function(e) {
    e.preventDefault();
    console.log("im here")
        /*var lang = localStorage.getItem("Lang")
        console.log(lang);
        var Team = localStorage.getItem("User")
        console.log(Team);
        var file = document.getElementById("File").value
        var ex = file.split('.').pop()
        console.log(ex);
        //console.log(file.split('.').pop());\
        if (ex != "csv") {

            Swal.fire({
                icon: 'error',
                title: 'Please upload only csv file',

            })
        }
        console.log(file);
        var name = document.getElementById("Submission_name").value
        console.log(name);
        var des = document.getElementById('description').value
        console.log(des);
        //var file = document.getElementById("File").va;
    data1 = new FormData();
    data1.append('team_name', "Shrey")
    data1.append('task_name', "1A_Marathi")
    data1.append('submission_name', 'ahdja')
    data1.append('description', "dbajd")
    data1.append('file', $('#File')[0].files[0])
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/submission",
        data: data1,
        headers: {
            "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10"
        },
        // data:JSON.stringify( {
        //     "team_name":Team,
        //     "task_name":lang,
        //     "submission_name":name,
        //     "description":des,
        //     "file":file
        // }),
        success: function(result) {
            console.log(result);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status)
        }
    });
})*/


async function submission() {
    const url = "https://hasocsubmission.el.r.appspot.com/dashboard/submission";
    let select_box_html = `<select id="subtask_name" class="swal2-input"><option value="volvo">Volvo</option>
    <option value="1A_English">English Subtask A</option>
    <option value="1A_Marathi">Marathi Subtask A</option>
    <option value="1B_Engish">English Subtask B</option>
    <option value="2_ICHCL">Subtask 2</option></select>`
    Swal.fire({
        title: 'Submit your file here',
        html: `${select_box_html}<input type="file" id="file" class="swal2-input" placeholder="file">`,
        confirmButtonText: 'SUBMIT',
        focusConfirm: false,
        preConfirm: () => {
            var input = document.getElementById("file");
            var sel = document.getElementById("subtask_name")
            var opt = sel.options[sel.selectedIndex];
            let task_name = opt.value;
            if (input.files && input.files[0]) {
                const formData = new FormData();
                formData.append('file', input.files[0])
                    //let myFile = input.files[0]
                    //formData.append('file', myFile);
                formData.append('task_name', task_name);
                formData.append('team_name', 'Shrey');
                formData.append('description', 'dahjkda');
                formData.append('submission_name', 'szncmcn')
                console.log(input.files)
                    //console.log(story_name)
                return fetch(url, {
                        method: 'post',
                        body: formData,
                        headers: {
                            "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJTaHJleSJ9.FBfNFLVee27tHmq8mvJ2w5MPVGTU0ZrhF-tWe46gSl8"
                        }
                    })
                    .then(response => {
                        //console.log(response)
                        if (response.status != 200) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Success!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            })
            team_data_timestamp_desc()
                //show_tweets_index();
        }
    })
}

function team_data() {
    //console.log(User);
    var team = localStorage.getItem("User")
    console.log(team);

    document.getElementById("navbarDropdownMenuLink").innerHTML = `Welcome ${team}`
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/timestamp_desc",
        headers: {
            "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10",
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": team
        }),
        success: function(result) {
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            //console.log(result.token)
            //var token=result.token
            // console.log(token);
            //document.cookie=token;
            console.log(result);
            for (var i = 0; i < result.length; i++) {

                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = result[i].timestamp

                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name

                cell3 = newRow.insertCell(2)
                cell3.innerHTML = result[i].task_name
                    // var taskname=result[i].task_name
                    // localStorage.setItem("task_name",taskname)

                cell4 = newRow.insertCell(3)
                cell4.innerHTML = result[i].f1_score

                cell5 = newRow.insertCell(4)
                var data = '<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML = data

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = ' <td><button class="btn btn-info" onclick="set_task(this)"><a href="Leader_Board.html" style="text-decoration: none; color: white; ">Rank</a> </button></td>'
            }
            //
            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);


            //alert( document.cookie)

        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404) {
                console.log(jqXHR.status);

                //  document.getElementById("Sort").innerHTML=""
                //document.getElementById("Guide").innerHTML=""
                document.getElementById("team_data").innerHTML = "Button"

            }
        }
    });
}

function logout() {
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    window.location = 'Login.html'
}

function changepassword() {
    var team = localStorage.getItem("User")
    var password = document.getElementById("Password").value
    var new_password = document.getElementById("NewPassword").value
    console.log(password);
    console.log(new_password);
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/user/change_password",
        headers: {
            "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10",
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
        }
    });
}

function team_data_f1_asc() {
    // var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
    // for(var i=0;i<table.length;i++){
    //     console.log(i);
    // }
    var authtoken = document.cookie

    var team = localStorage.getItem("User")
    console.log(team);
    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/f1_asc",
        headers: {
            "x-access-token": authtoken,
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": team
        }),
        success: function(result) {
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            //console.log(result.token)
            //var token=result.token
            // console.log(token);
            //document.cookie=token;

            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = result[i].timestamp

                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name

                cell3 = newRow.insertCell(2)
                cell3.innerHTML = result[i].task_name

                cell4 = newRow.insertCell(3)
                cell4.innerHTML = result[i].f1_score

                cell5 = newRow.insertCell(4)
                var data = '<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML = data

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = ' <td><button class="btn btn-info" onclick="set_task(this)"><a href="Leader_Board.html" style="text-decoration: none; color: white; ">Rank</a> </button></td>'

            }


            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);


            //alert( document.cookie)

        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}

function team_data_f1_desc() {
    // var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
    // for(var i=0;i<table.length;i++){
    //     console.log(i);
    // }
    var team = localStorage.getItem("User")
    console.log(team);
    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    $.ajax({


        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/f1_desc",
        headers: {
            "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10",
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": team
        }),
        success: function(result) {
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            //console.log(result.token)
            //var token=result.token
            // console.log(token);
            //document.cookie=token;

            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = result[i].timestamp

                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name

                cell3 = newRow.insertCell(2)
                cell3.innerHTML = result[i].task_name

                cell4 = newRow.insertCell(3)
                cell4.innerHTML = result[i].f1_score

                cell5 = newRow.insertCell(4)
                var data = '<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML = data

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = ' <td><button class="btn btn-info" onclick="set_task(this)"><a href="Leader_Board.html" style="text-decoration: none; color: white; ">Rank</a> </button></td>'

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

function team_data_timestamp_asc() {
    // var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
    // for(var i=0;i<table.length;i++){
    //     console.log(i);
    // }
    var team = localStorage.getItem("User")
    console.log(team);
    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/timestamp_asc",
        headers: {
            "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10",
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": team
        }),
        success: function(result) {
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            //console.log(result.token)
            //var token=result.token
            // console.log(token);
            //document.cookie=token;

            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = result[i].timestamp

                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name

                cell3 = newRow.insertCell(2)
                cell3.innerHTML = result[i].task_name

                cell4 = newRow.insertCell(3)
                cell4.innerHTML = result[i].f1_score

                cell5 = newRow.insertCell(4)
                var data = '<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML = data

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = ' <td><button class="btn btn-info" onclick="set_task(this)"><a href="Leader_Board.html" style="text-decoration: none; color: white; ">Rank</a> </button></td>'

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

function team_data_timestamp_desc() {
    // var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
    // for(var i=0;i<table.length;i++){
    //     console.log(i);
    // }
    var team = localStorage.getItem("User")
    console.log(team);
    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/timestamp_desc",
        headers: {
            "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWFtX25hbWUiOiJQYXZhbiJ9.iy6eVZITa6mQqvjP4EPw6cXkrVA7h8_nPlch2B0mb10",
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": team
        }),
        success: function(result) {
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            //console.log(result.token)
            //var token=result.token
            // console.log(token);
            //document.cookie=token;

            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = result[i].timestamp

                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name

                cell3 = newRow.insertCell(2)
                cell3.innerHTML = result[i].task_name

                cell4 = newRow.insertCell(3)
                cell4.innerHTML = result[i].f1_score

                cell5 = newRow.insertCell(4)
                var data = '<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML = data

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = ' <td><button class="btn btn-info" onclick="set_task(this)"><a href="Leader_Board.html" style="text-decoration: none; color: white; ">Rank</a> </button></td>'

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