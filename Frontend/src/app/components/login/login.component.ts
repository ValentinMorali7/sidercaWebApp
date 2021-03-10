import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../shared/user/user-service.component';
import { User } from '../../user.model';
import {Globals} from '../../global'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, 
    private userService: UserService, 
    private globals: Globals,
    private http: HttpClient) {

  
      localStorage.removeItem('TenarisMimicoPiletaUser');
      localStorage.removeItem('TenarisMimicoPiletaLoged');
      localStorage.clear();

      for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        console.log(key, value);
      }
        //this.router.navigateByUrl(this.globals.baseUrl +'/pool');

     }

  ngOnInit() {
    window.location.reload();
    this.router.navigateByUrl(this.globals.baseUrl +'/pool');

    //this.router.navigate(['redirect']);
    
  }

 
  

}
