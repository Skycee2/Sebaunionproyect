import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('searchInput') sInput:any;
  model: any = {
    icon: 'search-outline',
    title: 'Rider no encontrado'
  };
  isLoading: boolean = false;
  query: any;
  allriders: any[] = [
  
    {
      uid: 987654,
      foto: 'assets/imgs/moto1.jpg',
      name: 'Bastian Pavez',
      short_name: 'bastian pavez',
      sector: 'Nororiente',
      disponibilidad: '18:00 - 23:00',
    },
    {
      uid: 887654,
      foto: 'assets/imgs/moto2.png',
      name: 'Camilo Henrriquez',
      short_name: 'camilo henriquez',
      sector: 'Centro',
      hora: '18:25',
      distancia: '2.3'
    },
    {
      uid: 987654,
      foto: 'assets/imgs/moto1.jpg',
      name: 'Basilio Costa',
      short_name: 'basilio costa',
      sector: 'Suroriente',
      disponibilidad: '18:00 - 23:00',
    },
  ];

  findriders: any[] =[];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500);
  }

  async onSearchChange(event:any) {
    console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase();
    this.findriders = [];
    if(this.query.length > 0) {
      this.isLoading = true;
      setTimeout(async() => {
        this.findriders = await this.allriders.filter((element: any) => {
          return element.short_name.includes(this.query);
        });
        console.log(this.findriders);
        this.isLoading = false;
      }, 1000);
    }
  }

}
