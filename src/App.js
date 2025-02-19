import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { selectPosts, isLoadingPosts } from "./features/Posts/postsSlice";
import { getPosts } from "./features/Posts/postsSlice";
import { useEffect, useState } from "react";

import Posts from "./features/Posts/Posts";
import Loading from "./features/Loading/Loading";

// // for testing
//import { postsDataObject } from "./data/postsDataObject";
// const posts = postsDataObject;

function App() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(isLoadingPosts);

  const [postsObject, setPostsObject] = useState({});

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts && Object.keys(posts).length > 0) {
      setPostsObject(posts);
    }
  }, [posts]);

  if(isLoading){
    return <div>Loading</div>;
  }

  return (
    <div>
      <Loading />
      {!posts ? (
        <div className="error-message">
          Due to the API request limit, posts cannot be displayed at this time.
          Please wait about a minute for the limit to reset, then reload the page.
        </div>
      ) : (
        <Posts posts={postsObject} />
      )}
    </div>
  );
}

export default App;
