import { Component } from '@angular/core';
import { AuthMicrosoftGraphService }  from '../../services/auth-microsoft-graph.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  access_token;

  constructor(
    private authHelper: AuthMicrosoftGraphService,
    private router: Router,
  ) {
    if (authHelper.getAccessToken()){
      if (authHelper.getAccessToken().length > 10 ){
        this.access_token = authHelper.getAccessToken();
      }
    }
  }

  login(): void {
    this.authHelper.login();
  }

  goFile(): void{
    this.router.navigate(['file']);
  }

}
