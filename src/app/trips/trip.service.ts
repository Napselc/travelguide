import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { BucketListService } from "../bucket-list/bucket-list.service";
import { Activity } from "../shared/activity.model";
import { Trip } from "./trip.model";

@Injectable() 
export class TripService{

    tripsChanged = new Subject<Trip[]>()
    
//     private trips: Trip[] = [
//         new Trip("Atlantis", 
//         "Dubai",  

// "https://cdn0.scrvt.com/86f1f1e2d836ca377960c1753403d83d/00574c51b50355d2/83251d7004fd/v/a8ac7c9f50a1/shutterstock_1291548640.jpg",
//  [
//      new Activity("Dates Dinner",3),
//      new Activity("Aquarium Tour", 5)
//  ]
// ),

// new Trip("Northern Lights", 
//         "Netherlands",  

// "https://www.kiwi.com/stories/wp-content/uploads/2021/10/best-places-northern-lights-thingvellir-reykjavik-iceland-featured.jpg",
//  [
//      new Activity("Igloo",1),
//      new Activity("Watch Station", 4)
//  ]
// )

// ]
private trips: Trip[] = []

constructor(private bucketListService:BucketListService){}
 
      getTrips(){
          return this.trips.slice()  //slice added to get copy not the actual array as Objects and Arrays are reference types in JS
      }

      setTrips(trips:Trip[]){
        this.trips = trips
        this.tripsChanged.next(this.trips.slice())
      }

      addActivityToBucketList(activities:Activity[]){

        this.bucketListService.addActivities(activities)

      }

      getTrip(index:number){
          return this.trips[index]

      }

      addTrip(trip:Trip){
          this.trips.push(trip)
          this.tripsChanged.next(this.trips.slice())

      }

      updateTrip(index:number, newTrip:Trip){
        this.trips[index] = newTrip
        this.tripsChanged.next(this.trips.slice())

      }

      deleteTrip(index:number){
        this.trips.splice(index,1)
        this.tripsChanged.next(this.trips.slice())
      }
}