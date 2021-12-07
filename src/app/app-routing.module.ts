import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as socket from 'socket.io-client';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
