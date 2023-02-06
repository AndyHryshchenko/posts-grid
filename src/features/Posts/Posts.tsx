import { PostCard } from './components/PostCard';
import { usePostsData } from '../../hooks/usePostsData';
import './style.css';

export const Posts = () => {
  const { data: posts } = usePostsData();

  return (
    <div className="posts">
      <div className="posts__content">
        {
          posts.map((post) =>
            <div key={post.id} className="posts__content-item">
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