import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Row } from '@shared/components/table/table.types';
import { SubmitBody } from '@shared/models/api.models';
import { ApiService } from '@shared/services/api.service';
import { OverlayService } from '@shared/services/overlay.service';
import { Subscription } from 'rxjs';
import { UserInfo, UserInfoRow } from './task.models';

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
export class TaskComponent implements OnDestroy {
  public table: UserInfoRow[] = [];
  public selectedUser: UserInfo | null = null;
  public displayInfo: boolean = false;

  public form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    body: new FormControl(null, Validators.required)
  });

  private subscription?: Subscription;

  constructor(private apiService: ApiService, private overlayService: OverlayService) {
    this.observeTable();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public rowClicked(row: Row) {
    const userInfoRow = row as UserInfoRow;
    this.selectedUser = { ...userInfoRow };
    this.displayInfo = true;
    // Just in case the user clicks a different row while having a row already selected
    this.unhighlightAll();
    this.highlightRow(userInfoRow, true);
  }

  public onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'closed') {
      this.cleanSelected();
    }
  }

  public async submit() {
    if (!this.selectedUser) {
      alert('Error: No selected row');
    }
    if (!this.form.valid) {
      alert('Error: Form is not valid');
    }
    const submitBody: SubmitBody = {
      userId: this.selectedUser!._id,
      ...this.form.value
    };

    this.overlayService.overlay = true;
    try {
      await this.apiService.submit(submitBody);
      this.incrementCount(this.selectedUser!._id);
      this.highlightUser(this.selectedUser!, false);
      this.displayInfo = false;
      alert('The request was done successfully');
    } catch {
      alert('Error: something went wrong');
    } finally {
      this.overlayService.overlay = false;
    }
  }

  public unselectUser() {
    if (this.selectedUser) {
      this.highlightUser(this.selectedUser, false);
    }
    this.displayInfo = false;
  }

  private unhighlightAll() {
    // I could have used the filter without using `some` to not go through the array again, but I wanted to use more array functions on the challenge.
    if (this.table.some((row) => row._highlighted)) {
      this.table.filter((row) => row._highlighted).forEach((row) => (row._highlighted = false));
    }
  }

  private highlightUser(user: UserInfo, highlight: boolean) {
    const row = this.findRow(user);
    if (row) {
      this.highlightRow(row, highlight);
    }
  }

  private highlightRow(row: UserInfoRow, highlight: boolean) {
    this.table.find((_row) => _row._id === row!._id)!._highlighted = highlight;
  }

  private incrementCount(userId: number) {
    const index = this.table.findIndex((val) => val._id === userId);
    if (index < 0) {
      return;
    }
    this.table[index].total_posts++;
  }

  private cleanSelected() {
    this.selectedUser = null;
    this.form.reset();
  }

  private findRow(user: UserInfo): UserInfoRow | null {
    if (!user || !this.table) {
      return null;
    }

    return this.table.find((row) => row._id === user._id) ?? null;
  }

  private observeTable() {
    this.subscription = this.apiService
      .getUsersInfo()
      .subscribe((usersInfo) => (this.table = this.parseToTable(usersInfo)));
  }

  private parseToTable(usersInfo: UserInfo[]): UserInfoRow[] {
    return usersInfo.map((userInfo) => {
      return {
        ...userInfo,
        _highlighted: false
      };
    });
  }
}
