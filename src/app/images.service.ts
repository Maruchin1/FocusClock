import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor() {
  }

  private readonly LOOP_INTERVAL_SECONDS = 300;
  private readonly IMAGES: string[] = [
    'assets/bg_1.jpg',
    'assets/bg_2.jpg',
    'assets/bg_3.jpg',
    'assets/bg_4.jpg',
    'assets/bg_5.jpg',
    'assets/bg_6.jpg',
    'assets/bg_7.jpg',
    'assets/bg_8.jpg',
    'assets/bg_9.jpg',
    'assets/bg_10.jpg',
    'assets/bg_11.jpg',
    'assets/bg_12.jpg',
    'assets/bg_13.jpg',
    'assets/bg_14.jpg',
    'assets/bg_15.jpg',
    'assets/bg_16.jpg',
    'assets/bg_17.jpg',
    'assets/bg_18.jpg',
  ];
  private loop;

  currImage: string = this.getRandomImage();

  startImagesLoop() {
    this.loop = setInterval(() => {
      this.currImage = this.getRandomImage();
    }, this.LOOP_INTERVAL_SECONDS * 1000);
  }

  stopImagesLoop() {
    clearInterval(this.loop);
  }

  private getRandomImage() {
    const randomIdx = Math.floor(Math.random() * this.IMAGES.length);
    return  this.IMAGES[randomIdx];
  }
}
