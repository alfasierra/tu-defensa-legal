import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {LeftDirective} from '../../directives/left.directive';
import {UpDirective} from '../../directives/up.directive';
import {GoogleMap, MapMarker} from '@angular/google-maps';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [
    NgOptimizedImage,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    LeftDirective,
    UpDirective,
    GoogleMap,
    MapMarker
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private title: Title, private meta: Meta) {
    // Establecer el título de la página
    this.title.setTitle('Tu Defensa Legal - Abogados en Junín y Mar del Plata');

    // Agregar meta tags
    this.meta.addTags([
      { name: 'description', content: 'En Tu Defensa Legal ofrecemos asesoría jurídica en Junín, Mar del Plata y toda la provincia de Buenos Aires. Especializados en derecho civil, penal, familia y laboral. ¡Contáctanos hoy para una consulta!' },
      { name: 'keywords', content: 'abogado, abogados en Junín, abogados en Mar del Plata, defensa legal Buenos Aires, derecho civil, derecho penal, derecho de familia, abogados laborales, asesoría jurídica' },
      { name: 'robots', content: 'index, follow' },

      // Meta tags para Open Graph (Facebook)
      { property: 'og:title', content: 'Tu Defensa Legal - Abogados en Junín y Mar del Plata' },
      { property: 'og:description', content: 'Tu Defensa Legal ofrece servicios legales en toda la provincia de Buenos Aires, con oficinas en Junín y Mar del Plata. Asesoría en derecho civil, penal, familia y laboral.' },
      { property: 'og:image', content: 'https://tudefensalegal.com/assets/imagen.jpg' },
      { property: 'og:url', content: 'https://tudefensalegal.com' },

      // Meta tags para Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Tu Defensa Legal - Abogados en Junín y Mar del Plata' },
      { name: 'twitter:description', content: 'Asesoría legal en Junín, Mar del Plata y toda la provincia de Buenos Aires. Defensa legal en derecho civil, penal, familia y laboral. Contáctanos para una consulta.' },
      { name: 'twitter:image', content: 'https://tudefensalegal.com/assets/imagen.jpg' },

      // Meta tag para verificación en Google
      { name: 'google-site-verification', content: 'pMghDSoMom6GQhgqN8vsbp0QatZDadgyVaHwuhsPL8I' },

      // Autor de la página
      { name: 'author', content: 'Alexis Cavelli' },
    ]);
  }

  center = { lat: -36.29392475, lng: -59.25165575 }; // Centro intermedio entre ambas ciudades
  zoom = 6;

  junin = { lat: -34.5876049, lng: -60.9494652 };
  marDelPlata = { lat: -38.0002446, lng: -57.5538463 };

  // Función para redirigir a Google Maps con las coordenadas
  goToLocation(lat: number, lng: number) {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  }
}
