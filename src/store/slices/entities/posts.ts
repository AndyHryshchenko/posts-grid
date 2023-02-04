import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import PostsService from "../../../services/PostsService";
import { Post } from "../../../types"
import type { RootState } from '../../index';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    console.log('fetchPosts');
    return PostsService.fetchPosts();
  }
);

const postsAdapter = createEntityAdapter<Post>({
  selectId: (book) => book.id,
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(),
  reducers: {
    bookAdded: postsAdapter.addOne,
    booksReceived(state, action: PayloadAction<{ books: Post[] }>) {
      postsAdapter.setAll(state, action.payload.books)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      postsAdapter.upsertMany(state, action.payload)
    })
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
} = postsAdapter.getSelectors((state: RootState) => state.entities.posts);

export default postsSlice.reducer;