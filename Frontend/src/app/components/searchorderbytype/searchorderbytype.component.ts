import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Time } from '@angular/common';
import { MAT_DATE_LOCALE_FACTORY } from '@angular/material/core';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { formatDate } from '@angular/common';
import { isNull, isNumber } from 'util';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Globals } from 'src/app/global';
import {Sort} from '@angular/material/sort';

export interface PeriodicElement {
  id: number;
  descripcion: string;
  longitud: string;
  diametro: string;
  espesor: string;
  idtipo: number;
  tipo: string;
  acero: string;
  grado: string;
  ciclo: string;
  colada: string;
  expediente: string;
  codigo: string;
  tratamientotermico: string;
  fechapedido: string;
  fechaesperado: string;
  entregado: string;
  idpadre: number;
  idestado: number;
  prioridad: string;
  secuencia: string;
  cliente: string;
  ubicacion: string;


}

class pattern {
  constructor(
    public user?:string, 
    public client?:string,
    public diam?:number,
    public degree?:string,
    public cycle?:string,
    public thickness?:number,
    public steel?:string,
    public steel_casting?:string,
    public length?:number,
    public heat_treatment?:string,
    public record?:string,
    public pattern_code?:string,


    public actual_state?:string,

    public tol1?:string,
    public tol2?:string,
    public tol3?:string,
    ) {
  }
}


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




var ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 7532, descripcion: 'Activo',longitud: '6000' , diametro: '0', espesor: '0',idtipo: 1, tipo:'Calibración de equipos EMI',acero: 'DEMO',
    grado: '',ciclo: '0',colada: '0',expediente: '',codigo: 'CI 139',tratamientotermico: 'DEMO',fechapedido:'',fechaesperado:'',entregado:'',
   idpadre: 0, idestado:0,prioridad: '',secuencia:'',cliente:'',ubicacion:''
  
  },
];


class p_l {
  constructor(public id?:number, public description?:string) {
  }
}

class s {
  constructor(public status?:number, public description?:string) {
  }
}

class find {
  constructor(
    public user?:string, 
    public client?:string,
    public diam?:number,
    public degree?:string,
    public cycle?:string,
    public thickness?:number,
    public steel?:string,
    public steel_casting?:string,
    public length?:number,
    public heat_treatment?:string,
    public record?:string,
    public pattern_code?:string,


    public actual_state?:string,


    public tol1?:string,
    public tol2?:string,
    public tol3?:string,


    ) {
  }
}





@Component({
  selector: 'app-searchorderbytype',
  templateUrl: './searchorderbytype.component.html',
  styleUrls: ['./searchorderbytype.component.css']
})
export class SearchorderbytypeComponent implements OnInit {


  listaaux;

  displayedColumns: string[] = ['cliente', 'diametro', 'espesor', 'tipo', 'codigo', 'ciclo', 'acero', 'grado', 'tratamientoTermico', 'estado', 'ubicacion', 'prioridad'];
  dataSource = ELEMENT_DATA;

listsend:pattern[]=[];

  sortedData: PeriodicElement[];

  Longitud1;
  Longitud2;
  Diametro1;
  Diametro2;
  Espesor1;
  Espesor2;

orden;

strQuery;

vector;




////////////

patronsearched


  search: FormGroup;
  selectedValue3; //planta
  selectedValue2; //tipotubo
  selectedValue1; //estado

  lista:p_l[]=[];
  lista2:p_l[]=[];
  lista3:s[]=[];


vector2;
vector3;

  tol1value;
  tol2value;
  tol3value;

  diamvalue;
  cyclevalue;
  steel_castingvalue;
  lengthvalue;
  thicknessvalue;


  listasend:next[]=[];

  tubetypeaux;
  actualstate;
  plantline;

  idd;

  constructor(private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute,private httpClient: HttpClient,private globals: Globals) {

    this.idd= this.route.snapshot.paramMap.get('id');
    this.sortedData = this.dataSource.slice();

   }

