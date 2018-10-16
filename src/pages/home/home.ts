import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales'
import {AnimalInterface} from "../../interfaces/animal.interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales: AnimalInterface[] = [];
  audio = new Audio();
  audioTime: any;

  constructor() {
    // Copiar el objeto con splice
    this.animales = ANIMALES.splice(0);
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
}
