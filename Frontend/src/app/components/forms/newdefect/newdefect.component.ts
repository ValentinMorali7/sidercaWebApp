import { Component, OnInit } from '@angular/core';
import { IfStmt } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefectdeailtsComponent } from '../../modals/defectdeailts/defectdeailts.component';
import { ConfirmationComponent } from '../../modals/confirmation/confirmation.component';
import { DeleteorderComponent } from '../../modals/deleteorder/deleteorder.component';
import { Globals } from 'src/app/global';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { Time } from '@angular/common';

class selects {
  constructor(public id?:number, public description?:string, public code?:string) {
  }
}


class dinamictable {
  constructor(public idDefectpo?:number,public IdAtributo?:number, public descripcion?:string, public tolerancia?:string, public unidad?:string, public value?:number, public th?:number, public tl?:number) {
  }
}



class atributosDefecto {
  constructor(public id?:number) {
  }
}


class orderstable {
  constructor(public Letra?:string,public id?:number,public IdPedido?:number,public Descripcion?:string, public codigo?:string,public valor?:number ) {
  }
}



class set {
  constructor(
    public IdDefecto?:string, 
    public IdAtributo?:string,
    public Valor?:number,
    public ToleranciaL?:number,
    public ToleranciaH?:number,

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
  selector: 'app-newdefect',
  templateUrl: './newdefect.component.html',
  styleUrls: ['./newdefect.component.css']
})
export class NewdefectComponent implements OnInit {
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

table:dinamictable[]=[];

atributos:atributosDefecto[]=[];

requiredorders:orderstable[]=[];

IdDefecto;

lista;

IdPedido;

idTipo;


iscreate:boolean;
ismodify:boolean;

error:boolean;

listadd:set={};

letraglobal;

UserOK;
EliminarOK;


listasend:next[]=[];
/////////////////////////////////////////////////////
  constructor(  private modalService: NgbModal,private router: Router, private globals: Globals, private httpClient: HttpClient) {

   }


//////////////////////////////////////////////////////////////////////////////////////

   async delete() {
  let headers = new HttpHeaders().set('Content-Type','application/json');

  ///////////////////////////////////////////////////////////////
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


if(this.UserOK && this.EliminarOK){

}else{
if(this.UserOK==false){
  alert("No se pudo borrar debido a que no es el usuario correcto")
  return false;
}
}

} // if no son nulos ni user ni idpedido

///////////////////////////////////////////////////////////////

          const modalRef = this.modalService.open(DeleteorderComponent);
         // modalRef.componentInstance.id = element.id; //iddefecto
         modalRef.result.then(async (result) => {
  
           if(result==3){
    alert("No se pudo borrar debido a que no es el usuario correcto")
          return false;
          }


              if(result==1){
                this.router.navigate(['/orderforms',"0"]); //we can send product object as route param              
              }
              if(result==2){
                this.router.navigate(['redirect']);
              
              }

            this.ngOnInit();


          }).catch(async (error) => {
        //    alert(error)
         //   alert(error);



    
              this.router.navigate(['redirect']);



            this.ngOnInit();
          });
    
    }
  


