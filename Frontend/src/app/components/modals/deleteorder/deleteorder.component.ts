import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IfStmt } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefectdeailtsComponent } from '../../modals/defectdeailts/defectdeailts.component';
import { ConfirmationComponent } from '../../modals/confirmation/confirmation.component';
import { Globals } from 'src/app/global';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Time } from '@angular/common';

@Component({
  selector: 'app-deleteorder',
  templateUrl: './deleteorder.component.html',
  styleUrls: ['./deleteorder.component.css']
})
export class DeleteorderComponent implements OnInit {

  UserOK;
  EliminarOK;
bandera=true;
texto;
error=false;
  constructor(private router: Router,public infoModal: NgbActiveModal, private modalService: NgbModal, private globals: Globals, private httpClient: HttpClient) { 







  }

   async ngOnInit() {




    var idpedido=sessionStorage.getItem('IdPedido');  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  
    var user=sessionStorage.getItem('user');  //hago variable de session a el pedido por si voy y vengo queda guardado en la web         


    if(idpedido!=null && user!=null){
    let headers = new HttpHeaders().set('Content-Type','application/json');

      var url1 = this.globals.baseUrl + '/Pedidos/uservalidate/'+idpedido+"/"+user;
       await this.httpClient.get(url1, {headers: headers}).toPromise().then(value =>{
      //  alert(value);
     if(value!=null){
       this.UserOK = true;
     }else{
       this.UserOK = false;
     }
        });


var url1 = this.globals.baseUrl + '/Patrons/'+idpedido;
await this.httpClient.get(url1, {headers: headers}).toPromise().then(value =>{
//     alert(value);
if(value!=null){
this.EliminarOK = true;
}else{
this.EliminarOK = false;
}
 });

///alert(this.UserOK)
//alert(this.EliminarOK)

if(this.UserOK && this.EliminarOK){

 var url1 = this.globals.baseUrl + '/Pedidos/deleteordercomplete/'+idpedido;
 await this.httpClient.get(url1, {headers: headers}).toPromise().then(value =>{
  });

}else{

 if(this.UserOK==false){

 this.infoModal.close(3);
 }

 if(this.EliminarOK==false){
 var url1 = this.globals.baseUrl + '/Pedidos/deleteupdateorder/'+idpedido;
 await this.httpClient.get(url1, {headers: headers}).toPromise().then(value =>{
  });
 }

}



     } // if no son nulos ni user ni idpedido



  //    alert("aa")
    //  this.infoModal.close(3);
this.texto="El pedido fue eliminado con Éxito. Haga clic en iniciar un nuevo pedido, para comenzar a confeccionar otro pedido de tubo patr&oacute;n.";

    
  }//init

  neworder() {
    this.infoModal.close(1);
 
  }

  home() {

      this.infoModal.close(2);
    

  }












}
