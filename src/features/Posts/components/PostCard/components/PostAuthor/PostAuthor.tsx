import React from 'react';
import { useInViewEffect } from 'react-hook-inview';
import { useAppSelector } from '../../../../../../hooks/store';
import { selectAuthorById } from '../../../../../../store/slices/entities/postAuthors';
import { usePostAuthorsData } from '../../../../../../hooks/usePostAuthorsData';
import './style.css';

type PostAuthorProps = {
  id: number;
}

export const PostAuthor: React.FC<PostAuthorProps> = ({ id }) => {
  const author = useAppSelector((state) => selectAuthorById(state, id))
  const { fetch: fetchPostAuthor } = usePostAuthorsData();
  const ref = useInViewEffect(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        fetchPostAuthor(id);
      }
    },
    {
      threshold: 0.2
    }
  )

  const websiteHref = author ? formatWebsiteLink(author.website) : '';

  return (
    <div className="author" ref={ref}>
      <h6 className="author__title">
        { author
            ? <span>
                by <strong>{author.username}</strong> <em>({author.name})</em>
              </span>
            : <span>Loading...</span>
        }
      </h6>
      {
        author && (
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
            <dd className="author__content-value">{author.company.name}</dd>
          </dl>
        )
      }
    </div>
  )
}

function formatWebsiteLink(str: string) {
  if (!/^(https)?\:\/\//.test(str)) {
    return `https://${str}`;
  }
  return str;
}