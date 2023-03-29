import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '@shared/pipes/pipes.module';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, PipesModule],
  exports: [TableComponent],
  providers: []
})
export class TableModule {}
