import React from 'react';
import { useAppSelector } from '../../../../../../hooks/store';
import { selectAuthorById } from '../../../../../../store/slices/entities/postAuthors';
import './style.css';

type PostAuthorProps = {
  id: number;
}

export const PostAuthor: React.FC<PostAuthorProps> = ({ id }) => {
  const author = useAppSelector((state) => selectAuthorById(state, id))
  const websiteHref = author ? formatWebsiteLink(author.website) : '';

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
      <dl className="author__content">
        <dt className="author__content-label">Email:</dt>
        <dd className="author__content-value">
          <a href={`mailto:${author.email}`}>{author.email}</a>
        </dd>
        <dt className="author__content-label">Phone:</dt>
        <dd className="author__content-value">
          <a href={`tel:${author.phone}`}>{author.phone}</a>
        </dd>
        <dt className="author__content-label">Website:</dt>
        <dd className="author__content-value">
          <a href={websiteHref} target="__blank">{author.website}</a>
        </dd>
        <dt className="author__content-label">Company:</dt>
        <dd className="author__content-value">
          {author.company.name}
        </dd>
    </dl>
    </div>
  )
}

function formatWebsiteLink(str: string) {
  if (!/^(https)?\:\/\//.test(str)) {
    return `https://${str}`;
  }
  return str;
}