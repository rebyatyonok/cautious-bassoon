import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
import { LearningPlansViewComponent } from './views/learning-plans-view/learning-plans-view.component'
import { UsersViewComponent } from './views/users-view/users-view.component'

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersViewComponent },
  { path: 'learning-plans', component: LearningPlansViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
