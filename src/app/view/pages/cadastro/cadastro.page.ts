import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Itens } from 'src/app/model/entities/itens/Itens';
import { ItensService } from 'src/app/model/services/firebase-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  formulario: FormGroup;
  imagem: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firebase: ItensService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      capacidade: ['', Validators.required],
      potencia: ['', Validators.required],
      categoria: ['', Validators.required],
      calibre: ['', Validators.required],
      arquivo: ['']
    });
  }

  ngOnInit() {
  }

  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.imagem = input.files;
      this.formulario.patchValue({
        arquivo: this.imagem
      });
    }
  }

  cadastro() {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      const create: Itens = new Itens(formData.nome, formData.potencia);
      create.capacidade = formData.capacidade;
      create.categoria = formData.categoria;
      create.calibre = formData.calibre;

      if (formData.arquivo) {
        this.firebase.uploadImage(formData.arquivo, create)?.then(() => {
          this.router.navigate(['/home']);
        });
      } else {
        this.firebase.cadastrar(create).then(() => {
          this.router.navigate(['/home']);
        }).catch((error) => {
          console.log(error);
          this.presentAlert('Erro', 'Erro ao salvar contato!');
        });
      }
    } else {
      this.presentAlert('ERRO!', 'Preencha os campos obrigatórios!');
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
