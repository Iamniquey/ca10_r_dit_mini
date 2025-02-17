import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  getPostPage,
  selectPost,
  selectPostPage,
} from "../CurrentPost/currentPostSlice";
import { getComments, selectComments } from "../Comments/commentsSlice";
import { pageObject } from "../../data/pageObject";
import { getCommentsArrayFromPostPageJson } from "../../data/util";
import Comments from "../Comments/Comments";

const postPage = pageObject;

const PostPage = () => {
  const { title } = useParams();
  const post = useSelector(selectPost);
  //const postPage = useSelector(selectPostPage);
  const comments = useSelector(selectComments);
  const [commentsObject, setCommentsObject] = useState([]);
  const dispatch = useDispatch();

  const handleCommentLoad = () => {};

  useEffect(() => {
    if (Object.keys(comments).length < 1) {
      //dispatch(getPostPage(post.url));
      const commObj = getCommentsArrayFromPostPageJson(postPage);
      setCommentsObject(commObj);
      console.log(commObj);
    }
  }, [comments]);
  if (post.title !== title) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="post">
        <Link to="/">
          <div className="arrow-left"></div>
        </Link>
        <div className="name">u/{post.name}</div>

        <div className="title">{post.title}</div>

        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
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
      <div className="comments">
        {commentsObject.length > 0 ? (
          <Comments commentsObject={commentsObject} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PostPage;
