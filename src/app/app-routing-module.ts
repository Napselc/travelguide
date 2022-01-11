import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { BucketListComponent } from "./bucket-list/bucket-list.component";
import { TripDetailComponent } from "./trips/trip-detail/trip-detail.component";
import { TripEditComponent } from "./trips/trip-edit/trip-edit.component";
import { TripStartComponent } from "./trips/trip-start/trip-start.component";
import { TripsComponent } from "./trips/trips.component";

const appRoutes:Routes = [
    { path: "", redirectTo:"/trips", pathMatch:"full"},
    { path:"trips", component:TripsComponent, children:[
        { path:'',component:TripStartComponent },
        { path:"new", component:TripEditComponent },
        { path:':id', component:TripDetailComponent },        
        { path:":id/edit", component:TripEditComponent }
    ] },
    { path:"bucket-list", component:BucketListComponent },
    { path:"auth", component:AuthComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}