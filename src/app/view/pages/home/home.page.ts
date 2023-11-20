import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { FirebaseService } from 'src/app/model/services/firebase-service.service.spec';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public Armamentos : Itens[] = [];
  
  constructor(private router : Router,
    private alertController : AlertController, 
    private firebase : FirebaseService) {
    this.firebase.obterTodos().subscribe((res) => {
      this.Armamentos = res.map((arma) => {
        return {
          id: arma.payload.doc.id,
          ...(arma.payload.doc.data() as any),
        } as Itens;
      });
    });
  }

  irParaCadastro(){
    this.router.navigate(["/cadastro"]);
  }

  editar(arma : Itens){
    this.router.navigateByUrl("/editar", {state: { arma: arma } });
  }
}
