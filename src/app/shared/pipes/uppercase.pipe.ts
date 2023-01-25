import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customUppercase' })
export class UppercasePipe implements PipeTransform {
  public transform(value: string): string {
    return value.toLocaleUpperCase();
  }
}
