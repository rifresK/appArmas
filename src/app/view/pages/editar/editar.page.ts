import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { ItensService } from 'src/app/model/services/firebase-service.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  indice!: number;
  nome!: string;
  capacidade!: number;
  potencia!: string;
  categoria!: number;
  calibre!: number;
  imagem!: any;
  arma!: Itens;
  edicao: boolean = true;

  constructor(
    private actRoute: ActivatedRoute, 
    private firebase: ItensService, 
    private router: Router, 
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.arma = history.state.arma;
    this.nome = this.arma?.nome;
    this.capacidade = this.arma?.capacidade;
    this.potencia = this.arma?.potencia;
    this.categoria = this.arma?.categoria;
    this.calibre = this.arma?.calibre;
  }

  habilitar() {
    if (this.edicao) {
      this.edicao = false;
    } else {
      this.edicao = true;
    }
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  editar() {
    if (this.nome && this.potencia) {
      let create: Itens = new Itens(this.nome, this.potencia);
      create.capacidade = this.capacidade;
      create.categoria = this.categoria;
      create.calibre = this.calibre;
      create.id = this.arma.id;

      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, create)
          ?.then(() => { this.router.navigate(["/home"]); });
      } else {
        create.downloadURL = this.arma.downloadURL;
        this.firebase.editar(create, this.arma.id)
          .then(() => { this.router.navigate(['/home']); })
          .catch((error) => {
            console.log(error);
            this.presentAlert('ERRO', 'Erro ao editar arma!');
          });
      }
    } else {
      this.presentAlert('ERRO', 'Nome e potencia são campos obrigatórios!');
    }
  }

  excluir() {
    this.presentConfirmAlert("ATENÇÃO", "Deseja realmente excluir a arma?");
  }

  excluirArma() {
    this.firebase.excluir(this.arma.id)
      .then(() => { this.router.navigate(['/home']); })
      .catch((error) => {
        console.log(error);
        this.presentAlert('ERRO', 'Erro ao excluir arma!');
      });
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Armamentos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentConfirmAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Armamentos',
      subHeader: subHeader,
      message: message,
      buttons: [
        { text: 'Cancelar', role: 'cancelar', handler: () => { console.log("cancelou") } },
        { text: 'Confirmar', role: 'confirmar', handler: (acao) => { this.excluirArma() } },
      ],
    });
    await alert.present();
  }

}
