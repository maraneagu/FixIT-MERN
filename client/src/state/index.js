import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  reviews:[],
  tips: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload.reviews;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setCategory: (state, action) => {
      state.category = action.payload.category;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.searchQuery;
    },
    setTips: (state, action) => {
      state.tips = action.payload.tips;
    },
    setTip: (state, action) => {
      const updatedTips = state.tips.map((tip) => {
        if (tip._id === action.payload.tip._id) return action.payload.tip;
        return tip;
      });
      state.tips = updatedTips;
    }
    
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setUser, setReviews, setCategory,
  setSearchQuery, setTips, setTip } =
  authSlice.actions;
export default authSlice.reducer;