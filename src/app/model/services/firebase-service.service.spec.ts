import { Injectable } from '@angular/core';
import { Itens } from '../entities/itens/Itens';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = "arma";
  constructor(private firestore : AngularFirestore) { }

  obterTodos() {
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  register(itens : Itens) {
    return this.firestore.collection(this.PATH).add({
      nome: itens.nome,
      capacidade: itens.capacidade,
      potencia: itens.potencia,
      categoria: itens.categoria,
      calibre: itens.calibre
      
    });
  }

  editar(itens: Itens, id: string) {
    return this.firestore.collection(this.PATH).doc(id).update({
      nome: itens.nome,
      capacidade: itens.capacidade,
      potencia: itens.potencia,
      categoria: itens.categoria,
      calibre: itens.calibre
    });
  }

  excluir(id: string) {
    return this.firestore.collection(this.PATH).doc(id).delete();
  }
}
