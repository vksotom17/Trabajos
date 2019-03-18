import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AlertModule } from 'ngx-alerts';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CoreModule,
        AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
