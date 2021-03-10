import { Component, OnInit , Input } from '@angular/core';
import { Globals } from 'src/app/global';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';




class dinamictable {
  constructor(public IdAtributo?:number, public Descripcion?:string, public Tolerancia?:string, public Unidad?:string, public value?:number, public th?:number, public tl?:number) {
  }
}

class res {
  constructor(public Descripcion?:string, public value?:number, public Unidad?:string) {
  }
}

@Component({
  selector: 'app-defectdeailts',
  templateUrl: './defectdeailts.component.html',
  styleUrls: ['./defectdeailts.component.css']
})
export class DefectdeailtsComponent implements OnInit {
  @Input() id: number;
  table:dinamictable[]=[];
  result:res[]=[];
  vector;
  vector2;

  constructor( public infoModal: NgbActiveModal, private globals: Globals, private httpClient: HttpClient) { }

  async ngOnInit() {

    var url1 = this.globals.baseUrl + '/TipoAtributos/getValuesAttributesOrder/'+this.id;
    await this.httpClient.get(url1).toPromise().then(value =>{
    this.vector=value;
  });
      



  var url1 = this.globals.baseUrl + '/TipoAtributos/getDescriptionAttributes/'+this.id;
    await this.httpClient.get(url1).toPromise().then(value =>{
    this.vector2=value;
  });



console.log(this.vector)
console.log(this.vector2)
var j=0;
this.vector.forEach(element => {
element.valor=element.valor.replace(",",".");
this.result.push( new res(this.vector2[j].descripcion,element.valor,this.vector2[j].unidad));
j++;
});


/*
  // lleno la estrucutra dinamicatable que esto permite obtener una vez elegido el selector como sera la forma de la tabla dinamica y que parametros van a ir dentro 
  this.result.push( new res("Posicion",2,"mm"));
  this.result.push( new res("Ancho máximo",2,"mm"));
  this.result.push( new res("Angulo",0,"grados"));
  this.result.push( new res("Prof. nom.",5,"%"));
  this.result.push( new res("Long. máx.",2,"mm"));
*/
  }//init

}
