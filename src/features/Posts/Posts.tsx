import { PostCard } from "./components/PostCard";
import { usePostsData } from "../../hooks/usePostsData";
import './style.css';

export const Posts = () => {
  const { data: posts } = usePostsData();

  return (
    <div className="posts">
      <div id="posts" className="posts__content">
        {
          posts.map((post) =>
            <div
              key={`${post.id}`}
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