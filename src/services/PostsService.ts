import { Axios } from "axios";
import { Post, PostAuthor } from "../types";

type JSONResponse = string;

interface HttpResponse<T = any> {
  data: T;
}
interface HttpClient {
  get<T = any, R = HttpResponse<T>>(url: string): Promise<R>;
}

class PostsService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public async fetchPosts() {
    const { data } = await this.http.get<JSONResponse>('/posts');

    return this.parseResponse<Post[]>(data);
  }

  public async fetchPostAuthorById(id: number) {
    const { data } = await this.http.get<JSONResponse>(`/users/${id}`);

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