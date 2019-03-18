import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Ng2AutoBreadCrumb } from "ng2-auto-breadcrumb";
import { MatCardModule, MatFormFieldModule, MatProgressSpinnerModule, MatToolbarModule, MatButtonModule, MatInputModule, MatDialogModule, MatTableModule, MatMenuModule, MatIconModule } from '@angular/material';
import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { AlertModule } from 'ngx-alerts';

export function tokenGetter() {
    console.log("token");
    let local = localStorage.getItem(environment.TOKEN_KEY);
    if (local) {
        return JSON.parse(local)['token'];
    } else {
        return local;
    }

}

@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        Ng2AutoBreadCrumb,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule,
        SharedModule,
        AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    ],
    declarations: [ NotFoundComponent],
    exports: [
        RouterModule,
    ],
    providers: [
    ]
})
export class CoreModule { }
