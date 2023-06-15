import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';
//import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  id: any;
  data: any = {};
  items: any[] = [];
  assign: boolean = false;
  isLoading: boolean = false;
  cartData: any = {};
  storedData: any = {};

  ordenEnCurso = [
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

  sectores: any[] = [
    {
      id: "s01",
      name: "Nororiente",
      uid: "0123456"
    },
    {
      id: "s02",
      name: "Oriente",
      uid: "1123456"
    },
    {
      id: "s03",
      name: "Suroriente",
      uid: "2123456"
    },
    {
      id: "s04",
      name: "Norte",
      uid: "3123456"
    },
    {
      id: "s05",
      name: "Centro",
      uid: "4123456"
    },
    {
      id: "s06",
      name: "Sur",
      uid: "5123456"
    },
    {
      id: "s07",
      name: "Norponiente",
      uid: "6123456"
    },
    {
      id: "s08",
      name: "Poniente",
      uid: "7123456"
    },
    {
      id: "s09",
      name: "Surponiente",
      uid: "8123456"
    },
  ]; 

  allItems = [
    {
      sector_id: "s01",
      cover: "assets/imgs/cliente1.png",
      uid: '0123456',
      foto: 'assets/imgs/moto1.jpg',
      name_rider: 'Bastian Pavez',
      telefono_rider: '+56945789813',
      name_cliente: 'Hugo Roldan',
      telefono_cliente: '+56998765432',
      dir_recogida: ['Las Carmelitas 240', 'Las Condes'],
      dir_entrega: ['Cuarto Centenario 90', 'Las Condes'],
      hora: '17:45',
      distancia: '4.3',
      sin_asignar: true
    },
    {
      sector_id: "s05",
      cover: "assets/imgs/cliente2.png",
      uid: '4123456',
      foto: 'assets/imgs/moto1.jpg',
      name_rider: 'Bastian Pavez',
      telefono_rider: '+56945789813',
      name_cliente: 'Nicolas Cordova',
      telefono_cliente: '+56998765432',
      dir_recogida: ['Las Camelias 040', 'Santiago'],
      dir_entrega: ['Ricardo Lyon 890', 'Providencia'],
      hora: '14:25',
      distancia: '4.3',
      sin_asignar: true
  },

  ];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      console.log('data: ' , paramMap);
      if(!paramMap.has('encursoId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('encursoId');
      console.log('id' , this.id);
      this.getItems();
    })
  }
  getDireccion(direcciones:any) {
    return direcciones.join(',');
  }

  getCart() {
    return Preferences.get({key: 'cart'});
   }
 
   async getItems() {
     this.isLoading = true;
     this.data = {};
     this.cartData = {};
     this.storedData = {};
     setTimeout(async() => {      
       let data: any = this.ordenEnCurso.filter(x => x.uid === this.id);
       this.data = data[0];
       let cart: any = await this.getCart();
       console.log('cart: ', cart);
       if(cart?.value) {
         this.storedData = JSON.parse(cart.value);
         console.log('storedData: ', this.storedData);
         if(this.id == this.storedData.restaurant.uid && this.allItems.length > 0) {
           this.allItems.forEach((element: any) => {
             this.storedData.items.forEach((ele:any) => {
               if(element.id != ele.id) return;
               element.quantity = ele.quantity;
             })
           })
         }
         this.cartData.totalItem = this.storedData.totalItem;
         this.cartData.totalPrice = this.storedData.totalPrice;
       }
       this.isLoading = false;
     }, 1200);
   }

   assignOnly(event:any) {
    console.log(event.detail.checked);
    this.items = [];
    if(event.detail.checked == true) this.items = this.allItems.filter(x => x.sin_asignar === true);
    else this.items = this.allItems;
    console.log('items: ', this.items);
  }

  quantityPlus(index:any) {
    try {
      console.log(this.items[index]);
      if(!this.items[index].quantity || this.items[index].quantity == 0) {
        this.items[index].quantity = 1;
        this.calculate();
      } else {
        this.items[index].quantity += 1; // this.items[index].quantity = this.items[index].quantity + 1
        this.calculate();
      }
    } catch(e) {
      console.log(e);
    }
  }

  quantityMinus(index:any) {
    if(this.items[index].quantity !== 0) {
      this.items[index].quantity -= 1; // this.items[index].quantity = this.items[index].quantity - 1
    } else {
      this.items[index].quantity = 0;
    }
    this.calculate();
  }

  calculate() {
    console.log(this.items);
    this.cartData.items = [];
    let item = this.items.filter(x => x.quantity > 0);
    console.log('added items: ', item);
    this.cartData.items = item;
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;
    item.forEach(element => {
      this.cartData.totalItem += element.quantity;
      this.cartData.totalPrice += (parseFloat(element.price) * parseFloat(element.quantity));
    });
    this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);
    if(this.cartData.totalItem == 0) {
      this.cartData.totalItem = 0;
      this.cartData.totalPrice = 0;
    }
    console.log('cart: ', this.cartData);
  }

  async saveToCart() {
    try {
      this.cartData.restaurant = {};
      this.cartData.restaurant = this.data;
      console.log('cartData', this.cartData);
      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(this.cartData)
      });
    } catch(e) {
      console.log(e);
    }
  }

  async viewCart() {
    if(this.cartData.items && this.cartData.items.length > 0) await this.saveToCart();
    console.log('router url: ', this.router.url);
    this.router.navigate([this.router.url + '/cart']);
  }


}