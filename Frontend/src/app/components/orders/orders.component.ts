import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';
import { Globals } from '../../global'
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../shared/user/user-service.component';
import { Router, NavigationEnd } from '@angular/router';
import { InfoModalComponent } from '../shared/info-modal/info-modal.component';
import { User } from '../../user.model';
import { interval, Subscription } from 'rxjs';

export interface PeriodicElement {
  AO: string;
  position: number;
  description: string;

}

export interface orderlist {
  order: string;
  position: number;
  description: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, AO: 'Solicitar un nuevo tubo patrón', description: 'Formulario de pedido de tubo patrón para ser fabricado.'},
  {position: 2, AO: 'Buscar un tubo patrón', description:'Búsqueda de tubos patrones existentes en base a un conjunto de filtros.'}
];

const ELEMENT_DATA2: orderlist[] = [
  {position: 1, order: 'Calibración de equipos EMI Laco 1', description: 'Lista de pedidos pendientes de tubos 1C'},
  {position: 2, order: 'Ultrasonido de 1.8m para USL1', description:'	Lista de pedidos pendientes de tubos 1U'},
  {position: 1, order: 'Ecualización', description: 'Lista de pedidos pendientes de tubos 1E y 2E'},
  {position: 1, order: 'Calibración de equipos EMI Laco 2', description: 'Lista de pedidos pendientes de tubos 2C'},
  {position: 1, order: 'Ultrasonido (tubos de 6m para Unicorn o Dapco)', description: 'Lista de pedidos pendientes de tubos 2U'},
  {position: 1, order: 'Ultrasonido de 2.2m para UTL2', description: 'Lista de pedidos pendientes de tubos 2V'},
  {position: 1, order: 'Ultrasonido (tubos de 1.5m para USL2)', description: 'Lista de pedidos pendientes de tubos 2I'},
  {position: 1, order: 'Recalque', description: 'Lista de pedidos pendientes de tubos'},
  {position: 1, order: 'Trefila', description: 'Lista de pedidos pendientes de tubos TF'},
  {position: 1, order: 'Patrón de cupla', description: 'Lista de pedidos pendientes de tubos FA'},
  {position: 1, order: 'Patrón para COFI', description: 'Lista de pedidos pendientes de tubos CF'},
  {position: 1, order: 'Patrón especial', description: 'Lista de pedidos pendientes de tubos SS'},
  {position: 1, order: 'Calibración de equipos EMI TRA1', description: 'Lista de pedidos pendientes de tubos 1T'},
];

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['ao', 'description'];
  dataSource = ELEMENT_DATA;


  displayedColumns2: string[] = ['order', 'description'];
  dataSource2 = ELEMENT_DATA2;

  constructor(private router: Router) {    
     }

  ngOnInit() {
  }


    navigate(order){
      //console.log("Debug: navigate(order)");
      console.log(order)
    
   if(order=="Solicitar un nuevo tubo patrón")
   {
    this.router.navigate(['/orderforms',"0"]); //we can send product object as route param
   }

    if(order=="Buscar un tubo patrón")
    {
      this.router.navigate(['/searchstandardtubes']); //we can send product object as route param
    }

    if(order=="Calibración de equipos EMI Laco 1")
    {
      this.router.navigate(['/searchorderbytype',"01"]); //we can send product object as route param
    }
    
    if(order=="Ultrasonido de 1.8m para USL1")
    {
      this.router.navigate(['/searchorderbytype',"10"]); //we can send product object as route param
    }

    if(order=="Ecualización")
    {
      this.router.navigate(['/searchorderbytype',"4"]); //we can send product object as route param
    }


    if(order=="Calibración de equipos EMI Laco 2")
    {
      this.router.navigate(['/searchorderbytype',"1"]); //we can send product object as route param
    }

    
    if(order=="Ultrasonido (tubos de 6m para Unicorn o Dapco)")
    {
      this.router.navigate(['/searchorderbytype',"3"]); //we can send product object as route param
    }

    if(order=="Ultrasonido de 2.2m para UTL2")
    {
      this.router.navigate(['/searchorderbytype',"11"]); //we can send product object as route param
    }

    if(order=="Ultrasonido (tubos de 1.5m para USL2)")
    {
      this.router.navigate(['/searchorderbytype',"2"]); //we can send product object as route param
    }

    if(order=="Recalque")
    {
      this.router.navigate(['/searchorderbytype',"6"]); //we can send product object as route param
    }
    

    if(order=="Trefila")
    {
      this.router.navigate(['/searchorderbytype',"12"]); //we can send product object as route param
    }

    if(order=="Patrón de cupla")
    {
      this.router.navigate(['/searchorderbytype',"8"]); //we can send product object as route param
    }

    if(order=="Patrón para COFI")
    {
      this.router.navigate(['/searchorderbytype',"16"]); //we can send product object as route param
    }

    if(order=="Patrón especial")
    {
      this.router.navigate(['/searchorderbytype',"13"]); //we can send product object as route param
    }

    if(order=="Calibración de equipos EMI TRA1")
    {
      this.router.navigate(['/searchorderbytype',"15"]); //we can send product object as route param
    }

  }

}
