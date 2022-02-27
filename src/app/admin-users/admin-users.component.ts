import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  displayedColumns = ['email', 'isAdmin', 'edit'];
  dataSource = new MatTableDataSource();
  users: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table!: MatTable<any>;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(res => {
      const ELEMENT_DATA: any = [];
      this.users = res;
      this.users.forEach((user: { email: any; isAdmin: any; }) => {
        const email = user.email;
        const isAdmin  = user.isAdmin;
        ELEMENT_DATA.push({
          email: email,
          isAdmin: isAdmin
        });
        this.dataSource.data = ELEMENT_DATA;
        this.dataSource.paginator = this.paginator;
        console.log(ELEMENT_DATA);
      });
    });
  }

  onDelete(element: any) {
    this.adminService.deleteUser(element.email).subscribe(res => {
      const ELEMENT_DATA: any = [];
      this.users = res;
      this.users.forEach((user: { email: any; isAdmin: any; }) => {
        const email = user.email;
        const isAdmin  = user.isAdmin;
        ELEMENT_DATA.push({
          email: email,
          isAdmin: isAdmin
        });
        this.dataSource.data = ELEMENT_DATA;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  onAdmin(element: any) {
    this.adminService.makeAdmin(element.email).subscribe(res => {
      const ELEMENT_DATA: any = [];
      this.users = res;
      this.users.forEach((user: { email: any; isAdmin: any; }) => {
        const email = user.email;
        const isAdmin  = user.isAdmin;
        ELEMENT_DATA.push({
          email: email,
          isAdmin: isAdmin
        });
        this.dataSource.data = ELEMENT_DATA;
        this.dataSource.paginator = this.paginator;
      });
    }); 
  }

}