  async ngOnInit() {
    

    this.search = this.formBuilder.group({
      user: ['t75648'],
      client: [''],
  
      diam: [''],
      tol1: ['0'],
      steel: [''],
      cycle: [''],
      thickness: [''],
      tol2: ['0'],
      degree: [''],
      steel_casting: [''],
      length: [''],
      tol3: ['0'],
      heat_treatment: [''],
      record: [''],
      actual_state: [''],
      pattern_code: [''],
    });



    var url1 = this.globals.baseUrl + '/EstadosPatrons/qryEstadosPedido';
    await this.httpClient.get(url1).toPromise().then(value =>{
      console.log(value)
        this.vector=value;
       });
      this.lista3=this.vector;
      this.selectedValue1 = '0'; //pre selecciono


///////////////////////////////////////////////////////////////
this.tol1value=0;
this.tol2value=0;
this.tol3value=0;

this.diamvalue="";
this.cyclevalue="";
this.steel_castingvalue="";
this.lengthvalue="";
this.thicknessvalue="";


////////////////////////////////////////////////////






// veo valores default necesarios 

if(this.orden==""){ //seteo filtro por query predeterminado
this.orden = "diametro, espesor";
}

/*
if (Request.QueryString("pagina") <> "") and (Request.QueryString("pagina") > 0) then
pagina = Request.QueryString("pagina")
else
pagina = 1
end if

if (Request.QueryString("records") <> "") and (Request.QueryString("records") > 0) and (Request.QueryString("records") < 100) then
records = Request.QueryString("records")
else
records = 20
end if
*/

// aca falta algo que no entiendo de "Request.QueryString("base") = "pedidos"" ver en la linea 160
//
//
//
//



/*
if Request.QueryString("base") <> "" then
if Request.QueryString("base") = "pedidos" then
  pedido = true
else
  pedido = false
end if
end if

if pedido then
if (planta <> "") then
  strQuery = "select 1 as IsPedido,pedidos.id, estadospatron.Descripcion, longitud, diametro, espesor, idtipo, tipos.nombre 'tipo', acero, grado, ciclo, colada, expediente, codigo, tratamientotermico, fechapedido, fechaesperado, entregado, idpadre, idestado, prioridad, secuencia, '-' as Requisito, Cliente from pedidos, tipos, planta, linea, estadospatron where pedidos.idtipo = tipos.id and Planta.Id = Linea.IdPlanta and Linea.Id = Pedidos.Linea and status = Pedidos.idestado and pedidos.codigo <> '0'"
else
  strQuery = "select 1 as IsPedido,pedidos.id, estadospatron.Descripcion, longitud, diametro, espesor, idtipo, tipos.nombre 'tipo', acero, grado, ciclo, colada, expediente, codigo, tratamientotermico, fechapedido, fechaesperado, entregado, idpadre, idestado, prioridad, secuencia, ubicacion, '-' as Requisito, Cliente from pedidos, tipos, estadospatron where pedidos.idtipo = tipos.id and estadospatron.status = Pedidos.idestado and pedidos.codigo <> '0'"
end if
Else
'  	strQuery = "select vwWebPatrones where codigo <> '0' "
strQuery = "select 0 as IsPedido,Patron.Id, estadospatron.Descripcion 'Descripcion', NroPasadas, ISNULL(NroMaxPasadas, 0) AS NroMaxPasadas, Longitud, Diametro, Espesor, Acero, Ciclo, Colada, Expediente, FechaAlta, Tipo 'IdTipo', TratamientoTermico, tipos.Nombre 'Tipo', UltimaPasada, IdUbicacion, IdPadre, Codigo, Grado, IdPedido, IdEstado, EstadosPatron.Descripcion 'Estado', Pasillo+Cuerpo+Nivel+Casilla as ubicacion, dbo.GetRequisito(patron.id) as requisito, Cliente from patron, estadospatron, tipos where tipos.id = patron.tipo and estadospatron.status = patron.idestado and patron.codigo <> '0'"
end if
*/

// acca traigo las query de la tabla a mostrar sin filtro ni nada 
this.strQuery="select pedidos.id, estadospatron.Descripcion, longitud, diametro, espesor, idtipo, substring(tipos.nombre, 1, 30) 'tipo', acero, grado, ciclo, colada, expediente, codigo, tratamientotermico, fechapedido, fechaesperado, entregado, idpadre, idestado, prioridad, secuencia, Cliente, Ubicacion from pedidos, tipos, planta, linea, estadospatron where pedidos.idtipo = tipos.id and Planta.id = linea.idplanta and estadospatron.status = Pedidos.idestado and pedidos.linea = linea.id";


/*

if(this.listaaux[0].client!=""){ //seteo filtro por query predeterminado
this.strQuery=this.strQuery+ " and Cliente LIKE '%" + this.listaaux[0].client+"%'";
}
*/

//console.log("Debug: this.idd");
//console.log(this.idd);

if(this.idd=="01"){
this.strQuery = this.strQuery + " and Planta.id = 1 and idTipo = 1";
}

if(this.idd=="10"){
  this.strQuery = this.strQuery + " and idTipo = 10";
  }

  if(this.idd=="4"){
    this.strQuery = this.strQuery + " and idTipo = 4";
    }

    if(this.idd=="1"){
      this.strQuery = this.strQuery + " and Planta.id = 2 and idTipo = 1";
      }
  
      if(this.idd=="3"){
        this.strQuery = this.strQuery + " and idTipo = 3";
        }    
  
        if(this.idd=="11"){
          this.strQuery = this.strQuery + " and idTipo = 11";
          }
        
          if(this.idd=="6"){
            this.strQuery = this.strQuery + " and idTipo = 6";
            }
        
            if(this.idd=="12"){
              this.strQuery = this.strQuery + " and idTipo = 12";
              }
          
              if(this.idd=="8"){
                this.strQuery = this.strQuery + " and idTipo = 8";
                }
            
                if(this.idd=="16"){
                  this.strQuery = this.strQuery + " and idTipo = 16";
                  }
            
                  if(this.idd=="13"){
                    this.strQuery = this.strQuery + " and idTipo = 13";
                    }
            
                    if(this.idd=="15"){
                      this.strQuery = this.strQuery + " and idTipo = 15";
                      }

                      if(this.idd=="2"){
                        this.strQuery = this.strQuery + " and idTipo = 2";
                        }


this.strQuery = this.strQuery + " and IdEstado in (5, 6, 7, 8, 9, 1)";

/*
if(this.listaaux[0].actual_state!=""){
/*
if pedido then
strQuery = strQuery & " and status in (5, 6, 7, 8, 9, 1)"
else
strQuery = strQuery & " and patron.idestado = "&EstadoPatron
end if
*/
//this.strQuery = this.strQuery + " and patron.idestado = "+this.listaaux[0].actual_state;
//}


/*
if(this.listaaux[0].pattern_code!=""){
this.strQuery = this.strQuery + " and Codigo LIKE '"+this.listaaux[0].pattern_code+"%'";
}*/

/*
if(this.listaaux[0].tubetype!=""){
/*
if Pedido then
strQuery = strQuery & " and idTipo = "&Tipo
else
strQuery = strQuery & " and Tipo = "&Tipo
end if
*/
//this.strQuery = this.strQuery + " and Tipo = "+this.listaaux[0].tubetype;
//}

/*
if (Pedido) then
strQuery = strQuery & " and IdEstado in (5, 6, 7, 8, 9, 1)"
end if


if (estado <> "") and not (Pedido) then
strQuery = strQuery & " and IdEstado = "&estado
end if


if (planta <> "") and (linea = "") and (pedido) then
strQuery = strQuery & " and Planta.Id = "&planta
end if

if (linea <> "") then
strQuery = strQuery & " and linea = "&linea
end if

*/

/*
if(this.Longitud1!="" && this.Longitud2!=""){
this.strQuery = this.strQuery +" and longitud between "+this.Longitud1+" and "+this.Longitud2;
}*/

/*
if(this.Diametro1!="" && this.Diametro2!=""){
this.strQuery = this.strQuery +" and diametro between "+this.Diametro1+" and "+this.Diametro2;
}



if(this.Espesor1!="" && this.Espesor2!=""){
  this.strQuery = this.strQuery +" and espesor between "+this.Espesor1+" and "+this.Espesor2;
  }

  if(this.listaaux[0].cycle!=""){
    this.strQuery = this.strQuery +" and ciclo = "+this.listaaux[0].cycle;
    }

if(this.listaaux[0].steel_casting!=""){
    this.strQuery = this.strQuery +" and colada = "+this.listaaux[0].steel_casting;
    }

if(this.listaaux[0].record!=""){
    this.strQuery = this.strQuery +" and Expediente = '"+this.listaaux[0].record+"'";
    }

if(this.listaaux[0].steel!=""){
    this.strQuery = this.strQuery +" and Acero = '"+this.listaaux[0].steel+"'";
    }

if(this.listaaux[0].degree!=""){
    this.strQuery = this.strQuery +" and Grado = '"+this.listaaux[0].degree+"'";
    }

if(this.listaaux[0].heat_treatment!=""){
    this.strQuery = this.strQuery +" and TratamientoTermico = '"+this.listaaux[0].heat_treatment+"'";
    }

    */




/*
if (orden <> "") then
strQuery = strQuery & " order by "&orden
else
strQuery = strQuery & " order by Diametro, espesor"
end if
*/

/*
var UbicacionLinea=this.listaaux[0].plant_line;

if(UbicacionLinea!=""){
this.strQuery = this.strQuery +" and idlinea = "+UbicacionLinea;
}*/
/*
if(this.listaaux[0].location_details!=""){
this.strQuery = this.strQuery +" and Ubicacion like '%"+this.listaaux[0].location_details+"%'";
}
*/

/*
if (UbicacionLinea <> "") then
strQuery = strQuery & " and idlinea = "&UbicacionLinea
end if

if (UbicacionDetalle <> "") then 
strQuery = strQuery & " and Ubicacion like '%"&UbicacionDetalle&"%'"
end if
*/

// yo solo hago esto en orden porque es lo que necesita esta pantalla
this.strQuery = this.strQuery + " order by Diametro, espesor";

//alert(this.strQuery)


//alert(this.strQuery)
//console.log( "Debug: this.strQuery " + this.strQuery);
var url1 = this.globals.baseUrl + '/Patrons/getOrderByFilter?strQuery='+btoa(this.strQuery);
await this.httpClient.get(url1).toPromise().then(value =>{
this.vector=value;
this.dataSource=this.vector;
});

console.log(this.dataSource)

/*
for(var i=0;i<this.dataSource.length;i++){

this.dataSource[i].usos= this.dataSource[i].nroPasadas+" / "+ this.dataSource[i].nroMaxPasadas;
}
*/
for(var i=0;i<this.dataSource.length;i++){

if( this.dataSource[i].prioridad=="0"){
  this.dataSource[i].prioridad="Alta"
}else{
if( this.dataSource[i].prioridad=="1"){
  this.dataSource[i].prioridad="Normal"
}else{

  this.dataSource[i].prioridad="Baja"


}


}

}//for











  }//init


//////////////////////////////////////////////////////////////////////////////////////

    // convenience getter for easy access to form fields
    get f() { return this.search.controls; }
////////////////////////////////////////////////////////////////////////////////////////s



Verificarnum(campo) {



  if(campo==1){
    var diam=this.search.get("diam").value

    var ValidChars = "0123456789.";
    var IsNumber=true;
    var Char;
    
    for (var i = 0; i < diam.length && IsNumber == true; i++) 
    { 
      Char = diam.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
      {
        this.diamvalue="";
        IsNumber = false;
      }
    }
    
  if(IsNumber==false){
    alert("Se debe llenar el campo Espesor con un valor numérico")
    return false;
  }

  }
  

  ///////////////////////

if(campo==7){
  var tol2=this.search.get("tol2").value

  var ValidChars = "0123456789.";
  var IsNumber=true;
  var Char;
  
  for (var i = 0; i < tol2.length && IsNumber == true; i++) 
  { 
    Char = tol2.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) 
    {
      this.tol2value=0;
      IsNumber = false;
    }
  }
  
if(IsNumber==false){
  alert("Se debe llenar el campo Espesor con un valor numérico")
  return false;
}

}
  ///////////////////////

  if(campo==8){
    var tol3=this.search.get("tol3").value
  
    var ValidChars = "0123456789.";
    var IsNumber=true;
    var Char;
    
    for (var i = 0; i < tol3.length && IsNumber == true; i++) 
    { 
      Char = tol3.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
      {
        this.tol3value=0;
        IsNumber = false;
      }
    }
    
  if(IsNumber==false){
    alert("Se debe llenar el campo Espesor con un valor numérico")
    return false;
  }
  
  }
  ///////////////////////




if(campo==2){
  var tol1=this.search.get("tol1").value

  var ValidChars = "0123456789.";
  var IsNumber=true;
  var Char;
  
  for (var i = 0; i < tol1.length && IsNumber == true; i++) 
  { 
    Char = tol1.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) 
    {
      this.tol1value=0;
      IsNumber = false;
    }
  }
  
if(IsNumber==false){
  alert("Se debe llenar el campo Espesor con un valor numérico")
  return false;
}

}

  ///////////////////////
  if(campo==3){
    var cycle=this.search.get("cycle").value
  
    var ValidChars = "0123456789.";
    var IsNumber=true;
    var Char;
    
    for (var i = 0; i < cycle.length && IsNumber == true; i++) 
    { 
      Char = cycle.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
      {
        this.cyclevalue="";
        IsNumber = false;
      }
    }
    
  if(IsNumber==false){
    alert("Se debe llenar el campo Espesor con un valor numérico")
    return false;
  }
  
  }



