import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { NgbModule }  from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from "./route/app-routing.module";

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FileComponent } from './components/file/file.component';
import { FileDetailComponent } from './components/file-detail/file-detail.component'
import {AuthMicrosoftGraphService} from "./services/auth-microsoft-graph.service";
import { SheetDetailComponent } from './components/sheet-detail/sheet-detail.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    FileComponent,
    FileDetailComponent,
    SheetDetailComponent,
  ],
  providers: [AuthMicrosoftGraphService, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
