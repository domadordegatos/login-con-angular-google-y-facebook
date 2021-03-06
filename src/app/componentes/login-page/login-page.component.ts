import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public email:string;
  public password:string;
  constructor(public authService:AuthService,
              public router:Router) { }

  ngOnInit(): void {
  }
  onSubmitLogin(){
    this.authService.loginUser(this.email,this.password)
    .then((res)=>{
      this.router.navigate(['/privado']);
    }).catch((err)=>{
      console.log(err);
      if(err.code === 'auth/user-not-found'){
        Swal.fire({
          icon: 'error',
          title: 'Usuario Inexistente',
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['/login']);
      }
    })
  }
  onClickGooogleLogin(){
    this.authService.loginGoogle()
    .then((res)=>{
      this.router.navigate(['/privado']);
    }).catch(err=>
      console.log(err.message));
  }
  onClickFacebookLogin(){
    this.authService.loginFacebook()
    .then((res)=>{
      this.router.navigate(['/privado']);
    }).catch(err=>
      console.log(err.message));
  }

}
