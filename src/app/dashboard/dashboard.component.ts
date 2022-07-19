import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { NotesService } from '../services/notes.service';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { User } from '../user';
import { ChangePasswordComponent } from '../change-password/change-password.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private service:NotesService,private router:Router,public dialog: MatDialog,private authService:AuthserviceService) {
    
  }

  user:User = new User("","","","","");

  ngOnInit(): void {
    this.messages.userImage='assets/images/default.png';
    this.showUserImage();
  }
  events: string[] = [];
  opened: boolean | undefined;
  email:any=sessionStorage.getItem("email");
  userData:any;
  messages: any =  [{userImage:''}];
  imageSize:any;
 
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

  showUserImage(){
    this.messages.userImage='assets/images/default.png';
    let re=this.service.getUser(this.email);
    re.subscribe((data)=>{ 
      this.userData=data;
      this.messages.userImage=this.userData.userImage;
      this.imageSize=this.messages.userImage.length;
    });
    }
category1:any='';
    category(category:any){
      let re=this.service.categorization(this.email,category);
      re.subscribe((data)=>{ 
        console.log(data);
        this.userData=data;
    
      });
    }

    addProfileImage(){
      const hide:any =document.getElementById('addImagediv');
      hide.style.display='block';
      
    }

    msg:any;
    url:any;
    message1:any;

    selectFile1(event: any) { 
      if(!event.target.files[0] || event.target.files[0].length == 0) {
        this.msg = 'You must select an image';
        return;
      }
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.msg = "Only images are supported";
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.msg = "";
        this.url1 = reader.result; 
        
      }}
      url1:any
    sumbitImage1(){
      console.log("task Id is : "+this.url1);
      let re=this.service.setUserImage(this.email,this.url1);
      re.subscribe((data)=> this.message1=data);
      this.showUserImage();
      this.reloadCurrentRoute();
    }


    openDialog(){
      this.dialog.open(UploadImageComponent)
    }

    openDialogChangePassword(){
      this.dialog.open(ChangePasswordComponent)
    }

    logoutUser(){
      this.authService.logout()
      window.location.href='login'
    }

    doRoute(){
      this.router.navigate(['notes']);
      this.reloadCurrentRoute();
    }
    
}
