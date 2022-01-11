import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Trip } from '../trip.model';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit {
  id:number
  editMode = false
  tripForm : FormGroup
  constructor(private route:ActivatedRoute,
    private tripService:TripService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params) => {
        this.id = +params['id']
        this.editMode  = params['id'] !=null
        this.initForm()
        }
    )
  }

  

  get controls() { // a getter!
    return (<FormArray>this.tripForm.get('activities')).controls;
  }

  onAddActivity(){
    (<FormArray>this.tripForm.get('activities')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null, 
          [Validators.required, 
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route})
  }

  onDeleteActivity(index:number){
    (<FormArray>this.tripForm.get('activities')).removeAt(index)

  }
  private initForm(){

    let tripName=''
    let tripImagePath=''
    let tripDescription=''
    let tripActivities = new FormArray([])


    if(this.editMode){
      const trip = this.tripService.getTrip(this.id)
      tripName = trip.name
      tripImagePath = trip.image
      tripDescription = trip.description

      if(trip['activities']){
        for(let activity of trip.activities){
          tripActivities.push(
            new FormGroup({
              'name': new FormControl(activity.name, Validators.required),
              'amount': new FormControl(activity.amount, 
                [Validators.required, 
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }

    this.tripForm = new FormGroup({
      'name': new FormControl(tripName, Validators.required),
      'image':new FormControl(tripImagePath, Validators.required),
      'description':new FormControl(tripDescription, Validators.required),
      'activities': tripActivities
    })

  }

  onSubmit(){

    const newTrip = new Trip(
      this.tripForm.value['name'],
      this.tripForm.value['description'],
      this.tripForm.value['image'],
      this.tripForm.value['activities'],
    )


    if(this.editMode){
      this.tripService.updateTrip(this.id,newTrip)
    }else{
      this.tripService.addTrip(newTrip)
    }
    this.onCancel()
  }
  
}
