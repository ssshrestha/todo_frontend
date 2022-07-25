import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { RegisterService } from '../register/register.service';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private service:RegisterService,private router:Router,private toast:NgToastService,private authService:AuthserviceService) { }
 
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
status:any;
 changePassword(){
  // console.log("password is : "+this.newPassword,this.oldPassword);
   let re=this.service.updatePassword(this.newPassword,this.email,this.oldPassword);
   re.subscribe((data)=> {
     this.message1=data;
    if(data==false){
      this.toast.error({detail:"Password Not Changed", summary:"Old Password Is Incorrect",duration:5000})
    }
    else if(data==true){
      this.toast.success({detail:"Password Changed", summary:"Please Re-Login",duration:3000})
      this.authService.logout()
    this.router.navigate(["login"])
    }
   });
  }

}
