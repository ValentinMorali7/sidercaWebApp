import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { Globals } from 'src/app/global';
import { HttpClient, HttpHeaders} from '@angular/common/http';

export interface PeriodicElement {
  isPedido: number;
  id: number;
  descripcion: string;
  nroPasadas: number;
  nroMaxPasadas: number;
  longitud: string;
  diametro: string;
  espesor: string;
  acero: string;
  ciclo: string;
  colada: string;
  expediente: string;
  fechaAlta: string;
  idTipo: number;
  tratamientoTermico: string;
  tipo: string;
  ultimapasada: string;
  idUbicacion: number;
  idPadre: number;
  codigo: string;
  grado: string;
  idPedido: number;
  idEstado: number;
  estado: string;
  ubicacion: string;
  requisitos: string;
  cliente: string;
usos: string;

}

class pattern {
  constructor(
    public isPedido?:number, 
    public id?:number,
    public descripcion?:string,
    public nroPasadas?:number,
    public nroMaxPasadas?:number,
    public longitud?:string,
    public diametro?:string,
    public espesor?:string,
    public acero?:string,
    public ciclo?:number,
    public colada?:string,
    public expediente?:string,
    public fechaAlta?:number,
    public idTipo?:number,
    public tratamientoTermico?:string,
    public type?:string,
    public ultimapasada?:string,
    public idUbicacion?:number,
    public idPadre?:number,
    public codigo?:string,
    public grado?:string,
    public idPedido?:number,
    public idEstado?:number,
    public estado?:string,
    public ubicacion?:string,
    public requisitos?:string,
    public cliente?:string,
    public usos?:string,

    ) {
  }
}


var ELEMENT_DATA: PeriodicElement[] = [
  {isPedido: 0, id: 7532, descripcion: 'Activo', nroPasadas: 0,nroMaxPasadas: 0 ,longitud: '6000' , diametro: '0', espesor: '0',acero: 'DEMO',
  ciclo: '0',colada: '0',expediente: '',fechaAlta: '2010-03-16 16:05:08.247',idTipo: 1,tratamientoTermico: 'DEMO', tipo:'Calibración de equipos EMI',
  ultimapasada: '2010-03-16 16:05:08.247',idUbicacion: null,idPadre: 0,codigo: 'CI 139',grado: '',idPedido: null, idEstado:0,
  estado: 'Activo',ubicacion: null,requisitos: '',cliente: null,usos:''
},
{isPedido: 0, id: 7864, descripcion: 'Activo', nroPasadas: 0,nroMaxPasadas: 0 ,longitud: '6000' , diametro: '0', espesor: '0',acero: 'DEMO',
ciclo: '0',colada: '0',expediente: '',fechaAlta: '2010-04-07 13:11:19.567',idTipo: 1,tratamientoTermico: 'DEMO', tipo:'Calibración de equipos EMI',
ultimapasada: '2010-04-07 13:11:19.567',idUbicacion: null,idPadre: 0,codigo: 'N/A',grado: '',idPedido: 6609, idEstado:0,
estado: 'Activo',ubicacion: null,requisitos: '',cliente: null,usos:''
},
];


@Component({
  selector: 'app-searchresultofstandardtubes',
  templateUrl: './searchresultofstandardtubes.component.html',
  styleUrls: ['./searchresultofstandardtubes.component.css']
})
export class SearchresultofstandardtubesComponent implements OnInit {
  listaaux;

  displayedColumns: string[] = ['cliente', 'diametro', 'espesor', 'tipo', 'codigo', 'ciclo', 'acero', 'grado', 'tratamientoTermico', 'estado', 'ubicacion', 'requisitos', 'usos', 'ultimapasada'];
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

  constructor(private router: Router,private httpClient: HttpClient,private globals: Globals) {
    this.sortedData = this.dataSource.slice();

   }

  async ngOnInit() {




    this.listaaux= JSON.parse(sessionStorage.getItem('formpatternsearch'));

    console.log( this.listaaux)
  
  
  if(this.listaaux[0].diam!="" && this.listaaux[0].tol1!=undefined){
  this.Diametro1 = this.listaaux[0].diam*(1-(this.listaaux[0].tol1/100))
  this.Diametro2 = this.listaaux[0].diam*(1+(this.listaaux[0].tol1/100))
  }else{
  this.Diametro1 = "";
  this.Diametro2 = "";
  }
  
  ///////////
  console.log( this.listaaux[0].tol3)
  console.log( this.listaaux[0].length)
  
  if(this.listaaux[0].length!="" && this.listaaux[0].tol3!=undefined){
    this.Longitud1 = this.listaaux[0].length*(1-(this.listaaux[0].tol3/100));
    this.Longitud2 = this.listaaux[0].length*(1+(this.listaaux[0].tol3/100));
  }else{
  this.Longitud1 = "";
  this.Longitud2 = "";
  }
  
  ///////////
  
  if(this.listaaux[0].thickness!="" && this.listaaux[0].tol2!=undefined){
  this.Espesor1 = this.listaaux[0].thickness*(1-(this.listaaux[0].tol2/100))
  this.Espesor2 = this.listaaux[0].thickness*(1+(this.listaaux[0].tol2/100))
  }else{
  this.Espesor1 = "";
  this.Espesor2 = "";
  }




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
 this.strQuery="select 0 as IsPedido,Patron.Id, estadospatron.Descripcion 'Descripcion', NroPasadas, ISNULL(NroMaxPasadas, 0) AS NroMaxPasadas, Longitud, Diametro, Espesor, Acero, Ciclo, Colada, Expediente, FechaAlta, Tipo 'IdTipo', TratamientoTermico, tipos.Nombre 'Tipo', UltimaPasada, IdUbicacion, IdPadre, Codigo, Grado, IdPedido, IdEstado, EstadosPatron.Descripcion 'Estado', Pasillo+Cuerpo+Nivel+Casilla as ubicacion, dbo.GetRequisito(patron.id) as requisito, Cliente from patron, estadospatron, tipos where tipos.id = patron.tipo and estadospatron.status = patron.idestado and patron.codigo <> '0'";





if(this.listaaux[0].client!=""){ //seteo filtro por query predeterminado
  this.strQuery=this.strQuery+ " and Cliente LIKE '%" + this.listaaux[0].client+"%'";
}


if(this.listaaux[0].actual_state!=""){
/*
	if pedido then
		strQuery = strQuery & " and status in (5, 6, 7, 8, 9, 1)"
	else
		strQuery = strQuery & " and patron.idestado = "&EstadoPatron
	end if
*/
this.strQuery = this.strQuery + " and patron.idestado = "+this.listaaux[0].actual_state;
}


if(this.listaaux[0].pattern_code!=""){
  this.strQuery = this.strQuery + " and Codigo LIKE '"+this.listaaux[0].pattern_code+"%'";
  }

if(this.listaaux[0].tubetype!=""){
/*
   if Pedido then
    strQuery = strQuery & " and idTipo = "&Tipo
   else
    strQuery = strQuery & " and Tipo = "&Tipo
   end if
*/
this.strQuery = this.strQuery + " and Tipo = "+this.listaaux[0].tubetype;
  }

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


if(this.Longitud1!="" && this.Longitud2!=""){
  this.strQuery = this.strQuery +" and longitud between "+this.Longitud1+" and "+this.Longitud2;
  }


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

        


/*
        if (pedido) then
        ' Si se buscan pedidos, estos son los atributos espec�ficos del pedido
        if (fechapedido <> "") then
          strQuery = strQuery & " and fechapedido = "&fechapedido
        end if
    
        if (fechaesperado <> "") then
          strQuery = strQuery & " and fechaesperado = "&fechaesperado
        end if
    
        if (entregado <> "") then
          strQuery = strQuery & " and entregado = "&entregado
        end if
    
        if (prioridad <> "") then
          strQuery = strQuery & " and prioridad = "&prioridad
        end if
    
        if (secuencia <> "") then
          strQuery = strQuery & " and secuencia = "&secuencia
        end if
        
        if (Ubicacion <> "") then
          strQuery = strQuery & " and Ubicacion = "&Ubicacion
        end if
        
        if (UbicacionLinea <> "") then
          strQuery = strQuery & " and Linea = "&UbicacionLinea
        end if
        
        if (UbicacionDetalle <> "") then 
          strQuery = strQuery & " and Ubicacion like '%"&UbicacionDetalle&"%'"
        end if    
      else
        ' Si en cambio se buscan patrones, estos son los atributos de los patrones
        if (FechaAlta <> "") then
          strQuery = strQuery & " and FechaAlta = "&FechaAlta
        end if
        
        if (UltmoUso <> "") then
          strQuery = strQuery & " and UltmoUso = "&UltmoUso
        end if
        
        if (NroPasadas <> "") then
          strQuery = strQuery & " and NroPasadas = "&NroPasadas
        end if
        
        if (NroMaxPasadas <> "") then
          strQuery = strQuery & " and NroMaxPasadas = "&NroMaxPasadas
        end if
        
        if (Ubicacion <> "") then
          strQuery = strQuery & " and Ubicacion = "&Ubicacion
        end if
        
        if (UbicacionLinea <> "") then
          strQuery = strQuery & " and idlinea = "&UbicacionLinea
        end if
        
        if (UbicacionDetalle <> "") then 
          strQuery = strQuery & " and Ubicacion like '%"&UbicacionDetalle&"%'"
        end if
      end if

*/

  

/*
if (orden <> "") then
	strQuery = strQuery & " order by "&orden
 else
	strQuery = strQuery & " order by Diametro, espesor"
 end if
*/


var UbicacionLinea=this.listaaux[0].plant_line;

if(UbicacionLinea!=""){
  this.strQuery = this.strQuery +" and idlinea = "+UbicacionLinea;
  }

if(this.listaaux[0].location_details!=""){
  this.strQuery = this.strQuery +" and Ubicacion like '%"+this.listaaux[0].location_details+"%'";
  }

  
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


var url1 = this.globals.baseUrl + '/Patrons/getPatternsByFilter?strQuery='+btoa(this.strQuery);
await this.httpClient.get(url1).toPromise().then(value =>{
    this.vector=value;
    this.dataSource=this.vector;
   });

   console.log(this.dataSource)


   for(var i=0;i<this.dataSource.length;i++){

    this.dataSource[i].usos= this.dataSource[i].nroPasadas+" / "+ this.dataSource[i].nroMaxPasadas;
  }











   //encodeURI(this.strQuery).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/%(?:7C|60|5E)/g, unescape).replace(/%20/g,"-")
// resultado:
/*
  select 0 as IsPedido,Patron.Id, estadospatron.Descripcion 'Descripcion', NroPasadas, ISNULL(NroMaxPasadas, 0) AS NroMaxPasadas, 
  Longitud, Diametro, Espesor, Acero, Ciclo, Colada, Expediente, FechaAlta, Tipo 'IdTipo', TratamientoTermico, tipos.Nombre 'Tipo', 
  UltimaPasada, IdUbicacion, IdPadre, Codigo, Grado, IdPedido, IdEstado, EstadosPatron.Descripcion 'Estado', Pasillo+Cuerpo+Nivel+Casilla as ubicacion,
   dbo.GetRequisito(patron.id) as requisito, Cliente from patron, estadospatron, tipos where tipos.id = patron.tipo and estadospatron.status = patron.idestado and patron.codigo <> '0' 
  and Cliente LIKE '%2%' and patron.idestado = 0 and Codigo LIKE '2%' and Tipo = 1 and
   longitud between 2 and 2 and diametro between 2 and 2 and espesor between 2 and 2 and ciclo = 2
    and colada = 2 and Expediente = '2' and Acero = '2' and Grado = '2' and TratamientoTermico = '2' 
  and idlinea = 1 and Ubicacion like '%2%' order by Diametro, espesor
*/













  }//init

  
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
        case 'tt': return this.compare(a.tratamientoTermico, b.tratamientoTermico, isAsc);
        case 'estado': return this.compare(a.estado, b.estado, isAsc);

