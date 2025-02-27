import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: {breadcrumb: 'Sales Dashboard'}, loadChildren: () => import('./sales/dashboardsales.module').then(m => m.DashboardSalesModule) },
        { path: 'dashboard-analytics', data: {breadcrumb: 'Analytics Dashboard'}, loadChildren: () => import('./analytics/dashboardanalytics.module').then(m => m.DashboardAnalyticsModule) },
        
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }