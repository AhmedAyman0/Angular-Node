import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from '../models/user-info-model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display-user-data-form',
  templateUrl: './display-user-data-form.component.html',
  styleUrls: ['./display-user-data-form.component.css']
})
export class DisplayUserDataFormComponent implements OnInit {

  user: UserInfoModel = new UserInfoModel({
    guid: "D21ds12x",
    customerUid: "cust2dsa12dsa",
    firstName: "John",
    lastName: "Doe",
    email: "email@email.com",
    zipcode: 10283,
    password: "Idasn2x2#"
  })
  constructor(private arouter:ActivatedRoute,private http:HttpClient) { }

  ngOnInit() {
    this.arouter.params.subscribe(
     params=>{
       this.http.get('/api/v1/customer/'+params['id']).subscribe((resp:any)=>{
         this.user = new UserInfoModel(resp.customer);
       })
     }
    )
  }

}
