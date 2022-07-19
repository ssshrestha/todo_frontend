import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/task';
import { NotesService } from '../services/notes.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ImagetaskComponent } from '../imagetask/imagetask.component';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { DeleteDialogService } from '../services/delete-dialog.service';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';


export interface AllFruit1 {
  name: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {
centered = false;

todayDate:Date = new Date();
url:any="";
currentDate=new Date();
message:any;
success:any;
email=sessionStorage.getItem("email");
task1:Task=new Task(0,"","","","",new Date(),"");
message1:any;
priority:any;
priority_url:any;
label:string[] = [];

  constructor(private service:NotesService,private router:Router,public dialog: MatDialog,private toast:NgToastService
    ,private dialogService:DeleteDialogService,public datepipe: DatePipe) {  
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
      );
      this.filteredFruits1 = this.fruitCtrl1.valueChanges.pipe(
        startWith(null),
        map((fr: string | null) => (fr ? this._filter1(fr) : this.label)),
      );
    }

    separatorKeysCodes: number[] = [ENTER, COMMA];
    fruitCtrl = new FormControl('');
    fruitCtrl1 = new FormControl('');
    filteredFruits: Observable<string[]> | undefined;
    filteredFruits1: Observable<string[]> | undefined;
    fruits: string[] = [];
    allFruits: string[] = ['Home', 'work', 'Education', 'Personal','Health'];

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>=new Input;

add(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();
  if (value) {
    this.label.push(value);
  }
  event.chipInput!.clear();
  this.fruitCtrl.setValue(null);
  this.fruitCtrl1.setValue(null);
}

remove(fruit: string): void {
  const index = this.fruits.indexOf(fruit);
  if (index >= 0) {
    this.fruits.splice(index, 1);
  }}

message2:any;
selected(event: MatAutocompleteSelectedEvent,taskId:any): void {
  this.label.push('sss')
  this.label.push(event.option.viewValue);
  this.fruits.push(event.option.viewValue);
  this.allFruits.push(event.option.viewValue);
  console.log("value is : "+event.option.viewValue);
  let re=this.service.setTaskCategory(this.email,taskId,event.option.viewValue);
  re.subscribe((data)=> this.message2=data);
  this.fruitInput.nativeElement.value = '';
  this.fruitCtrl.setValue(null);
  this.fruitCtrl1.setValue(null);
  this.reloadCurrentRoute();
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
}

private _filter1(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.label;
}



  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  todayDate1:any;
  message3:any;
  ngOnInit(): void {
    this.showTasks();
    var currentDate1 =new Date();
    // console.log("date1 : "+this.currentDate);
    // console.log("date2 : "+currentDate1);
    // console.log("today date : "+this.myFunction(currentDate1));
    this.myFunction(this.currentDate);
    this.todayDate1= this.myFunction(this.currentDate);
    let re=this.service.archiveCompletedTask(this.email);
  re.subscribe((data)=> this.message3=data);

  }
  
  addTitle = new FormControl('', [Validators.required]);
  addDes = new FormControl('', [Validators.required]);


  userData:any;


 showUserImage(){
  let re=this.service.getUser(this.email);
  re.subscribe((data)=> this.userData=data);
  }

  addLabel(){
    const hide1:any= document.getElementById("addLabeldiv");
    hide1.style.display="block";
   }

   closeAddDiv(){
    const hide1:any= document.getElementById("addTaskForm");
    hide1.style.display="none";
   }


   openForm(){
    const hide1:any= document.getElementById("addTaskForm");
    hide1.style.display="block";
    // const hide2:any= document.getElementById("addTskBtn");
    // hide2.style.display="none";
    const hide3:any= document.getElementById("addtaskbtn");
    hide3.style.display="block";
    const hide4:any= document.getElementById("updatebtn");
    hide4.style.display="none";
    this.task1= new Task(0,"","","","",new Date(),"");
  }
  

showcard()
{
 const hide:any= document.getElementById("crd");
 hide.style.display="block";
}

submitData()
{
  event?.preventDefault();
  this.success="Task Not Saved error Occured"
  // console.log(this.task1.date.toLocaleDateString());
  if(this.addTitle.valid && this.addDes.valid){
  
  let re=this.service.addTask(this.email,this.task1);
  re.subscribe((data)=>
  {this.message=data;
    this.success='Task Saved Successfully';
  })

  this.task1=new Task(0,"","","","",new Date(),"");
}
else{alert("Empty values Not Allowed");}
  this.showTasks();
  // onclick="document.location.reload=(true)"
  // this.router.navigateByUrl('/dashboard/notes');
this.reloadCurrentRoute();
}


state:boolean=false;
showTasks()
{
  let re=this.service.getAlltasks(this.email);
  re.subscribe((data)=> 
  {
    this.message1=data
    // console.log(data);
  });
}

taskId:any;
addPhoto(taskId:any){
  // const hide:any= document.getElementById("addTaskdiv");
  // hide.style.display="block";
  this.taskId=taskId;
  console.log("category : "+this.message1);
  console.log("category : "+this.message1.priority);
  for(var i=0;i<this.message1.length;i++){
    console.log("category in for : "+this.message1[i].category);
  }
}

msg:any;
selectFile(event: any) { 
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
    // console.log(reader.result);
    this.url = reader.result; 
    this.task1.taskImage=this.url;
    // this.url_size=this.url.length;
  }
}
// {{task.taskId}}
sumbitImage(taskId:any){
  console.log("task Id is : "+taskId);
  let re=this.service.setTaskImage(this.email,taskId,this.task1.taskImage);
  re.subscribe((data)=> this.message1=data);
  this.showTasks();
  this.reloadCurrentRoute();
}

