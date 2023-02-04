import { useCallback, useRef } from "react";
import uniqBy from 'lodash.uniqby';
import { Post } from "../types";
import { useAppDispatch } from "./store";
import { fetchPostAuthor } from "../store/slices/entities/postAuthors";

export const usePostAuthorsData = () => {
  const dispatch = useAppDispatch();
  const fetchedAuthors = useRef<{ [key: number]: boolean }>({});

  const fetch = useCallback((posts: Post[]) => {
    const postsWithUniqueAuthors = uniqBy(posts, 'userId');
   
    postsWithUniqueAuthors.forEach(({ userId }) => {
      if (!fetchedAuthors.current[userId]) {
        dispatch(fetchPostAuthor(userId));
        fetchedAuthors.current[userId] = true;
      }
    });
  }, []);

  return { fetch }
}