 import {Subject} from 'rxjs'
import { Activity } from "../shared/activity.model";

export class BucketListService{

    activityChanged = new Subject<Activity[]>()
    startedEditing = new Subject<number>()

   private activities: Activity[] = [
        new Activity("BumjeeJumping", 5),
        new Activity("CamelRide", 1)
      ]

    getActivities(){
        return this.activities.slice()  //slice added to get copy not the actual array as Objects and Arrays are reference types in JS
    }

    addActivity(activity:Activity){
        this.activities.push(activity)
        this.activityChanged.next(this.activities.slice())
    }
     
    addActivities(activities:Activity[]){

      this.activities.push(...activities)
      this.activityChanged.next(this.activities.slice())

    }

    getActivity(index:number){
      return this.activities[index]
    }

    updateActivity(index:number, newActivity:Activity){
      this.activities[index] = newActivity
      this.activityChanged.next(this.activities.slice()) 
    }

    deleteActivity(index:number){
      this.activities.splice(index,1)
      this.activityChanged.next(this.activities.slice()) 
    }
}