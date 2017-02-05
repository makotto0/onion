function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function postComment() {
    var comment = document.getElementById("comment_area").value ;
    var div = document.getElementById( 'test_div' );
    div.innerHTML = comment;
    insertAfter(div, div);
}


