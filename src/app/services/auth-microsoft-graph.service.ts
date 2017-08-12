import { Injectable } from '@angular/core';
import { GlobalVariable }  from '../variables/global-variable';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http'

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthMicrosoftGraphService {

  private parseQueryString = function(url) {
    var params = {}, queryString = url.substring(1),
      regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
  }

  private params = this.parseQueryString(location.hash);

  constructor(private http: Http) {
    console.log(this.params);
    if (!this.getAccessToken()){
      if(this.params){
        this.setAccessToken(this.params['access_token']);
      }
    } else{
      if (this.getAccessToken().length < 10){
        if(this.params){
          this.setAccessToken(this.params['access_token']);
        }
      }
    }
  }


  login(){
    window.location.href = " https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=" + GlobalVariable.CLIENT_ID +
      "&&scope=openid%20profile%20User.ReadWrite%20User.ReadBasic.All%20Sites.ReadWrite.All%20Contacts.ReadWrite%20People.Read%20Notes.ReadWrite.All%20Tasks.ReadWrite%20Mail.ReadWrite%20Files.ReadWrite.All%20Calendars.ReadWrite&response_type=token";
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  patch(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.patch(url, data, {
      headers: headers
    });
  }

  getFiles(): Promise<any>{
    var url = "https://graph.microsoft.com/v1.0/me/drive/root/children";
    return this.get(url).toPromise()
      .then(res => res.json()).catch(err => this.handleErrorPromise(err, this));
  }

  getWorksheets(file_id?): Promise<any>{
    if (!file_id)
      file_id = this.getSelectedFileId();

    var url = GlobalVariable.EXCEL_BASE_URL + file_id +"/workbook/worksheets";
    return this.get(url).toPromise()
      .then(res => res.json()).catch(err => this.handleErrorPromise(err, this));
  }

  getExcelSession(file_id?): Promise<any>{
    var url = GlobalVariable.EXCEL_BASE_URL + file_id + "/workbook/createSession";
    return this.post(url, {"persistChanges" : true}).toPromise()
      .then(res => {
        this.setSessionId(res.json().id);
      })
      .catch(err => this.handleErrorPromise(err, this));
  }

  getUsedRange(file_id?, sheet_name?): Promise<any>{
    if(!file_id)
      file_id = this.getSelectedFileId();
    if(!sheet_name)
      sheet_name = this.getSelectedSheetName();
    var url = `${GlobalVariable.EXCEL_BASE_URL}${file_id}/workbook/worksheets('${sheet_name}')/usedRange`;

    return this.get(url).toPromise()
      .then(res => res.json()).catch(err => this.handleErrorPromise(err, this));
  }

  updateSheetValues(range, data, file_id?, sheet_name?): Promise<any>{
    if(!file_id)
      file_id = this.getSelectedFileId();
    if(!sheet_name)
      sheet_name = this.getSelectedSheetName();

    var url = `${GlobalVariable.EXCEL_BASE_URL}${file_id}/workbook/worksheets('${sheet_name}')/range(address='${range}')`;

    return this.patch(url, data).toPromise()
      .then(res => res.json()).catch(err => this.handleErrorPromise(err, this));
  }



  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + this.getAccessToken());
    headers.append('Content-Type', 'application/json');
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }
  private handleErrorObservable (error: Response | any, obj: AuthMicrosoftGraphService) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  private handleErrorPromise (error: Response | any, obj: AuthMicrosoftGraphService) {
    console.error(error.message || error);
    console.log(obj.getAccessToken());
    console.log(error);
    if (error.status == '401'){
      console.log(error);
      obj.setIsError(true);
      obj.setAccessToken(null);
      obj.login();
    }
    return Promise.reject(error.message || error);
  }

  getSelectedFileId(): string{
    return localStorage.getItem('selected_file_id');
  }

  setSelectedFileId(file_id){
    localStorage.setItem('selected_file_id', file_id);
  }

  getSelectedSheetName(): string{
    return localStorage.getItem('selected_sheet_name');
  }

  setSelectedSheetName(sheet_name){
    localStorage.setItem('selected_sheet_name', sheet_name);
  }

  getAccessToken():string{
    return localStorage.getItem('access_token');
  }

  setAccessToken(access_token){
    localStorage.setItem('access_token', access_token);
  }

  getSessionId():string{
    return localStorage.getItem('session_id');
  }

  setSessionId(session_id){
    localStorage.setItem('session_id', session_id);
  }

  getIsError(){
    return localStorage.getItem('is_error');
  }

  setIsError(is_error){
    localStorage.setItem('is_error', is_error);
  }

  convert2DToRange(row_index, col_index): string{
    row_index++;
    return String.fromCharCode(65+col_index) + row_index;
  }





}
