import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { Observable } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
//ngbootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormModalComponent } from './components/shared/form-modal/form-modal.component';
import {InfoModalComponent} from './components/shared/info-modal/info-modal.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Globals } from './global';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { UserService } from './components/shared/user/user-service.component';

import { LoginComponent } from './components/login/login.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './customRoute';
import { RedirectComponent } from './redirect/redirect.component';


import { NgSelectModule } from '@ng-select/ng-select';


import {MatGridListModule} from '@angular/material/grid-list';

import {MatSortModule} from '@angular/material/sort';


import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderformsComponent } from './components/forms/orderforms/orderforms.component';
import { NewdefectComponent } from './components/forms/newdefect/newdefect.component';
import { DefectdeailtsComponent } from './components/modals/defectdeailts/defectdeailts.component';
import { ConfirmationComponent } from './components/modals/confirmation/confirmation.component';
import { DeleteorderComponent } from './components/modals/deleteorder/deleteorder.component';
import { SearchstandardtubesComponent } from './components/forms/searchstandardtubes/searchstandardtubes.component';
import { SearchresultofstandardtubesComponent } from './components/patterns/searchresultofstandardtubes/searchresultofstandardtubes.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewpatternComponent } from './components/patterns/viewpattern/viewpattern.component';
import { ModifypatternComponent } from './components/modals/modifypattern/modifypattern.component';
import { SearchorderbytypeComponent } from './components/searchorderbytype/searchorderbytype.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    FormModalComponent,

    DynamicFormComponent,
    LoginComponent,
    RedirectComponent,

    InfoModalComponent,

    OrdersComponent,

    OrderformsComponent,

    NewdefectComponent,

    DefectdeailtsComponent,

    ConfirmationComponent,

    DeleteorderComponent,

    SearchstandardtubesComponent,

    SearchresultofstandardtubesComponent,

    ViewpatternComponent,

    ModifypatternComponent,

    SearchorderbytypeComponent,

 

 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
   // Observable,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    NgSelectModule,
    MatGridListModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSortModule,
    BrowserAnimationsModule

  ],
  providers: [Globals, 
              UserService,
             
              {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FormModalComponent,
    InfoModalComponent,
    DefectdeailtsComponent,
    ConfirmationComponent,
    DeleteorderComponent,
    ModifypatternComponent

  ]
})
export class AppModule { }
