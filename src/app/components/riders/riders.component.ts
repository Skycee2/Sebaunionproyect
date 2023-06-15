import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss'],
})
export class RidersComponent  implements OnInit {
  @Input() riders: any;
  @Output() uid_rider:any;
  handlerMessage = '';
  @Output()roleMessage = '';

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.handlerMessage = 'Alert canceled';
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.handlerMessage = 'Alert confirmed';
      },
    },
  ];

  setResult(ev:any) {
    this.roleMessage = 'Dismissed with role: ${ev.detail.role}';
  }


  constructor() { }

  ngOnInit(
  ) {}


  getUIRider() {
    this.riders.uid = this.uid_rider;
    console.log(this.uid_rider)
  }
}

