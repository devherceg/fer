import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {AppAuthGuard} from "./core/guard/app-auth-guard";
import {HomeComponent} from "./component/home/home.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AppAuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
