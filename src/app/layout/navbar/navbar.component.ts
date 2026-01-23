import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgClass, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Badge} from 'primeng/badge';
import {Ripple} from 'primeng/ripple';
import {Menubar} from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  imports: [
    NgClass,
    RouterLink,
    Badge,
    Ripple,
    Menubar,
    NgOptimizedImage,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  items = [
    { numero: '+5492364666986', numeroEstilo: '+54 9236 466-6986' },
    { label: '¡Consulta aquí!', fragment: '#contactanos' }
  ];

  lastScrollTop = 0;               // Última posición del scroll
  isNavbarVisible = true;           // Estado de visibilidad del navbar
  scrollThreshold = 20;             // Tolerancia para detectar movimiento
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      window.addEventListener('scroll', this.onWindowScroll, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.onWindowScroll);
    }
  }

  private onWindowScroll = () => {
    requestAnimationFrame(() => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;

      // Si el scroll es hacia abajo, ocultar el navbar, si es hacia arriba, mostrarlo
      if (Math.abs(currentScroll - this.lastScrollTop) > this.scrollThreshold) {
        this.isNavbarVisible = currentScroll < this.lastScrollTop || currentScroll < 50;
        this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Actualizar el último scroll
      }
    });
  };

  // Función para manejar el scroll suave
  navigateToSection(event: Event, id: string): void {
    event.preventDefault();

    if (this.isBrowser) {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
