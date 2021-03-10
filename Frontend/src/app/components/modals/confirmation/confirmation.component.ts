import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefectdeailtsComponent } from '../../modals/defectdeailts/defectdeailts.component';
import { DeleteorderComponent } from '../../modals/deleteorder/deleteorder.component';
import { Globals } from 'src/app/global';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Time } from '@angular/common';


class next {
  constructor(
    public user?:string, 
    public plant_line?:number,
    public tubetype?:number,
    public template?:number,
    public client?:string,
    public notify_auditor?:string,
    public auditor?:string,
    public ot?:string,
    public acoustic_response?:string,
    public diam?:number,
    public degree?:string,
    public cycle?:string,
    public thickness?:number,
    public steel?:string,
    public steel_casting?:string,
    public length?:number,
    public heat_treatment?:string,
    public record?:string,
    public num_trac_bme?:number,
    public pattern_code?:string,
    public date?:Date,
    public check?:boolean,
    public priority?:number,
    public time?:Time,
    public location?:string,
    public codigotubo?:string,

    ) {
  }
}


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  code:string;
length:number;
cycle:number;
tubetype:string;
diam:string;
steelcasting:string;
client:string;
thickness:string;
record:string;

plantline:string;
degree:string;
steel:string;
heat_treatment:string;

vector;
vector2;
vector3;
vector4;

typesdefects;
selectedValue_td;



IdDefecto;

lista;

IdPedido;

idTipo;


iscreate:boolean;
ismodify:boolean;

error:boolean;

letraglobal;

UserOK;
EliminarOK;
  listasend:next[]=[];


  constructor(private router: Router,public infoModal: NgbActiveModal,private modalService: NgbModal, private globals: Globals, private httpClient: HttpClient) { }

  async ngOnInit() {



    var idpedido=sessionStorage.getItem('IdPedido');  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  

    var recalque=sessionStorage.getItem('Recalque');  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  
  

let headers = new HttpHeaders().set('Content-Type','application/json');


      if(idpedido!=null){
        var url1 = this.globals.baseUrl + '/Pedidos/updatestate/'+idpedido;
        await this.httpClient.post(url1, {headers: headers})  
        .subscribe(
          data  => {
          }, 
          error  => {
          }
          );
// update pedidos set IdEstado = 1 where Id = "&Session("IdPedido")
// actualizo tabla pedidos             
      }

if(recalque!=""){

  this.lista= JSON.parse(sessionStorage.getItem('lista'));

this.IdPedido=  sessionStorage.getItem('IdPedido-b');  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  


this.listasend.push( 
new next(
this.lista[0].user,
this.lista[0].plant_line,
this.lista[0].tubetype,
this.lista[0].template,
this.lista[0].client,
this.lista[0].notify_auditor,
this.lista[0].auditor,
this.lista[0].ot,
this.lista[0].acoustic_response,
this.lista[0].diam,
this.lista[0].degree,
this.lista[0].cycle,
this.lista[0].thickness,
this.lista[0].steel,
this.lista[0].steel_casting,
this.length,
this.lista[0].heat_treatment,
this.lista[0].record,
this.lista[0].num_trac_bme,
sessionStorage.getItem('Codigo-b'),
this.lista[0].date,
this.lista[0].check,
this.lista[0].priority,
this.lista[0].time,
this.lista[0].location,
sessionStorage.getItem('Codigo-b')
));

sessionStorage.setItem('lista',JSON.stringify(this.listasend));


// this.lista[0].pattern_code=  sessionStorage.getItem('Codigo-b');  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  
        
// console.log(this.lista[0].pattern_code);
sessionStorage.setItem('Recalque',"");
this.infoModal.close(3);

 
}






  }//init



  neworder() {
    this.infoModal.close(1);

  }

  home() {
    this.infoModal.close(2);

  }

}
