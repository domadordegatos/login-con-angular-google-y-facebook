import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { Observable, Subject } from 'rxjs';
import 'rxjs/Rx';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth:AngularFireAuth) { }
  loginGoogle(){
    return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
  }
  loginFacebook(){
    return this.afAuth.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider());
  }
  registerUser(email:string,pass:string){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
      .then( userData=> resolve(userData),
      err => reject (err));
    });
  }
  loginUser(email:string,pass:string){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email,pass)
      .then( userData=> resolve(userData),
      err => reject (err));
    });
  }
  logAuth(){
    return this.afAuth.auth.signOut();
  }
  getAuth(){
    return this.afAuth.authState.map(auth=>auth);
  }

}
