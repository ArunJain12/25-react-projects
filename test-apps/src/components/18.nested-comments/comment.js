import { useState } from "react";

function Comment({ comment, handleAddReply }) {
    const [ reply, setReply ] = useState("");
    const [ showReplyCommentBox, setShowReplyCommentBox ] = useState(false);

    function handleCancel() {
        setShowReplyCommentBox(false);
        setReply("");
    }

    function handleSubmit() {
        handleAddReply(comment.id, reply);
        setShowReplyCommentBox(false);
        setReply("");
    }

    return (
        <li key={comment.id} className="comment-body-container">
            <div className="comment-body-view">
                <span>{comment.title}</span>
                {!showReplyCommentBox ? (
                    <button onClick={() => setShowReplyCommentBox(true)}>Add Reply</button>
                ) : null}
            </div>
            {showReplyCommentBox ? (
                <div className="comment-body-actions">
                    <textarea
                        rows={"2"}
                        cols={"20"}
                        value={reply}
                        onChange={(event) => setReply(event.target.value)}
                    />
                    <div className="reply-buttons-container">
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            ) : null}
            {comment?.children && comment.children.length > 0 && (
                <ul>
                    {comment.children.map(childComment => (
                        <Comment key={childComment.id} comment={childComment} handleAddReply={handleAddReply} />
                    ))}
                </ul>
            )}
        </li>
    )
}

export default Comment;