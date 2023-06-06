import { PostService } from './../services/post.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Post } from "../models/post.model";
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class PostsResolver implements Resolve<Post[]> {

  constructor(
    private postService: PostService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    return this.postService.getPosts();
  }
}
