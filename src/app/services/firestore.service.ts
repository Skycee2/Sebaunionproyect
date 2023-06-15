import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFirestore, QueryDocumentSnapshot, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'
import { Usuario } from '../interface/models';
import { Observable } from 'rxjs';
import { map, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  usuarioLogueado = new BehaviorSubject<any>(null); // variable para almacenar los datos del usuario
  
  isAutenticated = new BehaviorSubject(false);

  ordenes: any[];
  


  constructor(private firestore: AngularFirestore, private router: Router, private auth: Auth, private afAuth: AngularFireAuth) { }

  registrarUsuario(usuario: any) {
    const email = usuario.email;
    const password = usuario.password;

    if (!email || !password) {
      // Manejar el caso en el que el email o la contraseña estén faltando
      console.error('Email o contraseña faltantes');
      throw new Error('Email o contraseña faltantes');
    }

    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        // Agregar el usuario a la colección en Firestore utilizando el método add
        return this.firestore.collection('usuarios').add(usuario)
          .then((docRef) => {
            // Obtener el ID asignado al documento y actualizar el usuario con ese ID
            const nuevoUsuario = {
              ...usuario,
              uid: docRef.id
            };

            // Actualizar el documento con el ID asignado
            return docRef.update(nuevoUsuario);
          });
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
      this.usuarioLogueado.next({ ...usuario, uid: usuario.uid });
    }
  }

  getMotociclistas(): Observable<Usuario[]> {
    return this.firestore
      .collection<Usuario>('usuarios', ref => ref.where('tipo_usuario', '==', 'motociclista'))
      .valueChanges()
      .pipe(map(snapshot => snapshot as Usuario[]));
  }

  modificarOrden(ordenId: string, data: any): Promise<void> {
    return this.firestore.collection('ordenes').doc(ordenId).update(data);
  }

  obtenerOrdenes() {
    this.firestore.collection('ordenes').valueChanges().subscribe(ordenes => {
      this.ordenes = ordenes;
      // Aquí puedes agregar la lógica para asignar el valor del motociclista seleccionado a cada orden
    });
  }

  login(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // Obtener el usuario correspondiente al email desde Firestore
        return this.firestore.collection('usuarios').ref.where('email', '==', email).get();
      })
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const usuarioData = querySnapshot.docs[0].data() as Usuario;
          const usuario: Usuario = {
            uid: usuarioData.uid,
            rut: usuarioData.rut,
            nom_rso: usuarioData.nom_rso,
            direccion: usuarioData.direccion,
            correo: usuarioData.correo,
            telefono: usuarioData.telefono,
            nom_usuario: usuarioData.nom_usuario,
            password: usuarioData.password,
            tipo_usuario: usuarioData.tipo_usuario
          };
          console.log('Usuario logueado:', usuario); // Verificar el usuario obtenido en la consola
          console.log('UID del usuario:', usuario.uid);
          this.setUsuarioLogueado(usuario); // Establecer los datos del usuario logueado en el servicio
          this.usuarioLogueado.next(usuario); // emitir el valor del usuario logueado
          this.isAutenticated.next(true); // establecer el estado de autenticacion en verdadero
        } else {
          console.log('No se encontró ningún usuario con el correo proporcionado');
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


  getUid(): string {
    if (this.usuarioLogueado.getValue()) {
      return this.usuarioLogueado.getValue().uid;
    } else {
      return null;
    }
  }

  getUsuarios() {
    return this.firestore.collection('usuarios').valueChanges();
  }

  modificarUsuario(uid: string, usuario: any): Promise<void> {
    // Implementa la lógica para modificar el usuario en Firestore
    // Utiliza el UID y los datos actualizados del usuario
    return this.firestore.collection('usuarios').doc(uid).update(usuario);

  }

  eliminarUsuario(uid: string): Promise<void> {
    // Eliminar el usuario de Firestore
    const eliminarUsuarioFirestore = this.firestore.collection('usuarios').doc(uid).delete();

    // Eliminar el usuario de Firebase Authentication
    const eliminarUsuarioAuth = this.afAuth.currentUser.then((user) => {
      return user.delete();
    });

    // Esperar a que ambas eliminaciones se completen
    return Promise.all([eliminarUsuarioFirestore, eliminarUsuarioAuth])
      .then(() => {
        // usuario se elimina con exito
        console.log('usuario eliminado')
      })
      .catch((error) => {
        // manejo error
        console.error('Error al eliminar usuario', error);
        throw error;
      });
  }


  crearOrden(orden: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const usuarioLogueado = this.getUsuarioLogueado().getValue(); // Obtener los datos del usuario logueado
      if (usuarioLogueado) {
        orden.creado_por = usuarioLogueado.nom_rso; // Asignar el nom_rso del usuario al campo creado_por
      }
  
      this.firestore.collection('ordenes').add(orden)
        .then(ref => {
          // Obtener el ID asignado al documento y actualizar la orden con ese ID
          const ordenActualizada = {
            ...orden,
            id: ref.id
          };
  
          // Actualizar el documento con el ID asignado
          return ref.update(ordenActualizada)
            .then(() => {
              resolve(ref.id);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  //Método para crear id
  getId() {
    return this.firestore.createId();
  }

  getDoc<tipo>(path: string, id: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.doc(id).get();
  }


  //Métodos para firebase 
  addFire(coleccion, value) {
    try {
      this.firestore.collection(coleccion).add(value);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getDatosFire(coleccion) {
    try {
      let aux = this.firestore.collection(coleccion).snapshotChanges();
      return aux
    } catch (error) {
      console.log(error);
    }
  }

  getDatoFire(coleccion, id) {
    try {
      return this.firestore.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log(error);
    }
  }

  deleteFire(coleccion, id) {
    try {
      this.firestore.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }

  updateFire(coleccion, id, value) {
    try {
      this.firestore.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.log(error);
    }
  }

  getAuthFire() {
    return this.isAutenticated.value;
  }

  // Método cerrar sesión
  logOut() {
    this.afAuth.signOut().then(() => {
      this.isAutenticated.next(false);
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log('error al cerrar sesión: ', error);
      throw error;
    })
  }
}


