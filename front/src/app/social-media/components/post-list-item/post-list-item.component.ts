import { Post } from './../../models/post.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() post!: Post;

  @Output() postCommentedEvent = new EventEmitter<{ comment: string, postId: number }>();

  tempUser = { firstName: 'Julien', lastName: 'SURMONT'};

  constructor() {}

  ngOnInit(): void {
  }

  onNewComment(comment: string): void {
    this.postCommentedEvent.emit({ comment, postId: this.post.id });
  }

}
