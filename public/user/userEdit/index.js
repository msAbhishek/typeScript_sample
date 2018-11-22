/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:32:03
 * @modify date 2018-09-13 12:32:03
 * @desc [description]
*/
$(document).ready(function () {
    // var uid = localStorage.getItem('uid');
    // console.log(uid);

    let queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    let queries = queryString.split('=');
    let uid = queries[1];
    let nameFlag = false;
    let unameFlag = false;
    let addressFlag = false;
    let emailFlag = false;
    let passwordFlag = false;
    let cpasswordFlag = false;
    let phoneFlage = false;


    $('#editNav').css({
        'backgroundColor': '#333', 'color': '#ddd', 'opacity': '1'
    });
    $.post('/userhome/getdetails',  //server request for user details retrival
        {
            id: uid
        },
        function (ob) {
            $('#name').val(ob.name);
            $('#uname').val(ob.uname);
            $('#address').val(ob.address);
            $('#email').val(ob.email);
            $('#password').val('****');
            $('#cpassword').val('****');
            $('#phone').val(ob.phone);
            localStorage.setItem('tempName', ob.uname);
        });

    //code for name validation
    $('#name').keyup(function () {
        let regx = /^[a-z ,.'-]+$/i;
        let name = document.getElementById('name').value;
        if ((name != '') && (name.length >= 3) && (regx.test(name))) {
            nameFlag = true;
            $('#name').css('color', 'green');
            $('.nameSpan').css('visibility', 'hidden');
            $('#namebtn').css('visibility', 'visible');
            if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
                $('.btnSpan').css('visibility', 'hidden');
            }

        }
        else {
            nameFlag = false;
            $('.nameSpan').css('visibility', 'visible');
            $('#name').css('color', 'red');
            $('#namebtn').css('visibility', 'hidden');

        }
    });

    //code for username validation 
    $('#uname').keyup(function () {

        let userName = document.getElementById('uname').value;
        if ((userName != '') && (userName.length >= 3)) {
            $.post('/useredit/checkusername', //server request for username existance check
                {
                    uname: userName
                },
                function (ob) {
                    if (ob) {
                        unameFlag = true;
                        $('#uname').css('color', 'green');
                        $('.unameSpan').css('visibility', 'hidden');
                        $('#unamebtn').css('visibility', 'visible');
                        if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
                            $('.btnSpan').css('visibility', 'hidden');
                        }
                    }
                    else {
                        unameFlag = false;
                        $('#uname').css('color', 'red');
                        var tempName = localStorage.getItem('tempName');
                        if (tempName == userName) {
                            $('.unameSpan').text('username not changed');
                        }
                        else {
                            $('.unameSpan').text('username already exist');
                        }
                        $('.unameSpan').css('visibility', 'visible');
                        $('#unamebtn').css('visibility', 'hidden');
                    }

                });
        }
        else {
            unameFlag = false;
            $('.unameSpan').text('enter a valid name');
            $('.unameSpan').css('visibility', 'visible');
            $('#uname').css('color', 'red');
            $('#unamebtn').css('visibility', 'hidden');
        }
    });

    //code for address validation
    $('#address').keyup(function () {
        let address = document.getElementById('address').value;
        if (address != '') {
            addressFlag = true;
            $('#address').css('color', 'green');
            $('.addressSpan').css('visibility', 'hidden');
            $('#addressbtn').css('visibility', 'visible');
            if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
                $('.btnSpan').css('visibility', 'hidden');
            }
        }
        else {
            addressFlag = false;
            $('.addressSpan').css('visibility', 'visible');
            $('#address').css('color', 'red');
            $('#addressbtn').css('visibility', 'hidden');
        }
    });


    //code for email validation 
    $('#email').keyup(function () {
        let email = document.getElementById('email').value;
        // var regExpr = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let regExpr = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (regExpr.test(email) == true) {
            emailFlag = true;
            $('#email').css('color', 'green');
            $('.emailSpan').css('visibility', 'hidden');
            $('#emailbtn').css('visibility', 'visible');
            if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
                $('.btnSpan').css('visibility', 'hidden');
            }
        }
        else {
            emailFlag = false;
            $('.emailSpan').css('visibility', 'visible');
            $('#email').css('color', 'red');
            $('#emailbtn').css('visibility', 'hidden');
        }
    });

    //code for phone number validation 
    $('#phone').keyup(function (event) {
        let phone = document.getElementById('phone').value;
        let phoneNo = /^\d{11}$/;
        if (phoneNo.test(phone) == true) {
            phoneFlage = true;
            $('#phone').css('color', 'green');
            $('.phoneSpan').css('visibility', 'hidden');
            $('#phonebtn').css('visibility', 'visible');
            if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
                $('.btnSpan').css('visibility', 'hidden');
            }
            if (event.keyCode === 13) {
                $('#updatebutton').click();
            }
        }
        else {
            phoneFlage = false;
            $('.phoneSpan').css('visibility', 'visible');
            $('#phone').css('color', 'red');
            $('#phonebtn').css('visibility', 'hidden');
        }
    });

    //code for password validation 
    $('#password').keyup(function () {
        let password = document.getElementById('password').value;
        let pswd = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
        if (pswd.test(password) == true) {
            passwordFlag = true;
            $('#password').css('color', 'green');
            $('.passwordSpan').css('visibility', 'hidden');
            if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
                $('.btnSpan').css('visibility', 'hidden');
            }
        }
        else {
            passwordFlag = false;
            $('.passwordSpan').css('visibility', 'visible');
            $('#password').css('color', 'red');
            $('#passwordbtn').css('visibility', 'hidden');

        }
    });

    //code for password confirmation 
    $('#cpassword').keyup(function () {
        let cpassword = document.getElementById('cpassword').value;
        let password = document.getElementById('password').value;
        if ((password == cpassword) && passwordFlag) {
            cpasswordFlag = true;
            $('#cpassword').css('color', 'green');
            $('.cpasswordSpan').css('visibility', 'hidden');
            $('#passwordbtn').css('visibility', 'visible');
            if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
                $('.btnSpan').css('visibility', 'hidden');
            }
        }
        else {
            cpasswordFlag = false;
            $('.cpasswordSpan').css('visibility', 'visible');
            $('#cpassword').css('color', 'red');
            $('#passwordbtn').css('visibility', 'hidden');

        }
    });

    //code for updating all the user data  
    $('#updatebutton').click(function () {
        if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
            $('.btnSpan').css('visibility', 'hidden');
            let name1 = document.getElementById('name').value;
            let uname1 = document.getElementById('uname').value;
            let address1 = document.getElementById('address').value;
            let email1 = document.getElementById('email').value;
            let password1 = document.getElementById('password').value;
            let phone1 = document.getElementById('phone').value;
            $.post('/useredit/updateall',  //server request for user all field update
                {
                    id: uid,
                    name: name1,
                    uname: uname1,
                    address: address1,
                    email: email1,
                    password: password1,
                    phone: phone1

                },
                function (ob) {
                    if (ob) {
                        let queryString = '?para1=' + uid;
                        window.location.href = './edit.html' + queryString;
                        return false;
                    }
                    else {
                        alert('updation failed');
                        let queryString = '?para1=' + uid;
                        window.location.href = './edit.html' + queryString;
                        return false;
                    }
                });
        }
        else {
            $('.btnSpan').css('visibility', 'visible');
        }


    });

    //code for name update request
    $('#namebtn').click(function () {
        let name1 = document.getElementById('name').value;
        $.post('/useredit/updatename',  //server request for name update
            {
                id: uid,
                name: name1,
            },
            function (ob) {
                if (ob) {
                    let queryString = '?para1=' + uid;
                    window.location.href = './edit.html' + queryString;
                    return false;
                }
                else {
                    alert('updation failed');
                    let queryString = '?para1=' + uid;
                    window.location.href = './edit.html' + queryString;
                    return false;
                }
            });

    });

    //code for username update request
    $('#unamebtn').click(function () {
        let uname1 = document.getElementById('uname').value;
        $.post('/useredit/updateuname',  //server request for user name update
            {
                id: uid,
                uname: uname1,
            },
            function (ob) {
                if (ob) {
                    let queryString = '?para1=' + uid;
                    window.location.href = './edit.html' + queryString;
                    return false;
                }
                else {
                    alert('updation failed');
                    let queryString = '?para1=' + uid;
                    window.location.href = './edit.html' + queryString;
                    return false;
                }
            });

    });

    //code for address update request
    $('#addressbtn').click(function () {
        let address1 = document.getElementById('address').value;
        $.post('/useredit/updateaddress',  //server request for address  update
            {
                id: uid,
                address: address1
            },
            function (ob) {
                if (ob) {
                    let queryString = '?para1=' + uid;
                    window.location.href = './edit.html' + queryString;
                    return false;
                }
                else {
                    alert('updation failed');
                    let queryString = '?para1=' + uid;
                    window.location.href = './edit.html' + queryString;
                    return false;
                }
            });

    });

    //code for email update request
    $('#emailbtn').click(function () {
        let email1 = document.getElementById('email').value;
        $.post('/useredit/updateemail',  //server request for email update
            {
                id: uid,
                email: email1
            },
            function (ob) {
                if (ob) {
                    var queryString = '?para1=' + uid;
                    window.location.href = './edit.html' + queryString;
                    return false;
                }
                else {
                    alert('updation failed');
                    let queryString = '?para1=' + uid;
                    window.location.href = './edit.html' + queryString;
                    return false;
                }
            });

    });

    //code for password update request
    $('#passwordbtn').click(function () {
        let password1 = document.getElementById('password').value;
        $.post('/useredit/updatepassword',  //server request for password update
            {
                id: uid,
                password: password1
            },
            function (ob) {
                if (ob) {
                    let queryString = '?para1=' + uid;
                    window.location.href = './edit.html' + queryString;
                    return false;
                }
                else {
                    alert('updation failed');
                    let queryString = '?para1=' + uid;
                    window.location.href = './edit.html' + queryString;
                    return false;
                }
            });

    });

    //code for phone update request
    $('#phonebtn').click(function () {
        let phone1 = document.getElementById('phone').value;
        $.post('/useredit/updatephone',  //server request for phone update
            {
                id: uid,
                phone: phone1
            },
            function (ob) {
                if (ob) {
                    let queryString = '?para1=' + uid;
                    window.location.href = './edit.html' + queryString;
                    return false;
                }
                else {
                    alert('updation failed');
                    let queryString = '?para1=' + uid;
                    window.location.href = './edit.html' + queryString;
                    return false;
                }
            });

    });

    //code for home page redirect 
    $('#home').click(function () {
        let queryString = '?para1=' + uid;
        window.location.href = '../userHome/home.html' + queryString;
        return false;
    });

    //code for log out 
    $('#logout_btn').click(function () {
        localStorage.removeItem('uid');
        window.location.href = '../../index.html';
        return false;
    });
});