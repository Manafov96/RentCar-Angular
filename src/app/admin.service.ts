import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  createCar(brand: string, model: string, power: string, seats: any, imgUrl: string) {
    const carData = {
      brand: brand,
      model: model,
      power: power,
      seats: seats,
      imgUrl: imgUrl
    }
    return this.http.post('/api/admin/create-car', carData);
  }

  getUsers() {
    return this.http.get('/api/admin/users');
  }

  deleteUser(email: string) {
    const data = { email: email };
    return this.http.post('/api/admin/delete-user', data);
  }

  makeAdmin(email: string) {
    const userData = { email: email };
    return this.http.post('/api/admin/admin-user', userData);
  }

  rentedCars() {
    return this.http.get('/api/admin/rented-cars');  
  }

  cancelRent(id: any, from: any, until: any) {
    const data = {id: id, from: from, until: until};
    return this.http.post('/api/admin/cancel-rent', data);
  }
}
