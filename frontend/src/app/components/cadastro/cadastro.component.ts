import { Router } from '@angular/router';
import { BdService } from './../../service/bd.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ CommonModule , FormsModule ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  cadastroSucesso: boolean = false;
  cadastroFalhou: boolean = false;

  constructor(private BdService: BdService, private router: Router) { }

  cadastrar() {
    this.BdService.register(this.nome, this.email, this.senha).subscribe(response => {
      if (response.success) {
        this.cadastroSucesso = true;
        this.cadastroFalhou = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Redireciona para a tela de login após 2 segundos
      } else {
        this.cadastroFalhou = true;
        this.cadastroSucesso = false;
      }
    });
  }

}
