import { FirestoreService } from './firestore.service';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  currentUserId: string;
  public usuarios: Observable<any>;
  public chatRooms: Observable<any[]>;
  public selectedChatRoomMessages: Observable<any>;

  constructor(
    public firestoreService: FirestoreService, 
    private api: ApiService
  )  { 
  }

  getId() {
    console.log(this.currentUserId);
    this.currentUserId = this.firestoreService.getId();
  }

  getUsers() {
    this.usuarios = this.api.collectionDataQuery(
      'usuarios', 
      this.api.whereQuery('uid', '!=', this.currentUserId)
    );
  }

  async createChatRoom(usuario_id) {
    try {
      // check for existing chatroom
      let room: any;
      const querySnapshot = await this.api.getDocs(
        'chatRooms',
        this.api.whereQuery(
          'members', 
          'in', 
          [[usuario_id, this.currentUserId], [this.currentUserId, usuario_id]]
        )
      );
      room = await querySnapshot.docs.map((doc: any) => {
        let item = doc.data();
        item.id = doc.id;
        return item;
      });
      console.log('exist docs: ', room);
      if(room?.length > 0) return room[0];
      const data = {
        members: [
          this.currentUserId,
          usuario_id
        ],
        type: 'private',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      room = await this.api.addDocument('chatRooms', data);
      return room;
    } catch(e) {
      throw(e);
    }
  }

  getChatRooms() {
    return new Observable<any[]>((observer) => {
      this.getId();

      this.api.collectionDataQuery('chatRooms', this.api.whereQuery('members', 'array-contains', this.currentUserId))
        .pipe(
          map((data: any[]) => {
            console.log('room data: ', data);
            data.map((element) => {
              const usuario_data = element.members.filter(x => x != this.currentUserId);
              console.log(usuario_data);
              const user = this.api.docDataQuery(`users/${usuario_data[0]}`, true);
              element.user = user;
            });
            return data;
          })
        )
        .subscribe(
          (rooms: any[]) => {
            this.chatRooms = of(rooms);
            console.log('chatRooms: ', this.chatRooms);
            observer.next(rooms);
            observer.complete();
          },
          (error) => {
            console.log('Error fetching chat rooms: ', error);
            observer.error(error);
          }
        );
    });
  }


  getChatRoomMessages(chatRoomId) {
    this.selectedChatRoomMessages = this.api.collectionDataQuery(
      `chats/${chatRoomId}/messages`, 
      this.api.orderByQuery('createdAt', 'desc')
    )
    .pipe(map((arr: any) => arr.reverse()));
  }

  async sendMessage(chatId, msg) {
    try {
      const new_message = {
        message: msg,
        sender: this.currentUserId,
        createdAt: new Date()
      };
      console.log(chatId);
      if(chatId) {
        await this.api.addDocument(`chats/${chatId}/messages`, new_message);
      }
    } catch(e) {
      throw(e);
    }
  }

}
