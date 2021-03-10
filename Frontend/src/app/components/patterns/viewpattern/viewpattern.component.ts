import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefectdeailtsComponent } from '../../modals/defectdeailts/defectdeailts.component';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { ModifypatternComponent } from '../../modals/modifypattern/modifypattern.component';
import { Globals } from 'src/app/global';
import { HttpClient, HttpHeaders} from '@angular/common/http';

class historytable {
  constructor(
    public pasillo?:number, 
    public cuerpo?:number,
    public nivel?:string,
    public casilla?:string,
    public linea?:string,
    public estado?:string,
    public fecha?:string,
    ) {
  }
}





class infopattern {
  constructor(
    public idLinea?:number, 
    public id?:number,
    public nroPasadas?:number,
    public nroMaxPasadas?:number,
    public longitud?:string,
    public diametro?:string,
    public espesor?:string,
    public acero?:string,
    public ciclo?:number,
    public colada?:string,
    public expediente?:string,
    public fechaAlta?:string,
    public tratamientoTermico?:string,
    public tipo?:string,
    public ultimapasada?:string,
    public idUbicacion?:number,
    public idPadre?:number,
    public codigo?:string,
    public grado?:string,
    public idPedido?:number,
    public idEstado?:number,
    public estado?:string,

    public pasillo?:string,
    public cuerpo?:string,
    public nivel?:string,
    public casilla?:string,

    public idMotivo?:number,
    public cliente?:string,
    public motivo?:string,
    public linea?:string,

    ) {
  }
}




class orderstable {
  constructor(public Letra?:string,public id?:number,public IdPedido?:number,public Descripcion?:string, public codigo?:string,public valor?:number ) {
  }
}







@Component({
  selector: 'app-viewpattern',
  templateUrl: './viewpattern.component.html',
  styleUrls: ['./viewpattern.component.css']
})
export class ViewpatternComponent implements OnInit {
  lista;
  code:string;
  length:number;
  cycle:number;
  tubetype:string;
  diam:string;
  steelcasting:string;
  client:string;
  thickness:string;
  record:string;

  listinfopattern:infopattern[]=[];
  pasillo:string;
  cuerpo:string;
  nivel:string;
  casilla:string;
  linea:string;
  estado:string;
  motivo:string;

  requiredorders:orderstable[]=[];

  historytable:historytable[]=[];

  
doc:boolean;
pdf:boolean;

vector;

  constructor( private modalService: NgbModal,private router: Router,private http: HttpClient,private httpClient: HttpClient,private globals: Globals) { }


