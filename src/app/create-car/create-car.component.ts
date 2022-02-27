import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {

  selectedFile!: File;
  fd = new FormData();

  constructor(private http: HttpClient, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onCreate(form: NgForm) {
    const filename = this.selectedFile?.name;
    this.adminService.createCar(form.value.brand, form.value.model, form.value.power, form.value.seats, filename).subscribe(res => console.log(res));
    form.resetForm();
  }

  onFileSelected(event: any){
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('/api/admin/save-image', this.fd).subscribe(res => console.log(res));
  }

}
