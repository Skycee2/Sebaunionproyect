import { Component, Input, OnInit } from '@angular/core';
import { Ordenes } from 'src/app/models/ordenes';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  banners: any[] = [];
  ordenEnCurso: Ordenes[] = [];
  isLoading: boolean = false;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.banners=this.api.banners;
      this.ordenEnCurso = this.api.ordenEnCurso;
      this.isLoading = false;
    }, 1500);
  }

  //Antes
/*   ngOnInit() {

    this.isLoading = true;
    setTimeout(() => {

      this.banners = [
        {banner: 'assets/imgs/1.png'}
      ];
      this.ordenEnCurso = [
        {
          uid: '12345',
          foto: 'assets/imgs/moto1.jpg',
          name: 'Bastian Pavez',
          direcciones: ['Las Hualtatas 8452', 'Las Condes'],
          hora: '17:45',
          distancia: '4.3'
        },
        {
          uid: '22345',
          foto: 'assets/imgs/moto2.png',
          name: 'Camilo Henrriquez',
          direcciones: ['Valenzuela Llanos 690', 'La Reina'],
          hora: '18:25',
          distancia: '2.3'
        },
      ];
      this.isLoading = false;
    }, 1500);
  } */

}
