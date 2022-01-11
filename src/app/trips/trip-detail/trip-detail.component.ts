import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Trip} from "../trip.model"
import { TripService } from '../trip.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit {

  trip:Trip
  id:number

  constructor(private tripService:TripService,
              private route: ActivatedRoute,
              private router:Router) { 

  }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params) => {
        this.id = +params['id']
        this.trip = this.tripService.getTrip(this.id)

      }
    )
  }

  onAddToBucketList(){
  this.tripService.addActivityToBucketList(this.trip.activities)

  }

  onEditTrip(){
    
    this.router.navigate(['edit'], {relativeTo:this.route})

  }

  onTripDelete(){
    this.tripService.deleteTrip(this.id)
    this.router.navigate(['./trips'])
  }

}
