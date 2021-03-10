import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
//import { LoginComponent } from './components/login/login.component';
import { OrderformsComponent } from './components/forms/orderforms/orderforms.component';

import { NewdefectComponent } from './components/forms/newdefect/newdefect.component';

import { SearchstandardtubesComponent } from './components/forms/searchstandardtubes/searchstandardtubes.component';

import { SearchresultofstandardtubesComponent } from './components/patterns/searchresultofstandardtubes/searchresultofstandardtubes.component';
import { ViewpatternComponent } from './components/patterns/viewpattern/viewpattern.component';
import { SearchorderbytypeComponent } from './components/searchorderbytype/searchorderbytype.component';

export let browserRefresh = false;
const routes: Routes = [
  { path: 'orders', component: OrdersComponent , },  
  { path: 'orderforms/:id', component: OrderformsComponent , },  
  { path: 'newdefect', component: NewdefectComponent , },  
  { path: 'searchstandardtubes', component: SearchstandardtubesComponent , },  
  { path: 'searchresultofstandardtubes', component: SearchresultofstandardtubesComponent , },  
  { path: 'viewpattern', component: ViewpatternComponent , },  
  { path: 'searchorderbytype/:id', component: SearchorderbytypeComponent , },  

  { path: '**', pathMatch: 'full', redirectTo: 'orders', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


