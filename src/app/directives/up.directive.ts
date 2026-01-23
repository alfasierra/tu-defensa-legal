import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import anime from 'animejs';

@Directive({
  selector: '[appUp]',
})
export class UpDirective implements OnInit {
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
      { threshold: 0.2 } // Se activa cuando el 20% del elemento es visible
    );

    this.observer.observe(this.el.nativeElement);
  }

  private animateSection() {
    const section = this.el.nativeElement;
    this.animating = true; // Marcar animación en curso

    anime({
      targets: section,
      translateY: ['50vh', 0], // Movimiento desde abajo hacia arriba
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 2000,
      complete: () => {
        this.animating = false; // Permitir una nueva animación
        this.observer.unobserve(section); // Dejar de observar después de animar (si no quieres que se repita)
      },
    });
  }
}
