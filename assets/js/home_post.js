{
    let createPost = function () {
        let newPostForm = $(".new-post-form");

        newPostForm.submit(function (event) {
            event.preventDefault();

            $.ajax({
                type: 'post',
                url: '/user/post',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data);
                    $('.display-posts').prepend(newPost);
                    deletePost(' .delete-post-button', newPost);
                    new Noty({
                        type: 'success',
                        layout: 'topCenter',
                        text: data.message,
                        theme: 'relax',
                        timeout: '300'
                    }).show();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            })
        });
    }

    let newPostDom = function (data) {
        console.log(data);
        return $(`
            <li id="post-${data.post._id}">
                <h4>
                    <i class="fa-solid fa-user"></i>
                    ${data.user_name}
                </h4>
                <p>
                    ${data.post.content}
                </p>
                <div class="post-footer">
                    <div class="like-comment">
                        <a class="like-posts" href="/user/like"><i class="fa-regular fa-heart"></i></i></a>
                        <a href="/user/comment/?id=${data.post._id}"><i class="fa-regular fa-comment"></i></a>
                        <a href="/user/share"><i class="fa-solid fa-share"></i></a>
                    </div>
                    <div class="delete">
                        <a href=""><i class="fa-solid fa-ellipsis-vertical"></i></a>
                        <a class="delete-post-button" href="/delete/post/?id=${data.post._id}"><i class="fa-solid fa-trash"></i></a>
                    </div>
                </div>
            </li>`)
    }

    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (event) {
            event.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.postId}`).remove();
                    new Noty({
                        type: 'success',
                        layout: 'topCenter',
                        text: data.message,
                        theme: 'relax',
                        timeout: '300'
                    }).show();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    let loopPost = function () {
        let ul = $(`.display-posts`);
        for (let u of ul) {
            deletePost('.delete-post-button');
        }
    }
    loopPost();
    createPost();
}