import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2AutoBreadCrumb } from 'ng2-auto-breadcrumb';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule, MatOptionModule, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { AlertModule } from 'ngx-alerts';
import { Http, HttpModule } from '@angular/http';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        Ng2AutoBreadCrumb,
        Ng2SmartTableModule,
        NgMaterialMultilevelMenuModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatOptionModule,
        MatSelectModule,
        MatFormFieldModule,
        HttpModule,
        AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    ],
    declarations: [AdminComponent, DashboardComponent, NavigationComponent ]
})
export class AdminModule { }
