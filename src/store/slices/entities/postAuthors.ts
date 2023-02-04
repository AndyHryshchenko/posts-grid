import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import PostsService from "../../../services/PostsService";
import { PostAuthor } from "../../../types"
import type { RootState } from '../../index';

export const fetchPostAuthor = createAsyncThunk(
  'postAuthors/fetchPostAuthor',
  async (id: number) => PostsService.fetchPostAuthorById(id)
);

const postsAuthorsAdapter = createEntityAdapter<PostAuthor>({
  selectId: (book) => book.id,
})

const postsAuthorsSlice = createSlice({
  name: 'postAuthors',
  initialState: postsAuthorsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostAuthor.fulfilled, (state, action) => {
      postsAuthorsAdapter.upsertOne(state, action.payload)
    })
  },
});

export const {
  selectById: selectAuthorById,
} = postsAuthorsAdapter.getSelectors((state: RootState) => state.entities.postAuthors);

export default postsAuthorsSlice.reducer;