///////////////////////
if(campo==4){
  var steel_casting=this.search.get("steel_casting").value

  var ValidChars = "0123456789.";
  var IsNumber=true;
  var Char;
  
  for (var i = 0; i < steel_casting.length && IsNumber == true; i++) 
  { 
    Char = steel_casting.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) 
    {
      this.steel_castingvalue="";
      IsNumber = false;
    }
  }
  
if(IsNumber==false){
  alert("Se debe llenar el campo Espesor con un valor numérico")
  return false;
}

}


////////////

if(campo==5 ){

  var valorlength=this.search.get("length").value;
  
  var ValidChars = "0123456789.";
  var IsNumber=true;
  var Char;
  
  for (var i = 0; i < valorlength.length && IsNumber == true; i++) 
  { 
    Char = valorlength.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) 
    {
      this.lengthvalue="";
      IsNumber = false;
    }
  }
  
if(IsNumber==false){
  alert("Se debe llenar el campo Longitud con un valor numérico")
  return false;
}
  }

////////////

if(campo==6 ){

  var thickness=this.search.get("thickness").value;
  
  var ValidChars = "0123456789.";
  var IsNumber=true;
  var Char;
  
  for (var i = 0; i < thickness.length && IsNumber == true; i++) 
  { 
    Char = thickness.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) 
    {
      this.thicknessvalue="";
      IsNumber = false;
    }
  }
  
