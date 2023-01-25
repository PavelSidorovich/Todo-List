import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  constructor(private _templateRef: ElementRef) {}

  @HostListener('mouseenter') private onMouseEnter() {
    this._editColor('yellow');
  }

  @HostListener('mouseleave') private onMouseLeave() {
    this._editColor('');
  }

  private _editColor(color: string) {
    this._templateRef.nativeElement.style.color = color;
  }
}
