class ToggleLike{
    constructor(toggleElement) {
        this.likeLink = toggleElement;
        this.toggleLike();
    }

    toggleLike() {
        $(this.likeLink).click(function (event) {
            event.preventDefault();
            let self = this;
            $.ajax({
                type: 'get',
                url: $(self).attr('href'),
                success: function (data) {
                    let likeCount = parseInt($(self).attr('data-likes'));
                    console.log(likeCount);
                    if (data.data.deleted) {
                        likeCount--;
                    }
                    else {
                        likeCount++;
                    }
                    $(self).attr('data-likes', likeCount);
                    $(self).find('.likeCount').html(likeCount);
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
        })
    }
}
