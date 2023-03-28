import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Using @shared as per declared under `tsconfig.json` to have cleaner imports.
import { TableModule } from '@shared/components/table/table.module';
import { TestComponent } from './component/test.component';
import { TestRoutingModule } from './test-routing.module';

@NgModule({
  declarations: [TestComponent],
  imports: [CommonModule, TestRoutingModule, TableModule],
  exports: [],
  providers: []
})
export class TestModule {}
