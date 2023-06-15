import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '@angular/fire/auth-guard';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuarioService } from './services/usuario.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  usuarioLogueado: any;

  
  constructor(private router: Router, private firestoreService: FirestoreService, private auth: AuthGuard, private usuarioService: UsuarioService, private afAuth: AngularFireAuth) {}
/*
  async ngOnInit() {
    const usuario = await this.afAuth.currentUser;
    if (usuario) {
      const usuarioLogueado = await this.usuarioService.getUsuarioByEmail(usuario.email).toPromise();
      this.usuarioService.setUsuarioLogueado(usuarioLogueado);
      this.usuarioLogueado = usuarioLogueado;
    }
  } 
  */

  ngOnInit() {
    this.usuarioService.usuarioLogueado.subscribe((usuario) => {
      this.usuarioLogueado = usuario;
    });
    console.log('Usuario logueado en AppComponent:', this.usuarioLogueado); // Verificar el usuario obtenido en la consola
  }

  btnHome() {
    this.router.navigate(['/home/tabs/home']);
  } 

  btnUsuarios() {
    this.router.navigate(['/usuarios']);
  }

  btnReportes(){
    this.router.navigate(['/reportes']);
  }

  btnConfiguracion() {
    this.router.navigate(['/configuracion'])
  }



  logout(){
    this.usuarioService.logOut();
    this.usuarioLogueado = null; // con esto el menu deja de mostrarse a pesar de cerrar sesión
    this.router.navigate(['/inicio']);
    console.log('Cierre de sesión');
  }
}


