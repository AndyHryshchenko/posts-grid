import { useEffect, useState } from "react";
import { PostCard } from "./components/PostCard";
import { useThresholdInView } from "../../hooks/useThresholdInView";
import { usePostsData } from "../../hooks/usePostsData";
import { usePostAuthorsData } from "../../hooks/usePostAuthorsData";
import './style.css';

type PostsProps = {
  inViewOffset?: number;
};

const DEFAULT_THRESHOLD_INDEX = -1;

export const Posts = ({ inViewOffset = 10 }: PostsProps) => {
  const { data: posts } = usePostsData();
  const { fetch: fetchPostAuthors } = usePostAuthorsData();

  const [{
    prevThresholdIndex,
    thresholdIndex,
  }, setIndexState] = useState({
    prevThresholdIndex: DEFAULT_THRESHOLD_INDEX,
    thresholdIndex: DEFAULT_THRESHOLD_INDEX,
  })

  const thresholdRef = useThresholdInView({
    onReachThreshold: () => {
      const postsToFetch = posts.slice(prevThresholdIndex + 1, thresholdIndex + 1);

      fetchPostAuthors(postsToFetch);
      
      setIndexState({
        prevThresholdIndex: thresholdIndex,
        thresholdIndex: getThresholdIndex(thresholdIndex + inViewOffset, posts.length),
      })
    }
  })

  useEffect(() => {
    if (thresholdIndex === DEFAULT_THRESHOLD_INDEX && posts.length) {
      setIndexState({
        prevThresholdIndex: thresholdIndex,
        thresholdIndex: getThresholdIndex(inViewOffset - 1, posts.length),
      })
    }
  }, [posts, inViewOffset, thresholdIndex]);

  const getItemRef = (index: number) => index === thresholdIndex
    ? thresholdRef
    : null;

  return (
    <div className="posts">
      <div id="posts" className="posts__content">
        {
          posts.map((post, i) =>
            <div
              key={`${post.id}`}
              ref={getItemRef(i)}
              className="posts__content-item"
              data-post-id={post.id}
            >
              <PostCard
                id={post.id}
              />
            </div>
          )
        }
      </div>
    </div>
  );
}

function getThresholdIndex(desiredIndex: number, totalItems: number) {
  if (desiredIndex < totalItems) {
    return desiredIndex;
  }
  return totalItems - 1;
}