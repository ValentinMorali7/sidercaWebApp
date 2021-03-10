import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { Router, NavigationEnd } from '@angular/router';
import {Globals} from '../../../global'
import { UserService } from '../user/user-service.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private userLoged: string;
  private isLoged : boolean;
  private isAdmin: Boolean;


  ngOnInit() {
    this.userLoged = this.userService.getUserLoggedIn();
    this.isLoged = this.userService.getUserLogged();
    this.isAdmin = this.userService.getUserAdmin();
    console.log(this.isAdmin);
  }


  constructor(
    private modalService: NgbModal,
    private globals: Globals,
    private router: Router,
    private userService: UserService,  
    ) {
  
     /* this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     }*/

     

     }

     reload(){
      
      this.router.navigate(['redirect']);
     }

  openFormModal() {
    const modalRef = this.modalService.open(FormModalComponent);
    
    modalRef.result.then((result) => {

      console.log("----"+result);
    }).catch((error) => {


      console.log("$$$"+error);
      this.reload();

    });
  }

}
