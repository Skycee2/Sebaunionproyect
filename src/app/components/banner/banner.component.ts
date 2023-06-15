import {AfterContentChecked, Component, OnInit, Input } from '@angular/core';
import SwiperCore, {Keyboard, Pagination, SwiperOptions} from 'swiper';

//Instalar modulos de swiper
SwiperCore.use([Pagination, Keyboard]);

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent  implements OnInit, AfterContentChecked {
  @Input() bannerImages: any;
  config: SwiperOptions = {};

  constructor() { }

  ngOnInit() {}

  ngAfterContentChecked(): void {
      this.config = {
        slidesPerView: 1.1,
        pagination: {clickable: true},
        keyboard: {enabled: true}
      };
  }

}
