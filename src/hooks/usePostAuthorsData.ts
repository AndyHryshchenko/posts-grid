import { useCallback } from "react";
import uniqBy from 'lodash.uniqby';
import { Post } from "../types";
import { useAppDispatch } from "./store";
import { fetchPostAuthor } from "../store/slices/entities/postAuthors";

export const usePostAuthorsData = (() => {
  // closure allows to use this hook in multiple components if needed
  const fetchedAuthors = new Set<number>();
  const failedToFetchAuthors = new Set<number>();

  return () => {
    const dispatch = useAppDispatch();

    const fetchAuthorAndProcessResponse = useCallback(async (userId: number) => {
      fetchedAuthors.add(userId);
      try {
        const {
          meta: {
            requestStatus
          }
        } = await dispatch(fetchPostAuthor(userId));

        if (requestStatus === 'rejected') {
          fetchedAuthors.delete(userId);
          failedToFetchAuthors.add(userId);
          console.warn(`Failed to fetch author with id: ${userId}`);
        }
      } catch (error) {
        failedToFetchAuthors.add(userId);
        console.error(error);
      }
    }, [dispatch])
  
    const fetch = useCallback((posts: Post[]) => {
      const postsWithUniqueAuthors = uniqBy(posts, 'userId');
     
      postsWithUniqueAuthors.forEach(({ userId }) => {
        if (!fetchedAuthors.has(userId)) {
          fetchAuthorAndProcessResponse(userId);
        }
      });
    }, [fetchAuthorAndProcessResponse]);
  
    return { fetch }
  };
})();