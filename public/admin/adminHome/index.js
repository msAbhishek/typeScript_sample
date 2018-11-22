/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:33:45
 * @modify date 2018-09-13 12:33:45
 * @desc [description]
*/
$(document).ready(function () {

    let queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    let queries = queryString.split('=');
    let uid = queries[1];
    //code for home button  coloring       
    $('#homeNav').css({
        'backgroundColor': '#333', 'color': '#ddd', 'opacity': '1'
    });

    //code for listing all users
    $.post('/adminhome/listall', {},  //server request for all users
        function (ob) {
            if (ob.stat) {
                let text = '<tbody>';
                for (let i = 0; i < ob.count; i++) {
                    text += `<tr> <td><h4 class="ui image header">
                        <img src="../../testimg/user_image/`+ ob.user[i].id + `.jpg" class="ui mini rounded image">
                        <div class="content">`+ ob.user[i].name + '<div class="sub header">' + ob.user[i].uname + `</div></div></h4></td>
                        <td id="mytd">`+ ob.user[i].id + '</td><td>' + ob.user[i].phone + '</td><tr/>';
                }
                text += '</tbody>';
                document.getElementById('demo').innerHTML = text;
            }
            else {
                alert('server error');
            }
        });


    //code for listing a selected user
    $('#tbl tbody').on('click', 'tr', function () {
        // var row = $(this).text();
        let text = '';
        text = $(this).find('#mytd').text();
        $.post('/adminhome/listsingle', { 'id': text },  //server request for single users
            function (ob) {
                if (ob.stat) {
                    let text = `<div class="card1">
                                <div class="images1">
                                <img src="../../testimg/user_image/`+ ob.user.id + `.jpg" id="userImage" 
                                style="height: 200px;width: 200px; display:block; position: absolute;">
                                </div>
                                <div class="details1" id="mydetails">
                                <h2>Name: `+ ob.user.name + `</h1>
                                <h3 id="h31">UserName: `+ ob.user.uname + `</h3>
                                <h3 id="h32">Email: `+ ob.user.email + `</h3>
                                <h3 id="h33">Address: `+ ob.user.address + `</h3>
                                <h3 id="h34">Phone: `+ ob.user.phone + `</h3>
                                
                                <input type="button" class="btn" id="admin-previlage-button" 
                                value="Make admin" style="display:inline-block; width: 124px !important">
                                <input type="button" class="btn" id="delete-button" 
                                value="Delete user" style="display:inline-block; width: 124px !important"></div></div>`;
                    document.getElementById('card').innerHTML = text;
                }
                else {
                    alert('server error');
                }
            });

    });

    // code for hiding slected user details on focus out
    $(document).on( 'click', '.jumbotron', function(){
        $(this).find('.card1').hide();
    } );

    //code for giving admin privillage
    $(document).on('click', '#admin-previlage-button', function () {
        let uname = document.getElementById('h31').innerHTML;
        let fields = uname.split(' ');
        $.post('/adminhome/makeasadmin', { 'uname': fields[1] },  //server request for making a  user as admin
            function (ob) {
                if (ob) {
                    alert('operation successfull');
                    let queryString = '?para1=' + uid;
                    window.location.href = './admin.html' + queryString;
                    return false;
                }
                else {
                    alert('server error');
                }
            });
    });

    //code for deleting user
    $(document).on('click', '#delete-button', function () {
        let uname = document.getElementById('h31').innerHTML;
        let fields = uname.split(' ');
        $.post('/adminhome/deleteuser', { 'uname': fields[1] },  //server request for deleting a user 
            function (ob) {
                if (ob) {
                    alert('operation successfull');
                    let queryString = '?para1=' + uid;
                    window.location.href = './admin.html' + queryString;
                    return false;
                }
                else {
                    alert('server error');
                }
            });
    });

    //code for log out 
    $('#logout_btn').click(function () {
        window.location.href = '../../index.html';
        return false;
    });

    //code for redirecting admin view  
    $('#adminview').click(function () {
        let queryString = '?para1=' + uid;
        window.location.href = '../adminView/adminview.html'+queryString;
        return false;
    });

    //code for redirecting admin search  
    $('#search').click(function () {
        let queryString = '?para1=' + uid;
        window.location.href = '../adminSearch/search.html'+queryString;
        return false;
    });
});
