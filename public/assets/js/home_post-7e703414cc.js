{let e=function(){let e=$(".new-post-form");e.submit(function(o){o.preventDefault(),$.ajax({type:"post",url:"/user/post",data:e.serialize(),success:function(e){let o=s(e.data);$(".display-posts").prepend(o),t(" .delete-post-button",o);let n=$(`#post-${e.data.post._id} .like-posts`);new ToggleLike(n);new Noty({type:"success",layout:"topCenter",text:e.message,theme:"relax",timeout:"300"}).show()},error:function(e){console.log(e.responseText)}})})},s=function(e){return console.log(e),$(`\n            <li id="post-${e.post._id}">\n                <h4>\n                    <i class="fa-solid fa-user"></i>\n                    ${e.user_name}\n                </h4>\n                <p>\n                    ${e.post.content}\n                </p>\n                <div class="post-footer">\n                    <div class="like-comment">\n                            <a class="like-posts" href="/user/like/?id=${e.post._id}&type=Post" data-likes="${e.post.likes.length}"><span class="likeCount">${e.post.likes.length}</span><i class="fa-regular fa-heart"></i></i></a>\n                            <a href="/user/comment/?id=${e.post._id}"><span>${e.post.comment.length}</span><i class="fa-regular fa-comment"></i></a>\n                            <a href="/user/share"><span>0</span><i class="fa-solid fa-share"></i></a>\n                    </div>\n                    <div class="delete">\n                        <a href=""><i class="fa-solid fa-ellipsis-vertical"></i></a>\n                        <a class="delete-post-button" href="/delete/post/?id=${e.post._id}"><i class="fa-solid fa-trash"></i></a>\n                    </div>\n                </div>\n            </li>`)},t=function(e){$(e).click(function(s){s.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$(`#post-${e.data.postId}`).remove(),new Noty({type:"success",layout:"topCenter",text:e.message,theme:"relax",timeout:"300"}).show()},error:function(e){console.log(e.responseText)}})})};(function(){let e=$(".display-posts");for(let s of e)t(".delete-post-button")})(),e()}