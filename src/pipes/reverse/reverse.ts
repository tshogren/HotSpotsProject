import { Pipe, PipeTransform } from '@angular/core';

/**
 * Reverses an array from within the template
 *
 * From https://angularfirebase.com/snippets/how-to-reverse-an-observable-array-in-angular-angularfire2-firebaselistobservable/
 */
@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value) {
    if (!value) return;

    return value.reverse();
  }
}