        case 'ubicacion': return this.compare(a.ubicacion, b.ubicacion, isAsc);
        case 'requisitos': return this.compare(a.requisitos, b.requisitos, isAsc);
        case 'usos': return this.compare(a.usos, b.usos, isAsc);
        case 'ultimapasada': return this.compare(a.ultimapasada, b.ultimapasada, isAsc);



        default: return 0;
      }
    });
  }

   compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  

//////////////////////////////////////////

  
  selecciono(event) {
    console.log(event)

    this.listsend.push( 
      new pattern(
        event.IsPedido,
        event.id,
        event.descripcion,
        event.nroPasadas,
        event.nroMaxPasadas,
        event.longitud,
        event.diametro,
        event.espesor,
        event.acero,
        event.ciclo,
        event.colada,
        event.expediente,
        event.fechaAlta,
        event.idTipo,
        event.tratamientoTermico,
        event.type,
        event.ultimapasada,
        event.idUbicacion,
        event.idpadre,
        event.codigo,
        event.grado,
        event.idPedido,
        event.idEstado,
        event.estado,
        event.ubicacion,
        event.requisito,
        event.cliente,
        event.usos
      ));

      console.log(this.listsend)
  
      sessionStorage.setItem('wantedpattern',JSON.stringify(this.listsend));

    this.router.navigate(['/viewpattern']); //we can send product object as route param







      }











}//termino clase
