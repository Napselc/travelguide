import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from '../shared/activity.model';
import { BucketListService } from './bucket-list.service';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit, OnDestroy {

 
  activities: Activity[] 
  private igChangedSub : Subscription
  
  constructor(private bucketListService: BucketListService) { }

  ngOnInit(): void {
  
      this.activities = this.bucketListService.getActivities()
      this.igChangedSub = this.bucketListService.activityChanged
      .subscribe(
        (activites:Activity[]) => {
          this.activities = activites
        }
      );
  
  }

  ngOnDestroy(): void {
      this.igChangedSub.unsubscribe()
  }
  onEditItem(index:number){
    this.bucketListService.startedEditing.next(index)

  }

 

}
