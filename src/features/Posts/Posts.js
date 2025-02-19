import React, { useEffect, useState } from "react";
import Post from "./Post";
import { filterPosts, getPostsFromJson } from "../../data/util";
import { useSelector } from "react-redux";
import { selectSearch } from "../Search/searchSlice";

const Posts = ({ posts }) => {
  const [allPosts, setAllPosts] = useState([]);
  const search = useSelector(selectSearch);

  useEffect(() => {
    if (Object.keys(posts).length > 0) {
      const getPosts = getPostsFromJson(posts);
      const filtertedPosts = filterPosts(getPosts, search);
      setAllPosts(filtertedPosts);
    }
  }, [posts, search]);

  return (
    <div className="posts-container">
      {allPosts.map((post, index) => {
        return <Post key={index} post={post} />;
      })}
    </div>
  );
};

export default Posts;
