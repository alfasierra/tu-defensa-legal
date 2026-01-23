import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import anime from 'animejs';

@Directive({
  selector: '[appRight]'
})
export class RightDirective implements OnInit {
  private observer!: IntersectionObserver;
  private animating = false; // Controla si la animación está en curso

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animating) {
            this.animateSection();
          }
        });
      },
      { threshold: 0.2 } // Activa cuando el 20% del elemento es visible
    );

    this.observer.observe(this.el.nativeElement);
  }

  private animateSection() {
    const section = this.el.nativeElement;
    this.animating = true; // Marcar animación en curso

    anime({
      targets: section,
      translateX: ['50vh', 0], // Movimiento desde la derecha
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 2000,
      complete: () => {
        this.animating = false; // Resetear bandera al finalizar
        this.observer.unobserve(section); // Dejar de observar después de animar
      },
    });
  }
}
