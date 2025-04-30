import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticlesService} from "../../../shared/services/articles.service";
import {ArticleType} from "../../../../types/article.type";
import {CommentsService} from "../../../shared/services/comments.service";
import {CommentType} from "../../../../types/comment.type";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article!: ArticleType;
  relatedArticles: ArticleType[] = [];
  comments: CommentType[] | [] = [];
  noComments: boolean = false;
  isLogged: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
              private articlesService: ArticlesService,
              private commentsService: CommentsService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
        next: ((params) => {
          this.articlesService.getArticle(params['url'])
            .subscribe({
              next: ((data: ArticleType) => {
                this.article = data;

                console.log(this.article.id);

                const params = {offset: 3, article: this.article.id};
                this.commentsService.getCommentsForArticle(params)
                  .subscribe((data) => {
                    console.log(data);
                    if(data.comments && data.comments.length > 0){
                      this.comments = data.comments;
                    } else {
                      this.noComments = true;
                    }


                  })
              }),
              error: (() => {

              })
            });

          this.articlesService.getRelatedArticle(params['url'])
            .subscribe({
              next: ((relatedArticles: ArticleType[]) => {
                this.relatedArticles = relatedArticles;
              }),
              error: (() => {

              })
            })
        }),
        error: (() => {

        })
      }
    )


  }

}
