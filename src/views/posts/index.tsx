import { Posts } from '../../features/Posts';
import './style.css';

function PostsPage() {
  return (
    <div className="posts-page">
      <header className="posts-page__header">
        <h1 className="posts-page__title">Posts</h1>
      </header>
      <main className="posts-page__content">
        <Posts />
      </main>
    </div>
  );
}

export default PostsPage;
