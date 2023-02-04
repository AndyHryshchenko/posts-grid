import React from 'react';
import { useAppSelector } from '../../../../../../hooks/store';
import { selectAuthorById } from '../../../../../../store/slices/entities/postAuthors';
import './style.css';

type PostAuthorProps = {
  id: number;
}

export const PostAuthor: React.FC<PostAuthorProps> = ({ id }) => {
  const author = useAppSelector((state) => selectAuthorById(state, id))

  if (!author) return (
    <div className="author author--loading">
      Loading....
    </div>
  )

  return (
    <div className="author">
      <h6 className="author__title">
        by <strong>{author.username}</strong> <em>({author.name})</em>
      </h6>
      <dl>
        <dt>Email:</dt>
        <dd>
          <a href={`mailto:${author.email}`}>{author.email}</a>
        </dd>
        <dt>Phone:</dt>
        <dd>
          <a href={`tel:${author.phone}`}>{author.phone}</a>
        </dd>
    </dl>
    </div>
  )
}