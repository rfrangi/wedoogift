import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayCards'
})
export class DisplayCardsPipe implements PipeTransform {

  transform(values: Array<number> = []): string {
    return ` [ ${values.join(' € , ')} € ]`;
  }

}
