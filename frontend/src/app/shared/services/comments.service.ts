import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticlesFiltersType} from "../../../types/articles-filters.type";
import {Observable} from "rxjs";
import {ArticlesAllType} from "../../../types/articles-all.type";
import {environment} from "../../../environments/environment";
import {CommentsType} from "../../../types/comments.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getCommentsForArticle (params: { offset: number, article: string }): Observable<CommentsType> {
    return this.http.get<CommentsType>(environment.api + 'comments', {
      params: params
    });
  }
}
