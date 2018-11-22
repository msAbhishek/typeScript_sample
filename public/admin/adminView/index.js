/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:33:07
 * @modify date 2018-09-13 12:33:07
 * @desc [description]
*/

$(document).ready(function(){
    //code for home button  coloring       
    $('#adminviewnav').css({
        'backgroundColor': '#333', 'color': '#ddd', 'opacity': '1'
    });
    let queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    let queries = queryString.split('=');
    let uid = queries[1];

    //code for redircting to home page of admin
    $('#home').click(function () {
        let queryString = '?para1=' + uid;
        window.location.href = '../adminHome/admin.html'+queryString;
        return false;
    }); 

    //code for redirecting admin search  
    $('#search').click(function () {
        let queryString = '?para1=' + uid;
        window.location.href = '../adminSearch/search.html'+queryString;
        return false;
    });

    //code for log out 
    $('#logout_btn').click(function () {
        window.location.href = '../../index.html';
        return false;
    });

    //code for listing all admins
    $.post('/adminview/listall', {'id':uid},  //server request for all users
        function (ob) {
            if (ob.stat) {
                let text = '<tbody>';
                for (var i = 0; i < ob.count; i++) {
                    text += `<tr> <td><h4 class="ui image header">
                        <img src="../../testimg/user_image/`+ ob.user[i].id + `.jpg" class="ui mini rounded image">
                        <div class="content">`+ ob.user[i].name + '<div class="sub header">' + ob.user[i].uname + `</div></div></h4></td>
                        <td id="mytd">`+ ob.user[i].id + '</td><td>' + ob.user[i].phone + '</td><tr/>';
                }
                text += '</tbody>';
                document.getElementById('demo').innerHTML = text;
            }
            else{
                alert('server error');
                window.location.href = '../../index.html';
                return false;
            }
        });

    //code for listing a selected admin
    $('#tbl tbody').on('click', 'tr', function () {
        // var row = $(this).text();
        let text = '';
        text = $(this).find('#mytd').text();
        $.post('/adminview/listsingle', { 'id': text },  //server request for single admin
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
                                <h3 id="h34">Phone: `+ ob.user.phone + '</h3>';
                    document.getElementById('card').innerHTML = text;
                }
                else {
                    alert('server error');
                }
            }
        );
    });

    // code for hiding slected user details on focus out
    $(document).on( 'click', '.jumbotron', function(){
        $(this).find('.card1').hide();
    } );

});
