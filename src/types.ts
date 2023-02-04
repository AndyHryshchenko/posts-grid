/**
 * @notes
 * this can be updated as you go
 * (it's just to get started 👌)
 */

type Company = {
  name: string;
  catchPhrase: string;
  businessSlogan: string;
}

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type PostAuthor = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: Company;
}