  async ngOnInit() {
    this.requiredorders=[];

    this.lista= JSON.parse(sessionStorage.getItem('wantedpattern'));
//console.log(this.lista)


   // alert("aa")
    this.code=this.lista[0].codigo;
    this.length=this.lista[0].longitud;
    this.cycle=this.lista[0].ciclo;
    this.tubetype=this.lista[0].type;
    this.diam=this.lista[0].diametro;
    this.steelcasting=this.lista[0].colada;
    this.client=this.lista[0].cliente;
    this.thickness=this.lista[0].espesor;
    this.record=this.lista[0].expediente;

 //alert(this.lista[0].idPedido)

    var url1 = this.globals.baseUrl + '/Patrons/QryVerDefectosIntra/'+this.lista[0].idPedido;
    await this.httpClient.get(url1).toPromise().then(value =>{
this.vector=value;
       });


// llamo a lo que necesita la segunda tabla patronera,cuerpo, y demas.. pasando  "&TipoBusque &" (IsPedido en lo recibido en lista) , "&IdPedido ( id recibido en lista)
  
/*
strQuery = "QryVerDefectosIntra "&TipoBusque &", "&IdPedido

select idLinea, P.Id, p.NroPasadas, p.NroMaxPasadas, p.Longitud, p.Diametro, p.Espesor, p.Acero, p.Ciclo, 
	p.Colada, p.Expediente, p.FechaAlta, p.TratamientoTermico, t.Nombre as Tipo, p.UltimaPasada, p.IdUbicacion, 
	p.IdPadre, p.Codigo, p.Grado, p.IdPedido, p.IdEstado, E.Descripcion as Estado, p.pasillo, p.cuerpo, p.nivel, 
	p.casilla, p.idMotivo, p.cliente, m.descripcion as Motivo, l.Descripcion as Linea
	from patron p, estadospatron e, tipos t, motivosEstados m, PlantaLinea l
	where t.id = p.tipo 
	and m.idMotivo = isnull(p.idmotivo, 0)
	and l.id = p.idlinea
	and e.status = p.idestado 
  and p.Id = @id
  
*/

// si paso TipoBusque=0 y IdPedido=7864 obtengo la siguiente estructura

this.listinfopattern=this.vector;
/*
this.listinfopattern.push( 
  new infopattern(
    21,
    6609,
    0,
    0,
    "1450",
    "88,9",
    "18",
    "895",
    2705,
    "33506",
    "5/4223.02",
    "2008-11-28 07:33:35.000",
    "SI",
    "Ultrasonido (tubos de 1.5m para USL2)",
    "2008-11-28 07:33:35.000",
     null,
     null,
     "2I0753",
     "p110",
      5144,
      0,
      "Activo",
      null,
      null,
      null,
      null,
      0,
      "eni s.p.a",
      "NO APLICABLE",
      "Trefila / Lint",

  ));
*/

//console.log(this.listinfopattern)
  this.pasillo=this.listinfopattern[0].pasillo;
  this.cuerpo=this.listinfopattern[0].cuerpo;
  this.nivel=this.listinfopattern[0].nivel;
  this.casilla=this.listinfopattern[0].casilla;
  this.linea=this.listinfopattern[0].linea;
  this.estado=this.listinfopattern[0].estado;
  this.motivo=this.listinfopattern[0].motivo;


//////////////////////////////////////////////////////
this.requiredorders=[];


var url1 = this.globals.baseUrl + '/DefectosPedidos/getDefects/'+this.lista[0].idPedido;

await this.httpClient.get(url1).toPromise().then(value =>{
this.vector=value;
console.log(value)
this.vector.forEach(element => {
  if(this.vector!=null){
    this.requiredorders.push( new orderstable(element.letra,element.id,element.idPedido,element.descripcion,element.codigo,element.valor)); 
  }else{
    this.requiredorders.push( new orderstable("xxxx",66549,12784,"Oblicuo Izquierdo Interno","OI",2));
  }
  });
 });

/*
// aca me traigo la query siguiente
//  strSQL = "select Letra, id, IdPedido, Descripcion, codigo, valoresatributospedido.valor from defectospedido, tipodefecto, valoresatributospedido where DefectosPedido.IdTipoDefecto = TipoDefecto.IdTipoDefecto and valoresatributospedido.iddefecto = defectospedido.id and valoresatributospedido.idatributo=1 and IdPedido = "&IdPedido&" order by valoresatributospedido.valor" 
// pasando como dato "IdPedido = 12784" ( IdPedido recibido en lista)
var sql=2;

if(sql!=null){
  this.requiredorders.push( new orderstable("AC",66549,12784,"Oblicuo Izquierdo Interno","OI",2));
  this.requiredorders.push( new orderstable("COI",66549,12784,"Oblicuo Izquierdo Externo","OE",2));

}else{
  this.requiredorders.push( new orderstable("xxxx",66549,12784,"Oblicuo Izquierdo Interno","OI",2));
}
*/

//////////////////////////////////////////////////////
//alert(this.lista[0].id)
var url1 = this.globals.baseUrl + '/Patrons/qryTRKPatron/'+this.lista[0].id;
await this.httpClient.get(url1).toPromise().then(value =>{
this.vector=value;
   });




// debo llamar a la query siguiente pasandole "idPatron" ( id recibido en lista) 
/*
	StrQuery = "qryTRKPatron "&idPatron
*/
// recibire un json como este
this.historytable=this.vector;
/*
this.historytable.push( 
  new historytable(
    null,
    null,
    null,
    null,
    "Lint",
    "Activo",
    "2010-05-07 14:26:29.980",
  ));
*/
///////////////////////////////////////////////////////////////////////////////////////////////////
var corroborarcodigo=encodeURIComponent(this.code);//.replace(" ", '/%20/g'); 

// corroboro que exista el .doc y .pdf por si muestra o no el boton
/*
var vec=this.code.split(" ");
var corroborarcodigo="";
if(vec.length>0){
 for(var i=0;i<vec.length;i++){
   corroborarcodigo=corroborarcodigo+vec[i];
 }
}else{
  corroborarcodigo=this.code;
}*/

var a=this.http.get("../../../../assets/Certificados/"+corroborarcodigo.replace(/%20/g, ' ')+".doc").subscribe((data)=>{
},
err=>{
 // console.log(err.status)
if(err.status==200)
{
  this.doc=true;

}
else{
  this.doc=false;
}
    }
)


var b=this.http.get("../../../../assets/Certificados/"+corroborarcodigo.replace(/%20/g, ' ')+".pdf").subscribe((data)=>{
},
err=>{
  //console.log(err.status)
if(err.status==200)
{
  this.pdf=true;

}
else{
  this.pdf=false;
}
    }
)





  } //init






