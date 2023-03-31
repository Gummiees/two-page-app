import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Row, Table } from './table.types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  public keys: string[] = [];
  @Input() highlightRow?: Row;
  private _table: any = {};

  @Input() set table(val: Table) {
    this._table = val;
    this.keys = this.getKeysFromTable(val);
  }

  get table(): Table {
    return this._table;
  }

  @Output() onRowClick: EventEmitter<Row> = new EventEmitter();

  public rowClicked(row: Row) {
    this._table;
    this.onRowClick.emit(row);
  }

  // Commented code as it is more efficient for the parent to say if it is highighted or not by property. Otherwise we would be going through
  // the array at least once per every row, which could be a bottleneck.

  // public isHighlightedRow(row: Row): boolean {
  //   if (!this.highlightRow) {
  //     return false;
  //   }

  //   const highlightRowKeys = Object.keys(this.highlightRow);
  //   const keys = Object.keys(row);
  //   if (highlightRowKeys.length !== keys.length) {
  //     return false;
  //   }

  //   if (!highlightRowKeys.every((highlightKey) => keys.includes(highlightKey))) {
  //     return false;
  //   }

  //   return keys.every((key) => this.highlightRow![key] === row[key]);
  // }

  /* I did this to be more flexible than usual. This is because of the type we are accepting, we could receive two different object types on the
   * same array, meaning that two different objects from the same array could have completely different attributes.
   *
   * This method gets them all and does not duplicate them.
   *
   * Also, if the attribute starts with '_', it means it should not be shown in the table.
   *
   * A better option would be to also have an input like `displayColumns`, an array of strings where the parent says which columns should be displayed.
   * However, due to the challenge restrictions, it is not possible and has to be done using the object keys.
   *
   * This restriction has also made the code for `TaskComponent` harder to follow since I had to use the generic object instead of a defined one.
   */
  private getKeysFromTable(table: Table): string[] {
    const keys: string[] = [];
    table.forEach((row) => {
      Object.keys(row)
        .filter((key) => !key.startsWith('_'))
        .forEach((key) => keys.push(key));
    });

    return [...new Set(keys)];
  }
}
