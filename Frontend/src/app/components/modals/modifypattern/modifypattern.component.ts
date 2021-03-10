import { Component, OnInit , Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Globals } from 'src/app/global';
import { HttpClient, HttpHeaders} from '@angular/common/http';

class p_l {
  constructor(public id?:number, public description?:string) {
  }
}
class sel {
  constructor(public idMotivo?:number, public description?:string) {
  }
}

class s {
  constructor(public status?:number, public description?:string) {
  }
}

@Component({
  selector: 'app-modifypattern',
  templateUrl: './modifypattern.component.html',
  styleUrls: ['./modifypattern.component.css']
})
export class ModifypatternComponent implements OnInit {
  @Input() patronera: string;
  @Input() cuerpo: string;
  @Input() nivel: string;
  @Input() casilla: string;
  @Input() plantalinea: string;
  @Input() estado: string;
  @Input() motivo: string;
  @Input() idPatron: string;
  modifypattern: FormGroup;
  
  selectedValue;//planta
  lista:p_l[]=[];

  lista3:s[]=[];
  selectedValue1; //estado


  selectedValue2;//motivo
  lista2:sel[]=[];

  idUsuario;

  vector;
  vector2;
  vector3;

  cantidad;

  constructor(private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute,public infoModal: NgbActiveModal,private httpClient: HttpClient,private globals: Globals) { }

  async ngOnInit() {
    

  this.modifypattern = this.formBuilder.group({
    patronera: [this.patronera],
    cuerpo: [this.cuerpo],
    nivel: [this.nivel],
    casilla: [this.casilla],
    plantalinea: [this.patronera],
    estado: [this.estado],
    motivo: [this.motivo]
  });
  




/*
    console.log(this.patronera)
    console.log(this.cuerpo)
    console.log(this.nivel)
    console.log(this.casilla)
    console.log(this.plantalinea)
    console.log(this.estado)
    console.log(this.motivo)
    console.log(this.idPatron)
*/

// aca falta el usuario que esta harcode!!!!!!!!!
var url1 = this.globals.baseUrl + '/Lineas/GetPlantLinea/t75648';
await this.httpClient.get(url1).toPromise().then(value =>{
  this.vector=value;
 });

  this.lista= this.vector;

  for (var i = 0; i < this.lista.length; i++) 
  {      

var vec=this.lista[i].description.split("/");
var p=vec[0].replace(" ","");
var s=vec[1].replace(" ","");
this.lista[i].description=p+"/"+s;

var vec2=this.plantalinea.split("/");
 p=vec2[0].replace(" ","");
 s=vec2[1].replace(" ","");
 this.plantalinea=p+"/"+s;

    if (this.lista[i].description == this.plantalinea) 
    {  
      this.selectedValue=this.lista[i].id;
      break;
    }
  }

  // query necesaria par el siguiente selector     strSQL = "select id, descripcion from PlantaLinea"
  // lleno selector planta/linea  esto falta traer las queries y hacer la logica de rellenado dependiendo lo que elijo
 /* this.lista.push( new p_l(1,"Laco 1/Laj 1-2-3"));
  this.lista.push( new p_l(2,"22"));
  this.lista.push( new p_l(3,"Trefila / Lint"));

  for (var i = 0; i < this.lista.length; i++) 
  { 
    if (this.lista[i].description == this.plantalinea) 
    {
      this.selectedValue=this.lista[i].id;
      break;
    }
  }
*/



var url1 = this.globals.baseUrl + '/EstadosPatrons/qryEstadosPatron';
await this.httpClient.get(url1).toPromise().then(value =>{
    this.vector=value;
   });
  this.lista3=this.vector;
  console.log(  this.lista3)
  for (var i = 0; i < this.lista3.length; i++) 
  { 
    if (this.lista3[i].description == this.estado) 
    {
      this.selectedValue1=this.lista3[i].status;
      break;
    }
  }

// select Status, Descripcion from EstadosPatron
// strQuery = "exec qryEstadosPatron"
// lleno selector estado esto falta traer las queries y hacer la logica de rellenado dependiendo lo que elijo
/*
  this.lista3.push( new s(0,"Activo"));
  this.lista3.push( new s(1,"Inactivo"));


  for (var i = 0; i < this.lista3.length; i++) 
  { 
    if (this.lista3[i].description == this.estado) 
    {
      this.selectedValue1=this.lista3[i].status;
      break;
    }
  }
*/


// select idMotivo as id, descripcion from MotivosEstados order by idmotivo
// lleno selector motivo esto falta traer las queries y hacer la logica de rellenado dependiendo lo que elijo




var url1 = this.globals.baseUrl + '/MotivosEstados';
await this.httpClient.get(url1).toPromise().then(value =>{
    this.vector=value;
   });
  this.lista2=this.vector;
//console.log(  this.lista2)
/*
this.lista2.push( new p_l(0,"NO APLICABLE"));
this.lista2.push( new p_l(1,"FISURAS GASTADAS SIN PROFUNDID"));
*/

for (var i = 0; i < this.lista2.length; i++) 
{ 
  if (this.lista2[i].description == this.motivo) 
  {
    this.selectedValue2=this.lista2[i].idMotivo;
    break;
  }
}



  







  }




//////////////////////////////////////////////////////////////////////////////////////