  back()
	{

    this.router.navigate(['/searchresultofstandardtubes']); //we can send product object as route param

  } //back()








//////////////////////////////////////////////////////////////////////////////////////

opendetails(id: number,codigo: string) {

  var j=0;
  
  

        // aca debo hacer una query select para buscar en la tabla "TipoAtributo" que id de tipo de atributo se trata de para poder volver hacer la siguiente query 
      
      this.requiredorders.forEach(element => {
  
  
  
        if(element.codigo==codigo){
  
    
          const modalRef = this.modalService.open(DefectdeailtsComponent);
          modalRef.componentInstance.id = element.id; //iddefecto
          modalRef.result.then((result) => {
          



/*
            if Request.Form("save") = 1 then
            if IdUsuario = "" then
              IdUsuario = "Sin registro"
            end If
        
            Dim qryVerificar
            Dim strVerificar
            Dim fCantidad
            Set qryVerificar = Server.CreateObject("AdoDB.RecordSet")
            strVerificar = "doChkCapacity "&Request.Form("idLinea")
            qryVerificar.Open strVerificar, cn
            fCantidad = CInt(qryVerificar("Cantidad"))
            qryVerificar.Close
            fShowError = ""
            If (fCantidad < 5) then
              Set rstSQLCer = Server.CreateObject("AdoDB.RecordSet")
              strSQLCer = "doUpdateDatosIntra '"&Request.Form("Pasillo")&"','"&Request.Form("Cuerpo")&"', '"&Request.Form("Nivel")&"','"&Request.Form("Casilla")&"', "&Request.Form("estado")&","&Request.Form("Motivo")&", "&Request.Form("idLinea")&","&id&",'"&idUsuario&"'"
              rstSQLCer.Open strSQLCer, cn
            Else
              fShowError = "Existen "&fCantidad&" tubos en la patronera selccionada, por favor verifique dicha patronera antes de ubicar"
            End If
            end if
*/






      //     alert(result);
    
    
    
            this.ngOnInit();
          }).catch((error) => {
            console.log(error);
            this.ngOnInit();
          });
    
        }
    j++;
      });
  
      
      
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    openmodelmodifypattern()
    {
  
      const modalRef = this.modalService.open(ModifypatternComponent, { windowClass: 'my-class'});
       modalRef.componentInstance.patronera = this.pasillo; //
       modalRef.componentInstance.cuerpo = this.cuerpo; //
       modalRef.componentInstance.nivel = this.nivel; //
       modalRef.componentInstance.casilla = this.casilla; //
       modalRef.componentInstance.plantalinea = this.linea; //
       modalRef.componentInstance.estado = this.estado; //
       modalRef.componentInstance.motivo = this.motivo; //
       modalRef.componentInstance.idPedido = this.lista[0].id; //

       

       modalRef.result.then((result) => {
  
  
         this.ngOnInit();
       }).catch((error) => {
  
  
  
        //   this.router.navigate(['redirect']);
  
  
  
         this.ngOnInit();
       });
  
    } //openmodifypattern
  


















}//termino clase
