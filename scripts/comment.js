(function(){
    'use strict';

    window.onload = function () {

        var page = document.getElementById('current-page'), //Get element form hidden field which has page name as value <input type="hidden" value="education" />
            lsKey = 'cvComments', //Build ls key like this 'cv' + page
            commentButton = document.getElementById('add-comment'),
            commentTextArea = document.getElementById('comment-text'),
            commentsContainer = document.getElementById('comments-container'),
            userName = document.getElementById('user-name'),
			userEmail = document.getElementById('user-email');
			
        commentButton.onclick = function () {
            addNewComment(commentTextArea.value, userName.value, userEmail.value);
            saveCommentToLs();
            clearCommentTextArea();
        };

        function addNewComment (commentText, userName, userEmail) {
            var newCommentElm = document.createElement('p');
			newCommentElm.classList.add('open');
            newCommentElm.innerText = userName + ': ' + commentText;
			commentsContainer.appendChild(newCommentElm);
			newCommentElm = document.createElement('p');
			newCommentElm.classList.add('openly');
			newCommentElm.innerText = userEmail;
			commentsContainer.appendChild(newCommentElm);
        };

        function clearCommentTextArea () {
            commentTextArea.value = '';
        };

        function getCommentsFromLs () {
            var commentsString = localStorage.getItem(lsKey);
            return JSON.parse(commentsString);
        };

        function saveCommentToLs () {
            var comments = getCommentsFromLs(),
                newComment = {
                    userName: userName.value,
                    commentText: commentTextArea.value,
					userEmail: userEmail.value
                };
            comments.push(newComment);
            localStorage.setItem(lsKey, JSON.stringify(comments));
        };

        function outputComments () {
            var comments = getCommentsFromLs();
            for (var i = 0; i < comments.length; i++) {
                addNewComment(comments[i].commentText, comments[i].userName, comments[i].userEmail);
            }
        };


        var init = function () {
            if (localStorage.getItem(lsKey) == null) {
                localStorage.setItem(lsKey, '[]');
            }
            outputComments();
        };

        init();

    };

})()