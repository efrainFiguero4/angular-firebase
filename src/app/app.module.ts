import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { environment } from '../environments/environment.prod';
import { UsuarioService } from './services/firebaseservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule, BrowserAnimationsModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebaseconfig),
		AngularFireDatabaseModule,
		FormsModule, ReactiveFormsModule
	],
	providers: [
		UsuarioService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
