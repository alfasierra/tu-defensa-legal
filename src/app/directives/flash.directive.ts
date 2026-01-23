import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import anime from 'animejs';

@Directive({
  selector: '[appFlash]'
})
export class FlashDirective implements OnInit {
  private observer!: IntersectionObserver;
  private animating = false; // Bandera para controlar la animación

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animating) {
            this.flashElement();
          }
        });
      },
      { threshold: 0.2 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private flashElement() {
    this.animating = true; // Marcamos la animación como en curso

    const element = this.el.nativeElement;

    anime({
      targets: element,
      translateX: ['-100vh', 0],
      opacity: [0, 1],
      easing: 'easeOutBounce',
      duration: 2000,
      complete: () => {
        this.animating = false; // Restablecemos la bandera al terminar
        this.observer.unobserve(element); // Dejar de observar si no quieres repetir la animación
      },
    });
  }
}
