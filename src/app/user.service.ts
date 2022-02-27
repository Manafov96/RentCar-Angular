import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  tokenTimer: any;

  isAdmin = new Subject();
  authenticated = new BehaviorSubject(false);
  selectedCars = new Subject();
  path = 'assets/uploads/';

  constructor(private http: HttpClient, private router: Router) { }

  createUser(email: string, password: string) {
    const authData = {email: email, password: password};
    return this.http.post('/api/user/signup', authData);
  }

  loginUser(email: string, password: string) {
    const authData = {email: email, password: password};
    return this.http.post<{token: string, expiresIn: any, admin: any}>('/api/user/login', authData);
  }

  changeAdmin(data: any) {
    this.isAdmin.next(data);
  }

  setTimer(duration: any) {
    this.tokenTimer = setTimeout(() => {this.onLogout() }, duration * 1000);
  }

  saveuserData(token: string, expiration: Date, admin: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toString());
    localStorage.setItem('admin', admin);
  }

  onLogout() {
    this.authenticated.next(false);
    clearTimeout(this.tokenTimer);
    this.changeAdmin(0);
    localStorage.removeAll();
    this.router.navigate(['']);
  }

  getuserData() {
    const token = localStorage.getItem('token');
    const expiration =  localStorage.getItem('expiration');
    const admin = localStorage.getItem('admin');
    if (!token || !expiration) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expiration),
      admin: admin
    };
  }

  getCars(from: any, until: any) {
    const data = {from: from, until: until};
    return this.http.post('/api/admin/cars', data);
  }

  rentCar(id: any, from: any, until: any, fromDate: any, untilDate: any){
    const rentInfo = {
      id: id, 
      from: from,
      until: until,
      fromDate: fromDate, 
      untilDate: untilDate
    }
    return this.http.post('api/admin/rent', rentInfo); 
  }
}   
