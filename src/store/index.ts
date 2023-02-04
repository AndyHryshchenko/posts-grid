import { combineReducers, configureStore } from '@reduxjs/toolkit'
import postsSlice from './slices/entities/posts'
import postAuthorsSlice from './slices/entities/postAuthors';

export const store = configureStore({
  reducer: combineReducers({
    entities: combineReducers({
      posts: postsSlice,
      postAuthors: postAuthorsSlice
    }),
  }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch