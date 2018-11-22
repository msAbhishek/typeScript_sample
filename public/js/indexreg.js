/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:32:26
 * @modify date 2018-09-13 12:32:26
 * @desc [description]
*/

$(document).ready(function () {
    let nameFlag = false;
    let unameFlag = false;
    let addressFlag = false;
    let emailFlag = false;
    let passwordFlag = false;
    let phoneFlage = false;
    let cpasswordFlag = false;

    //code for name validation
    $('#name').keyup(function () {
        let regx = /^[a-z ,.'-]+$/i;
        let name = document.getElementById('name').value;
        if ((name != '') && (name.length >=3) && (regx.test(name))) {
            nameFlag = true;
            $('#name').css('color', 'green');
            $('.nameSpan').css('visibility', 'hidden');
            if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
                $('.btnSpan').css('visibility', 'hidden');
            }
        }
        else {
            nameFlag = false;
            $('.nameSpan').css('visibility', 'visible');
            $('#name').css('color', 'red');

        }
    });

    //code for username validation 
    $('#uname').keyup(function () {
        let userName = document.getElementById('uname').value;
        if ((userName != '') && (userName.length >=3)) {
            $.post('/checkusername', //server request for username existance check
                {
                    uname: userName
                },
                function (ob) {
                    if (!ob.stat) {
                        unameFlag = true;
                        $('#uname').css('color', 'green');
                        $('.unameSpan').css('visibility', 'hidden');
                    }
                    else {
                        unameFlag = false;
                        $('#uname').css('color', 'red');
                        $('.unameSpan').text('uname already exist');
                        $('.unameSpan').css('visibility', 'visible');
                    }

                });
            if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
                $('.btnSpan').css('visibility', 'hidden');
            }
        }
        else {
            unameFlag = false;
            $('.unameSpan').text('enter a valid name');
            $('.unameSpan').css('visibility', 'visible');
            $('#uname').css('color', 'red');
        }
    });

    //code for address validation
    $('#address').keyup(function () {
        let address = document.getElementById('address').value;
        if (address != '') {
            addressFlag = true;
            $('#address').css('color', 'green');
            $('.addressSpan').css('visibility', 'hidden');
            if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
                $('.btnSpan').css('visibility', 'hidden');
            }
        }
        else {
            addressFlag = false;
            $('.addressSpan').css('visibility', 'visible');
            $('#address').css('color', 'red');
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
            if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
                $('.btnSpan').css('visibility', 'hidden');
            }
        }
        else {
            emailFlag = false;
            $('.emailSpan').css('visibility', 'visible');
            $('#email').css('color', 'red');
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
            if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
                $('.btnSpan').css('visibility', 'hidden');
            }
            if (event.keyCode === 13) {
                $('#reg-button').click();
            }
        }
        else {
            phoneFlage = false;
            $('.phoneSpan').css('visibility', 'visible');
            $('#phone').css('color', 'red');
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

        }
    });

    //code for password match
    $('#cpassword').keyup(function () {
        let cpassword = document.getElementById('cpassword').value;
        let password = document.getElementById('password').value;
        if (cpassword == password) {
            cpasswordFlag = true;
            $('#cpassword').css('color', 'green');
            $('.cpasswordSpan').css('visibility', 'hidden');
            if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
                $('.btnSpan').css('visibility', 'hidden');
            }
        }
        else {
            cpasswordFlag = false;
            $('.cpasswordSpan').css('visibility', 'visible');
            $('#cpassword').css('color', 'red');
        }
    });

    //code for new user registrarion request
    $('#reg-button').click(function () {
        if (nameFlag && unameFlag && addressFlag && emailFlag && passwordFlag && phoneFlage && cpasswordFlag) {
            $('.btnSpan').css('visibility', 'hidden');
            let name1 = document.getElementById('name').value;
            let uname1 = document.getElementById('uname').value;
            let address1 = document.getElementById('address').value;
            let email1 = document.getElementById('email').value;
            let password1 = document.getElementById('password').value;
            let phone1 = document.getElementById('phone').value;
            $.post('/reg',  //server request for user registrarion
                {
                    name: name1,
                    uname: uname1,
                    address: address1,
                    email: email1,
                    password: password1,
                    phone: phone1

                },
                function (ob) {
                    if (ob) {
                        alert('registration successfull');
                        window.location.href = '../index.html';
                        return false;
                    }
                    else {
                        alert('registration unsuccessfull');
                    }
                });
        }
        else {
            $('.btnSpan').css('visibility', 'visible');
        }
    });

    //code for name validation
    $('#redirect').click(function () {
        window.location.href = '../index.html';
        return false;
    });
});
