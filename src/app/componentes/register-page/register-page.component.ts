import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public email:string;
  public password:string;
  constructor(public authService:AuthService,
              public router:Router) { }

  ngOnInit(): void {
    this.resetForm();
  }
  onSubmitAddUser(){
    this.authService.registerUser(this.email,this.password)
    .then((res)=>{
      //console.log("bien");
      //console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Usuario Creado Exitosamente',
        showConfirmButton: false,
        timer: 1000
      });
      this.router.navigate(['/login']);
    }).catch((err)=>{
      console.log(err);
      if(err.code === 'auth/email-already-in-use') {
        //alert("usuario registrado");
        this.resetForm();
        Swal.fire({
          title: 'Error!',
          text: 'Ya existe este usuario',
          icon: 'error',
          confirmButtonText: 'Intentar de Nuevo'
        })
      }else if(err.code === 'auth/invalid-email'){
        this.resetForm();
        Swal.fire({
          title: 'Error!',
          text: 'Ingresa un correo valido',
          icon: 'error',
          confirmButtonText: 'Intentar de Nuevo'
        })
      }
    });
  }
  filterName:string;
  resetForm(){
    this.email='';
    this.password='';
    console.log("borrado");
  }

}
