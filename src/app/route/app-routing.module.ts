/**
 * Created by robert on 8/7/17.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {LoginComponent} from "../components/login/login.component";
import {FileComponent} from "../components/file/file.component";
import {FileDetailComponent} from "../components/file-detail/file-detail.component";
import {SheetDetailComponent} from "../components/sheet-detail/sheet-detail.component";


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'file', component: FileComponent},
  { path: 'file/:id', component: FileDetailComponent},
  { path: 'file/:id/sheet/:id', component: SheetDetailComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
