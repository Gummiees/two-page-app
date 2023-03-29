import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tableHeader' })
export class TableHeaderPipe implements PipeTransform {
  transform(value: any): any {
    if (!value || typeof value !== 'string') return value;
    const replaced = value.replaceAll('_', ' ').replaceAll('-', ' ');
    return replaced[0].toUpperCase() + replaced.substring(1).toLowerCase();
  }
}
