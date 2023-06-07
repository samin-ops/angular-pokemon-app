import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorderCard]'
})
export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor : string =  '#009688';
  private defaultHeight: number = 185;

  constructor(private el: ElementRef) { 

    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
  }

  @Input('appBorderCard') borderColor: string ; // alias

  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.borderColor || this.defaultColor); // si la bordure n'est pas definit, elle prend '#009688' par defaut
  }

  @HostListener('mouseleave') onMouveLeave(){
    this.setBorder('#f5f5f5');
  }


  private setHeight(height: number){
    this.el.nativeElement.style.height = height + 'px';
  }

  private setBorder(color: string){
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }

}
