import { addDoc, collection, collectionData, doc, docData, Firestore, getDoc, getDocs, orderBy, OrderByDirection, query, setDoc, where } from '@angular/fire/firestore';
import { Address } from '../models/address';
import { Ordenes } from '../models/ordenes';
import { Riders } from '../models/riders';
import { Sectores } from '../models/sectores';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  banners = [
    {banner: 'assets/imgs/1.png'}
  ];

  ordenEnCurso : Ordenes [] = [
    {
      id_orden: "12345",
      uid: '12wefdss',
      sector_id: "s01",
      cover: "assets/imgs/cliente1.png",
      foto: 'assets/imgs/moto1.jpg',
      name_rider: 'Bastian Pavez',
      telefono_rider: '+56945789813',
      name_cliente: 'Hugo Roldan',
      telefono_cliente: '+56998765432',
      dir_recogida: ['Las Carmelitas 240', 'Las Condes'],
      dir_entrega: ['Cuarto Centenario 90', 'Las Condes'],
      hora: '17:45',
      distancia: '4.3',
      sin_asignar: true,
      finalizado:false
    },
    {
      id_orden: "98765431",
      sector_id: "s05",
      cover: "assets/imgs/cliente2.png",
      foto: 'assets/imgs/moto1.jpg',
      name_rider: 'Pablo Robles',
      telefono_rider: '+56945789813',
      name_cliente: 'Ignacio Caisedo',
      telefono_cliente: '+56998765432',
      dir_recogida: ['Rojas Magallanez 640', 'La Florida'],
      dir_entrega: ['Diego Portales 456', 'Puente Alto'],
      hora: '14:25',
      distancia: '4.3',
      sin_asignar: false,
      finalizado:true
    },
    {
      id_orden: "456789",
      sector_id: "s03",
      cover: "assets/imgs/cliente2.png",
      foto: 'assets/imgs/moto1.jpg',
      name_rider: 'Felipe Barrios',
      telefono_rider: '+56945789813',
      name_cliente: 'Nicolas Cordova',
      telefono_cliente: '+56998765432',
      dir_recogida: ['Las Camelias 040', 'Santiago'],
      dir_entrega: ['Ricardo Lyon 890', 'Providencia'],
      hora: '14:25',
      distancia: '4.3',
      sin_asignar: true,
      finalizado:false
    },
    {
      id_orden: "654987",
      sector_id: "s02",
      cover: "assets/imgs/cliente2.png",
      foto: 'assets/imgs/moto1.jpg',
      name_rider: 'Andres Ramos',
      telefono_rider: '+56945789813',
      name_cliente: 'Jorge Caceres',
      telefono_cliente: '+56998765432',
      dir_recogida: ['Las Camelias 040', 'La Reina'],
      dir_entrega: ['Ricardo Lyon 890', 'Peñalolen'],
      hora: '14:25',
      distancia: '4.3',
      sin_asignar: true,
      finalizado:false
    },
  ];

  ordenes: Ordenes [] = [
    {
      id_orden: "12345",
      uid: '12wefdss',
      sector_id: "s01",
      cover: "assets/imgs/cliente1.png",
      foto: 'assets/imgs/moto1.jpg',
      name_rider: 'Bastian Pavez',
      telefono_rider: '+56945789813',
      name_cliente: 'Hugo Roldan',
      telefono_cliente: '+56998765432',
      dir_recogida: ['Las Carmelitas 240', 'Las Condes'],
      dir_entrega: ['Cuarto Centenario 90', 'Las Condes'],
      hora: '17:45',
      distancia: '4.3',
      sin_asignar: true,
      finalizado:false
    },
    {
      id_orden: "98765431",
      sector_id: "s05",
      cover: "assets/imgs/cliente2.png",
      foto: 'assets/imgs/moto1.jpg',
      name_rider: 'Pablo Robles',
      telefono_rider: '+56945789813',
      name_cliente: 'Ignacio Caisedo',
      telefono_cliente: '+56998765432',
      dir_recogida: ['Rojas Magallanez 640', 'La Florida'],
      dir_entrega: ['Diego Portales 456', 'Puente Alto'],
      hora: '14:25',
      distancia: '4.3',
      sin_asignar: false,
      finalizado:true
    },
    {
      id_orden: "456789",
      sector_id: "s03",
      cover: "assets/imgs/cliente2.png",
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
    {
      id_orden: "654987",
      sector_id: "s02",
      cover: "assets/imgs/cliente2.png",
      foto: 'assets/imgs/moto1.jpg',
      name_rider: 'Bastian Pavez',
      telefono_rider: '+56945789813',
      name_cliente: 'Jorge Caceres',
      telefono_cliente: '+56998765432',
      dir_recogida: ['Las Camelias 040', 'La Reina'],
      dir_entrega: ['Ricardo Lyon 890', 'Peñalolen'],
      hora: '14:25',
      distancia: '4.3',
      sin_asignar: false
    },
  ];

  sectores: Sectores[] = [
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

  allriders: Riders [] = [
      {
      uid: '987654',
      foto: 'assets/imgs/moto1.jpg',
      name: 'Bastian Pavez',
      short_name: 'bastian pavez',
      sector: 'Nororiente',
      disponibilidad: '18:00 - 23:00',
    },
    {
      uid: '887654',
      foto: 'assets/imgs/moto2.png',
      name: 'Camilo Henrriquez',
      short_name: 'camilo henriquez',
      sector: 'Centro',
      disponibilidad: '12:30 - 16:40'
    },
    {
      uid: '987654',
      foto: 'assets/imgs/moto1.jpg',
      name: 'Basilio Costa',
      short_name: 'basilio costa',
      sector: 'Suroriente',
      disponibilidad: '18:00 - 23:00',
    },
  ];

  addresses: Address[] = [      
    {address: "Fancy Bazaar, India", house: "2nd Floor", id: "7Kox63KlggTvV7ebRKar", landmark: "Fancy Bazar", lat: 26.1830738, lng: 91.74049769999999, title: "Fancy", user_id: "1"},
    {address: "Kanuat palace, India", house: "Ground Floor", id: "8Kox63KlggTvV7ebRKar", landmark: "Bazar", lat: 26.1830738, lng: 91.74049769999999, title: "Work", user_id: "1"}
  ];

  orders: any[] = [      
    {
      address: {address: "Indira Nagar Rd, Borsojai, Basistha 781029, India", house: "dsgd", id: "cLQdnS8YXk5HTDfM3UQC", landmark: "fdgs", lat: 26.108991978867923, lng: 91.79069981213378, title: "yui", user_id: "1" }, 
      deliveryCharge: 20,
      grandTotal: "540.00",
      id: "5aG0RsPuze8NX00B7uRP",
      order: [
        {category_id: "e0", cover: "assets/imgs/salad.jpg", desc: "Great in taste", id: "i2", name: "Caprese Salad", price: 200, rating: 0, status: true, uid: "12wefdefsdss", variation: false, veg: true, quantity: 1},
      ],
      paid: "COD",  
      restaurant: 
      // {address: "Christan Basti, India",  city: "909090567", closeTime: "21:00", cover: "", cuisines: ["Caribbean food", "North Indian", "Vietnamese"], delivery_time: 25, description: "dd", email: "DosaPlaza@gmail.com", latitude: 26.1286243, longitude: 91.8012675, uid: "12wefdefsdss", isClose: true, name: "DosaPlaza", openTime: "07:00", phone: 6619563867, price: 27, rating: 4.7, short_name: "stayfit", status: "open", totalRating: 13},
      {
        uid: '12wefdefsdss',
        cover: 'assets/imgs/2.jpg',
        name: 'Stayfit1',
        short_name: 'stayfit1',
        cuisines: [
          'Italian',
          'Mexican'
        ],
        rating: 5,
        delivery_time: 25,
        distance: 2.5,
        price: 100
      },
      restaurant_id: "12wefdefsdss",  
      status: "created",
      time: "Jul 6, 2020 11:44 AM",
      total: "520.00",
      user_id: "1"
    },
    {
      address: {address: "Indira Nagar Rd, Borsojai, Basistha 781029, India", house: "dsgd", id: "cLQdnS8YXk5HTDfM3UQC", landmark: "fdgs", lat: 26.108991978867923, lng: 91.79069981213378, title: "yui", user_id: "1" }, 
      deliveryCharge: 20,
      grandTotal: "440.00",
      id: "5aG0RsPuze8NX00B7uR1",
      order: [
        {category_id: "e00", cover: "assets/imgs/pizza.jpg", desc: "Great in taste", id: "i1", name: "Pizza", price: 120, quantity: 1, rating: 0, status: true, uid: "12wefdss", variation: false, veg: false},
        {category_id: "e00", cover: "assets/imgs/pasta.jpg", desc: "Great in taste", id: "i3", name: "Pasta", price: 150, quantity: 2, rating: 0, status: true, uid: "12wefdss", variation: false, veg: false}
      ],
      paid: "COD",  
      restaurant: {address: "Beltola Tiniali, India", city: "909090271", closeTime: "20:00", cover: "assets/imgs/1.jpg", cuisines: ["Italian", "Mexican"], delivery_time: 25, description: "dd", email: "stay@fit.com", uid: "12wefdss", isClose: true, latitude: 26.1286243, longitude: 91.8012675, name: "Stayfit", openTime: "08:00", phone: 6786745745, price: 25, rating: 0, short_name: "stayfit", status: "open", totalRating: 0},    
      restaurant_id: "12wefdss",  
      status: "Delivered",
      time: "Jul 7, 2020 11:44 AM",
      total: "420.00",
      user_id: "1"
    },
  ];
  constructor(private firestore: Firestore) { }

  docRef(path) {
    return doc(this.firestore, path);
  }

  collectionRef(path) {
    return collection(this.firestore, path);
  }

  setDocument(path, data) {
    const dataRef = this.docRef(path);
    return setDoc<any>(dataRef, data); //set()
  }

  addDocument(path, data) {
    const dataRef = this.collectionRef(path);
    return addDoc<any>(dataRef, data); //add()
  }

  getDocById(path) {
    const dataRef = this.docRef(path);
    return getDoc(dataRef);
  }

  getDocs(path, queryFn?) {
    let dataRef: any = this.collectionRef(path);
    if(queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    return getDocs<any>(dataRef); //get()
  }

  collectionDataQuery(path, queryFn?) {
    let dataRef: any = this.collectionRef(path);
    if(queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    const collection_data = collectionData<any>(dataRef, {idField: 'id'}); // valuechanges, for doc use docData
    return collection_data;
  }

  docDataQuery(path, id?, queryFn?) {
    let dataRef: any = this.docRef(path);
    if(queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    let doc_data;
    if(id) doc_data = docData<any>(dataRef, {idField: 'id'});
    else doc_data = docData<any>(dataRef); // valuechanges, for doc use docData
    return doc_data;
  }

  whereQuery(fieldPath, condition, value) {
    return where(fieldPath, condition, value);
  }

  orderByQuery(fieldPath, directionStr: OrderByDirection = 'asc') {
    return orderBy(fieldPath, directionStr);
  }

}
