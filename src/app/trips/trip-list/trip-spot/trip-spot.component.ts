import { Component, OnInit, Input} from '@angular/core';
import {Trip} from '../../trip.model'

@Component({
  selector: 'app-trip-spot',
  templateUrl: './trip-spot.component.html',
  styleUrls: ['./trip-spot.component.css']
})
export class TripSpotComponent implements OnInit {

  @Input() trip:Trip
  @Input() index:number
 
  ngOnInit(): void {
  }

}
