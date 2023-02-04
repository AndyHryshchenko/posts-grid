import { useEffect } from "react";
import { fetchPosts, selectAllPosts } from "../store/slices/entities/posts";
import { useAppDispatch, useAppSelector } from "./store";

export const usePostsData = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts)

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts())
    }
  }, [dispatch, posts.length]);

  return {
    data: posts,
  };
}