//////////////////////////////////////////////////////////////////////////////////////

   confirm() {


            const modalRef = this.modalService.open(ConfirmationComponent);
           // modalRef.componentInstance.id = element.id; //iddefecto
            modalRef.result.then(async (result) => {


              
if(result==3){
  alert("Confirmar el segundo tubo para terminar pedido");
  this.ngOnInit();
return false;
}

if(result==1){
  this.router.navigate(['/orderforms',"0"]); //we can send product object as route param
}

if(result==2){
  this.router.navigate(['redirect']);
}







             this.ngOnInit();
            }).catch( async (error) => {
    /*
 var idpedido=sessionStorage.getItem('IdPedido');  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  

 var recalque=sessionStorage.getItem('Recalque');  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  
 //console.log(recalque)
 //alert(idpedido)
    let headers = new HttpHeaders().set('Content-Type','application/json');

     
    if(idpedido!=null){
      var url1 = this.globals.baseUrl + '/Pedidos/updatestate/'+idpedido;
      await this.httpClient.post(url1, {headers: headers}).toPromise().then(value =>{
   //     this.IdDefecto =value;
      //this.vector=value;
      });
// update pedidos set IdEstado = 1 where Id = "&Session("IdPedido")
// actualizo tabla pedidos             
    }



     // alert(recalque)

      if(recalque!=""){
    //    alert("Se debe aceptar el segundo patro de tubo")
      this.IdPedido=  sessionStorage.getItem('IdPedido-b');  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  


        
      this.lista[0].pattern_code=  sessionStorage.getItem('Codigo-b');  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  
      
      console.log(this.lista[0].pattern_code);
      
      this.ngOnInit();
      return false;
      }
      
      */


      this.router.navigate(['redirect']);
      


              this.ngOnInit();
            });
      
    

        
      }
    


