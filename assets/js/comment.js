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
            <a class="delete-comment" href="/delete/comment/${data.comment._id}"><i class="fa-solid fa-trash"></i></a>
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