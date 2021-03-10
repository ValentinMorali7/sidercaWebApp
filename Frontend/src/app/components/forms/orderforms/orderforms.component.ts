import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Time } from '@angular/common';
import { MAT_DATE_LOCALE_FACTORY } from '@angular/material/core';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';

import { formatDate } from '@angular/common';
import { isNull, isNumber } from 'util';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Globals } from 'src/app/global';


class p_l {
  constructor(public id?:number, public description?:string) {
  }
}

class p {
  constructor(public idPlantilla?:number, public nombre?:string) {
  }
}

class set {
  constructor(
    public Id?:number, 
    public Codigo?:string,
    public Linea?:number,
    public IdTipo?:number,
    public Longitud?:string,
    public Diametro?:string,
    public Espesor?:string,
    public Acero?:string,
    public Grado?:string,
    public TratamientoTermico?:string,
    public Expediente?:string,
    public FechaPedido?:Date,
    public FechaEsperado?:Date,
    public IdPadre?:number,
    public IdEstado?:number,
    public Prioridad?:number,
    public Secuencia?:number,
    public IdRemitente?:number,
    public Cliente?:string,
    public Entregado?:Date,
    public IdBancal?:number,
    public Ciclo?:number,
    public Colada?:number,
    public Producto?:string,
    public Numero?:number,
    public Ubicacion?:string,
    public IdDestino?:number,
    public NotificarAuditor?:boolean,
    public Traceability?:number,
    public Acustica?:boolean,
    public Auditor?:string,
    public FechaUltimaModif?:Date,
    public Motivo?:string,
    public Ot?:string,
    public Obs?:string,

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



@Component({
  selector: 'app-orderforms',
  templateUrl: './orderforms.component.html',
  styleUrls: ['./orderforms.component.css']
})



export class OrderformsComponent implements OnInit {
  neworder: FormGroup;
  submitted = false;
  dt: Date;
time:string;
timesend:Date;
 fActivarAlerta:any;
 clientcolor;
 cyclecolor;
 steel_castingcolor;
 heat_treatmentcolor;
 datecolor;
 lengthcolor;
 IdUsuario:string;

 patron = {
  data: [{
    id:"6422",
    idpedido:"4883",
    longitud:"6000",
    diametro:"88,9",
    espesor:"9,52",
    grado:"L 80",
    tratamientotermico:"SI",
    ciclo:"65994",
    expediente:"5/1582.01",
    colada:"29432",
    acero:"868",
  }]
};

patronsearched;


 notify_auditorcolor;
 acoustic_responsecolor;

 brokerexec;

 diam;
 thickness;
 steel;
 degree;

 boolValida=true;

 virgin = true;
 existing = false;
 isDisabledvirgin=false;
 isDisabledexisting=true;
 
 IdPedido;
 codigo1;
 fNumero;

 tubetype;
 codigotubo;
 plant;
tubenumber;

IdRemitente;

codigoa;
/*

p_l = {
  lista: [{id:0,
    description:""}]
};
*/
lista:p_l[]=[];
lista2:p_l[]=[];
lista3:p[]=[];
lista4:p_l[]=[];

listasend:next[]=[];
listadd:set={};

selectedValue;
selectedValue2;
selectedValue3;
selectedValue4;



diamvalue;
cyclevalue;
thicknessvalue;
steel_castingvalue;
lengthvalue;
degreevalue;
cycle;

isexisting;
isvirgin;

updateview;

update;
idd;

listaaux;

  constructor(private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute,    private globals: Globals, private httpClient: HttpClient) {      

    this.idd= this.route.snapshot.paramMap.get('id');
//console.log(this.idd)


this.fActivarAlerta=false;


  }

  ngOnInit() {
  //  alert(this.dt)

  this.isexisting=false;
  this.isvirgin=true;

// aca falta el usuario que esta harcode!!!!!!!!!
  var url1 = this.globals.baseUrl + '/Lineas/GetPlantLinea/t75648';
//alert(url1)
  this.httpClient.get(url1).subscribe((res: any[]) => {
    this.lista=res;
    console.log(this.lista);
  });

   // query necesaria par el siguiente selector ejecutar el SP strSQL = "qryPlantaLinea '"&idUsuario&"'"
  // lleno selector planta/linea  esto falta traer las queries y hacer la logica de rellenado dependiendo lo que elijo
  this.selectedValue = 'Laco 1/Laj 1-2-3' //pre selecciono
  //this.lista.push( new p_l(1,"Laco 1/Laj 1-2-3"));
  //this.lista.push( new p_l(2,"22"));

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
    
// harcode la busqueda en plantalinea=1 para el arranque de la pagina
var url1 = this.globals.baseUrl + '/Tipos/GetTubeTypes/t75648/'+ 1;
this.httpClient.get(url1).subscribe((res: any[]) => {
  this.lista2=res;
  console.log(this.lista2);
});

// select id, Nombre from Tipos
// strSQL = "qryTipoTubos '"&idUsuario&"',"&cint(IdLinea)


  // lleno selector tipo de tubo esto falta traer las queries y hacer la logica de rellenado dependiendo lo que elijo
  this.selectedValue2 = 'Calibración de equipos EMI' //pre selecciono
  //this.lista2.push( new p_l(1,"Calibración de equipos EMI (FALTA DINAMICO)"));
  //this.lista2.push( new p_l(2,"22"));

  /////////////////////////////////////////////////////////////////////////////////////////////////////////


  
  var url1 = this.globals.baseUrl + '/Plantillas';
  this.httpClient.get(url1).subscribe((res: any[]) => {
    this.lista3=res;

    console.log(this.lista3)

  });

  // select IdPlantilla, Nombre from Plantilla
  // lleno selector plantilla  esto falta traer las queries y hacer la logica de rellenado dependiendo lo que elijo
  this.selectedValue3 = "Ninguna" //pre selecciono 
  //this.lista3.push( new p_l(0,"Ninguna"));
  //this.lista3.push( new p_l(1,"22"));

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  

  // lleno selector plantilla  esto falta traer las queries y hacer la logica de rellenado dependiendo lo que elijo
  this.selectedValue4 = "Normal" //pre selecciono
  this.lista4.push( new p_l(0,"Normal"));
  this.lista4.push( new p_l(1,"Máxima"));
  this.lista4.push( new p_l(2,"Mínima"));



  this.listaaux= JSON.parse(sessionStorage.getItem('lista'));
  
  if(this.listaaux!=null){
  this.listaaux[0].check=true;
  }

 console.log(  this.listaaux)



if(this.idd==0){ //inicio
  this.update=false;
  this.listaaux=undefined;
this.updateview=true;
  /*
  let now = new Date();
  let hours = ("0" + now.getHours()).slice(-2);
  let minutes = ("0" + now.getMinutes()).slice(-2);
  let str = hours + ':' + minutes;
  this.time = str;
*/
}
 if(this.idd==1){
  this.updateview=false;
  this.update=true;
 // this.IdPedido=undefined;
}

///////////////////////////////////////////////////////////

    if(this.listaaux!=undefined){

  //console.log(  this.listaaux[0])
//////
if(this.listaaux[0].notify_auditor=="SI"){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
  var n_a="0";
}else{
  var n_a="1";
}

//////
if(this.listaaux[0].heat_treatment=="SI"){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
this.listaaux[0].heat_treatment="0";
}else{
  this.listaaux[0].heat_treatment="1";
}


//console.log(this.neworder.get("acoustic_response").value)
//////
if(this.listaaux[0].acoustic_response=="SI"){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
  var a_r="0";
}else{
  var a_r="1";
}


sessionStorage.setItem('user','t75648');  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  


var vecdate =this.listaaux[0].date.split("-");


//this.timesend =new Date(vecdate[0],vecdate[1],vecdate[2]);
this.dt =new Date(vecdate[0],vecdate[1]-1,vecdate[2]); 


var year =this.dt.getFullYear();
var month =this.dt.getMonth();
var day =this.dt.getDate();

//renuevo las fechas de envio y la hora que se seteo
if (this.listaaux[0].time != '' && this.listaaux[0].check) {
var vectime=this.listaaux[0].time.split(":");
this.timesend =new Date(year,month,day,vectime[0],vectime[1]);

}else{

  this.timesend =new Date(year,month,day,0,0); 
}

//console.log(formatDate( this.timesend, 'HH:mm', 'en'))
//console.log(this.listaaux[0].time)
//console.log(this.timesend)

this.thicknessvalue=this.listaaux[0].thickness;
this.steel_castingvalue=this.listaaux[0].steel_casting;
this.lengthvalue=this.listaaux[0].length;
this.cyclevalue=this.listaaux[0].cycle;
this.diamvalue=this.listaaux[0].diam;


//alert(this.listaaux[0].pattern_code)

     this.neworder = this.formBuilder.group({
      user: [this.listaaux[0].user],
      plant_line: [this.listaaux[0].plant_line],
      tubetype: [this.listaaux[0].tubetype],
      template: [this.listaaux[0].template],
      client: [this.listaaux[0].client],
      notify_auditor: [n_a],
      auditor: [this.listaaux[0].auditor],
      ot: [this.listaaux[0].ot],
      acoustic_response: [a_r],
  
      diam:this.listaaux[0].diam,
      degree: this.listaaux[0].degree,
      cycle: this.listaaux[0].cycle,
      thickness: this.listaaux[0].thickness,
      steel: this.listaaux[0].steel,
      steel_casting: this.listaaux[0].steel_casting,
      length: this.listaaux[0].length,
      heat_treatment: this.listaaux[0].heat_treatment,
      record: this.listaaux[0].record,
      num_trac_bme: [this.listaaux[0].num_trac_bme],
      pattern_code: [this.listaaux[0].pattern_code],
  
      date: [formatDate( this.dt, 'yyyy-MM-dd', 'en')],
        check: [this.listaaux[0].check],
        priority:[this.listaaux[0].priority],
        time: [formatDate( this.timesend, 'HH:mm', 'en')],
  
  
      location: [this.listaaux[0].location],
      BrokerExec: ['0'],
      Operacion: ['0'],
  
        
      virgin_tube: [{value: true, disabled: false}],
      existing_tube: [{value: false, disabled: false}],
  
    });
}else{

  this.dt = new Date();
  this.isexisting=false;
  this.isvirgin=true;
  
      this.diam="";
      this.degree="";
      this.thickness="";
      this.steel="";


  this.neworder = this.formBuilder.group({
    user: ['t75648'],
    plant_line: [''],
    tubetype: [''],
    template: [''],
    client: [''],
    notify_auditor: [''],
    auditor: [''],
    ot: [''],
    acoustic_response: [''],

    virgin_tube: [{value: true, disabled: false}],
    diam: [''],
    degree: [''],
    cycle: [''],
    thickness: [''],
    steel: [''],
    steel_casting: [''],
    length: ['0'],
    heat_treatment: [''],
    record: [''],
    num_trac_bme: ['0'],
    pattern_code: [''],
    existing_tube: [{value: false, disabled: false}],

    date: [formatDate( this.dt, 'yyyy-MM-dd', 'en')],
    check: [false],
    time: [formatDate( this.dt, 'HH:mm', 'en')],
    priority:[''],

    location: [''],
    BrokerExec: ['0'],
    Operacion: ['0']

    
  });
  
  

}

  

  }// oninit

//////////////////////////////////////////////////////////////////////////////////////

    // convenience getter for easy access to form fields
    get f() { return this.neworder.controls; }
////////////////////////////////////////////////////////////////////////////////////////
onSubmit() {
  
}

/////////////////////////////////////////////////////////////////////////////
 DesactivarAlerta()	{
  var vir= this.virgin;
  var exi=  this.existing;

  this.fActivarAlerta = false;

if(exi==false && this.neworder.get("cycle").value != undefined){
  console.log("buscaria una configuracion predeterminada dispuesta en codigo ASP VER CON CESAR");

//buscaria una configuracion predeterminada dispuesta en codigo ASP VER CON CESAR


this.diam="9999";
this.degree="9999";
this.thickness="9999";
this.steel="blando";

}else{
alert("Debe inidicar un Ciclo para el funcionamiento del botón Broker")

}

}

/////////////////////////////////////////////////////////////////////////////////////
 ShowAlert()
{  
  var Res = true;
  var str = '';

  if (this.neworder.get("client").value == '') {
   this.clientcolor='yellow';
  str=str+'Cliente\n\r';
  Res = false;
  }
  
  if (this.neworder.get("cycle").value == '') {
   this.cyclecolor='yellow';
  str=str+'Ciclo\n\r';
  Res = false;
  }
  
  if (this.neworder.get("steel_casting").value == '') {
    this.steel_castingcolor='yellow';
    str=str+'Colada\n\r';
  Res = false;
  }

if (this.neworder.get("heat_treatment").value == '') {
  this.heat_treatmentcolor='yellow';
  str=str+'Tratamiento térmico\n\r';
  Res = false;
  }

  if (this.neworder.get("heat_treatment").value == '2') {
    this.heat_treatmentcolor='yellow';
    str=str+'Tratamiento térmico\n\r';
  Res = false;
  }

  if (this.neworder.get("date").value == '') {
    this.datecolor='yellow';
    str=str+'Fecha en la que se necesita el tubo\n\r';
  Res = false;
  }

  if (this.neworder.get("length").value <= 0) {
    this.lengthcolor='yellow';
    str = str + 'Longuitud mayor que cero\n\r';
      Res = false;
  }

  if (this.neworder.get("notify_auditor").value == '') {
    this.notify_auditorcolor='yellow';
    str=str+'Norificacion al auditor\n\r';
  Res = false;
  }

  if (this.neworder.get("notify_auditor").value == '') {
    this.notify_auditorcolor='yellow';
    str=str+'Norificacion al auditor\n\r';
  Res = false;
  }

  if (this.neworder.get("acoustic_response").value == '') {
    this.acoustic_responsecolor='yellow';
    str=str+'La respuesta acustica\n\r';
  Res = false;
  }

  if (this.neworder.get("acoustic_response").value == '2') {
    this.acoustic_responsecolor='yellow';
    str=str+'La respuesta acustica\n\r';
  Res = false;
  }
  
 
  if ((this.fActivarAlerta)&&(!Res)&&(str != '')&&(this.neworder.get("virgin_tube").value)) {
    alert('Verificar los campos:\n\r'+str);
}

window.setTimeout(() => {   this.clientcolor='white';

this.cyclecolor='white';


 this.steel_castingcolor='white';
 

this.heat_treatmentcolor='white';


 this.heat_treatmentcolor='white';


 this.datecolor='white';


 this.lengthcolor='white';


 this.notify_auditorcolor='white';


 this.notify_auditorcolor='white';

 this.acoustic_responsecolor='white';


 this.acoustic_responsecolor='white'; }
 
  , 500);
  




this.fActivarAlerta = true;
  return Res;
  
}




/////////////////////////////////////////////////////////////////////////////
changevirgin()	{

  this.isexisting=false;
  this.isvirgin=true;



  this.virgin = true;
  this.existing = false;

//console.log(this.virgin)
//console.log(this.existing)

  this.neworder = this.formBuilder.group({
    user: [this.neworder.get("user").value],
    plant_line: [this.neworder.get("plant_line").value],
    tubetype: [this.neworder.get("tubetype").value],
    template: [this.neworder.get("template").value],
    client: [this.neworder.get("client").value],
    notify_auditor: [this.neworder.get("notify_auditor").value],
    auditor: [this.neworder.get("auditor").value],
    ot: [this.neworder.get("ot").value],
    acoustic_response: [this.neworder.get("acoustic_response").value],

    diam: [''],
    degree: [''],
    cycle: [''],
    thickness: [''],
    steel: [''],
    steel_casting: [''],
    length: ['0'],
    heat_treatment: [''],
    record: [''],
    num_trac_bme: ['0'],
    pattern_code: [''],
    
    date: [formatDate( this.dt, 'yyyy-MM-dd', 'en')],
    check: [false],
    priority:[this.neworder.get("priority").value],
    time: [formatDate( this.dt, 'HH:mm', 'en')],

    location: [''],
    BrokerExec: ['0'],
    Operacion: ['0'],

    
    virgin_tube: [{value: true, disabled: true}],
    existing_tube: [{value: false, disabled: false}],

  });


}

/////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////
changeexisting()	{
  this.isexisting=true;
this.isvirgin=false;

  this.virgin = false;
  this.existing = true;

    //this.dt = new Date();

//console.log(this.neworder.get("acoustic_response").value)



  this.neworder = this.formBuilder.group({

    user: ['t75648'],
      plant_line: [this.neworder.get("plant_line").value],
      tubetype: [this.neworder.get("tubetype").value],
      template: [this.neworder.get("template").value],
      client: [this.neworder.get("client").value],
      notify_auditor: [this.neworder.get("notify_auditor").value],
      auditor: [this.neworder.get("auditor").value],
      ot: [this.neworder.get("ot").value],
      acoustic_response: [this.neworder.get("acoustic_response").value],

      diam: [''],
      degree: [''],
      cycle: [''],
      thickness: [''],
      steel: [''],
      steel_casting: [''],
      length: ['0'],
      heat_treatment: [''],
      record: [''],
      num_trac_bme: ['0'],
      pattern_code: [''],

      date: [formatDate( this.dt, 'yyyy-MM-dd', 'en')],
      check: [false],
      priority:[this.neworder.get("priority").value],
      time: [formatDate( this.dt, 'HH:mm', 'en')],

      location: [''],
      BrokerExec: ['0'],
      Operacion: ['0'],

      

    virgin_tube: [{value: false, disabled: false}],
    existing_tube: [{value: true, disabled: true}]
  });


 /* 
  this.dt = new Date();
*/


}


/////////////////////////////////////////////////////////////////////////////////////////////////


async GetLastIdPedido()	{
  var idultimo=0; // esto esta hardcodeado pero lo voy a traer de la db  

  var url1 = this.globals.baseUrl + '/Pedidos/GetLastIdPedido';
  
  await this.httpClient.get(url1).toPromise().then(value =>{
    //console.log(value);
    this.IdPedido=value;
   /// console.log( this.IdPedido);

    if(isNull(this.IdPedido)){
      this.IdPedido=0;
    }


   });
  
  
  
  
  
  /*.subscribe((res: any) => {
    idultimo=res;
    console.log(idultimo);

    if(isNull(idultimo)){
      idultimo=0;
      return idultimo;
    }else{
     return idultimo;
    }

  });*/

// select IDENT_CURRENT('pedidos') as id
// aca hago la query para traer el ultimo pedido



}







/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

uservalidate()	{
  var str="";


if(this.boolValida && this.IdUsuario)
  {

  // select id from remitentes where nregistro = '"&IdUsuario&"'
  // aca ago la query para trae de la tabla "remitente" los datos para saber si el usuario tiene la potestad o no (si esta en la tabla puede) pasando "IdUsuario"

var queryrecibida=1212312; //ejemplo:id=97

if(isNull(queryrecibida))
  {
    this.boolValida = false;
    str ="Debe indicar un usuario autorizado \n\r";
    return str;
  }else{

    this.IdRemitente=123123;
    return str;
  }

  }
  }
/////////////////////////////////////////////////////////////////////////////////////
async tubecreate()	{
    var str="";
    var IdTipoTubo;
    var idPlanta;

 // var queryrecibida="tablalinea";

var IdTipoTuboaux=this.neworder.get("tubetype").value;
var idPlantaaux=this.neworder.get("plant_line").value;

this.lista2.forEach(element => {
  if(element.description==IdTipoTuboaux){
    //alert(element.id)
 IdTipoTubo=element.id;
  }
});
    
this.lista.forEach(element => {
  if(element.description==idPlantaaux){
    //alert(element.id)
 idPlanta=element.id;
  }
});

/*
  if(!isNull(queryrecibida))
    {
      this.plant=queryrecibida; //IdPlanta
    }
  */
 await this.GetNexNumber(IdTipoTubo, idPlanta).then(value =>{
  //console.log(value);
  this.tubenumber=value;

  console.log(this.tubenumber);


  if(isNull(this.tubenumber))
    {
      this.tubenumber = 1000;
    }else{
    
      this.tubenumber=this.tubenumber;
    } 


 

 });

 // alert(this.tubenumber)
 await this.GetPipeCode(this.tubenumber, IdTipoTubo, idPlanta).then(value =>{
  this.codigotubo=value;

 })



    }


/////////////////////////////////////////////////////////////////////////////////////
 async GetNexNumber(IdTipoTubo, Planta)	{
  var str="";

  var url1 = this.globals.baseUrl + '/Pedidos/qryProximoNumeroFromPedido/'+IdTipoTubo+'/'+ Planta;
  return await  this.httpClient.get(url1).toPromise();
// qryProximoNumeroFromPedido "&TipoTubo&","&Planta 
// aca ejecuto el stored "qryProximoNumeroFromPedido" pasando las variables "IdTipoTubo=this.neworder.get("tubetype").value;" y "Planta=this.neworder.get("plant_line").value;"
  }
  
/////////////////////////////////////////////////////////////////////////////////////
async GetPipeCode(tubenumber,IdTipoTubo, Planta)	{
  var str="";
  var fCodigo="";
console.log(tubenumber)
console.log(IdTipoTubo)
console.log(Planta)

//alert("aa")

  fCodigo=tubenumber.toString();


  if (tubenumber < 10) {
  fCodigo = "000"+tubenumber.toString();
  }

  if (tubenumber < 100) {
    fCodigo = "00"+tubenumber.toString();
    }
  
    if (tubenumber < 1000) {
      fCodigo = "0"+tubenumber.toString();
      }

     // console.log(fCodigo)

// select ((case len(label) when 1 then cast(1 as char(1))+label else label end) + '03052') as codigo from tipos where id = 1
// select ((case len(label) when 1 then cast("&Planta&"as char(1))+label else label end) + '"&fCodigo&"') as codigo from tipos where id = "&TipoTubo
// hace un selector que trae datos necesarios mandandole "fCodigo" y "IdTipoTubo"

var url1 = this.globals.baseUrl + '/Tipos/GetPipeCode/'+IdTipoTubo+'/'+ Planta+'/'+ fCodigo;
//alert(url1)
 return await  this.httpClient.get(url1, { responseType: 'text' }).toPromise();

  }
  
/////////////////////////////////////////////////////////////////////////////////////
checknum(v)	{
//alert(v)
if(v==1 ){

var valordiam=this.neworder.get("diam").value;

var ValidChars = "0123456789.";
var IsNumber=true;
var Char;

for (var i = 0; i < valordiam.length && IsNumber == true; i++) 
{ 
  Char = valordiam.charAt(i); 
  if (ValidChars.indexOf(Char) == -1) 
  {
    this.diamvalue="";
    IsNumber = false;
  }
}

if(IsNumber==false){
  alert("Se debe llenar el campo Diámetro con un valor numérico")
  return false;
}
}
//////////////
if(v==2 ){

  var valorcycle=this.neworder.get("cycle").value;
  
  var ValidChars = "0123456789.";
  var IsNumber=true;
  var Char;
  
  for (var i = 0; i < valorcycle.length && IsNumber == true; i++) 
  { 
    Char = valorcycle.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) 
    {
      this.cyclevalue="";
      IsNumber = false;
    }
  }
  
if(IsNumber==false){
  alert("Se debe llenar el campo Ciclo con un valor numérico")
  return false;
}
  }
////////////

if(v==3 ){

  var valorthickness=this.neworder.get("thickness").value;
  
  var ValidChars = "0123456789.";
  var IsNumber=true;
  var Char;
  
  for (var i = 0; i < valorthickness.length && IsNumber == true; i++) 
  { 
    Char = valorthickness.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) 
    {
      this.thicknessvalue="";
      IsNumber = false;
    }
  }
  
if(IsNumber==false){
  alert("Se debe llenar el campo Espesor con un valor numérico")
  return false;
}
  }

////////////

if(v==4 ){

  var valorsteel_casting=this.neworder.get("steel_casting").value;
  
  var ValidChars = "0123456789.";
  var IsNumber=true;
  var Char;
  
  for (var i = 0; i < valorsteel_casting.length && IsNumber == true; i++) 
  { 
    Char = valorsteel_casting.charAt(i); 
    if (ValidChars.indexOf(Char) == -1) 
    {
      this.steel_castingvalue="";
      IsNumber = false;
    }
  }
  
if(IsNumber==false){
  alert("Se debe llenar el campo Colada con un valor numérico")
  return false;
}
  }

////////////

if(v==5 ){

  var valorlength=this.neworder.get("length").value;
  
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


}//termino "checknum"


/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
async validate()	{


var str="";
var fPadreError="";
var Res=true;
this.boolValida=true;

this.listasend=[];
//console.log(this.neworder.get("virgin_tube").value);

/*
var accepted= this.uservalidate();
if(accepted!=""){
  alert(accepted);
  return false;
}
*/

//comun en ambos
if (this.neworder.get("plant_line").value == '') {
  str = str + "Debe indicar una línea válida \n\r"
  Res = false;
}

if (this.neworder.get("tubetype").value == '') {
  str = str + "Debe indicar un tipo de tubo válido \n\r"
  Res = false;
}

if (this.neworder.get("template").value == '') {
  str = str + "Debe indicar una plantilla válida \n\r"
  Res = false;
}

if (this.neworder.get("client").value == '') {
  str = str + "Debe indicar un Cliente \n\r"
  Res = false;
}

if (this.neworder.get("notify_auditor").value == '') {
  str = str + "Debe indicar si tiene que notificar al auditor \n\r"
  Res = false;
}

if (this.neworder.get("notify_auditor").value == 0 && this.neworder.get("auditor").value=='') {
  str = str + "Debe indicar al auditor \n\r"
  Res = false;
}

if (this.neworder.get("ot").value == '') {
  str = str + "Debe indicar la OT-PMANT\n\r"
  Res = false;
}
console.log(this.neworder.get("acoustic_response").value)
if (this.neworder.get("acoustic_response").value == '') {
  str = str + "Debe indicar la respuesta acustica \n\r"
  Res = false;
}
/*********/
/*
if (this.neworder.get("heat_treatment").value == '') {
  str = str + "Debe indicar si tiene tratamiento termico \n\r"
  Res = false;
}
*/


/*********/
/*
if (this.neworder.get("priority").value == '') {
  str = str + "Debe indicar una prioridad válida \n\r"
  Res = false;
}
*/

if (this.neworder.get("date").value == '') {
  str = str + "Debe introducir una fecha válida \n\r"
  Res = false;
}

if (this.neworder.get("time").value == '' && this.neworder.get("check").value) {
  str = str + "Debe introducir una hora válida \n\r"
  Res = false;
}
/*********/
/*
if (this.neworder.get("location").value == '') {
  str = str + "Debe introducir una Ubicación \n\r"
  Res = false;
}
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



if(this.neworder.get("virgin_tube").value){ //nuevo seria un no padre



  if (this.neworder.get("heat_treatment").value == '') {
    str = str + "Debe indicar si tiene tratamiento termico \n\r"
    Res = false;
  }


  if (this.neworder.get("diam").value == '') {
    str = str + "Debe indicar un Diametro \n\r"
    Res = false;
  }

  if (this.neworder.get("thickness").value == '') {
    str = str + "Debe indicar un Espesor \n\r"
    Res = false;
  }

  if (this.neworder.get("degree").value == '') {
    str = str + "Debe indicar un Grado \n\r"
    Res = false;
  }

  if (this.neworder.get("steel").value == '') {
    str = str + "Debe indicar un Acero \n\r"
    Res = false;
  }

  if (this.neworder.get("length").value == '0' || this.neworder.get("length").value == '') {
    str = str + "Debe indicar una Longitud mayor a cero\n\r"
    Res = false;
  }
 
//alert(this.update)


if(this.update)  //si actualizo valores
{
  //this.IdPedido=6090;


this.IdPedido=sessionStorage.getItem('IdPedido');  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  

  //////lleno variable de session aca con la estructura de envio
var nab;
var arb;

if(this.neworder.get("notify_auditor").value==0){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
  var na="SI";
  nab=true;
}else{
  var na="NO";
  nab=false;
}

//////
console.log(this.neworder.get("heat_treatment").value)
if(this.neworder.get("heat_treatment").value==0){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
  var ht="SI";

}else{
 var ht="NO";
}
//console.log(ht)


//////
if(this.neworder.get("acoustic_response").value==0){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
  var ar="SI";
  arb=true;
}else{
  var ar="NO";
  arb=false;
}


//////////////////////////////////////////////////////////////////////////////////////////

var  planlineid;
for(var i=0;i<this.lista.length;i++){
  if(this.lista[i].description==this.neworder.get("plant_line").value){
    planlineid=this.lista[i].id;
  break;
  }
  }

 var priorityid;
for(var i=0;i<this.lista4.length;i++){
    if(this.lista4[i].description==this.neworder.get("priority").value){
      priorityid=this.lista4[i].id;
    break;
    }
    }


  this.listadd={Id:this.IdPedido,Cliente:this.neworder.get("client").value, Numero: undefined, Codigo: undefined, Linea: undefined, IdTipo: undefined,
  Longitud:this.neworder.get("length").value, Diametro:this.neworder.get("diam").value, Espesor:this.neworder.get("thickness").value,
  Acero: this.neworder.get("steel").value, Grado:this.neworder.get("degree").value, TratamientoTermico: this.neworder.get("heat_treatment").value,
  Expediente:this.neworder.get("record").value, FechaPedido: undefined, FechaEsperado: undefined, IdPadre:null, IdEstado:2,
  Prioridad:priorityid, Secuencia:0, IdRemitente:this.IdRemitente, Entregado:null,IdBancal:null, Ciclo:this.neworder.get("cycle").value,
  Colada: this.neworder.get("steel_casting").value, NotificarAuditor:nab, Ubicacion: this.neworder.get("location").value,
  Traceability:this.neworder.get("num_trac_bme").value, Acustica:arb, Auditor:this.neworder.get("auditor").value,
  Ot:undefined,Obs:null
  }




  let headers = new HttpHeaders().set('Content-Type','application/json');

  this.httpClient.post(this.globals.baseUrl +'/Pedidos/updateOrder?pedidosaux='+ JSON.stringify(this.listadd), {headers: headers})
  .subscribe(
   data  => {
   }, 
   error  => {
   }
   );


   //////////////////////////////////////////////////////////////////

   this.listasend=[];
//this.dt =this.neworder.get("date").value;

    this.listasend.push( 
    new next(
    this.neworder.get("user").value,
    this.neworder.get("plant_line").value,
    this.neworder.get("tubetype").value,
    this.neworder.get("template").value,
    this.neworder.get("client").value,
    na,
    this.neworder.get("auditor").value,
    this.neworder.get("ot").value,
    ar,
    this.neworder.get("diam").value,
    this.neworder.get("degree").value,
    this.neworder.get("cycle").value,
    this.neworder.get("thickness").value,
    this.neworder.get("steel").value,
    this.neworder.get("steel_casting").value,
    this.neworder.get("length").value,
    ht,
    this.neworder.get("record").value,
    this.neworder.get("num_trac_bme").value,
    this.listaaux[0].pattern_code,
    this.neworder.get("date").value,
    this.neworder.get("check").value,
    this.neworder.get("priority").value,
    this.neworder.get("time").value,
    this.neworder.get("location").value,
    this.codigotubo 
    ));

   // console.log(this.listasend)

    //alert(this.codigotubo)
    sessionStorage.setItem('lista',JSON.stringify(this.listasend));




    this.router.navigate(['/newdefect']); //we can send product object as route param




}else{

  if(Res!=false){ // si no hay vacios nada mal
  if(this.boolValida) //esto debo validad si esta todo bien en llenado desde cero para poder avanzar aca
  {

 //this.tubetype=this.neworder.get("tubetype").value;

// veo id de tubetype elegido
    for(var i=0;i<this.lista2.length;i++){
      if(this.lista2[i].description==this.neworder.get("tubetype").value){
        this.tubetype=this.lista2[i].id;
      break;
      }
      }
  

   //this.tubetype=6; // algun codigo de tubo pro ahora hardcode es el que elige en la pantalla



   var vecdate =this.neworder.get("date").value.split("-");

   //this.timesend =new Date(vecdate[0],vecdate[1],vecdate[2]);
   this.dt =new Date(vecdate[0],vecdate[1]-1,vecdate[2]); 

   var year =this.dt.getFullYear();
   var month =this.dt.getMonth();
   var day =this.dt.getDate();


//////lleno variable de session aca con la estructura de envio
var nab;
var arb;

if(this.neworder.get("notify_auditor").value==0){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
  var na="SI";
  nab=true;
}else{
  var na="NO";
  nab=false;
}

//////
//console.log(this.neworder.get("heat_treatment").value)
if(this.neworder.get("heat_treatment").value==0){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
  var ht="SI";

}else{
 var ht="NO";
}
//console.log(ht)


//////
if(this.neworder.get("acoustic_response").value==0){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
  var ar="SI";
  arb=true;
}else{
  var ar="NO";
  arb=false;
}

   

//renuevo las fechas de envio y la hora que se seteo
if (this.neworder.get("time").value != '' && this.neworder.get("check").value) {
var vectime=this.neworder.get("time").value.split(":");
this.timesend =new Date(year,month,day,vectime[0],vectime[1]);

}else{
  this.timesend =new Date(year,month,day,0,0); 
}


//////////////////////////////////////////////////////////////////////////////////////////

var  planlineid;
for(var i=0;i<this.lista.length;i++){
  if(this.lista[i].description==this.neworder.get("plant_line").value){
    planlineid=this.lista[i].id;
  break;
  }
  }

 var priorityid;
for(var i=0;i<this.lista4.length;i++){
    if(this.lista4[i].description==this.neworder.get("priority").value){
      priorityid=this.lista4[i].id;
    break;
    }
    }


  await  this.tubecreate();

 // console.log(this.neworder.get("template").value)
  
// alert(this.codigotubo)



var datenow=new Date();
var requireddateaux= this.neworder.get("date").value+ " " + this.neworder.get("time").value;
var requireddate= new Date(requireddateaux);


if(this.tubetype==6){ // Si es un tubo de recalque, se generan dos pedidos con c�digos -a y -b
 this.codigoa = this.codigotubo + "-a";
      

    this.listadd={Cliente:this.neworder.get("client").value, Numero: this.tubenumber, Codigo: this.codigoa, Linea: planlineid, IdTipo: this.tubetype,
    Longitud:this.neworder.get("length").value, Diametro:this.neworder.get("diam").value, Espesor:this.neworder.get("thickness").value,
    Acero: this.neworder.get("steel").value, Grado:this.neworder.get("degree").value, TratamientoTermico: this.neworder.get("heat_treatment").value,
    Expediente:this.neworder.get("record").value, FechaPedido: datenow, FechaEsperado: requireddate, IdPadre:null, IdEstado:2,
    Prioridad:priorityid, Secuencia:0, IdRemitente:this.IdRemitente, Entregado:null,IdBancal:null, Ciclo:this.neworder.get("cycle").value,
    Colada: this.neworder.get("steel_casting").value, NotificarAuditor:nab, Ubicacion: this.neworder.get("location").value,
    Traceability:this.neworder.get("num_trac_bme").value, Acustica:arb, Auditor:this.neworder.get("auditor").value,
    Ot:this.neworder.get("ot").value,Obs:null
    }


    let headers = new HttpHeaders().set('Content-Type','application/json');

    this.httpClient.post(this.globals.baseUrl +'/Pedidos?pedidosaux='+ JSON.stringify(this.listadd), {headers: headers})
    .subscribe(
     data  => {
     }, 
     error  => {
     }
     );



//console.log(this.listadd)


      //dataF.push({id: "USER", text: user.identification})

 /*    this.httpClient.post(this.globals.baseUrl +'/poolaction/post?value='+ JSON.stringify(dataF), {headers: headers})
      .subscribe(
       data  => {
       console.log("Datos Actualizados:", data);
       this.success = true;
       return true;
       }, 
       error  => {
       console.log("Error", error); 
       }
       );
*/


//Cliente, Numero, Codigo, Linea, IdTipo, Longitud, Diametro, Espesor, Acero, Grado, TratamientoTermico, Expediente, FechaPedido, FechaEsperado, IdPadre, 
//IdEstado, Prioridad, Secuencia, IdRemitente, Entregado, IdBancal, Ciclo, Colada, NotificarAuditor, Ubicacion, Traceability, Acustica, auditor, ot


// aca insertaria en la db en tabla "pedidos" los siguientes datos: Cliente, Numero(numero de tubo), Codigo(codigo de tubo "codigotubo"), Linea(IdLinea), IdTipo(IdTipoTubo), Longitud, Diametro,
// Espesor, Acero, Grado, TratamientoTermico, Expediente, FechaPedido (funcion: SQLDate(ahora)), FechaEsperado (funcion: SQLDate(fecha&" "&hora)), IdPadre(null), IdEstado(2), Prioridad, Secuencia(0), 
// IdRemitente(IdRemitente), Entregado(null), IdBancal(null), Ciclo, Colada, NotificarAuditor, Ubicacion, Traceability, Acustica, auditor, ot
/* 
            strQuery = "Insert into pedidos (Cliente, Numero, Codigo, Linea, IdTipo, Longitud, Diametro, Espesor, Acero, Grado, TratamientoTermico, Expediente, FechaPedido, FechaEsperado, IdPadre, IdEstado, Prioridad, Secuencia, IdRemitente, Entregado, IdBancal, Ciclo, Colada, NotificarAuditor, Ubicacion, Traceability, Acustica, auditor, ot)" 
            strQuery = strQuery & " values ('"&Replace(Cliente, "'", "''")&"',"&numero&",'" & Codigo1 & "'," & IdLinea & ", " & IdTipoTubo & ", Cast('" & Longitud & "' as money), Cast('" & Diametro & "' as money),"
            strQuery = strQuery & "Cast('"&Espesor & "' as money),'" & Replace(Acero, "'", "''") & "','" & Replace(Grado, "'", "''") & "','" & Replace(Tratamiento, "'", "''") & "','" & Replace(Expediente, "'", "''") & "', Cast('" & SQLDate(ahora) & "' as datetime), Cast('" &SQLDate(fecha&" "&hora)&"' as datetime) , null, 2, " & Prioridad
            strQuery = strQuery & ", 0, " & IdRemitente & ", null, null, " & Ciclo & "," & Colada & "," & NotifAuditor & ",'" & Replace(ubicacion, "'", "''") & "',"&Traceability&","&Racustica&",'"&Auditor&"','"&OT&"'); " 
*/

//obtengo ultimo pedido realizado



 await this.GetLastIdPedido();

  sessionStorage.setItem('IdPedido',this.IdPedido);  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  
  sessionStorage.setItem('IdPedido-a',this.IdPedido);  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  
  sessionStorage.setItem('Recalque',this.IdPedido);  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  

  //alert(this.neworder.get("template").value)

  if (this.neworder.get("template").value != 'Ninguna' ) {


    var idplantilla;

    this.lista3.forEach(element => {
      if(element.nombre==this.neworder.get("template").value){
        //alert(element.id)
        idplantilla=element.idPlantilla;
      }
    });
      

    var url1 = this.globals.baseUrl + '/Plantillas/DoCopiarDefectosPlantilla/'+idplantilla+"/"+this.IdPedido;
    await this.httpClient.get(url1).toPromise();


// exec DoCopiarDefectosPlantilla "&IdPlantilla&", "&IdPedido   
// aca hacer un stored para poder copiar las plantillas pasandole "IdPlantilla" y "IdPedido"

  }

  this.codigo1 = this.codigotubo + "-b";

  sessionStorage.setItem('Codigo-b',  this.codigo1);  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  

  this.listadd={Cliente:this.neworder.get("client").value, Numero: this.tubenumber, Codigo:  this.codigo1, Linea: planlineid, IdTipo: this.tubetype,
    Longitud:this.neworder.get("length").value, Diametro:this.neworder.get("diam").value, Espesor:this.neworder.get("thickness").value,
    Acero: this.neworder.get("steel").value, Grado:this.neworder.get("degree").value, TratamientoTermico: this.neworder.get("heat_treatment").value,
    Expediente:this.neworder.get("record").value, FechaPedido: datenow, FechaEsperado: requireddate, IdPadre:null, IdEstado:2,
    Prioridad:priorityid, Secuencia:0, IdRemitente:this.IdRemitente, Entregado:null,IdBancal:null, Ciclo:this.neworder.get("cycle").value,
    Colada: this.neworder.get("steel_casting").value, NotificarAuditor:nab, Ubicacion: this.neworder.get("location").value,
    Traceability:this.neworder.get("num_trac_bme").value, Acustica:arb, Auditor:this.neworder.get("auditor").value,
    Ot:this.neworder.get("ot").value,Obs:null
    }

    this.httpClient.post(this.globals.baseUrl +'/Pedidos?pedidosaux='+ JSON.stringify(this.listadd), {headers: headers})
    .subscribe(
     data  => {
     }, 
     error  => {
     }
     );

//console.log(this.listadd)
  // insterto pedido-b
  /*
    strQuery = "Insert into pedidos (Cliente, Numero, Codigo, Linea, IdTipo, Longitud, Diametro, Espesor, Acero, Grado, TratamientoTermico, Expediente, FechaPedido, FechaEsperado, IdPadre, IdEstado, Prioridad, Secuencia, IdRemitente, Entregado, IdBancal, Ciclo, Colada, NotificarAuditor, Ubicacion, Traceability, Acustica, Auditor, OT)" 
    strQuery = strQuery & " values ('"&Replace(Cliente, "'", "''")&"',"&numero&",'" & Codigo1 & "'," & IdLinea & ", " & IdTipoTubo & ", Cast('" & Longitud & "' as money), Cast('" & Diametro & "' as money),"
    strQuery = strQuery & "Cast('"&Espesor & "' as money),'" & Replace(Acero, "'", "''") & "','" & Replace(Grado, "'", "''") & "','" & Replace(Tratamiento, "'", "''") & "','" & Replace(Expediente, "'", "''") & "', Cast('" & SQLDate(ahora) & "' as datetime), Cast('" &SQLDate(fecha&" "&hora)&"' as datetime) , null, 2, " & Prioridad
    strQuery = strQuery & ", 0, " & IdRemitente & ", null, null, " & Ciclo & "," & Colada & "," & NotifAuditor & ",'" & Replace(ubicacion, "'", "''") & "',"&Traceability&","&Racustica&",'"&Auditor&"','"&OT&"'); " 
     
  */
 await this.GetLastIdPedido();

//alert(this.IdPedido)

 sessionStorage.setItem('IdPedido-b',this.IdPedido);  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  
  
  if (this.neworder.get("template").value  != 'Ninguna'  ) {

    var idplantilla;

    this.lista3.forEach(element => {
      if(element.nombre==this.neworder.get("template").value){
        //alert(element.id)
        idplantilla=element.idPlantilla;
      }
    });
    var url1 = this.globals.baseUrl + '/Plantillas/DoCopiarDefectosPlantilla/'+idplantilla+"/"+this.IdPedido;
    await this.httpClient.get(url1).toPromise();
    // exec DoCopiarDefectosPlantilla "&IdPlantilla&", "&rstValidacion("Id")
    // aca hacer un stored para poder copiar las plantillas pasandole "IdPlantilla" y "IdPedido"
    
      }

      this.codigo1=this.codigoa;

  }else{ ///////////////////////////////////////////// if idtubo!=6 al no se de recalque solo se hace un pedido
    
    sessionStorage.setItem('Recalque',"");  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  



    let headers = new HttpHeaders().set('Content-Type','application/json');

    this.codigo1 = this.codigotubo;
alert(this.codigo1)
    this.listadd={Cliente:this.neworder.get("client").value, Numero: this.tubenumber, Codigo:  this.codigo1, Linea: planlineid, IdTipo: this.tubetype,
      Longitud:this.neworder.get("length").value, Diametro:this.neworder.get("diam").value, Espesor:this.neworder.get("thickness").value,
      Acero: this.neworder.get("steel").value, Grado:this.neworder.get("degree").value, TratamientoTermico: this.neworder.get("heat_treatment").value,
      Expediente:this.neworder.get("record").value, FechaPedido: datenow, FechaEsperado: requireddate, IdPadre:null, IdEstado:2,
      Prioridad:priorityid, Secuencia:0, IdRemitente:this.IdRemitente, Entregado:null,IdBancal:null, Ciclo:this.neworder.get("cycle").value,
      Colada: this.neworder.get("steel_casting").value, NotificarAuditor:nab, Ubicacion: this.neworder.get("location").value,
      Traceability:this.neworder.get("num_trac_bme").value, Acustica:arb, Auditor:this.neworder.get("auditor").value,
      Ot:this.neworder.get("ot").value,Obs:null
      }
  
      this.httpClient.post(this.globals.baseUrl +'/Pedidos?pedidosaux='+ JSON.stringify(this.listadd), {headers: headers})
      .subscribe(
       data  => {
       }, 
       error  => {
       }
       );
  



// aca insertaria en la db en tabla "pedidos" los siguientes datos: Cliente, Numero(numero de tubo), Codigo(codigo de tubo "codigotubo"), Linea(IdLinea), IdTipo(IdTipoTubo), Longitud, Diametro,
// Espesor, Acero, Grado, TratamientoTermico, Expediente, FechaPedido (funcion: SQLDate(ahora)), FechaEsperado (funcion: SQLDate(fecha&" "&hora)), IdPadre(null), IdEstado(2), Prioridad, Secuencia(0), 
//IdRemitente(IdRemitente), Entregado(null), IdBancal(null), Ciclo, Colada, NotificarAuditor, Ubicacion, Traceability, Acustica, auditor, ot
/*
  strQuery = "Insert into pedidos (Cliente, Numero, Codigo, Linea, IdTipo, Longitud, Diametro, Espesor, Acero, Grado, TratamientoTermico, Expediente, FechaPedido, FechaEsperado, IdPadre, IdEstado, Prioridad, Secuencia, IdRemitente, Entregado, IdBancal, Ciclo, Colada, NotificarAuditor, Ubicacion,Traceability,Acustica, auditor, OT)" 
 strQuery = strQuery & " values ('"&Replace(Cliente, "'", "''")&"',"&numero&",'" & Codigo & "'," & IdLinea & ", " & IdTipoTubo & ", Cast('" & Longitud & "' as money), Cast('" & Diametro & "' as money),"
 strQuery = strQuery & "Cast('"&Espesor & "' as money),'" & Replace(Acero, "'", "''") & "','" & Replace(Grado, "'", "''") & "','" & Replace(Tratamiento, "'", "''") & "','" &Expediente& "', Cast('" & SQLDate(ahora) & "' as datetime), Cast('" &SQLDate(fecha&" "&hora)&"' as datetime) , null, 2, " & Prioridad
  strQuery = strQuery & ", 0, " & IdRemitente & ", null, null, " & Ciclo & "," & Colada & "," & NotifAuditor & ",'" & Replace(ubicacion, "'", "''") & "',"&Traceability&","&Racustica&",'"&Auditor&"','"&OT&"')  "
*/


await this.GetLastIdPedido();

sessionStorage.setItem('IdPedido',this.IdPedido);  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  

sessionStorage.setItem('Recalque',"");  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  


if (this.neworder.get("template").value != '' ||this.neworder.get("template").value !=0 ) {

  var idplantilla;

  this.lista3.forEach(element => {
    if(element.nombre==this.neworder.get("template").value){
      //alert(element.id)
      idplantilla=element.idPlantilla;
    }
  });
  var url1 = this.globals.baseUrl + '/Plantillas/DoCopiarDefectosPlantilla/'+idplantilla+"/"+this.IdPedido;
  await this.httpClient.get(url1).toPromise();

  // exec DoCopiarDefectosPlantilla "&IdPlantilla&", "&IdPedido   
  // aca hacer un stored para poder copiar las plantillas pasandole "IdPlantilla" y "IdPedido"

}
  


  }// termino else de if idtubo!=6


 ///////////////////////////////////////////////////////////////////////

  this.listasend.push( 
    new next(
    this.neworder.get("user").value,
    this.neworder.get("plant_line").value,
    this.neworder.get("tubetype").value,
    this.neworder.get("template").value,
    this.neworder.get("client").value,
    na,
    this.neworder.get("auditor").value,
    this.neworder.get("ot").value,
    ar,
    this.neworder.get("diam").value,
    this.neworder.get("degree").value,
    this.neworder.get("cycle").value,
    this.neworder.get("thickness").value,
    this.neworder.get("steel").value,
    this.neworder.get("steel_casting").value,
    this.neworder.get("length").value,
    ht,
    this.neworder.get("record").value,
    this.neworder.get("num_trac_bme").value,
    this.codigo1,
    this.neworder.get("date").value,
    this.neworder.get("check").value,
    this.neworder.get("priority").value,
    this.neworder.get("time").value,
    this.neworder.get("location").value,
    this.codigotubo 
    ));



    console.log(this.listasend)

    sessionStorage.setItem('lista',JSON.stringify(this.listasend));




    this.router.navigate(['/newdefect']); //we can send product object as route param



  }  //termino if valida

} //if Res!= false
else{  //faltan datos
alert(str)
}

}//else update


}
else{   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// si es padre


if(Res!=false){ // si no hay vacios nada mal

var IdPadre="";
//alert(this.neworder.get("pattern_code").value)
  if (this.neworder.get("pattern_code").value == '') {
    alert("Debe introducir un código válido para el padre \n\r");
return false;
  //  this.boolValida=false;
  }

//  console.log(this.boolValida);



if(this.boolValida)
{
  var url1 = this.globals.baseUrl + '/Patrons/GetPatronsByCode/'+this.neworder.get("pattern_code").value;
 
  await this.httpClient.get(url1).toPromise().then(value =>{
    ///console.log(value);
    if(value!=undefined){
    this.patronsearched=value;
    }
   });
  

//traigo los datos del codigo padre aca iria la query que trae los datos de la tabla "patron" con el "SS0114" (CodigoPadre) ingresado en la web
//console.log(this.patron)
// strValidacion = "select id, idpedido, longitud, diametro, espesor, acero, grado, tratamientotermico, ciclo, expediente, colada from patron where codigo = '"&CodigoPadre&"' and idestado in (0,10)"


if(this.patronsearched!=null){

IdPadre=this.patronsearched.idPedido;
this.IdPedido=IdPadre;

sessionStorage.setItem('IdPedido',this.IdPedido);  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  


//////
if(this.neworder.get("notify_auditor").value==0){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
  var n_a="0";
}else{
  var n_a="1";
}

//////
if(this.patronsearched.tratamientoTermico=="SI"){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
this.patronsearched.tratamientoTermico="0";
}else{
  this.patronsearched.tratamientoTermico="1";
}


//console.log(this.neworder.get("acoustic_response").value)
//////
if(this.neworder.get("acoustic_response").value==0){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
  var a_r="0";
}else{
  var a_r="1";
}
//console.log(a_r)
/*
/////
for(var i=0;i<this.lista.length;i++){
  if(this.lista[i].description==this.neworder.get("plant_line").value){
  var selectp_l=this.lista[i].id;
  break;
  }
  }
  
/////
  
  for(var i=0;i<this.lista2.length;i++){
    if(this.lista2[i].description==this.neworder.get("tubetype").value){
    var selectt_t=this.lista2[i].id;
    break;
    }
    }
  
/////
   
  for(var i=0;i<this.lista3.length;i++){
    if(this.lista3[i].description==this.neworder.get("template").value){
    var selectt=this.lista3[i].id;
    break;
    }
    }
*/
var vecdate =this.neworder.get("date").value.split("-");
//this.timesend =new Date(vecdate[0],vecdate[1],vecdate[2]);

this.dt =new Date(vecdate[0],vecdate[1]-1,vecdate[2]); 

var year =this.dt.getFullYear();
var month =this.dt.getMonth();
var day =this.dt.getDate();


//renuevo las fechas de envio y la hora que se seteo
if (this.neworder.get("time").value != '' && this.neworder.get("check").value) {
var vectime=this.neworder.get("time").value.split(":");
this.timesend =new Date(year,month,day,vectime[0],vectime[1]);

}else{
  this.timesend =new Date(year,month,day,0,0); 
}

//
//console.log("llego")
//console.log(this.patronsearched.data[0].diametro)
//console.log( this.patronsearched.data[0].grado)

//this.dt =this.neworder.get("date").value;

    
  this.neworder = this.formBuilder.group({
    user: [this.neworder.get("user").value],
    plant_line: [this.neworder.get("plant_line").value],
    tubetype: [this.neworder.get("tubetype").value],
    template: [this.neworder.get("template").value],
    client: [this.neworder.get("client").value],
    notify_auditor: [n_a],
    auditor: [this.neworder.get("auditor").value],
    ot: [this.neworder.get("ot").value],
    acoustic_response: [a_r],

    diam: this.patronsearched.diametro,
    degree: this.patronsearched.grado,
    cycle: this.patronsearched.ciclo,
    thickness: this.patronsearched.espesor,
    steel: this.patronsearched.acero,
    steel_casting: this.patronsearched.colada,
    length: this.patronsearched.longitud,
    heat_treatment: this.patronsearched.tratamientoTermico,
    record: this.patronsearched.expediente,
    num_trac_bme: ['0'],
    pattern_code: [this.neworder.get("pattern_code").value],

    date: [formatDate( this.dt, 'yyyy-MM-dd', 'en')],
      check: [false],
      priority:[this.neworder.get("priority").value],
      time: [formatDate( this.timesend, 'HH:mm', 'en')],


    location: [this.neworder.get("location").value],
    BrokerExec: ['0'],
    Operacion: ['0'],

      
    virgin_tube: [{value: false, disabled: false}],
    existing_tube: [{value: true, disabled: true}]

  });


//console.log( this.neworder)




//await  this.tubecreate();


//////lleno variable de session aca con la estructura de envio

if(this.neworder.get("notify_auditor").value==0){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
  var na="SI";
}else{
  var na="NO";
}

//////
console.log(this.neworder.get("heat_treatment").value)
if(this.neworder.get("heat_treatment").value==0){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
  var ht="SI";
}else{
 var ht="NO";
}
//console.log(ht)


//////
if(this.neworder.get("acoustic_response").value==0){ // lo hago porque el selector se pone por "value" que es un id de 0 a cantidad de elementos
  var ar="SI";
}else{
  var ar="NO";
}


//renuevo las fechas de envio y la hora que se seteo
if (this.neworder.get("time").value != '' && this.neworder.get("check").value) {
var vectime=this.neworder.get("time").value.split(":");
this.timesend =new Date(year,month,day,vectime[0],vectime[1]);

}else{
  this.timesend =new Date(year,month,day,0,0); 
}


//this.dt =this.neworder.get("date").value;

    this.listasend.push( 
    new next(
    this.neworder.get("user").value,
    this.neworder.get("plant_line").value,
    this.neworder.get("tubetype").value,
    this.neworder.get("template").value,
    this.neworder.get("client").value,
    na,
    this.neworder.get("auditor").value,
    this.neworder.get("ot").value,
    ar,
    this.neworder.get("diam").value,
    this.neworder.get("degree").value,
    this.neworder.get("cycle").value,
    this.neworder.get("thickness").value,
    this.neworder.get("steel").value,
    this.neworder.get("steel_casting").value,
    this.neworder.get("length").value,
    ht,
    this.neworder.get("record").value,
    this.neworder.get("num_trac_bme").value,
    this.neworder.get("pattern_code").value,
    this.neworder.get("date").value,
    this.neworder.get("check").value,
    this.neworder.get("priority").value,
    this.neworder.get("time").value,
    this.neworder.get("location").value,
    this.codigotubo 
    ));



    console.log(this.listasend)

    sessionStorage.setItem('lista',JSON.stringify(this.listasend));




    this.router.navigate(['/newdefect']); //we can send product object as route param



}else{

  alert("El código del tubo padre no es válido \n\r");
  return false;
  //fPadreError = "El código del tubo padre no es válido \n\r"
}


}//if this.boolvalida

/*
  if (this.neworder.get("steel_casting").value == '') {
    str = str + "Debe indicar una colada \n\r"
    Res = false;
  }
  */


} //if Res!= false
else{  //faltan datos
alert(str)
}


}  //termino si es padre










}


