import React from "react";
import Comment from "./Comment";

const Comments = ({ commentsObject }) => {
  if (!commentsObject) {
    console.log(commentsObject);
    return "";
  }

  const makeRepliesRecursively = (replies) => {
    if (replies.length < 1) {
      return null;
    }

    return replies.map((reply, index) => {
      return (
        <div className="indent-comment">
          <Comment key={index} comment={reply} />
          {makeRepliesRecursively(reply.replies)}
        </div>
      );
    });
  };

  return (
    <div>
      {commentsObject.map((comment, index) => {
        return (
          <div className="comment-block">
            <Comment key={index} comment={comment} />

            {makeRepliesRecursively(comment.replies)}
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
