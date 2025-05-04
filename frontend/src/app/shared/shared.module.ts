import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {PopupComponent} from './components/popup/popup.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArticleCardComponent} from './components/article-card/article-card.component';
import {LoaderComponent} from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    PopupComponent,
    ArticleCardComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  exports: [
    PopupComponent,
    ArticleCardComponent,
    LoaderComponent
  ]
})
export class SharedModule {
}
