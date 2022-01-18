import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchAllPosts,
  setCurrentPage,
  setNextPage,
  setPrevPage,
} from "../features/list/slice";

const Posts = () => {
  const { posts, currentPage, isLoading, pagesLength, currentPosts } =
    useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const pages = [];

  for (let i = 1; i <= pagesLength; i++) {
    pages.push(i);
  }

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <div className="container">
      {isLoading && <h1 className="posts">downloading posts</h1>}

      {!isLoading && posts.length === 0 && <h1>nothing found</h1>}

      {posts.length > 0 && !isLoading && (
        <div className="posts">
          {currentPosts.map((post) => {
            return (
              <div className="post" key={post.id}>
                {post.title}
              </div>
            );
          })}
        </div>
      )}

      {posts.length > 0 && (
        <div className="pages">
          <span className="pageArr" onClick={() => dispatch(setPrevPage())}>
            prev
          </span>
          {pages.map((page, index) => (
            <span
              key={index}
              className={currentPage === page ? "currentPage" : "page"}
              onClick={() => dispatch(setCurrentPage(page))}
            >
              {page}
            </span>
          ))}
          <span className="pageArr" onClick={() => dispatch(setNextPage())}>
            next
          </span>
        </div>
      )}
    </div>
  );
};

export default Posts;
