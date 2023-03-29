import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment, Post, SubmitBody, User } from '@shared/models/api.models';
import { combineLatest, lastValueFrom, map, Observable } from 'rxjs';
import { UserInfo } from 'src/app/components/task/component/task.models';

@Injectable()
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  // This could all be done by using `lastValueFrom` and returning promises as they are API calls, which means there will only be one response.
  // However, to demonstrate knowledge with RxJS, I decided to use the observables themselves.

  constructor(private http: HttpClient) {}

  public submit(body: SubmitBody): Promise<void> {
    return lastValueFrom(this.http.post<void>(`${this.apiUrl}/posts`, body));
  }

  public getUsersInfo(): Observable<UserInfo[]> {
    return combineLatest([this.getUsers(), this.getPosts(), this.getComments()]).pipe(
      map(([users, posts, comments]) =>
        users.map((user) => this.transformUser(user, posts, comments))
      )
    );
  }

  private transformUser(user: User, posts: Post[], comments: Comment[]): UserInfo {
    const info: UserInfo = {
      _id: user.id,
      name: user.name,
      total_comments_on_posts: 0,
      total_posts: 0
    };
    const usersPosts = posts.filter((post) => post.userId === user.id);
    info.total_posts = usersPosts.length;
    info.total_comments_on_posts = comments.filter((comment) =>
      usersPosts.map((post) => post.id).includes(comment.postId)
    ).length;
    return info;
  }

  private getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  private getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  private getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments`);
  }
}
