import { Injectable } from '@angular/core';
import { Http ,Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';




import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

 
export class User {
  id: string;
  name: string;
  email:string;

 
  constructor(id: string,name: string, email: string,public http: Http) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
 
@Injectable()
export class AuthService {
  currentUser: User;
  public base_path: string;

   constructor(public http: Http) {
   this.base_path = "http://localhost:3037";  
   }

 
  public login(credentials) {

  

    if (credentials.username  == "" || credentials.password =="") {
      return Observable.throw("Please insert credentials");
    } else {

     
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.base_path+"/api/login",
       {username: credentials.username ,password: credentials.password}, options)
                    .map(res => res.json());




    }
  }


  public checkResetPasswordToken(token) {



    if (token  == "") {
      return Observable.throw("token missing");
    } else {

     
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.base_path+"/api/reset-page-access",
       {token: token}, options)
                    .map(res => res.json());


    }
  }

  public resetpassword(credentials,token){
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.patch(this.base_path+"/api/do-reset-password",
       {new_password:credentials.passwords.new_password,token:token}, options)
                    .map(res => res.json());
  }

  public forgotpassword(credentials) {

   

    if (credentials.email  == "") {
      return Observable.throw("Please insert credentials");
    } else {

     
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.base_path+"/api/forgotpassword",
       {email: credentials.email}, options)
                    .map(res => res.json());




    }
  }
 
  public register(credentials) {
    if (credentials.data.email === null || credentials.data.password === null) {
      return Observable.throw("Please insert credentials.data");
    } else {
      // At this point store the credentials.data to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}