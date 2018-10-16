import { Component } from '@angular/core';
import { ANIMALES } from '../../data/data.animales'
import {AnimalInterface} from "../../interfaces/animal.interface";
import {Refresher, reorderArray} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales: AnimalInterface[] = [];
  audio = new Audio();
  audioTime: any;
  ordenando: boolean = false;

  constructor() {
    // Copiar el objeto con splice
    this.animales = ANIMALES.slice(0);
  }

  reproducir(animal: AnimalInterface) {
    this.pausarAudio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    console.log(animal);

    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;
    this.audioTime = setTimeout(() => animal.reproduciendo = false, animal.duracion * 1000);
  }

  private pausarAudio(animalSel: AnimalInterface) {
    clearTimeout(this.audioTime);
    this.audio.pause();
    this.audio.currentTime = 0;

    for (let animal of this.animales) {
      if (animal.nombre != animalSel.nombre) {
        animal.reproduciendo = false;
      }
    }
  }

  borrarAnimal(idx: number) {
    this.animales.splice(idx, 1);
  }

  doRefresh(refresher: Refresher) {
    console.log('Inicio del refresh');

    setTimeout(() => {
      console.log('Termino de refresh');
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 1500);
  }

  reordenarAnimales(indices: any) {
    console.log(indices);
    this.animales = reorderArray(this.animales, indices);
  }
}
