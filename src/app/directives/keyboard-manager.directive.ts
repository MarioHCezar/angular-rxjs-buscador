import {
  ContentChildren,
  Directive,
  HostListener,
  QueryList,
} from '@angular/core';
import { KeyboardManagedItemDirective } from './keyboard-managed-item.directive';

@Directive({
  selector: '[appKM]',
})
export class KeyboardManagerDirective {
  @ContentChildren(KeyboardManagedItemDirective)
  public items: QueryList<KeyboardManagedItemDirective>;

  ngAfterViewInit(): void {}

  @HostListener('keydown', ['$event'])
  public manageKeys(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.moveFocus(ArrowDirection.UP).focus();
        console.log('up');
        console.log(this.items);
        event.preventDefault();
        break;
      case 'ArrowDown':
        this.moveFocus(ArrowDirection.DOWN).focus();
        console.log('down');
        event.preventDefault();
        break;
      case 'ArrowLeft':
        this.moveFocus(ArrowDirection.LEFT).focus();
        console.log('left');
        event.preventDefault();
        break;
      case 'ArrowRight':
        this.moveFocus(ArrowDirection.RIGHT).focus();
        console.log('right');
        event.preventDefault();
        break;
    }
  }

  public moveFocus(direction: ArrowDirection): KeyboardManagedItemDirective {
    const items = this.items.toArray();
    const currentSelectedIndex = items.findIndex((item) => item.isFocused());
    let targetIndex = currentSelectedIndex + direction;

    if (targetIndex < 0) {
      targetIndex = items.length - 1;
    } else if (targetIndex >= items.length) {
      targetIndex = 0;
    }

    const targetElementFocus = items[targetIndex];
    return targetElementFocus;
  }
}

enum ArrowDirection {
  LEFT = -1,
  RIGHT = 1,
  UP = -1,
  DOWN = 1,
}
