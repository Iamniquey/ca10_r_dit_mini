import React from "react";

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="name">u/{post.name}</div>
      <div className="title">{post.title}</div>
      <div className="content">
        {post.content ? `${post.content.slice(0, 300)}...` : ""}
      </div>
      <div className="lower-area">
        <div className="upvotes">
          <div className="arrow-up"></div>
          <div className="votes-number"></div>
          <div className="arrow-up"></div>
          {post.upvotes}
        </div>
        <div className="comments">{post.comments}</div>
      </div>
    </div>
  );
};

export default Post;
