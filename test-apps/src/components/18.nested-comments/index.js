import { useState } from "react";
import Comment from "./comment";
import "./nested-comments.css";

function NestedComments() {
    const [ inputValue, setInputValue ] = useState('');
    const [ comments, setComments ] = useState([
        {
            id: 1,
            title: 'This is first comment',
            children: [
                {
                    id: 2,
                    title: 'This is child comment one',
                    children: []
                },
                {
                    id: 3,
                    title: 'This is child comment two',
                    children: []
                },
                {
                    id: 4,
                    title: 'This is child comment three',
                    children: []
                }
            ]
        }
    ]);

    function newCommentStruct(text) {
        return {
            id: new Date().getTime(),
            title: text,
            children: []
        }
    }

    function handleNewComment() {
        setComments([newCommentStruct(inputValue), ...comments]);
        setInputValue("");
    }

    function handleAddReply(currentParentId, currentReply) {
        const updatedComments = [...comments];
        addReplyToExistingComment(updatedComments, currentParentId, currentReply);
    }

    function addReplyToExistingComment(updatedComments, currentParentId, currentReply) {
        for (let i = 0; i < updatedComments.length; i++) {
            const comment = updatedComments[i];
            if (comment.id === currentParentId) {
                comment.children.unshift(newCommentStruct(currentReply));
            }
        }

        for (let i = 0; i < updatedComments.length; i++) {
            const comment = updatedComments[i];
            addReplyToExistingComment(comment.children, currentParentId, currentReply);
        }
    }

    return (
        <div className="nested-comments-container">
            <h1>Nested Comments</h1>
            <div className="comments-wrapper">
                <textarea
                    value={inputValue}
                    rows={"5"}
                    cols={"100"}
                    onChange={(event) => setInputValue(event.target.value)}
                />
                <br/>
                <button className="add-comment-btn" onClick={handleNewComment}>Add Comment</button>
            </div>
            <ul>
                {comments.length > 0 && comments.map(comment => (
                    <Comment key={comment.id} comment={comment} handleAddReply={handleAddReply} />
                ))}
            </ul>
        </div>
    );
}

export default NestedComments;