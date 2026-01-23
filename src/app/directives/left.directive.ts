import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import anime from 'animejs';

@Directive({
  selector: '[appLeft]'
})
export class LeftDirective implements OnInit {
  private observer!: IntersectionObserver;
  private animating = false; // Controla si la animación está en progreso

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
    this.animating = true; // Marcamos que la animación está en progreso

    anime({
      targets: section,
      translateX: ['-50vh', 0], // Movimiento desde la izquierda
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 2000,
      complete: () => {
        this.animating = false; // Permitir una nueva animación
        this.observer.unobserve(section); // Desactiva la observación si no quieres repetir
      },
    });
  }
}
