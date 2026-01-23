import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import anime from 'animejs';

@Directive({
  selector: '[appAnimateText]'
})
export class AnimateTextDirective implements OnInit {
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.wrapTextWithSpans(); // Añadir spans a cada palabra
            this.animateText();
            this.observer.disconnect(); // Evita que se vuelva a ejecutar
          }
        });
      },
      { threshold: 0.2 } // Activa cuando el 20% del elemento sea visible
    );

    this.observer.observe(this.el.nativeElement);
  }

  private wrapTextWithSpans() {
    const text = this.el.nativeElement.innerHTML;
    const words = text.split(' '); // Dividir el texto en palabras

    // Crear una nueva cadena con las palabras envueltas en <span>
    const wrappedText = words.map((word: any) => `<span>${word}</span>`).join(' ');

    // Actualizar el contenido del elemento con los spans
    this.el.nativeElement.innerHTML = wrappedText;
  }

  private animateText() {
    const spans = this.el.nativeElement.querySelectorAll('span');

    anime({
      targets: spans,
      translateY: [80, 0], // Movimiento de abajo hacia arriba
      opacity: [0, 1], // Desvanecimiento
      easing: 'easeOutExpo',
      duration: 2500,
      delay: (el, i) => 1000 + i * 100, // Retraso inicial de 500ms y luego un retraso secuencial
    });
  }
}