//////////////////////////////////////////////////////////////////////////////////////

  async opendetails(id: number,codigo: string,letra:string) {

var j=0;

//strQueryDefecto = strQueryDefecto + " insert into ValoresAtributosPedido (IdDefecto, IdAtributo, Valor, ToleranciaL, ToleranciaH) values (" +this.IdDefecto.toString()+ ","+element.id.toString()+","+ValorAtributo+","+ToleranciaL+","+ToleranciaH+")";



//alert(letra)
    //aca debo hacer una query select para buscar en la tabla "TipoAtributo" que id de tipo de atributo se trata de para poder volver hacer la siguiente query 


    this.requiredorders.forEach(element => {

      if(element.codigo==codigo && element.Letra==letra){
        const modalRef = this.modalService.open(DefectdeailtsComponent, { windowClass: 'my-class'});
        modalRef.componentInstance.id = element.id; //iddefecto
        modalRef.result.then((result) => {
         console.log(result);
        }).catch((error) => {
          console.log(error);
        });
  
      }

    });

    this.ngOnInit();
    
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async ngOnInit() {

    this.typesdefects=[];    
    this.table=[];
    
    this.atributos=[];
    
    this.requiredorders=[];
    

    var recalque=sessionStorage.getItem('Recalque');  //hago variable de session a el pedido por si voy y vengo queda guardado en la web  

if(recalque!=""){

  alert("Ha decidido crear un patron de recalque. Se deberán cargar los defectos de 2 tubos patrones. Una vez que termine con este tubo, haga clic en confirmar para comenzar con el próximo")
}



this.lista= JSON.parse(sessionStorage.getItem('lista'));
//alert(this.lista)

this.code=this.lista[0].pattern_code;

this.length=this.lista[0].length;
this.cycle=this.lista[0].cycle;
this.tubetype=this.lista[0].tubetype;
this.diam=this.lista[0].diam;
this.steelcasting=this.lista[0].steel_casting;
this.client=this.lista[0].client;
this.thickness=this.lista[0].thickness;
this.record=this.lista[0].record;

this.plantline=this.lista[0].plant_line;
this.degree=this.lista[0].degree;
this.steel=this.lista[0].steel;
this.heat_treatment=this.lista[0].heat_treatment;



var url1 = this.globals.baseUrl + '/TipoDefectos';

await this.httpClient.get(url1).toPromise().then(value =>{
    ///console.log(value);
    this.typesdefects=value;
   });
  // lleno selector tipos de efectos (select IdTipoDefecto 'Id', Descripcion from TipoDefecto)  esto falta traer las queries y hacer la logica de rellenado dependiendo lo que elijo
  this.selectedValue_td = 1 //pre selecciono
  //this.typesdefects.push( new selects(5,"Longitudal Interno","OI"));
  //this.typesdefects.push( new selects(6,"Oblicuo Izquierdo Externo","OE"));

  var url1 = this.globals.baseUrl + '/AtributosDefectos/geteffecttypeattributes/'+this.selectedValue_td;

  await this.httpClient.get(url1).toPromise().then(value =>{
this.vector=value;

this.vector.forEach(element => {
  this.table.push( new dinamictable(undefined,element.idAtributo,element.descripcion,element.tolerancia,element.unidad));
});
   });
  


 // select TipoAtributo.IdAtributo, TipoAtributo.Descripcion, Tolerancia.Descripcion 'Tolerancia', TipoAtributo.Unidad from AtributosDefecto, TipoAtributo, Tolerancia where Tolerancia.Id = TipoAtributo.Tolerancia and TipoAtributo.IdAtributo = AtributosDefecto.IdAtributo and IdTipoDefecto="&IdTipoDefecto
  // lleno la estrucutra dinamicatable que esto permite obtener una vez elegido el selector como sera la forma de la tabla dinamica y que parametros van a ir dentro 
  /*
  this.table.push( new dinamictable(undefined,1,"Posicion","%","mm"));
  this.table.push( new dinamictable(undefined,3,"Ancho máximo","maximo","mm"));
  this.table.push( new dinamictable(undefined,6,"Prof. nom.","%","%"));
  this.table.push( new dinamictable(undefined,10,"Long. máx.","maximo","mm"));
  this.table.push( new dinamictable(undefined,4,"Angulo [grados]","maximo","mm"));
*/

//defino la tabla segun llega de lo recebido anteriormente
  var j=0;

  this.table.forEach(element => {
    if(element.IdAtributo==6){
      this.table[j].value=5;
      this.table[j].th=15;
      this.table[j].tl=15;

    }

    if(element.IdAtributo==4){
      this.table[j].value=0;
    }

j++;
  });


/////////////////// cargo  cosas de la pagina de pedido creado o cargado


this.IdPedido=sessionStorage.getItem('IdPedido'); 
//console.log(this.IdPedido)
//alert(this.IdPedido)
// aca debo hacer una query: "strSQL = select espesor, IdTipo from pedidos where id ="&idPedido  pasandole el "idpedido" que viene de la pagina anterior
//devuelve dos cosas el espesor (que ya lo tengo por variable) y idTipo (indica el tipo de tubo) VIENE DE PAGINA ANTERIOR
var url1 = this.globals.baseUrl + '/Pedidos/'+this.IdPedido;

await this.httpClient.get(url1).toPromise().then(value =>{
  this.vector2=value;
  this.idTipo= this.vector2.idTipo;
 // console.log(this.idTipo)

   });



//this.idTipo= 12345;


// aca me traigo la query siguiente
//  strSQL = "select Letra, id, IdPedido, Descripcion, codigo, valoresatributospedido.valor from defectospedido, tipodefecto, valoresatributospedido where DefectosPedido.IdTipoDefecto = TipoDefecto.IdTipoDefecto and valoresatributospedido.iddefecto = defectospedido.id and valoresatributospedido.idatributo=1 and IdPedido = "&IdPedido&" order by valoresatributospedido.valor" 
// pasando como dato "IdPedido = 12784"

var url1 = this.globals.baseUrl + '/DefectosPedidos/getDefects/'+this.IdPedido;

await this.httpClient.get(url1).toPromise().then(value =>{
this.vector=value;
//console.log(this.vector)
this.vector.forEach(element => {
  if(this.vector!=null){
    this.requiredorders.push( new orderstable(element.letra,element.id,element.idPedido,element.descripcion,element.codigo,element.valor)); 
  }else{
    this.requiredorders.push( new orderstable("xxxx",66549,12784,"Oblicuo Izquierdo Interno","OI",2));
  }
  });
 });


/*

var sql=2;

if(sql!=null){
  this.requiredorders.push( new orderstable("AC",66549,12784,"Oblicuo Izquierdo Interno","OI",2));
  this.requiredorders.push( new orderstable("COI",66549,12784,"Oblicuo Izquierdo Externo","OE",2));

}else{
  this.requiredorders.push( new orderstable("xxxx",66549,12784,"Oblicuo Izquierdo Interno","OI",2));
}
*/

this.iscreate=true;
this.ismodify=false;


//requiredorders:atributosDefecto[]=[];

  }//termino init


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


 async ActualizaAtributos(id) { 
    this.table=[];

    this.iscreate=true;
    this.ismodify=false;
    this.selectedValue_td = id;
//parent.Atributos.document.location=""attrdefecto.asp?IdPedid =    "&Request.QueryString("IdPedido")&"&IdTipoDefecto=""+defectologia.options[defectologia.selectedIndex].value;  (paso esto ultimo no se para que)
 

// cargo cosas necesarias al cambio el selector que es la query de abajo "rstAtributosDefectos" necesita el dato: "IdTipoDefecto" del selector

/*
 if Request.QueryString("IdTipoDefecto") <> "" then
    IdTipoDefecto = Request.QueryString("IdTipoDefecto")
  else 
    IdTipoDefecto = "-1"
  end if

  IdPedido = Session("IdPedido")'Request.QueryString("IdPedido")

	dim qryEspesor
	set qryEspesor = Server.CreateObject("AdoDB.RecordSet")
	strSQL = "select espesor, IdTipo from pedidos where id ="&idPedido
	qryEspesor.Open strSQL, cn
	
	Espesor = qryEspesor("espesor")
	idTipo  = qryEspesor("idTipo")
	
  dim rstAtributosDefectos   
  Set rstAtributosDefectos = Server.CreateObject("AdoDB.RecordSet")
  strSQL = "select TipoAtributo.IdAtributo, TipoAtributo.Descripcion, Tolerancia.Descripcion 'Tolerancia', TipoAtributo.Unidad from AtributosDefecto, TipoAtributo, Tolerancia where Tolerancia.Id = TipoAtributo.Tolerancia and TipoAtributo.IdAtributo = AtributosDefecto.IdAtributo and IdTipoDefecto="&IdTipoDefecto
  rstAtributosDefectos.Open strSQL, cn

*/

var url1 = this.globals.baseUrl + '/AtributosDefectos/geteffecttypeattributes/'+id;

await this.httpClient.get(url1).toPromise().then(value =>{
this.vector=value;

this.vector.forEach(element => {
this.table.push( new dinamictable(undefined,element.idAtributo,element.descripcion,element.tolerancia,element.unidad));
});
 });


//defino la tabla segun llega de lo recebido anteriormente
var j=0;

this.table.forEach(element => {
  if(element.IdAtributo==6){
    this.table[j].value=5;
    this.table[j].th=15;
    this.table[j].tl=15;

  }

  if(element.IdAtributo==4){
    this.table[j].value=0;
  }

j++;
});


  //alert("falta esta funcion paso esto a la pantalla attrdefecto  : &Request.QueryString('IdPedido')&&IdTipoDefecto=''+defectologia.options[defectologia.selectedIndex].value;")
} 

////////////////////////////////////////////////

verify() { 
  //parent.Atributos.document.location=""attrdefecto.asp?IdPedid =    "&Request.QueryString("IdPedido")&"&IdTipoDefecto=""+defectologia.options[defectologia.selectedIndex].value;  (paso esto ultimo no se para que)
   

  //this.tablevalues.push( new dinamictable(atributo,"Posicion","%","mm"));

  

  }

  //////////////////////////////////////////////////

 CorregirProfundidad(Espesor, Porcentaje)
  {
      var Aux = 0;

      if(this.idTipo != 12)  //idTipo es el tipo de tubo 
      {
        Aux = (parseInt(Espesor) * Porcentaje)/100; 
        if (Aux < 0.3) {
          Aux = (30/parseInt(Espesor));
          Aux = Math.round(Aux * 1001);
          Aux = (Aux/1000);
        }
        else {
          Aux = Porcentaje;
        }

     //   console.log(Aux)
        return Aux;

      }else{
  			return Porcentaje;
      }


  }  
//////////////////////////////////////////
 async ProcesarDefecto(event,elegido) { 
   
  //parent.Atributos.document.location=""attrdefecto.asp?IdPedid =    "&Request.QueryString("IdPedido")&"&IdTipoDefecto=""+defectologia.options[defectologia.selectedIndex].value;  (paso esto ultimo no se para que)
  //console.log(document.getElementById("Posicion").innerText)
  var j=0;
  this.error=true;
//console.log(this.table)

for (var i = 0; i < this.table.length; ++i){

  if(this.table[i].value==undefined){
    alert("No se debe dejar ningún atributo vacío")
    this.error=false;
    break;
      }
}


  if(!this.error){
  //  console.log("aa")
    return false;
      }
     // console.log("bb")


 await this.table.forEach(element => {

    if(element.IdAtributo==6){
//////////////////////////////////////////
     if (element.value != undefined) {

      if (element.value > 99){
        alert("La profundidad no puede ser mayor que el 99%");
        this.table[j].value= undefined;
        this.error=false;
        return false;
      }

      if (element.value <0){
        alert("La profundidad no puede ser mayor que el 0%");
        this.table[j].value= undefined;
        this.error=false;
        return false;
      }

         if (element.value != this.CorregirProfundidad(this.lista[0].thickness, element.value)){

          this.table[j].value= this.CorregirProfundidad(this.lista[0].thickness, element.value);

          element.value = this.CorregirProfundidad(this.lista[0].thickness, element.value);

         if(element.value==Infinity){
          this.error=false;
         }

          alert('La profundidad pedida no puede ser realizada, se corrige a '+element.value);
          return false;
        }
        }else{
          alert('Rellenar el campo Profundidad');
          return false;
        }
/////////////////////////////
if (element.tl != undefined) {


  if (element.tl > 99) {
    alert("La tolerancia L no puede ser mayor que 99%");
    this.error=false;
    this.table[j].tl= undefined;
    return false;
    }

    if (element.tl < 0) {
      alert("La tolerancia L no puede ser mayor que 0%");
      this.error=false;
      this.table[j].tl= undefined;
      return false;
      }
  

    }else{
      alert('Rellenar el campo Tolerancia L');
      return false;
    }

/////////////////////////////
if (element.th != undefined) {


  if (element.th > 99) {
    alert("La tolerancia H no puede ser mayor que 99%");
    this.error=false;
    this.table[j].th= undefined;
    return false;
    }

    if (element.th < 0) {
      alert("La tolerancia H no puede ser mayor que 0%");
      this.error=false;
      this.table[j].th= undefined;
      return false;
      }
  

    }else{
      alert('Rellenar el campo Tolerancia H');
      return false;
    }


    }// element.IdAtributo==6

/////////////////////////////////////////

    if(element.IdAtributo==2){  // falta hacer porque en la db no esta implementado
/*
      //////////////////////////////////////////
      if (element.value+parseFloat(atributos.attr2.value) > <%=Session("Longitud")%>) 
      {
      alert("La longitud no puede exceder el tubo.\nPuede cambiar la longitud del defecto o ubicarlo en una nueva posici�n.");
      atributos.attr2.value= "";
      } 
      if (parseFloat(atributos.attr2.value) > 100) {
      alert("No tiene sentido crear un defecto con una longitud mayor que 100 mm");
      atributos.attr2.value= "";
      }
      */
          }// element.IdAtributo==2
      
/////////////////////////////////////////

if(element.IdAtributo==4){  // falta hacer porque en la db no esta implementado
  
  if (element.value!=undefined) {

  if (element.value > 359) {
    alert("Los angulos van de 0 a 359 grados.");
    this.error=false;
    this.table[j].value= undefined;
    return false;
    }
    if (element.value < 0) {
      alert("Los angulos van de 0 a 359 grados.");
      this.error=false;
      this.table[j].value= undefined;
      return false;
      }
    }else{
      alert('Rellenar el campo Grados');
      return false;
    }


    }// element.IdAtributo==2
        
/////////////////////////////////////////

if(element.IdAtributo==3){  // falta hacer porque en la db no esta implementado
  
  if (element.value!=undefined) {

  if (element.value > 100) {
    alert("No tiene sentido crear un defecto con un ancho mayor que 100 mm");
    this.error=false;
    this.table[j].value= undefined;
    return false;
    }
    if (element.value < 0) {
      alert("No tiene sentido crear un defecto con un ancho menor que 0 mm");
      this.error=false;
      this.table[j].value= undefined;
      return false;
      }
    }else{
      alert('Rellenar el campo Ancho máximo');
      return false;
    }


    }// element.IdAtributo==2



    
j++;

  });//termino foreach table 

////////////////////////////////////////////////////////////////////////////////////



let headers = new HttpHeaders().set('Content-Type','application/json');

if(!this.error){
   // console.log("aa")
    return false;
      }
    
//console.log(  this.selectedValue_td)
//console.log(  this.IdPedido)

if(event==0){

var url1 = this.globals.baseUrl + '/DefectosPedidos/SetDefect/'+this.IdPedido+"/"+this.selectedValue_td;
await this.httpClient.post(url1, {headers: headers}).toPromise().then(value =>{
  this.IdDefecto =value;
//this.vector=value;
});
}else{

  var url1 = this.globals.baseUrl + '/DefectosPedidos/getdefectsbyLetter/'+this.IdPedido+"/"+this.letraglobal;

  await this.httpClient.get(url1).toPromise().then(value =>{
  this.vector4=value;
  //console.log(  this.vector4)
  this.IdDefecto =this.vector4[0].id;
   });

}


/* aca le envio al stored los parametros "IdPedido", "IdTipoDefecto" y "adParamOutput"(salida del stored) al STORED= InsertaDefecto para que cree [DefectosPedido] en la db
*/
// sale esta variable que es el ID del efecto generado
//IDDefecto = paramIdDefecto.Value
//this.IdDefecto =66540;


var url1 = this.globals.baseUrl + '/AtributosDefectos/getattributesbyid/'+this.selectedValue_td;
await this.httpClient.get(url1).toPromise().then(value =>{
  this.vector3=value;
//this.vector=value;
});

/*
strQueryAtributos = "select IdAtributo 'Id' from AtributosDefecto where IdTipoDefecto = "&IdTipoDefecto
rstCargaDefecto.Open strQueryAtributos, cn
rstCargaDefecto.MoveFirst 
*/


if(event!=0){
//console.log(this.IdDefecto)
//console.log(this.vector3)

}
//console.log(this.IdDefecto)
//console.log(this.vector3)
j=0;


for(j=0;j<this.vector3.length;j++){

 var ValorAtributo = this.table[j].value;//viene desde la web tengo que traerlo
 //console.log(ValorAtributo)
 var IdAtributo=this.vector3[j].id;


if(event==0){ //si es nuevo

if(this.vector3[j].id==6 ){
  var ToleranciaL = this.table[j].tl;//viene desde la web tengo que traerlo
  var ToleranciaH = this.table[j].th;//viene desde la web tengo que traerlo

  this.listadd={IdDefecto:this.IdDefecto, IdAtributo: IdAtributo, Valor:ValorAtributo, 
    ToleranciaL: ToleranciaL, ToleranciaH: ToleranciaH
  }

  
  var url1 = this.globals.baseUrl + '/ValoresAtributos/setValuesAttributesOrder?pedidosaux='+ JSON.stringify(this.listadd);
  await this.httpClient.post(url1, {headers: headers}).subscribe(
    data  => {
    }, 
    error  => {
    }
    );
// pedir
//  strQueryDefecto = strQueryDefecto + " insert into ValoresAtributosPedido (IdDefecto, IdAtributo, Valor, ToleranciaL, ToleranciaH) values (" +this.IdDefecto.toString()+ ","+element.id.toString()+","+ValorAtributo+","+ToleranciaL+","+ToleranciaH+")";
}else{
 
  if(IdAtributo!=6 && this.IdDefecto !=null && ValorAtributo!=undefined){

  this.listadd={IdDefecto:this.IdDefecto, IdAtributo: IdAtributo, Valor:ValorAtributo, 
    ToleranciaL: 0, ToleranciaH: 0
  }

  var url1 = this.globals.baseUrl + '/ValoresAtributos/setValuesAttributesOrder?pedidosaux='+ JSON.stringify(this.listadd);
  await this.httpClient.post(url1, {headers: headers}).subscribe(
    data  => {
    }, 
    error  => {
    }
    );
  }
// pedir
// strQueryDefecto = strQueryDefecto + " insert into ValoresAtributosPedido (IdDefecto, IdAtributo, Valor, ToleranciaL, ToleranciaH) values (" +this.IdDefecto.toString()+ ","+element.id.toString()+","+ValorAtributo+",0,0)";
}




}else{ //si debo actualizar



  if(this.vector3[j].id==6 ){
    var ToleranciaL = this.table[j].tl;//viene desde la web tengo que traerlo
    var ToleranciaH = this.table[j].th;//viene desde la web tengo que traerlo
  

    this.listadd={IdDefecto:this.IdDefecto, IdAtributo: IdAtributo, Valor:ValorAtributo, 
      ToleranciaL: ToleranciaL, ToleranciaH: ToleranciaH
    }
    
    var url1 = this.globals.baseUrl + '/ValoresAtributos/updateValuesAttributesOrder?pedidosaux='+ JSON.stringify(this.listadd);
    await this.httpClient.post(url1, {headers: headers}).subscribe(
      data  => {
      }, 
      error  => {
      }
      );


    
  // strQueryDefecto = strQueryDefecto & " update ValoresAtributosPedido set Valor="&ValorAtributo&", ToleranciaL="&ToleranciaL&", ToleranciaH="&ToleranciaH &" where IdDefecto = "&Request.Form("idDefecto")&" and IdAtributo ="&rstCargaDefecto("Id")&"; " & vbCrLf
  }else{

    if(IdAtributo!=6 && this.IdDefecto !=null && ValorAtributo!=undefined){
    this.listadd={IdDefecto:this.IdDefecto, IdAtributo: IdAtributo, Valor:ValorAtributo, 
      ToleranciaL: 0, ToleranciaH: 0
    }
  
    var url1 = this.globals.baseUrl + '/ValoresAtributos/updateValuesAttributesOrder?pedidosaux='+ JSON.stringify(this.listadd);
    await this.httpClient.post(url1, {headers: headers}).subscribe(
      data  => {
      }, 
      error  => {
      }
      );
 // strQueryDefecto = strQueryDefecto & " update ValoresAtributosPedido set Valor="&ValorAtributo&", ToleranciaL= 0, ToleranciaH= 0 where IdDefecto = "&Request.Form("idDefecto")&" and IdAtributo ="&rstCargaDefecto("Id")&"; " & vbCrLf
    }
    
  }
  


  this.iscreate=true;
  this.ismodify=false;


} //else si dedo actualizar

}//forrrrrrr



      

//////////////////////////////////////////////////////////////////////////////


this.ngOnInit();

  }// procesardefecto() 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
  modificarDefecto(codigo,letra,tipodefectdescr)
	{
    this.table=[];
this.letraglobal=letra;

    this.iscreate=false;
    this.ismodify=true;

  //  console.log(this.requiredorders)
//alert(letra)
//alert(codigo)

    this.requiredorders.forEach(async element => {

      if(element.codigo==codigo && element.Letra==letra ){
        
   //  alert(element.id)
  // var url1 = this.globals.baseUrl + '/AtributosDefectos/geteffecttypeattributes/'+this.selectedValue_td;

    var url1 = this.globals.baseUrl + '/TipoAtributos/getValuesAttributesOrder/'+element.id;
      await this.httpClient.get(url1).toPromise().then(value =>{
      this.vector=value;
    });
        



    var url1 = this.globals.baseUrl + '/TipoAtributos/getDescriptionAttributes/'+element.id;
      await this.httpClient.get(url1).toPromise().then(value =>{
      this.vector2=value;
    });

  //  console.log(this.vector2)


  this.typesdefects.forEach( element => {
    if(element.descripcion==tipodefectdescr){ //si es nuevo
      this.selectedValue_td=element.idTipoDefecto;
      return false;
    }
  });


  var url1 = this.globals.baseUrl + '/AtributosDefectos/getattributesbyid/'+this.selectedValue_td;
  await this.httpClient.get(url1).toPromise().then(value =>{
    this.vector3=value;
  //this.vector=value;
  });
  //console.log(this.vector)
///console.log(this.vector)
//console.log(this.vector2)
var j=0;

 this.vector3.forEach(async element2 => {

  for(j=0;j<this.vector.length;j++){
 // await this.vector.forEach( element => {


    if(this.vector[j].idAtributo==element2.id){
  this.vector[j].valor=this.vector[j].valor.replace(",",".");
  this.table.push( new dinamictable(this.vector[j].idDefecto,this.vector[j].idAtributo,this.vector2[j].descripcion,"",this.vector2[j].unidad,this.vector[j].valor,this.vector[j].toleranciaH,this.vector[j].toleranciaL));
  return false;
  }

  //});
  }

j++;
});

//alert(this.IdPedido)



      /*
//
/*  devuelve todo los datos pasando idDefecto
SELECT [idDefecto]
      ,[IdAtributo]
      ,[Valor]
      ,[ToleranciaL]
      ,[ToleranciaH]
  FROM [patrones].[dbo].[ValoresAtributosPedido]
  where idDefecto=66550
*/

/* devuelve atributos pasando idDefecto
select Descripcion, Valor, Unidad from TipoAtributo, ValoresAtributosPedido where (ValoresAtributosPedido.IdAtributo = TipoAtributo.IdAtributo) and (ValoresAtributosPedido.IdDefecto = 66550)
*/


/*
class dinamictable {
  constructor(public IdDefectpo?:number,public IdAtributo?:number, public Descripcion?:string, public Tolerancia?:string, public Unidad?:string, public value?:number, public th?:number, public tl?:number) {
  }
}
*/
  // lleno la estrucutra dinamicatable que esto permite obtener una vez elegido el selector como sera la forma de la tabla dinamica y que parametros van a ir dentro 
  /*this.table.push( new dinamictable(66550,1,"Posicion","","mm",2,0,0));
  this.table.push( new dinamictable(66550,3,"Ancho máximo","","mm",2,0,0));
  this.table.push( new dinamictable(66550,4,"Angulo.","","%",0,0,0));
  this.table.push( new dinamictable(66550,6,"Prof. nom.","","mm",5,15,15));
  this.table.push( new dinamictable(66550,10,"Long. máx.","","mm",2,0,0));
*/
      }

    });



  } //modificarDefecto()

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


 async eliminarDefecto(codigo,letra,tipodefectdescr,id)
	{

    //alert(id)

 await   this.requiredorders.forEach(async element => {

      if(element.codigo==codigo && element.Letra==letra ){
     //   alert(id)

      //  alert(element.id)=idDefecto

      var url1 = this.globals.baseUrl + '/ValoresAtributos/deleteValuesAttributesOrder/'+id;
      await this.httpClient.get(url1).toPromise().then(value =>{
      this.vector2=value;
    });



// query para eliminar tablas de defectos pasando iddefecto 
/*
          querystr = "delete from ValoresAtributosPedido where IdDefecto = "&IdDefecto
          cn.Execute querystr
          querystr = "delete from DefectosPedido where Id= "&IdDefecto
          cn.Execute querystr
  */
      }
    });

    this.ngOnInit();


  } //modificarDefecto()

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


 back()
	{



    this.router.navigate(['/orderforms',"1"]); //we can send product object as route param




  } //back()

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////// 






}//termina component

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


