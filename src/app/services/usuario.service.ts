import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getuid } from 'process';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioLogueado = new BehaviorSubject<any>(null); // variable para almacenar los datos del usuario

  // Variable que confirma si existe o no una sesión activa
  isAutenticated = new BehaviorSubject(false);

  constructor(private router: Router, private auth: Auth, private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

  registrarUsuario(usuario: any) {
    const email = usuario.correo;
    const password = usuario.password;

    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        // Obtener el ID del usuario recién creado
        const userId = credential.user.uid;

        // Agregar el usuario a la colección en Firestore
        return this.firestore.collection('usuarios').doc(userId).set(usuario);
      })
      .catch((error) => {
        // Manejar el error de registro de usuario
        console.error('Error al registrar usuario:', error);
        throw error;
      });
  }

  getUsuarioLogueado() {
    return this.usuarioLogueado; // retorna los datos del usuario almacenados en la variable
  }

  setUsuarioLogueado(usuario: any) {
    if (usuario) {
      this.usuarioLogueado.next(usuario); 
    }
  }

login(email: string, password: string): Promise<void> {
  return this.afAuth.signInWithEmailAndPassword(email, password)
    .then(() => {
      // Obtener el usuario correspondiente al email desde Firestore
      return this.firestore.collection('usuarios').ref.where('email', '==', email).get();
    })
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const usuario = querySnapshot.docs[0].data();
        console.log('Usuario logueado:', usuario); // Verificar el usuario obtenido en la consola
        this.setUsuarioLogueado(usuario); // Establecer los datos del usuario logueado en el servicio
        this.usuarioLogueado.next(usuario); // emitir el valor del usuario logueado
        this.isAutenticated.next(true); // establecer el estado de autenticacion en verdadero
      }
    })
    .catch((error) => {
      console.error('Error al obtener el usuario:', error);
      throw error;
    });
}

  getUsuarioByEmail(email: string) {
    return this.firestore.collection('usuarios', ref => ref.where('email', '==', email)).get();
  }

  getAuth() {
    return this.isAutenticated.value;
  }

  // Método cerrar sesión
  logOut() {
    this.afAuth.signOut(). then(() => {
    this.isAutenticated.next(false);
    this.router.navigate(['/login']);
  }).catch((error) => {
    console.log('error al cerrar sesión: ', error);
    throw error;
  })
  }

  getUid(): string {
    if (this.usuarioLogueado.getValue()) {
      return this.usuarioLogueado.getValue().uid;
    } else {
      return null;
    }
  }

  validarRut(rut):boolean{
    //Cambiar formato de rut
    var rutSimple = rut.replace('.','').replace('.','').replace('-','');
    
    //Eliminar dv
    rutSimple = rutSimple.substring(0, rutSimple.length-1);
    
    //Voltear dígitos del rut
    var arregloRut = rutSimple.split('').reverse();
    
    //Cálculo de operación de números de rut
    var acumulador: number = 0;
    var multiplo: number = 2;
    for(let digito of arregloRut){
      acumulador = acumulador + digito * multiplo;
      multiplo++;
      if(multiplo > 7){
        multiplo = 2;
      }
    }
    //Cálculo para obtener el dv
    var resto: number = acumulador%11;
    var dvCalc: any = 11 -resto;

    //Si es mayor que 11, se le asigna como valor 0
    if(dvCalc >= 11){
      dvCalc = 0;

    //Si es 10, se le asigna como valor K
    }else if(dvCalc == 10){
      dvCalc = 'K';
    }

    //Comparar resultados con el rut ingresado para confirmar
    var dvRut: string = rut.substring(rut.length-1).toUpperCase();
    if(dvRut == dvCalc.toString()){
      return true;
    }else{
      return false;
    }
  }
}



