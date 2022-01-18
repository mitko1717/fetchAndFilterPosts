import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterPosts,
  fetchAllPosts,
  searchPosts,
  showAllPosts,
} from "../features/list/slice";

const FilteredSearch = () => {
  const { filteredPosts, showFiltered } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const inputRef = useRef("");
  const filterList = () => {
    dispatch(filterPosts(inputRef.current.value));
  };

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch, inputRef.current.value]);

  return (
    <div className="filter">
      <input
        type="text"
        ref={inputRef}
        name=""
        placeholder="search"
        onChange={filterList}
      />

      <button
        onClick={() => {
          dispatch(searchPosts(inputRef.current.value));
          inputRef.current.value.length !== 0 &&
            window.alert(`you searched: ${inputRef.current.value}`);
        }}
      >
        search
      </button>
      <button
        onClick={() => {
          dispatch(showAllPosts());
          inputRef.current.value = "";
        }}
      >
        show all posts
      </button>

      {showFiltered && (
        <div className="filteredList">
          <h4 className="found">found {filteredPosts.length} posts</h4>
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="filteredPost"
              onClick={() => {
                inputRef.current.value = `${post.title}`;
                dispatch(filterPosts(inputRef.current.value));
              }}
            >
              {post.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilteredSearch;
