import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Row } from '@shared/components/table/table.types';
import { SubmitBody } from '@shared/models/api.models';
import { ApiService } from '@shared/services/api.service';
import { Subscription } from 'rxjs';
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
export class TaskComponent implements OnDestroy {
  public table: UserInfo[] = [];
  public selectedRow: UserInfo | null = null;
  public displayInfo: boolean = false;

  public form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    body: new FormControl(null, Validators.required)
  });

  private subscription?: Subscription;

  constructor(private apiService: ApiService) {
    this.observeUserInfo();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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
    if (!this.form.valid) {
      alert('Error: Form is not valid');
    }
    const submitBody: SubmitBody = {
      userId: this.selectedRow!._id,
      ...this.form.value
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

  private observeUserInfo() {
    this.subscription = this.apiService.getUsersInfo().subscribe((info) => (this.table = info));
  }
}
