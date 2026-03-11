import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { v4 as UUIDv4} from 'uuid';


interface Marker {
  id: string;
  maplibreMarker: maplibregl.Marker;
}


@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.html',
  styles: [`
  :host {
    display: block;
    overflow: hidden;
  }

  @media (min-width: 640px) {
    :host {
      position: fixed;
      inset: 64px 0 0 0;
    }
  }
`]
})
export class MarkersPage implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<maplibregl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()?.nativeElement;

    const map = new maplibregl.Map({
      container: element,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [-3.6924, 40.3692],
      zoom: 6
    });
    // const marker = new maplibregl.Marker({
    //   draggable: true,
    //   color: 'red',
    // })
    //   .setLngLat([-6.108583, 42.780323])
    //   .addTo(map);

    // marker.on('dragend', (event) => {
    //   console.log(event);
    // })

    this.mapListeners(map);
  }

  mapListeners(map: maplibregl.Map) {

    map.on('click', (event) => this.mapClick(event));

    this.map.set(map);
  }

  mapClick(event: maplibregl.MapMouseEvent) {
    if( !this.map() ) return;

    const map = this.map()!;
    const coords = event.lngLat;
    const {lng, lat} = coords;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );


    const marker = new maplibregl.Marker({
      draggable: true,
      color: color,
    })
    .setLngLat([lng, lat])
    .addTo(map);

    const newMarker: Marker = {
      id: UUIDv4(),
      maplibreMarker: marker,
    }

    // this.markers.set([newMarker, ...this.markers()]);
    this.markers.update((markers) => [newMarker, ...markers]);

  }

  flyToMarker( lngLat: maplibregl.LngLatLike) {
    if ( !this.map() ) return;

    this.map()?.flyTo({
      center: lngLat
    })
  }

   deleteMarker( marker: Marker) {
    if ( !this.map() ) return;
    const map = this.map()!;

    marker.maplibreMarker.remove();

    this.markers.set( this.markers().filter(m => m.id !== marker.id));
  }
}
