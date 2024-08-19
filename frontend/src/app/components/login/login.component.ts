import { Router } from '@angular/router';
import { BdService } from './../../service/bd.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  loginFailed: boolean = false;

  constructor(private BdService: BdService, private router: Router) { }

  login() {
    this.BdService.login(this.email, this.senha).subscribe(response => {
      if (response.success) {
        this.router.navigate(['/home']);
      } else {
        this.loginFailed = true;
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/cadastro']);
  }

}
