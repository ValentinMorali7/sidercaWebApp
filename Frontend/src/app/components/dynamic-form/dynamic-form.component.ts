import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormData } from '../shared/interfaces/form-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/app/global';
import { UserService } from '../shared/user/user-service.component';


export interface type{
  id:string;
  text:string;
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input()formData: FormData[];
  form: FormGroup;
  formDataR: FormData[];
  v: boolean = false;
  disableButton: boolean = false;
  success: boolean = false;

  constructor( private httpClient: HttpClient,private globals: Globals, private userService: UserService,  ) {}

/** Setting up our form **/
  ngOnInit() {
    const formGroup = {};

    this.formData.forEach(formControl => {
      console.log(formControl.inputLabel);

        formGroup[formControl.controlName] = new FormControl('');

    });

    this.form = new FormGroup(formGroup);

  }

  async objChanged(event: any){

    if(event == "Estado"){
      var value = this.form.get(event).value;
      var pool = this.form.get("Pool").value;
      if(value != "-1" && value != -1)
      {
        this.formData = await this.httpClient.get<FormData[]>(this.globals.baseUrl + '/PoolAction/GetNext/'+pool+'/'+value).toPromise();
        const formGroup = {};
        this.formData.forEach(formControl => {

            formGroup[formControl.controlName] = new FormControl('');

        });

        this.form = new FormGroup(formGroup);
        this.disableButton = false;
      }
      else{
        this.disableButton = true;
      }
  }

  }

  setValue(name: any, val: any){
    this.form.get(name).setValue(val,{onlySelf:true, emitEvent:true, emitModelToViewChange:true, emitViewToModelChange:true});
     
  }

  submitForm() {
    this.v = false;
    this.success = false;
    var valid:boolean = false;
    let dataF:type[] = [];
    var user = this.userService.getUserLoggedIn();
    dataF.push({id: "USER", text: user.identification})
    this.formData.forEach(formControl => {
      let a = "";
      if(formControl.inputLabel != 'STATUS_TIME'){
        a = this.form.get(formControl.controlName).value;
      }
      else{
        a = "00:00";
      }
      let b = formControl.controlName;
      console.error(formControl.inputLabel);
      //if(formControl.inputLabel != 'STATUS_TIME'){
        dataF.push({id: b, text: a});

        console.log(a, b);
        if(a == "" || a === null && formControl.inputLabel != 'STATUS_TIME')
        {
          valid = true;
          
        }
     // }

    });

    if(valid){
      this.v = true;
      return false;
    }

    var a = JSON.stringify(dataF);
    console.log('Debug - Datos a enviar:',a);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    //alert(this.globals.baseUrl +'/PoolAction/Send');
     this.httpClient.post(this.globals.baseUrl +'/poolaction/post?value='+ JSON.stringify(dataF), {headers: headers})
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
    


    return true;
   }

  generate(){
    const formGroup = {};

    this.formData.forEach(formControl => {

        formGroup[formControl.controlName] = new FormControl('');

    });

    this.form = new FormGroup(formGroup);

    

  }

}