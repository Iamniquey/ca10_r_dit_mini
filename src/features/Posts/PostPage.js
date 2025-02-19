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
import {
  getCommentsArrayFromPostPageJson,
  getDeletedCountFromJson,
} from "../../data/util";
import Comments from "../Comments/Comments";

//const postPage = pageObject; for testing

const PostPage = () => {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const post = useSelector(selectPost); //post detals from allposts - does not include comments
  const postPage = useSelector(selectPostPage); // post data from api call - includes comments
  const comments = useSelector(selectComments);
  const [commentsObject, setCommentsObject] = useState([]);
  const [deletedCount, setDeletedCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      dispatch(getPostPage(post.url));
    }
  }, [dispatch, post]);

  useEffect(() => {
    //not null and has content
    if (postPage && Object.keys(postPage).length > 0) {
      const commObj = getCommentsArrayFromPostPageJson(postPage);
      const deleted = getDeletedCountFromJson(postPage);
      dispatch(getComments(commObj));
      setCommentsObject(commObj);
      setDeletedCount(deleted);
    }
  }, [postPage]);

  if (post.title !== decodedTitle) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {!postPage ? (
        <div className="error-message">
        Due to the API request limit, posts cannot be displayed at this time.
        Please wait about a minute for the limit to reset, then reload the page.
      </div>
      ) : (
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
            {comments.length > 0 ? <Comments commentsObject={comments} /> : ""}
            <div className="deleted">{deletedCount} deleted comments</div>
          </div>
        </>
      )}
    </>
  );
};

export default PostPage;
