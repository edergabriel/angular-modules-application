import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';

export interface Character {
  name: string;
  image: string;
  description: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  myList: Character[]
  confirmList: Character[] = [];

  constructor(private httpClient: HttpClient) {
    this.getMyList()
  }

  getMyList() {
    this.httpClient.get<Character[]>("assets/data.json")
    .subscribe(list =>{
     this.myList = list;
    })
 }

 drop(event: CdkDragDrop<Character[]>) {
   if (event.previousContainer === event.container) {
     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
   } else {

     transferArrayItem(event.previousContainer.data,
       event.container.data,
       event.previousIndex,
       event.currentIndex);
   }
 }
  

}
