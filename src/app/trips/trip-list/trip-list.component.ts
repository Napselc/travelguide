import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import {Trip} from "../trip.model"
import { TripService } from '../trip.service';
@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit, OnDestroy{

 subscription:Subscription
  
  trips:Trip[] 

  constructor(private tripService: TripService,
              private router:Router,
              private route:ActivatedRoute) {

     }

  onNewTrip(){
    this.router.navigate(['new'], {relativeTo:this.route})

  }
   

  ngOnInit(): void {
    this.subscription=this.tripService.tripsChanged
    .subscribe(
      (trips:Trip[]) => {
        this.trips = trips
      }
    )
    this.trips = this.tripService.getTrips()
  }
 ngOnDestroy(): void {
     this.subscription.unsubscribe()
 }
}
