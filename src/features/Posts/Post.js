import React from "react";
import { Link } from "react-router-dom";
import { addCurrentPost } from "../CurrentPost/currentPostSlice";
import { useDispatch } from "react-redux";
import he from "he";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const decodeContent = he.decode(post.content);
  const decodeTitleForDisplay = he.decode(post.title);
  const encodeTitleForParam = encodeURIComponent(post.title);

  const handleClick = () => {
    dispatch(addCurrentPost(post));
  };

  return (
    <div className="post">
      <div className="name">u/{post.name}</div>

      <Link
        onClick={handleClick}
        className="post-link"
        to={`/post/${encodeTitleForParam}`}
      >
        <div className="title">
          {decodeTitleForDisplay} <div className="arrow-right"></div>
        </div>
      </Link>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: decodeContent.slice(0, 330) + "...",
        }}
      />
      <div className="lower-area">
        <div className="votes">
          <div className="arrow-up"></div>
          <div className="votes-number">{post.upvotes}</div>
          <div className="arrow-down"></div>
        </div>
        <div className="comments">
          {post.comments} {post.comments === 1 ? "Comment" : "Comments"}
        </div>
      </div>
    </div>
  );
};

export default Post;
