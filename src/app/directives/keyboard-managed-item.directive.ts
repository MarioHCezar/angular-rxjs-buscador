import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appKMItem]',
})
export class KeyboardManagedItemDirective {
  constructor(private elementRef: ElementRef<HTMLElement>) {}
  public focus(): void {
    this.elementRef.nativeElement.focus();
  }

  public isFocused(): boolean {
    return this.elementRef.nativeElement === document.activeElement;
  }
}
