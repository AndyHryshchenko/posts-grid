import { Axios } from "axios";
import { Post, PostAuthor } from "../types";
import { AnyRecord } from "dns";

type RawResponse = { data: string };

class PostsService {
  private http: Axios;

  constructor(axios: Axios) {
    this.http = axios;
  }

  public async fetchPosts() {
    const { data } = await this.http.get<any, RawResponse>('/posts');

    return this.parseResponse<Post[]>(data);
  }

  public async fetchPostAuthorById(id: number) {
    const { data } = await this.http.get<AnyRecord, RawResponse>(`/users/${id}`);

    return this.parseResponse<PostAuthor>(data);
  }

  private parseResponse<T>(jsonString: string) {
    return JSON.parse(jsonString) as T;
  }
}

const instance = new PostsService(new Axios({
  baseURL: 'https://jsonplaceholder.typicode.com',
}));

export default instance;