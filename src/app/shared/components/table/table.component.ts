import { Component, Input } from '@angular/core';

import { Table } from './table.types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  public keys: string[] = [];
  private _table: any = {};

  @Input() set table(val: Table) {
    this._table = val;

    this.keys = this.getKeysFromTable(val);
  }
  get table(): Table {
    return this._table;
  }

  constructor() {}

  /* I did this to be more flexible than usual. This is because of the type we are accepting, we could receive two different object types on the
   * same array, meaning that two different objects from the same array could have completely different attributes.
   *
   * This method gets them all and does not duplicate them.
   */
  private getKeysFromTable(table: Table): string[] {
    const keys: string[] = [];
    table.forEach((row) => {
      Object.keys(row).forEach((key) => keys.push(key));
    });

    return [...new Set(keys)];
  }
}
