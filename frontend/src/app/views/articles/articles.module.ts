import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './article/article.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommentComponent } from './comment/comment.component';


@NgModule({
  declarations: [
    BlogComponent,
    ArticleComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticlesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ArticlesModule { }
