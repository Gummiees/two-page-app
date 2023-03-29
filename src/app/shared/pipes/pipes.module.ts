import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableHeaderPipe } from './tableHeader.pipe';

@NgModule({
  declarations: [TableHeaderPipe],
  imports: [CommonModule],
  exports: [TableHeaderPipe],
  providers: []
})
export class PipesModule {}
