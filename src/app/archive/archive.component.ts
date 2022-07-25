import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ArchiveService } from '../services/archive.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  archiveData:any;
  centered = false;
  email:any=sessionStorage.getItem("email");

  constructor(private service:ArchiveService,private router:Router,private toast:NgToastService) { }

  ngOnInit(): void {
    this.showArchiveList()
    // console.log(this.archiveData);
    // console.log(this.showArchiveList());
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });}

    totalLength:any;
    page:number=1;
  showArchiveList(){
    let re=this.service.showArchive(this.email);
    re.subscribe((data:any)=>{ 
      this.archiveData=data;
      this.totalLength=data.length;
    });
  }

  unArchive(archiveId: any){
    let re=this.service.UnArchiveTask(archiveId);
    re.subscribe((data:any)=>{ 
      this.archiveData=data;
    });
    this.toast.success({detail:"Task Unarchieved", summary:"",duration:3000})
    this.reloadCurrentRoute();
  }

  deleteTask(archiveId: any){
    let re=this.service.deleteTask(archiveId);
    re.subscribe((data:any)=>{ 
      this.archiveData=data;
    });
    this.toast.success({detail:"Archieved Task Deleted", summary:"",duration:3000})
    this.reloadCurrentRoute();
  }

}
