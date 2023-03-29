import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment, Post, SubmitBody, User } from '@shared/models/api.models';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  public getPosts(): Promise<Post[]> {
    return lastValueFrom(this.http.get<Post[]>(`${this.apiUrl}/posts`));
  }

  public getUsers(): Promise<User[]> {
    return lastValueFrom(this.http.get<User[]>(`${this.apiUrl}/users`));
  }

  public getComments(): Promise<Comment[]> {
    return lastValueFrom(this.http.get<Comment[]>(`${this.apiUrl}/comments`));
  }

  public submit(body: SubmitBody): Promise<void> {
    return lastValueFrom(this.http.post<void>(`${this.apiUrl}/posts`, body));
  }
}
