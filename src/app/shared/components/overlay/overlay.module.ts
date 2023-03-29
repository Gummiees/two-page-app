import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayComponent } from './overlay.component';

@NgModule({
  declarations: [OverlayComponent],
  imports: [CommonModule],
  exports: [OverlayComponent],
  providers: []
})
export class OverlayModule {}
