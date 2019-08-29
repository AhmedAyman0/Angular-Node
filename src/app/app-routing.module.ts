import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputUserDataFormComponent } from './input-user-data-form/input-user-data-form.component';
import { DisplayUserDataFormComponent } from './display-user-data-form/display-user-data-form.component';


const routes: Routes = [
  { path: '', component: InputUserDataFormComponent },
  { path: 'user/:id', component: DisplayUserDataFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
