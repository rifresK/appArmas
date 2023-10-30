import { Injectable } from '@angular/core';
import { Itens } from '../entities/itens/Itens';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ItensService {
  private PATH : string = "arma";
  constructor(private firestore : AngularFirestore, private storage : AngularFireStorage) {}

  obterTodos(){
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  cadastrar(itens : Itens){
    return this.firestore.collection(this.PATH).add({
      nome : itens.nome,
      capacidade: itens.capacidade,
      potencia: itens.potencia,
      categoria: itens.categoria,
      calibre: itens.calibre, downloadURL: itens.downloadURL});
  }

  editar(itens : Itens, id : string){
    return this.firestore.collection(this.PATH).doc(id).update({
      nome : itens.nome,
      capacidade: itens.capacidade,
      potencia: itens.potencia,
      categoria: itens.categoria,
      calibre: itens.calibre, downloadURL: itens.downloadURL});
  }

  excluir(id : string){
    return this.firestore.collection(this.PATH).doc(id).delete();
  }


  uploadImage(imagem: any, itens : Itens){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){
      console.error("Tipo Não Suportado.");
      return;
    }
    const path = `images/${itens.nome}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path,file);
    task.snapshotChanges().pipe(
      finalize(() =>{
        let uploadFileURL = fileRef.getDownloadURL();
        uploadFileURL.subscribe(resp => {
          itens.downloadURL = resp;
          if(!itens.id){
            this.cadastrar(itens);
          }else {
            this.editar(itens, itens.id);
          }
        })
      })
    ).subscribe();
    return task;
  }
}
