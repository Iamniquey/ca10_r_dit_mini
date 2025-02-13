import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getPostsFromJson } from "../../data/util";

const Posts = ({ posts }) => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const getPosts = getPostsFromJson(posts);
    setAllPosts(getPosts);
  }, [posts]);

  return (
    <div>
      
      
      {allPosts.map((post, index) => {
        return <Post key={index} post={post} />;
      })}
    </div>
  );
};

export default Posts;
