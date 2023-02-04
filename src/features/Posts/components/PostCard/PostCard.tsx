import { useAppSelector } from '../../../../hooks/store';
import { selectPostById } from '../../../../store/slices/entities/posts';
import { PostAuthor } from './components/PostAuthor/PostAuthor';
import './style.css';

type PostCardProps = {
  id: number;
}

export const PostCard: React.FC<PostCardProps> = ({ id }) => {
  const post = useAppSelector((state) => selectPostById(state, id))

  return (
    <article className="post-card">
      <header className="post-card__header">
        <h4 className="post-card__header-title">{post?.title || 'Loading...'}</h4>
      </header>
      {
        post &&
        <main className="post-card__body">
          <p className="post-card__description">{post.body}</p>
          <PostAuthor id={post.userId} />
        </main>
      }
    </article>
  )
};