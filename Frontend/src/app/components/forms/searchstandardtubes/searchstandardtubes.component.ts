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
    public plant_line?:number,
    public tubetype?:number,
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

    public location_details?:string,
    public actual_state?:string,


    public tol1?:string,
    public tol2?:string,
    public tol3?:string,


    ) {
  }
}


@Component({
  selector: 'app-searchstandardtubes',
  templateUrl: './searchstandardtubes.component.html',
  styleUrls: ['./searchstandardtubes.component.css']
})
export class SearchstandardtubesComponent implements OnInit {
  search: FormGroup;
  selectedValue3; //planta
  selectedValue2; //tipotubo
  selectedValue1; //estado

  lista:p_l[]=[];
  lista2:p_l[]=[];
  lista3:s[]=[];

vector;
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


  listasend:find[]=[];

  tubetypeaux;
  actualstate;
  plantline;
  constructor(private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute,private httpClient: HttpClient,private globals: Globals) { }

  async ngOnInit() {
    this.tol1value=0;
    this.tol2value=0;
    this.tol3value=0;
    
    this.diamvalue="";
    this.cyclevalue="";
    this.steel_castingvalue="";
    this.lengthvalue="";
    this.thicknessvalue="";
    
      this.search = this.formBuilder.group({
        user: ['t75648'],
        plant_line: [''],
        tubetype: [''],
        client: [''],
        location_details: [''],
    
    
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

    var url1 = this.globals.baseUrl + '/EstadosPatrons/qryEstadosPatron';
    await this.httpClient.get(url1).toPromise().then(value =>{
        this.vector=value;
       });
      this.lista3=this.vector;
      this.selectedValue1 = '0'; //pre selecciono
// select Status, Descripcion from EstadosPatron
// strQuery = "exec qryEstadosPatron"
  // lleno selector tipo de tubo esto falta traer las queries y hacer la logica de rellenado dependiendo lo que elijo
  /*this.selectedValue1 = '0' //pre selecciono
  this.lista3.push( new s(-1,"Todos"));
  this.lista3.push( new s(0,"Activo"));
  this.lista3.push( new s(1,"Inactivo"));
*/

var url1 = this.globals.baseUrl + '/Tipos';
await this.httpClient.get(url1).toPromise().then(value =>{
    this.vector2=value;
   });
  this.lista2=this.vector2;
  this.selectedValue2 = '0'; //pre selecciono
// select id, Nombre from Tipos
// strSQL = "qryTipoTubos '"&idUsuario&"',"&cint(IdLinea)
  // lleno selector tipo de tubo esto falta traer las queries y hacer la logica de rellenado dependiendo lo que elijo
 /* this.selectedValue2 = '0' //pre selecciono
  this.lista2.push( new p_l(0,"Ninguno"));
  this.lista2.push( new p_l(1,"Calibración de equipos EMI (FALTA DINAMICO)"));
  this.lista2.push( new p_l(2,"22"));
*/


var url1 = this.globals.baseUrl + '/Lineas';
await this.httpClient.get(url1).toPromise().then(value =>{
    this.vector3=value;
   });
  this.lista=this.vector3;
  this.selectedValue3 = '0'; //pre selecciono

  // query necesaria par el siguiente selector ejecutar el SP strSQL = "qryPlantaLinea '"&idUsuario&"'"
  // lleno selector planta/linea  esto falta traer las queries y hacer la logica de rellenado dependiendo lo que elijo
/*  this.selectedValue3 = '0' //pre selecciono
  this.lista.push( new p_l(0,"Todos"));
  this.lista.push( new p_l(1,"Laco 1/Laj 1-2-3"));
  this.lista.push( new p_l(2,"22"));
*/





  }//termino init

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






  llamar(campo) {
    this.listasend=[];


if(this.search.get("tubetype").value==0){
this.tubetypeaux="";
}else{
  this.tubetypeaux=this.search.get("tubetype").value;
}


if(this.search.get("actual_state").value==-1){
  this.actualstate="";
  }else{
    this.actualstate=this.search.get("actual_state").value;
  }
  
if(this.search.get("plant_line").value==0){
  this.plantline="";
  }else{
    this.plantline=this.search.get("plant_line").value;
  }
  

    this.listasend.push( 
      new find(
        this.search.get("user").value,
        this.plantline,
        this.tubetypeaux,
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
        this.search.get("location_details").value,
        this.actualstate,
        this.search.get("tol1").value,
        this.search.get("tol2").value,
        this.search.get("tol3").value,


      ));
  

  
     // console.log(this.listasend)
  
      sessionStorage.setItem('formpatternsearch',JSON.stringify(this.listasend));

      this.router.navigate(['/searchresultofstandardtubes']); //we can send product object as route param





    
      }
    






}//termino clase