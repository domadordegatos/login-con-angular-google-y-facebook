import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLogin:boolean;
  public nombreUsuario:string;
  public emailUsuario:string;
  public fotoUsurario:string;
  constructor(public router:Router,
              public authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLogin = true;
        this.nombreUsuario= auth.displayName;
        this.emailUsuario = auth.email;
        this.fotoUsurario = auth.photoURL;
      }else{
        this.isLogin = false;
      }
    });
  }
  onClickLogout(){
    this.authService.logAuth();
  }

}
