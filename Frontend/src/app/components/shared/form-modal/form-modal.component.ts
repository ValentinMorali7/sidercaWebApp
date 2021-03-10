import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user/user-service.component';
import { User } from '../../../user.model';
import {Globals} from '../../../global'


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {
  login: FormGroup;
  submitted = false;
  ferror = false;

  
  constructor(public activeModal: NgbActiveModal, 
              private formBuilder: FormBuilder,
              private router: Router, 
              private userService: UserService, 
              private globals: Globals,
              private http: HttpClient
             
             ) { }

  ngOnInit() {

    this.login = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(1)]],            
      password: ['', [Validators.required, Validators.minLength(1)]],
  });
  }

  get f() { return this.login.controls; }

 noValidate(){
  this.ferror =true;
 }

 releaseValidate(){
   this.ferror = false;
 }


 validate(username:string, password:string) {
  return this.http.post(this.globals.baseUrl +'/login/authenticate', {
    Identification: username,
    Password: password,     
  });     
}



public logIn(username: string, password: string) {
  //event.preventDefault(); // Avoid default action for the submit button of the login form
  //console.error("llego aqui");
  // Calls service to login user to the api rest
  this.releaseValidate();
  this.validate(username, password).subscribe(

    res => {
      let data = res as User;
      //console.log(data);

      let u: User = {identification: data.identification, token: data.token, admin: data.admin, auth:true};
      console.log(u);        
      this.userService.setUserLoggedIn(u);
      this.closeModal();
      window.location.reload();
      //this.router.navigate(['pool']);
      //this.router.navigateByUrl(this.globals.baseUrl +'/pool');
      //window.location.reload();

    },
    error => {
      
      this.noValidate();
      console.error(error);

    },
    () => this.navigate()
  );

}

navigate() {    
  this.router.navigateByUrl(this.globals.baseUrl +'/pool');
}

onSubmit() {

  return this.logIn(this.login.get("user").value, this.login.get("password").value);

  
}

  closeModal() {
     
    this.activeModal.dismiss('Ventana Cerrada');
    
  }

}
