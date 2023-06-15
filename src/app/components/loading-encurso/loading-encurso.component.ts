import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-encurso',
  templateUrl: './loading-encurso.component.html',
  styleUrls: ['./loading-encurso.component.scss'],
})
export class LoadingEncursoComponent  implements OnInit {

  dummy = Array(10);

  constructor() { }

  ngOnInit() {}

}
