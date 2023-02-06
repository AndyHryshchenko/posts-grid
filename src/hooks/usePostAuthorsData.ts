import { useCallback } from 'react';
import { useAppDispatch } from './store';
import { fetchPostAuthor } from '../store/slices/entities/postAuthors';

export const usePostAuthorsData = (() => {
  // closure allows to use this hook in multiple components if needed
  const fetchedAuthors = new Set<number>();

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
          throw new Error(`Failed to fetch author with id: ${userId}`);
        }
      } catch (error) {
        fetchedAuthors.delete(userId);
        console.error(error);
      }
    }, [dispatch])
  
    const fetch = useCallback((userId: number) => {
      if (!fetchedAuthors.has(userId)) {
        fetchAuthorAndProcessResponse(userId);
      }
    }, [fetchAuthorAndProcessResponse]);
  
    return { fetch }
  };
})();