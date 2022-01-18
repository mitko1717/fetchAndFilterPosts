import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

// export const fetchPosts = createAsyncThunk(
//   "slice/fetchUsers",
//   async (currentPage) => {
//     const result = await fetch(
//       `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}`
//     ).then((res) => res.json());
//     return result;
//   }
// );

export const fetchAllPosts = createAsyncThunk(
  "slice/fetchUsersAll",
  async () => {
    const result = await fetch(
      `https://jsonplaceholder.typicode.com/posts`
    ).then((res) => res.json());
    return result;
  }
);

const initialState = {
  posts: [],
  initialPosts: [],
  filteredPosts: [],
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  isLoading: false,

  pagesLength: 0,

  indexOfLastPost: 0,
  indexOfFirstPost: 0,
  currentPosts: [],
  showFiltered: false,
};

export const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;

      state.indexOfLastPost = state.currentPage * state.perPage;
      state.indexOfFirstPost = state.indexOfLastPost - state.perPage;
      state.currentPosts = state.posts.slice(
        state.indexOfFirstPost,
        state.indexOfLastPost
      );
    },

    searchPosts(state, action) {
      if (action.payload.length > 0) {
        state.posts = state.filteredPosts;

        state.pagesLength = Math.ceil(state.posts.length / state.perPage);

        state.currentPosts = state.posts.slice(
          state.indexOfFirstPost,
          state.indexOfLastPost
        );

        state.currentPage = 1;

        state.showFiltered = false;
      }

      console.log(current(state));
    },

    showAllPosts(state) {
      state.posts = state.initialPosts;
      state.currentPage = 1;

      state.indexOfLastPost = state.currentPage * state.perPage;
      state.indexOfFirstPost = state.indexOfLastPost - state.perPage;
      state.currentPosts = state.posts.slice(
        state.indexOfFirstPost,
        state.indexOfLastPost
      );

      state.pagesLength = Math.ceil(state.posts.length / state.perPage);

      state.currentPosts = state.posts.slice(
        state.indexOfFirstPost,
        state.indexOfLastPost
      );
    },

    filterPosts(state, action) {
      if (action.payload.length !== 0) {
        state.showFiltered = true;
        state.filteredPosts = state.initialPosts.filter((post) =>
          post.title.toLowerCase().includes(action.payload)
        );

        state.pagesLength = Math.ceil(state.posts.length / state.perPage);

        state.currentPosts = state.posts.slice(
          state.indexOfFirstPost,
          state.indexOfLastPost
        );
      } else state.showFiltered = false;
    },

    setNextPage(state) {
      if (state.currentPage !== Math.ceil(state.posts.length / state.perPage)) {
        state.currentPage++;

        state.indexOfLastPost = state.currentPage * state.perPage;
        state.indexOfFirstPost = state.indexOfLastPost - state.perPage;
        state.currentPosts = state.posts.slice(
          state.indexOfFirstPost,
          state.indexOfLastPost
        );
      }
    },

    setPrevPage(state) {
      if (state.currentPage !== 1) {
        state.currentPage--;

        state.indexOfLastPost = state.currentPage * state.perPage;
        state.indexOfFirstPost = state.indexOfLastPost - state.perPage;
        state.currentPosts = state.posts.slice(
          state.indexOfFirstPost,
          state.indexOfLastPost
        );
      }
    },
  },

  extraReducers: {
    [fetchAllPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.totalCount = action.payload.length;
      state.posts = action.payload;
      state.initialPosts = action.payload;
      state.pagesLength = Math.ceil(action.payload.length / state.perPage);

      state.indexOfLastPost = state.currentPage * state.perPage;
      state.indexOfFirstPost = state.indexOfLastPost - state.perPage;
      state.currentPosts = state.posts.slice(
        state.indexOfFirstPost,
        state.indexOfLastPost
      );
    },
    [fetchAllPosts.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export const {
  searchPosts,
  showAllPosts,
  filterPosts,
  setCurrentPage,
  setNextPage,
  setPrevPage,
} = slice.actions;
export default slice.reducer;
