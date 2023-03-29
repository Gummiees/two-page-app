import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Row } from '@shared/components/table/table.types';
import { SubmitBody } from '@shared/models/api.models';
import { ApiService } from '@shared/services/api.service';
import { UserInfo } from './task.models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          'max-height': '500px',
          opacity: 1
        })
      ),
      state(
        'closed',
        style({
          'max-height': '0',
          opacity: 0
        })
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')])
    ])
  ]
})
export class TaskComponent {
  public table: UserInfo[] = [];
  public selectedRow: UserInfo | null = null;
  public displayInfo: boolean = false;

  public form: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required])
  });

  constructor(private apiService: ApiService) {
    this.initTable();
  }

  public rowClicked(row: Row) {
    this.selectedRow = row as UserInfo;
    this.displayInfo = true;
  }

  public onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'closed') {
      this.cleanSelected();
    }
  }

  public async submit() {
    if (!this.selectedRow) {
      alert('Error: No selected row');
    }
    const val = this.form.value;
    const submitBody: SubmitBody = {
      userId: this.selectedRow!._id,
      title: this.form.controls['title'].value,
      body: this.form.controls['body'].value
    };
    try {
      await this.apiService.submit(submitBody);
      this.cleanSelected();
    } catch {
      alert('Error: something went wrong');
    }
  }

  private cleanSelected() {
    this.selectedRow = null;
    this.form.reset();
    // TODO: tell the table to not highlight the row
  }

  private async initTable() {
    const users = await this.apiService.getUsers();
    const posts = await this.apiService.getPosts();
    const comments = await this.apiService.getComments();

    this.table = users.map((user) => {
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
    });
  }
}