if(IsNumber==false){
  alert("Se debe llenar el campo Longitud con un valor numérico")
  return false;
}
  }














  } // Verificarnum






  async llamar(campo) {
    this.listasend=[];


if(this.search.get("actual_state").value==-1){
  this.actualstate="";
  }else{
    this.actualstate=this.search.get("actual_state").value;
  }
 

    this.listasend.push( 
      new find(
        this.search.get("user").value,

        this.search.get("client").value,
        this.search.get("diam").value,
        this.search.get("degree").value,
        this.search.get("cycle").value,
        this.search.get("thickness").value,
        this.search.get("steel").value,
        this.search.get("steel_casting").value,
        this.search.get("length").value,
        this.search.get("heat_treatment").value,
        this.search.get("record").value,
        this.search.get("pattern_code").value,
        this.actualstate,
        this.search.get("tol1").value,
        this.search.get("tol2").value,
        this.search.get("tol3").value,


      ));
      console.log("Debug: this.listasend");
      console.log(this.listasend);

      this.listaaux= JSON.parse(sessionStorage.getItem('formpatternsearch'));
      console.log("Debug: this.listaaux");
      console.log(this.listaaux);

      //if(this.search.get("diam").value!=undefined && this.listaaux[0].tol1!=undefined)
      if(this.search.get("diam").value!=undefined && this.listaaux!=null)
      {
      this.Diametro1 = this.search.get("diam").value*(1-(this.search.get("tol1").value/100))
      this.Diametro2 = this.search.get("diam").value*(1+(this.search.get("tol1").value/100))
      }else{
      this.Diametro1 = "";
      this.Diametro2 = "";
      }
      
      ///////////

      
      if(this.search.get("length").value!="" && this.search.get("tol3").value!=undefined){
      this.Longitud1 = this.search.get("length").value*(1-(this.search.get("tol3").value/100));
      this.Longitud2 = this.search.get("length").value*(1+(this.search.get("tol3").value/100));
      }else{
      this.Longitud1 = "";
      this.Longitud2 = "";
      }
      
      ///////////
      
      if(this.search.get("thickness").value!="" && this.search.get("tol2").value!=undefined){
      this.Espesor1 = this.search.get("thickness").value*(1-(this.search.get("tol2").value/100))
      this.Espesor2 = this.search.get("thickness").value*(1+(this.search.get("tol2").value/100))
      }else{
      this.Espesor1 = "";
      this.Espesor2 = "";
      }
      
      
      

/*
  
     // console.log(this.listasend)
  
      sessionStorage.setItem('formpatternsearch',JSON.stringify(this.listasend));

      this.router.navigate(['/searchresultofstandardtubes']); //we can send product object as route param

*/
//////////////////////////////////////////
// acca traigo las query de la tabla a mostrar sin filtro ni nada 
this.strQuery="select pedidos.id, estadospatron.Descripcion, longitud, diametro, espesor, idtipo, substring(tipos.nombre, 1, 30) 'tipo', acero, grado, ciclo, colada, expediente, codigo, tratamientotermico, fechapedido, fechaesperado, entregado, idpadre, idestado, prioridad, secuencia, Cliente, Ubicacion from pedidos, tipos, planta, linea, estadospatron where pedidos.idtipo = tipos.id and Planta.id = linea.idplanta and estadospatron.status = Pedidos.idestado and pedidos.linea = linea.id";
console.log("Debug: this.idd");
console.log(this.idd);

if(this.idd=="01"){
  this.strQuery = this.strQuery + " and Planta.id = 1 and idTipo = 1";
  }
  
  if(this.idd=="10"){
    this.strQuery = this.strQuery + " and idTipo = 10";
    }
  
    if(this.idd=="4"){
      this.strQuery = this.strQuery + " and idTipo = 4";
      }
  
      if(this.idd=="1"){
        this.strQuery = this.strQuery + " and Planta.id = 2 and idTipo = 1";
        }
    
        if(this.idd=="3"){
          this.strQuery = this.strQuery + " and idTipo = 3";
          }

          if(this.idd=="11"){
            this.strQuery = this.strQuery + " and idTipo = 11";
            }
          
            if(this.idd=="6"){
              this.strQuery = this.strQuery + " and idTipo = 6";
              }
          
              if(this.idd=="12"){
                this.strQuery = this.strQuery + " and idTipo = 12";
                }
            
                if(this.idd=="8"){
                  this.strQuery = this.strQuery + " and idTipo = 8";
                  }
              
                  if(this.idd=="16"){
                    this.strQuery = this.strQuery + " and idTipo = 16";
                    }
              
                    if(this.idd=="13"){
                      this.strQuery = this.strQuery + " and idTipo = 13";
                      }
              
                      if(this.idd=="15"){
                        this.strQuery = this.strQuery + " and idTipo = 15";
                        }
                        
                        if(this.idd=="2"){
                          this.strQuery = this.strQuery + " and idTipo = 2";
                          }



if(this.search.get("client").value!=""){ //seteo filtro por query predeterminado
this.strQuery=this.strQuery+ " and Cliente LIKE '%" + this.search.get("client").value+"%'";
}



if(this.actualstate!=0){

this.strQuery = this.strQuery + " and IdEstado = "+this.actualstate;
}else{
  this.strQuery = this.strQuery + " and IdEstado in (5, 6, 7, 8, 9, 1)";

}



if(this.search.get("pattern_code").value!=""){
this.strQuery = this.strQuery + " and Codigo LIKE '"+this.search.get("pattern_code").value+"%'";
}





//////////



if(this.Longitud1!="" && this.Longitud2!=""){
this.strQuery = this.strQuery +" and longitud between "+this.Longitud1+" and "+this.Longitud2;
}

if(this.Diametro1!="" && this.Diametro2!=""){
this.strQuery = this.strQuery +" and diametro between "+this.Diametro1+" and "+this.Diametro2;
}

if(this.Espesor1!="" && this.Espesor2!=""){
  this.strQuery = this.strQuery +" and espesor between "+this.Espesor1+" and "+this.Espesor2;
  }

  if(this.search.get("cycle").value!=""){
    this.strQuery = this.strQuery +" and ciclo = "+this.search.get("cycle").value;
    }

if(this.search.get("steel_casting").value!=""){
    this.strQuery = this.strQuery +" and colada = "+this.search.get("steel_casting").value;
    }

if(this.search.get("record").value!=""){
    this.strQuery = this.strQuery +" and Expediente = '"+this.search.get("record").value+"'";
    }


if( this.search.get("steel").value!=""){
    this.strQuery = this.strQuery +" and Acero = '"+this.search.get("steel").value+"'";
    }

if(this.search.get("degree").value!=""){
    this.strQuery = this.strQuery +" and Grado = '"+this.search.get("degree").value+"'";
    }

if(this.search.get("heat_treatment").value!=""){
    this.strQuery = this.strQuery +" and TratamientoTermico = '"+this.search.get("heat_treatment").value+"'";
    }

    

// yo solo hago esto en orden porque es lo que necesita esta pantalla
this.strQuery = this.strQuery + " order by Diametro, espesor";

//alert(this.strQuery)
console.log("Debug: this.strQuery");
console.log(this.strQuery);

var url1 = this.globals.baseUrl + '/Patrons/getOrderByFilter?strQuery='+btoa(this.strQuery);
await this.httpClient.get(url1).toPromise().then(value =>{
this.vector=value;
this.dataSource=this.vector;
});

console.log(this.dataSource)

/*
for(var i=0;i<this.dataSource.length;i++){

this.dataSource[i].usos= this.dataSource[i].nroPasadas+" / "+ this.dataSource[i].nroMaxPasadas;
}
*/
for(var i=0;i<this.dataSource.length;i++){

if( this.dataSource[i].prioridad=="0"){
  this.dataSource[i].prioridad="Alta"
}else{
if( this.dataSource[i].prioridad=="1"){
  this.dataSource[i].prioridad="Normal"
}else{

  this.dataSource[i].prioridad="Baja"


}


}

}//for


    
      }
    








