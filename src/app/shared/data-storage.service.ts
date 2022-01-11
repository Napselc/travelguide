import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { TripService } from "../trips/trip.service";
import { Trip } from "../trips/trip.model";
import { AuthService } from "../auth/auth.service";
import { map, tap, take, exhaustMap } from 'rxjs/operators';


@Injectable({providedIn:'root'}) // alternative to adding the service in module.ts
export class DataStorageService{

    constructor(private http:HttpClient, private tripsService:TripService, private authService:AuthService){}

    storeTrips(){
        const trips = this.tripsService.getTrips()
        this.http.put("https://bucketlist-21095-default-rtdb.firebaseio.com/trips.json",trips)
        .subscribe(response => {
            console.log(response)

        })
    }

  
    // fetchTrips() {
    //     return this.authService.user.pipe(
    //       take(1),
    //       exhaustMap(user => {
    //         return this.http.get<Trip[]>(
    //             "https://bucketlist-21095-default-rtdb.firebaseio.com/trips.json",
    //           {
    //             params: new HttpParams().set('auth', user.token)
    //           }
    //         );
    //       }),
    //       map(trips => {
    //         return trips.map(trip => {
    //           return {
    //             ...trip,
    //             activities: trip.activities ? trip.activities : []
    //           };
    //         });
    //       }),
    //       tap(trips => {
    //         this.tripsService.setTrips(trips);
    //       })
    //     );
    //   }

    fetchTrips(){
        this.http
        .get<Trip[]>('https://bucketlist-21095-default-rtdb.firebaseio.com/trips.json')
        .subscribe(trips=>{
           this.tripsService.setTrips(trips)
        })
    }
    }
    