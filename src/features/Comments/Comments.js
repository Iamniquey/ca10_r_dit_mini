import React from "react";
import Comment from "./Comment";

const Comments = ({ commentsObject }) => {
  if (!commentsObject) {
    console.log(commentsObject);
    return "";
  }

  const makeRepliesRecursively = (replies) => {
    if (!replies || replies.length < 1) {
      return null;
    }

    return replies.map((reply) => {
      return (
        <div key={reply.id} className="indent-comment">
          <Comment comment={reply} />
          {makeRepliesRecursively(reply.replies)}
        </div>
      );
    });
  };

  return (
    <div>
      {commentsObject.map((comment) => {
        return (
          <div key={comment.id} className="comment-block">
            <Comment comment={comment} />

            {makeRepliesRecursively(comment.replies)}
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
