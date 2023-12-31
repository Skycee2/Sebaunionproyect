import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class OrderService {


  // validator = this.api.ordenes
  private _orders = new BehaviorSubject<any>(null);

  get orders() {
    return this._orders.asObservable();
  }

  constructor(private api: ApiService) { }

  getOrders() {
    try {
      const orders = this.api.orders;
      console.log('orders', orders);
      this._orders.next(orders);
    } catch(e) {
      throw(e);
    }
  }

  placeOrder(param:any) {
    try {
      param.user_id = '1';
      param.order = JSON.parse(param.order);
      param.id = '5aG0RsPuze8NX00B7uE2';
      this._orders.next(param);
    } catch(e) {
      throw(e);
    }
  }

}