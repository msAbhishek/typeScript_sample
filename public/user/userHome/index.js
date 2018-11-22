/**
 * @author [Abhishek m s]
 * @email [abhishekmsams54@gmail.com]
 * @create date 2018-09-13 12:31:35
 * @modify date 2018-09-13 12:31:35
 * @desc [description]
*/
$(document).ready(function () {
    let queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    let queries = queryString.split('=');
    let uid = queries[1];
    // var imgString;
    // var uid = localStorage.getItem('uid');

    //server request for user details retrival
    $.post('/userhome/getdetails',
        {
            id: uid
        },
        function (ob) {
            if (ob.stat) {
                $('h2').html(ob.name);
                $('#h31').html(ob.email);
            }
            else {
                alert('server error');
                window.location.href = '../../index.html';
                return false;

            }
        });

    //code for user image retrival
    $('#userImage')
        .attr('src', '../../testimg/user_image/' + uid + '.jpg')
        .width(200)
        .height(200);

    //code for home button  coloring       
    $('#homeNav').css({
        'backgroundColor': '#333', 'color': '#ddd', 'opacity': '1'
    });

    //code for triggering file input button 
    $('#btnSubmit').click(function () {
        $('#imgupload').trigger('click');
    });

    //code for selecting user selected image for uploading
    $('#imgupload').on('change', function () {
        if (this.files && this.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                $('#userImage')
                    .attr('src', e.target.result)
                    .width(200)
                    .height(200);
            };
            reader.onloadend = function () {
                let imgString = this.result;
                $.post('/userhome/uploadImage', { id: uid, img: imgString });
            };
            // var fileName = this.files[0];
            reader.readAsDataURL(this.files[0]);
        }
    });

    //code for edit page redirect 
    $('#about').click(function () {
        let queryString = '?para1=' + uid;
        window.location.href = '../userEdit/edit.html' + queryString;
        return false;
    });

    //code for log out 
    $('#logout_btn').click(function () {
        localStorage.removeItem('uid');
        window.location.href = '../../index.html';
        return false;
    });
});
