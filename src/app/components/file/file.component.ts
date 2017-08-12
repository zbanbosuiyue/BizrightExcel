import { Component, OnInit } from '@angular/core';
import { AuthMicrosoftGraphService } from '../../services/auth-microsoft-graph.service';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  selectedFile;
  files = [];

  constructor(
    private authHelper:AuthMicrosoftGraphService,
    private appComponent: AppComponent
  ) {
    appComponent.isLoading = true;
  }

  ngOnInit() {
    this.authHelper.getFiles().then((response) =>
    {
      this.appComponent.isLoading = false;
      this.files = response.value;
    })
  }

  clickWorkBook(file){
    this.selectedFile = file;
    console.log(file);
    this.authHelper.setSelectedFileId(file.id);
  }
}