/////////////////////////////////////////////////////////////////////////////////////////////////////

findtubetype(plantline){
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    var id;

for(var i=0;i<this.lista.length;i++){
  if(this.lista[i].description==plantline){
   id=this.lista[i].id;
  break;
  }
  }



// harcode la busqueda en plantalinea=1 para el arranque de la pagina
var url1 = this.globals.baseUrl + '/Tipos/GetTubeTypes/t75648/'+ id;
this.httpClient.get(url1).subscribe((res: any[]) => {
  this.lista2=res;
  console.log(this.lista2);
});

// select id, Nombre from Tipos
// strSQL = "qryTipoTubos '"&idUsuario&"',"&cint(IdLinea)


  // lleno selector tipo de tubo esto falta traer las queries y hacer la logica de rellenado dependiendo lo que elijo
  this.selectedValue2 = '' //pre selecciono
  //this.lista2.push( new p_l(1,"Calibración de equipos EMI (FALTA DINAMICO)"));
  //this.lista2.push( new p_l(2,"22"));

  /////////////////////////////////////////////////////////////////////////////////////////////////////////


}

/////////////////////////////////////////////////////////////////////////////////////////////////////

  async broker(){
    let headers = new HttpHeaders().set('Content-Type','application/json');

  
  var url1 = this.globals.baseUrl + '/Pedidos/broker';
  await this.httpClient.get(url1, {headers: headers}).toPromise().then(value =>{
      alert(value);

  });
  
  }
  




}//termina