//////////////////////////////////////////

sortData(sort: Sort) {
  const data = this.dataSource.slice();

  if (!sort.active || sort.direction === '') {
    this.dataSource = data;
    return;
  }

  this.dataSource = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'cliente': return this.compare(a.cliente, b.cliente, isAsc);
      case 'diametro': return this.compare(a.diametro, b.diametro, isAsc);
      case 'espesor': return this.compare(a.espesor, b.espesor, isAsc);
      case 'tipo': return this.compare(a.tipo, b.tipo, isAsc);
      case 'codigo': return this.compare(a.codigo, b.codigo, isAsc);
      case 'ciclo': return this.compare(a.ciclo, b.ciclo, isAsc);
      case 'acero': return this.compare(a.acero, b.acero, isAsc);
      case 'grado': return this.compare(a.grado, b.grado, isAsc);
      case 'tt': return this.compare(a.tratamientotermico, b.tratamientotermico, isAsc);
      case 'estado': return this.compare(a.descripcion, b.descripcion, isAsc);
      case 'ubicacion': return this.compare(a.ubicacion, b.ubicacion, isAsc);
      case 'prioridad': return this.compare(a.prioridad, b.prioridad, isAsc);




      default: return 0;
    }
  });
}

 compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


//////////////////////////////////////////


  async selecciono(event) {
 // console.log(event)
 this.listsend=[];
  var url1 = this.globals.baseUrl + '/Pedidos/GetPedidosByCode/'+event.codigo;
 
  await this.httpClient.get(url1).toPromise().then(value =>{
    if(value!=undefined){
    this.patronsearched=value;
    }
   });

   console.log(this.patronsearched);

  this.listsend.push( 
    new next(
     "t75648", //esto dsp lo sacamos de otro lado
     this.patronsearched.linea,
     this.patronsearched.idTipo,
     null, //template
event.cliente,
     this.patronsearched.notificarAuditor,
     this.patronsearched.auditor,
     this.patronsearched.ot,
     this.patronsearched.acustica,
event.diametro,
event.grado,
event.ciclo,
event.espesor,
event.acero,
event.colada,
event.longitud,
event.tratamientotermico,
event.expediente,
this.patronsearched.traceability,
event.codigo,
this.patronsearched.fechaPedido,
     null,
event.prioridad,
     null,
event.ubicacion,
event.codigo,

    ));

    sessionStorage.setItem('IdPedido',this.patronsearched.id);  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  


    sessionStorage.setItem('lista',JSON.stringify(this.listsend));

    //this.lista= JSON.parse(sessionStorage.getItem('lista'));
    //alert(this.lista)

    this.router.navigate(['/newdefect']); //we can send product object as route param








    }

































}//termino clase
