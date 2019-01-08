import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[textBlink]'
})
export class BlinkDirective {

  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.backgroundColor = 'red';
  }


  @HostListener('mouseover') doColorChange = function() {
    this.el.nativeElement.style.backgroundColor = "yellow";
  }

  @HostListener('mouseleave') doColorChange1 = function() {
    this.el.nativeElement.style.backgroundColor = "red";
  }

}
