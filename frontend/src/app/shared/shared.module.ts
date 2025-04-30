import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { PopupComponent } from './components/popup/popup.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ArticleCardComponent } from './components/article-card/article-card.component';

@NgModule({
  declarations: [
    PopupComponent,
    ArticleCardComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
    exports: [
        PopupComponent,
        ArticleCardComponent
    ]
})
export class SharedModule { }
