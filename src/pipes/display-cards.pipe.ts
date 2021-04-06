import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatCards'
})
export class ConcatCardsPipe implements PipeTransform {

  transform(values: number[]): string {
    // Compute the sum of the values
    const sum: number = values.reduce((acc: number, value: number) => acc + value, 0);

    // Return the formatted string
    return `${sum} € (${values.join(' + ')})`;
  }

}
