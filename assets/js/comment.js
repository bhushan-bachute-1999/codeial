{
    let createComment = function () {
        let commentForm = $('.new-comment-form');

        commentForm.submit(function (event) {
            event.preventDefault();
            
            $.ajax({
                type: 'post',
                url: '/user/create-comment',
                data: commentForm.serialize(),
                success: function (data) {
                    let newComment = newCommentDOM(data.data);
                    $('.display-comments').prepend(newComment);
                    deleteComment(' .delete-comment', newComment);
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

    let newCommentDOM = function (data) {
        return $(`
        <li id="comment-${data.comment._id}">
            <h4>
                <i class="fa-solid fa-user"></i>
                ${data.comment.user.name}
            </h4>
            <p>${data.comment.content}</p>
            <div class="post-footer">
                <div class="like-comment">
                    <a class="like-comments" href="/user/like/?id=${data.comment.id}&type=Comment" data-likes="${data.comment.likes.length}">
                        <span class="likeCount">
                            ${data.comment.likes.length}
                        </span>
                        <i class="fa-regular fa-heart"></i></i>
                    </a>
                    <a href="/user/comment/?id=${data.comment._id}">
                        <span>
                            0
                        </span>
                        <i class="fa-regular fa-comment"></i>
                    </a>
                    <a href="/user/share">
                        <span>0</span>
                        <i class="fa-solid fa-share"></i>
                    </a>
                </div>
                <div class="delete">
                    <a class="delete-post-button" href="/delete/post/?id=${data.comment._id}"><i class="fa-solid fa-trash"></i></a>
                </div>
            </div>
        </li>`)
    }

    let deleteComment = function (deleteLink) {
        $(deleteLink).click(function (event) {
            event.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#comment-${data.data.commentId}`).remove();
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

    let loopComments = function () {
        let ul = $('.display-comments');
        for (let u of ul) {
            deleteComment('.delete-comment');
        }
    }

    loopComments();
    createComment();
}