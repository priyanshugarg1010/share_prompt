"use client";

import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

export const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchedText, setSearchedText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchedText = (e) => {};
  const handleTagClick = () => {};

  const fetchPosts = async () => {
    const res = await fetch("/api/prompt");
    const data = await res.json();
    setPosts(data);
    // console.log(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="search for a tag or a username"
            value={searchedText}
            onChange={handleSearchedText}
            required
            className="search_input peer"
          />
        </form>
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      </section>
    </>
  );
};

export default Feed;
