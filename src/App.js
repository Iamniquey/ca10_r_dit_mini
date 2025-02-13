import { useDispatch, useSelector } from "react-redux";
import "./App.css";
//import { addPost } from "./features/Posts/postsSlice";
import { selectPosts } from "./features/Posts/postsSlice";
import { getPosts } from "./features/Posts/postsSlice";
import { postsDataObject } from "./data/postsDataObject";
import { useEffect } from "react";

import Posts from "./features/Posts/Posts";

const posts = postsDataObject;

function App() {
  const dispatch = useDispatch();
  //const posts = useSelector(selectPosts);

  return (
    <div>
      
      <Posts posts={posts} />
      {/* <button onClick={()=>{dispatch(getPosts());
        
      }}>Button</button> */}
    </div>
  );
}

export default App;