deleteImage(taskId:any){
  console.log("task Id is : "+taskId);
  let re=this.service.removeTaskImage(this.email,taskId);
  re.subscribe((data)=> this.message1=data);
  this.showTasks();
  this.reloadCurrentRoute();
  
}

deleteLabel(taskId:any){
  console.log("task Id is : "+taskId);
  let re=this.service.removeTaskCaegory(this.email,taskId);
  re.subscribe((data)=> this.message1=data);
  this.showTasks();
  this.reloadCurrentRoute();
}

taskId1:any;
updateUserTask(taskId:any,task:any){
  this.task1=task;
  this.taskId1=taskId;
  // const hide:any= document.getElementById("addTaskForm");
  // hide.style.display="block";
  const hide1:any= document.getElementById("updatebtn");
  hide1.style.display="block";
  // const hide2:any= document.getElementById("addtaskbtn");
  // hide2.style.display="none";
  const hide3:any= document.getElementById("titlediv");
  hide3.style.display="block";
  const hide4:any= document.getElementById("descriptiondiv");
  hide4.style.display="block";
  const hide5:any= document.getElementById("inputitlediv");
  hide5.style.display="none";
  this.taskId1=taskId;
}

updateUserTask1(){
  console.log("task Id is : "+this.taskId1);
  let re=this.service.updateTask(this.email,this.taskId1,this.task1);
  re.subscribe((data)=> this.message1=data);
  this.showTasks();
  this.reloadCurrentRoute();
}


deleteTasks(taskId:any)
{
  // let re=this.service.deleteTask(this.email,taskId);
  // re.subscribe((data)=> this.message1=data);
  // this.reloadCurrentRoute();
  // this.ngOnInit();
  // alert("Task Deleted");
//   if(this.state==true){
//  this.deleteTasks(taskId);
       this.dialogService.openConfirmDialog('Are you sure to delete this task?')
       .afterClosed().subscribe(res =>{
        console.log(res)
        if(res){
          let re=this.service.deleteTask(this.email,taskId);
          re.subscribe((data)=> this.message1=data);
          this.toast.success({detail:"Task Deleted", summary:"",duration:3000})
          this.reloadCurrentRoute();
            if(this.state==true){
            this.deleteTasks(taskId);}
        }
      });
}

archiveTasks(taskId:any)
{
  let re=this.service.archiveTask(this.email,taskId);
  re.subscribe((data)=> this.message1=data);
  this.reloadCurrentRoute();
  this.ngOnInit();
  this.toast.success({detail:"Task Archieved", summary:"",duration:3000})
  // alert("Task Archived");
  if(this.state==true){
 this.deleteTasks(taskId);
  }
}

high(priority:any,taskId:any){
  let re=this.service.setTaskPriority(this.email,taskId,priority);
  re.subscribe((data)=> this.message1=data);
  this.toast.success({detail:"High Priority Set", summary:"",duration:3000})
  this.reloadCurrentRoute();
}

medium(priority:any,taskId:any){
  let re=this.service.setTaskPriority(this.email,taskId,priority);
  re.subscribe((data)=> this.message1=data);
  this.toast.success({detail:"Medium Priority Set", summary:"",duration:3000})
  this.reloadCurrentRoute();
}

low(priority:any,taskId:any){
  let re=this.service.setTaskPriority(this.email,taskId,priority);
  re.subscribe((data)=> this.message1=data);
  this.toast.success({detail:"Low Priority Set", summary:"",duration:3000})
  this.reloadCurrentRoute();
}

home(label:any,taskId:any){
  let re=this.service.setTaskCategory(this.email,taskId,label);
  re.subscribe((data)=> this.message1=data);
  console.log("label : "+label);
  this.reloadCurrentRoute();
}

education(label:any,taskId:any){
  let re=this.service.setTaskCategory(this.email,taskId,label);
  re.subscribe((data)=> this.message1=data);
  this.reloadCurrentRoute();
}

work(label:any,taskId:any){
  let re=this.service.setTaskCategory(this.email,taskId,label);
  re.subscribe((data)=> this.message1=data);
  this.reloadCurrentRoute();
}




category1:any=''
category(category1:any){
  let re=this.service.categorization(this.email,category1);
  re.subscribe((data)=>{ 
    console.log(data);
    this.message1=data;

  });
}

taskByDates(){
  let re=this.service.sortTaskByDates(this.email);
  re.subscribe((data)=>{ 
    console.log(data);
    console.log(data);
    this.message1=data;

  });
}

datecheck:any;
  myFunction(date:Date){
    // date.getDate()
    // console.log(date);
    let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd');
    this.datecheck=latest_date;
    // console.log(latest_date);
   }

searchTaskByDates(date:Date){
  console.log(date);
  this.myFunction(date);
  console.log(this.myFunction(date));
  console.log(this.datecheck)

 console.log( date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate());
  let re=this.service.searchTaskByDates(this.email,this.datecheck);
  re.subscribe((data)=>{ 
    console.log(data);
    console.log(data);
    this.message1=data;

  });
}


openDialog(taskId:any){
  this.taskId=taskId;
  console.log(this.taskId);
  localStorage.setItem("setTaskId", taskId)
  this.dialog.open(ImagetaskComponent)
}
}
