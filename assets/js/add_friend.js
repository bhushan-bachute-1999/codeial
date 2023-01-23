{
    let addFriend = function () {
        let btn = $(".add-friend");
        btn.click(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: btn.attr('href'),
                success: function (data) {
                    if (data.data.added) {
                        btn.html('Remove friend');
                    }
                    else {
                        btn.html('Add friend');
                    }
                    console.log(btn[0]);
                    new Noty({
                        type: 'success',
                        layout: 'topCenter',
                        text: data.message,
                        theme: 'relax',
                        timeout: '300'
                    }).show();
                },
                error: function (error) {
                    console.log("Error in adding friend using AJAX",error.responseText);
                }
            })
        })
    }
    addFriend();
}