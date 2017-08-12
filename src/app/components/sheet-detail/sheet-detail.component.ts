import {Component, OnInit} from '@angular/core';
import {AuthMicrosoftGraphService} from "../../services/auth-microsoft-graph.service";
import {AppComponent} from "../../app.component";
import {Location} from '@angular/common';

@Component({
  selector: 'app-sheet-detail',
  templateUrl: './sheet-detail.component.html',
  styleUrls: ['./sheet-detail.component.css']
})
export class SheetDetailComponent implements OnInit {
  values;
  sheetName;
  fileId;

  data : any[];
  options: any;
  isReady;
  colHeaders;

  constructor(
    private authHelper: AuthMicrosoftGraphService,
    private appComponent: AppComponent,
    private location: Location
  ) {
    appComponent.isLoading = true;
    this.sheetName = authHelper.getSelectedSheetName();
    this.fileId = authHelper.getSelectedFileId();

    this.authHelper.getUsedRange().then(res => {
      console.log(res);
      this.values = res.text;

      this.data = this.values;

      this.options = {
        height: 1000,
        width: 1200,
        rowHeaders: true,
        colHeaders: true,
        stretchH: 'all',
        columnSorting: false,
        contextMenu: true
      };
      this.isReady = true;

      appComponent.isLoading = false;
    })



  }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

  onAfterCopy(event){
    console.log(event);
  }

  onBeforeCopy(event){
    console.log(event);
  }

  onAfterChange(event){
    var action = event[1];

    if (action == 'edit'){
      this.changeSingleCell(event);
    }
  }

  onAfterePaste($event){
    console.log($event);
  }

  onBeforePaste(event){
    console.log(event);
    var eventData = event[0];
    var rangeData = event[1];

    var startPoint = this.authHelper.convert2DToRange(rangeData[0].startRow, rangeData[0].startCol);
    var endPoint = this.authHelper.convert2DToRange(rangeData[0].endRow, rangeData[0].endCol);

    var range = startPoint+":"+endPoint;

    var data = {
      values: [],
    };

    data.values = eventData;

    var dataJSON = JSON.stringify(data);

    this.authHelper.updateSheetValues(range, dataJSON).then(res => {
      console.log(res);
    });
  }

  changeSingleCell(event){
    console.log(event);
    var eventData = event[0];
      if (eventData.length == 1) {
        var rangeData = eventData[0];
        var row_index = rangeData[0];
        var col_index = rangeData[1];
        var beforeChangeValue = rangeData[2];
        var afterChangeValue = rangeData[3];

        var range = this.authHelper.convert2DToRange(row_index, col_index);

        var data = {
          values: [],
        };

        data.values = [[afterChangeValue]];

        var dataJSON = JSON.stringify(data);
        console.log(dataJSON);

        this.authHelper.updateSheetValues(range, dataJSON).then(res => {
          console.log(res);
        });
      }
  }

}
