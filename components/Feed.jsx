"use client";

import { useState, useEffect, useRef } from "react";
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
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchEx, setSearchEx] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearchedText = (e) => {
    clearTimeout(searchTimeOut);

    setSearchedText(e.target.value);
    setSearchEx(false);
    setSearchTimeOut(
      setTimeout(() => {
        const result = filterPrompts(e.target.value);
        setSearchResult(result);
      }, 500)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchedText(tagName);

    const result = filterPrompts(tagName);
    setSearchEx(ture);

    setSearchResult(result);
    searchInputRef.current.blur();
  };

  const fetchPosts = async () => {
    const res = await fetch("/api/prompt");
    const data = await res.json();
    setPosts(data);
    // console.log(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchedText) => {
    const regex = new RegExp(searchedText, "i");

    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // You can choose to perform the search here if needed (e.g., setSearchResult())
    // setSearchResult();

    setSearchEx(true);
    searchInputRef.current.blur();
  };

  return (
    <>
      <section className="feed">
        <form className="relative w-full flex-center " onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search for a tag or a username"
            value={searchedText}
            onChange={handleSearchedText}
            required
            className={`search_input peer ${searchEx ? "search_executed" : ""}`}
            ref={searchInputRef}
          />
        </form>
        {searchedText ? (
          searchResult && searchResult.length > 0 ? ( // Check if searchResult is not empty
            <PromptCardList
              data={searchResult}
              handleTagClick={handleTagClick}
            />
          ) : (
            <p>No results found.</p> // Display a message if searchResult is empty
          )
        ) : (
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        )}
      </section>
    </>
  );
};

export default Feed;
