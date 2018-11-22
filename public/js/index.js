/* eslint-disable */
/**
 * @author [Abhishek m s]
 * 
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:32:34
 * @modify date 2018-09-13 12:32:34
 * @desc [description]
*/
$(document).ready(function () {// eslint-disable-line
    // code for login request
    $('#login-button').click(function () {
        let uname1 = document.getElementById('uname').value;
        let password1 = document.getElementById('password').value;
        $.post('/log', {
            uname: uname1,
            password: password1
        },
        function (ob) {
            if (ob.stat) {
                // localStorage.setItem('uid', ob.id);
                // window.location.href = "../user/userHome/home.html";
                $('.logSpan').css('visibility', 'hidden');
                if (ob.type == 'user') {
                    let queryString = '?para1=' + ob.id;
                    window.location.href = '../user/userHome/home.html' + queryString;
                }
                else {
                    let queryString = '?para1=' + ob.id;
                    window.location.href = '../admin/adminHome/admin.html' + queryString;
                }
            }
            else {
                // alert(" login failed");
                $('.logSpan').css('visibility', 'visible');
            }
        });
    });

    //code for triggering button click on enter key
    $('#password').keyup(function (event) {
        if (event.keyCode === 13) {
            $('#login-button').click();
        }
    });

    // code for sign up
    $('#signup-button').click(function (event) { 
        window.location.href = '../signuppage.html';
        return false;
    });
});