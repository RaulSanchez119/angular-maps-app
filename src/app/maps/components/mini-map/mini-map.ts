import { Component, AfterViewInit, viewChild, ElementRef, signal, input } from '@angular/core';
import * as maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
  styles: `
    div{
      width: 100%;
      height: 260px;
      background-color: red;
    }`
})
export class MiniMap implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<maplibregl.Map | null>(null);
  lngLat = input.required<{lng: number, lat: number}>();
  zoom = input<number>(14);

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()?.nativeElement;

    const map = new maplibregl.Map({
      container: element,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: this.lngLat(),
      zoom: this.zoom(),
      interactive: false,
      pitch: 30,
    });
    this.map.set(map);
    new maplibregl.Marker().setLngLat(this.lngLat()).addTo(map)
  }

}
