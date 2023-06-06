import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { Post } from "../models/post.model";

@Injectable()
export class PostService {
  constructor(
    private httpClient: HttpClient
  ) {}

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${environment.apiUrl}/posts`);
  }

  addNewComment(postCommented: { comment: string, postId: number}): void {
    console.log(postCommented);
  }

}
