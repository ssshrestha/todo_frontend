import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  centered = false;
  constructor(private service:NotesService) { }

  ngOnInit(): void {
    this.todayTask();
  }
  email=sessionStorage.getItem("email");
  message:any;

  totalLength:any;
page:number=1;
 todayTask(){
  let re=this.service.todayTask(this.email);
  re.subscribe((data)=>{ 
    this.message=data;
    this.totalLength=data.length;
  });
  
}


}
