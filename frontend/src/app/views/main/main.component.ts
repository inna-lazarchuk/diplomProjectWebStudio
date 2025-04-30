import {Component, OnInit, ViewChild} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {PopupStyleType} from "../../../types/popup-style.type";
import {PopupComponent} from "../../shared/components/popup/popup.component";
import {ArticlesService} from "../../shared/services/articles.service";
import {ArticleType} from "../../../types/article.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  customOptions: OwlOptions = {
    nav: false,
    items: 1,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  }

  customOptionsRev: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  }

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  popularArticles: ArticleType[] = [];

  constructor(private articlesService: ArticlesService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.articlesService.getPopularArticles()
      .subscribe({
        next: ((data: ArticleType[]) => {
          this.popularArticles = data;
        }),
        error: ((error: DefaultResponseType) => {
         if(error.message){
           this._snackBar.open(error.message)
         } else {
           this._snackBar.open("Ошибка получения данных");
         }
        })
      })
  }

  openPopup(param: PopupStyleType) {
    this.popupComponent.openPopup(param);
  }

  protected readonly PopupStyleType = PopupStyleType;
}
