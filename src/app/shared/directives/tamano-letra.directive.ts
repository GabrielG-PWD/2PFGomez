import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTamanoLetra]'
})
export class TamanoLetraDirective implements OnChanges{
  tamano = '20px'

  @Input()
  set appTamano(tamano: string) {
    this.tamano = tamano;
  }

  constructor(private elementRef: ElementRef,private renderer2:Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.establecerTamano()
  }

  establecerTamano():void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size', this.appTamano)
  }

}