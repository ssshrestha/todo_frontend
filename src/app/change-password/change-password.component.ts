import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private service:RegisterService,private router:Router) { }
 
  ngOnInit(): void {
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });}

    centered = false;
  newPassword:any='';
  oldPassword:any='';
  message1:any;
  email:any=sessionStorage.getItem("email");
 
  password= new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9@*]{8,15}$")]);

 changePassword(){
  console.log("password is : "+this.newPassword,this.oldPassword);
   let re=this.service.updatePassword(this.newPassword,this.email,this.oldPassword);
   re.subscribe((data)=> {
     this.message1=data;
     console.log(data);
   });
  }


}
