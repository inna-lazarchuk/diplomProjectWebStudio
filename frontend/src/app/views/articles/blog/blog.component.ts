import {Component, HostListener, OnInit} from '@angular/core';
import {ArticlesService} from "../../../shared/services/articles.service";
import {ArticlesFiltersType} from "../../../../types/articles-filters.type";
import {ArticlesAllType} from "../../../../types/articles-all.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ArticleType} from "../../../../types/article.type";
import {CategoriesType} from "../../../../types/categories.type";
import {CategoriesService} from "../../../shared/services/categories.service";
import {ActivatedRoute, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  filtersOpen: boolean = false;
  activeParams: ArticlesFiltersType = {};
  articles: ArticleType[] = [];
  categories: CategoriesType[] = [];
  pages: number[] = [];
  filter!: HTMLElement;


  constructor(private articlesService: ArticlesService,
              private _snackBar: MatSnackBar,
              private categoriesService: CategoriesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.articlesService.getArticles(this.activeParams)
      .subscribe({
        next: ((data: ArticlesAllType) => {
          this.articles = data.items;

          this.pages = [];
          for (let i = 1; i <= data.pages; i++) {
            this.pages.push(i);
          }
        }),
        error: ((error: DefaultResponseType) => {
          if (error.message) {
            this._snackBar.open(error.message)
          } else {
            this._snackBar.open("Ошибка получения данных");
          }
        })
      })

    this.categoriesService.getCategories()
      .subscribe({
        next: ((data: CategoriesType[]) => {
          this.categories = data;
        }),
        error: ((error: DefaultResponseType) => {
          if (error.message) {
            this._snackBar.open(error.message)
          } else {
            this._snackBar.open("Ошибка получения категорий");
          }
        })
      })
  }

  toggleFilters() {
    this.filtersOpen = !this.filtersOpen;
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    } else {
      this.activeParams.page = 1;
      this.activeParams.page++;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

  @HostListener('document:click', ['$event'])
  click(event: Event) {
    if (this.filtersOpen && (event.target as HTMLElement).className.indexOf('blog-filters') === -1) {
      this.filtersOpen = false;
    }
  }

  updateFilterParam(url: string, active: boolean) {
    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      const existingCategoryInParams = this.activeParams.categories.find(item => item === url);
      if (existingCategoryInParams && !active) {
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);

        this.filter.classList.remove('active');
        this.filter.children.item(1)?.classList.add('active');
        this.filter.children.item(2)?.classList.remove('active');

      } else if (!existingCategoryInParams && active) {
        this.activeParams.categories.push(url);
        this.filter.classList.add('active');
        this.filter.children.item(1)?.classList.add('active');
        this.filter.children.item(2)?.classList.remove('active');

      }
    } else if (active) {
      this.activeParams.categories = [url];
      this.filter.classList.add('active');
    }

    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });

  }

  deleteFilter(url: string) {


  }

}
