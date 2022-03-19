import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { UserService } from './services/user.service';
import { LearningPlansService } from './services/learning-plans.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersViewComponent } from './views/users-view/users-view.component';
import { LearningPlansViewComponent } from './views/learning-plans-view/learning-plans-view.component';
import { LabeledInputComponent } from './components/labeled-input/labeled-input.component';
import { TableWrapperComponent } from './components/table-wrapper/table-wrapper.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { UserFormComponent } from './views/users-view/user-form/user-form.component';
import { PopupComponent } from './components/popup/popup.component';
import { LearningPlanFormComponent } from './views/learning-plans-view/learning-plan-form/learning-plan-form.component';
import { AssignFormComponent } from './views/learning-plans-view/assign-form/assign-form.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersViewComponent,
    LearningPlansViewComponent,
    LabeledInputComponent,
    TableWrapperComponent,
    ConfirmationComponent,
    UserFormComponent,
    PopupComponent,
    LearningPlanFormComponent,
    AssignFormComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
  ],
  providers: [UserService, LearningPlansService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
