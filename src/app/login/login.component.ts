import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials={
    email:'',
    password:''
  }
  
  constructor(private authService:AuthserviceService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
  }

  onSubmit(item:any){
    console.table(item);
    sessionStorage.setItem("email",this.credentials.email)
    console.table(sessionStorage.getItem("email"));
    if(this.credentials.email!='' && this.credentials.password!=''){
      console.log("Submit form to server");
      this.authService.generateTokenUsingLogin(this.credentials).subscribe(
        (Response:any)=>{
          console.log(Response.token);
          this.authService.loginUserToken(Response.token);
          window.location.href="/dashboard"
        },error=>{
          if (error.status == 404) {
            window.alert('Invalid Password or Email.');
          }
        }
      )
    }
  }

}
