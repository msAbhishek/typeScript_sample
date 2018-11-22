/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:33:30
 * @modify date 2018-09-13 12:33:30
 * @desc [description]
*/


$(document).ready(function () {

    let queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    let queries = queryString.split('=');
    let uid = queries[1];

    //code for home button  coloring       
    $('#adminsearchnav').css({
        'backgroundColor': '#333', 'color': '#ddd', 'opacity': '1'
    });

    //code for redircting to home page of admin
    $('#home').click(function () {
        let queryString = '?para1=' + uid;
        window.location.href = '../adminHome/admin.html' + queryString;
        return false;
    });

    //code for redirecting admin view  
    $('#adminview').click(function () {
        let queryString = '?para1=' + uid;
        window.location.href = '../adminView/adminview.html' + queryString;
        return false;
    });

    //code for log out 
    $('#logout_btn').click(function () {
        window.location.href = '../../index.html';
        return false;
    });

    //code for search  
    $('#search_bar').keyup(function () {
        let uname = document.getElementById('search_bar').value;
        //code for listing all users
        $.post('/adminsearch/list', { 'id':uid, 'uname': uname },  //server request for all users
            function (ob) {
                if (ob.stat) {
                    var text = `<div class="list">
                    <table class="ui very basic collapsing celled table" id="tbl1">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Employee Id</th>
                                <th>Phone</th>
                            </tr>
                        </thead><tbody>`;
                    for (var i = 0; i < ob.user.length; i++) {
                        text += `<tr> <td><h4 class="ui image header">
                    <img src="../../testimg/user_image/`+ ob.user[i].id + `.jpg" class="ui mini rounded image">
                    <div class="content">`+ ob.user[i].name + '<div class="sub header">' + ob.user[i].uname + `</div></div></h4></td>
                    <td id="mytd1">`+ ob.user[i].id + '</td><td>' + ob.user[i].phone + '</td><tr/>';
                    }
                    text += '</tbody></table></div>';
                    document.getElementById('demo').innerHTML = text;
                }
                else{
                    text='<h3 class="myh3">no user exist</h3>';
                    document.getElementById('demo').innerHTML = text;
                }
            });
    });


    //code for listing a selected user
    $(document).on( 'click', '#tbl1 tbody tr', function(){
        let text = '';
        text = $(this).find('#mytd1').text();
        $.post('/adminhome/listsingle', { 'id': text },  //server request for single users
            function (ob) {
                if (ob.stat) {
                    let text = `<div class="card1">
                                <div class="images1">
                                <img src="../../testimg/user_image/`+ ob.user.id + `.jpg" id="userImage" 
                                style="height: 200px;width: 200px; display: block; position: relative;">
                                </div>
                                <div class="details1" id="mydetails">
                                <h2>Name: `+ ob.user.name + `</h1>
                                <h3 id="h31">UserName: `+ ob.user.uname + `</h3>
                                <h3 id="h32">Email: `+ ob.user.email + `</h3>
                                <h3 id="h33">Address: `+ ob.user.address + `</h3>
                                <h3 id="h34">Phone: `+ ob.user.phone + `</h3>
                                </div></div>`;
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
});
