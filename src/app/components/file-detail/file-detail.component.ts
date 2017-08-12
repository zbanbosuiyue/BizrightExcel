import { Component, OnInit } from '@angular/core';

import {AuthMicrosoftGraphService} from "../../services/auth-microsoft-graph.service";
import {AppComponent} from "../../app.component";



@Component({
  selector: 'file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})

export class FileDetailComponent implements OnInit {
  fileId;
  sheets;
  selectedSheet;

  constructor(
    private authHelper: AuthMicrosoftGraphService,
    private appComponent: AppComponent,
  ) {
    appComponent.isLoading = true;
    this.fileId = authHelper.getSelectedFileId();
    console.log(this.fileId);
  }

  ngOnInit():void {
    this.authHelper.getWorksheets().then(res => {
      this.sheets = res.value;
      this.appComponent.isLoading = false;
    })
  }

  clickSheet(sheet){
    this.selectedSheet = sheet;
    this.authHelper.setSelectedSheetName(sheet.name);
  }
}
