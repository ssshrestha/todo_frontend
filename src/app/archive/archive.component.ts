import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArchiveService } from '../services/archive.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  archiveData:any;
  centered = false;
  constructor(private service:ArchiveService,private router:Router) { }

  ngOnInit(): void {
    // this.showArchiveList();
    console.log(this.archiveData);
    console.log(this.showArchiveList());
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });}

  showArchiveList(){
    let re=this.service.showArchive();
    re.subscribe((data:any)=>{ 
      // console.log("inside fn"+data);
      this.archiveData=data;
    });
   
  }

  unArchive(archiveId: any){
    let re=this.service.UnArchiveTask(archiveId);
    re.subscribe((data:any)=>{ 
      // console.log("inside fn"+data);
      this.archiveData=data;
    });
    this.reloadCurrentRoute();
  }

  deleteTask(archiveId: any){
    let re=this.service.deleteTask(archiveId);
    re.subscribe((data:any)=>{ 
      // console.log("inside fn"+data);
      this.archiveData=data;
    });
    this.reloadCurrentRoute();
  }

}
