import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodesGetComponent } from './codes/codes-get/codes-get.component';
import { CodesPostComponent } from './codes/codes-post/codes-post.component';

@NgModule({
  declarations: [
    AppComponent,
    CodesGetComponent,
    CodesPostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
