import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// Using @shared as per declared under `tsconfig.json` to have cleaner imports.
import { TableModule } from '@shared/components/table/table.module';
import { ApiService } from '@shared/services/api.service';
import { TaskComponent } from './component/task.component';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  declarations: [TaskComponent],
  imports: [CommonModule, TaskRoutingModule, TableModule, ReactiveFormsModule],
  exports: [],
  providers: [ApiService]
})
export class TaskModule {}