    // convenience getter for easy access to form fields
    get f() { return this.modifypattern.controls; }



//////////////////////////////////////////////////////////////////////////////////////


    async save() {

/*

// la funcion de abajo trae el usuario logged en window que corresponde a el campo "NRegistro" en la tabla "uusarios" en la db de patrones
IdUsuario = Request.ServerVariables("LOGON_USER")

	IdUsuario = Replace(IdUsuario,"/"," ")
	IdUsuario = Replace(IdUsuario,"\"," ")
	
	IdUsuario = trim(IdUsuario)
	fStart = InStr(1,idUsuario," ")
		
	if fStart > 0 then
		IdUsuario = right(IdUsuario,len(IdUsuario)-fStart)
		IdUsuario = trim(IdUsuario)
  end if	

*/

// obteniendo NRegistro de lo anterior procedemos a guardar

if(this.idUsuario=="")
{
  this.idUsuario= "Sin registro";
}

var fShowError = "";

var url1 = this.globals.baseUrl + '/Patrons/doChkCapacity/'+this.modifypattern.get("plantalinea").value;
await this.httpClient.get(url1).toPromise().then(value =>{
this.cantidad=value;
   });

// aca llamo a una SP para chequear capacidad de algo pasandole "idLinea" (this.modifypattern.get("plantalinea").value)
/*
Set qryVerificar = Server.CreateObject("AdoDB.RecordSet")
strVerificar = "doChkCapacity "&Request.Form("idLinea")
qryVerificar.Open strVerificar, cn
fCantidad = CInt(qryVerificar("Cantidad"))
qryVerificar.Close
*/

// el SP devuelve un valor "Cantidad" donde verifico lo siguiente
var fCantidad;
fCantidad=this.cantidad; //harcode por ahora
//alert(fCantidad)
if(fCantidad<5)
{
// aca actualizo la tabla patron pasando el "idPatron" (this.idPatron) 
/*
Set rstSQLCer = Server.CreateObject("AdoDB.RecordSet")
strSQLCer = "doUpdateDatosIntra '"&Request.Form("Pasillo")&"','"&Request.Form("Cuerpo")&"', '"&Request.Form("Nivel")&"','"&Request.Form("Casilla")&"', "&Request.Form("estado")&","&Request.Form("Motivo")&", "&Request.Form("idLinea")&","&id&",'"&idUsuario&"'"
rstSQLCer.Open strSQLCer, cn
*/



this.infoModal.close();

}else{
alert("Existen "+fCantidad+" tubos en la patronera selccionada, por favor verifique dicha patronera antes de ubicar")
}


}//save()











}//termino clase
