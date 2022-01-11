import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeaderComoponent } from './header/header.component';
import { TripsComponent } from './trips/trips.component';
import { TripListComponent } from './trips/trip-list/trip-list.component';
import { TripDetailComponent } from './trips/trip-detail/trip-detail.component';
import { TripSpotComponent } from './trips/trip-list/trip-spot/trip-spot.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { BucketEditComponent } from './bucket-list/bucket-edit/bucket-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { BucketListService } from './bucket-list/bucket-list.service';
import { AppRoutingModule } from './app-routing-module';
import { TripStartComponent } from './trips/trip-start/trip-start.component';
import { TripEditComponent } from './trips/trip-edit/trip-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripService } from './trips/trip.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComoponent,
    TripsComponent,
    TripListComponent,
    TripDetailComponent,
    TripSpotComponent,
    BucketListComponent,
    BucketEditComponent,
    DropdownDirective,
    TripStartComponent,
    TripEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [BucketListService, TripService, {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
