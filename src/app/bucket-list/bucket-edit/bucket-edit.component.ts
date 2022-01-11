import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/shared/activity.model';
import { BucketListService } from '../bucket-list.service';

@Component({
  selector: 'app-bucket-edit',
  templateUrl: './bucket-edit.component.html',
  styleUrls: ['./bucket-edit.component.css']
})
export class BucketEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form : NgForm
  subscription:Subscription
  editMode = false
  editedItemIndex:number
  editedItem:Activity
 
  constructor(private bucketListService:BucketListService) { }

  ngOnInit(): void {

    this.subscription = this.bucketListService.startedEditing
    .subscribe(
      (index:number) => {
        this.editMode = true
        this.editedItemIndex = index
        this.editedItem = this.bucketListService.getActivity(index)
        this.form.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    )

  }

  onSubmit(form:NgForm){

    const value = form.value
    const newActitvity = new Activity(value.name,value.amount)
    if(this.editMode){

      this.bucketListService.updateActivity(this.editedItemIndex,newActitvity)

    }else{
    this.bucketListService.addActivity(newActitvity)
    }

    this.editMode=false
    this.form.reset()

  }

  onClear(){
    this.form.reset()
    this.editMode=false
  }

  onDelete(){
    this.bucketListService.deleteActivity(this.editedItemIndex)
    this.onClear()
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
