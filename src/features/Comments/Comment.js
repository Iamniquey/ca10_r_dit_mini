import React from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      <div className="comment-name">{comment.name}</div>
      <div className="comment-comment" dangerouslySetInnerHTML={{ __html: comment.comment }}></div>
    </div>
  );
};

export default Comment;
