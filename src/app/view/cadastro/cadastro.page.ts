import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { ItensService } from 'src/app/model/services/firebase-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public nome! : string;
  public capacidade! : number;
  public potencia! : string;
  public categoria! : number;
  public calibre! : number;
  public imagem! : any;

  constructor(private alertController: AlertController,
    private router : Router, private firebase : ItensService){
      
    }
  
  ngOnInit() {
  }

  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  cadastro(){
    if (this.nome && this.potencia) {
      let create: Itens = new Itens(this.nome, this.potencia);
      create.capacidade = this.capacidade;
      create.categoria = this.categoria;
      create.calibre = this.calibre;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, create)
        ?.then(()=>{
          this.router.navigate(["/home"]);
        })
      }else {
        this.firebase.cadastrar(create).then(() => this.router.navigate(["/home"])).catch((error) =>{
        console.log(error);
        this.presentAlert("Erro", "Erro ao salvar contato!");
        })
      }   
      this.firebase.cadastrar(create);
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('ERRO!', 'Nome e Potencia são campos obrigatórios!');
    }
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

}