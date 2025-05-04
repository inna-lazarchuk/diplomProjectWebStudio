import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupStyleType} from "../../../../types/popup-style.type";
import {FormBuilder, Validators} from "@angular/forms";
import {CategoriesType} from "../../../../types/categories.type";
import {CategoriesService} from "../../services/categories.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RequestsService} from "../../services/requests.service";
import {RequestType} from "../../../../types/request.type";
import {CategoryURLType} from "../../../../types/categoryURL.type";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @ViewChild('popup')
  popup!: TemplateRef<ElementRef>;

  stylePopup: PopupStyleType = PopupStyleType.consultation;

  categories: CategoriesType[] = [];


  popupForm = this.fb.group({
    order: [''],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^\+[0-9]{11,12}$/)]],
  })

  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private categoriesService: CategoriesService,
              private requestsService: RequestsService) {
  }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe({
        next: ((data: CategoriesType[]) => {
          this.categories = data;
        }),
        error: ((error: DefaultResponseType) => {
          if (error.message) {
            this._snackBar.open(error.message)
          } else {
            this._snackBar.open("Ошибка получения данных");
          }
        })
      })
  }

  openPopup(param: PopupStyleType, categoryUrl: CategoryURLType): void {
    this.stylePopup = param;
    this.popupForm.get('order')?.setValue(categoryUrl);
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();
    this.modalService.open(this.popup);
  }

  closePopup() {
    this.popupForm.get('order')?.markAsUntouched();
    this.popupForm.get('name')?.markAsUntouched();
    this.popupForm.get('phone')?.markAsUntouched();
    this.popupForm.reset();
    this.modalService.dismissAll();
  }

  callBack(type: string) {
    if (type === PopupStyleType.order) {
      if (this.popupForm.valid && this.popupForm.get('name')?.value && this.popupForm.get('phone')?.value && this.popupForm.get('order')?.value) {
        const params: RequestType = {
          name: this.popupForm.get('name')?.value!,
          phone: this.popupForm.get('phone')?.value!,
          service: this.popupForm.get('order')?.value!,
          type: type
        }

        this.requestsService.sendRequestOrder(params)
          .subscribe({
            next: ((data: DefaultResponseType) => {
              if (!data.error) {
                this.stylePopup = PopupStyleType.success;
              }
            }),
            error: ((error: DefaultResponseType) => {
                this._snackBar.open("Произошла ошибка при отправке формы, попробуйте еще раз.");
            })
          });
      }
    }

    if (type === PopupStyleType.consultation) {
      if (this.popupForm.valid && this.popupForm.get('name')?.value && this.popupForm.get('phone')?.value) {
        const params: RequestType = {
          name: this.popupForm.get('name')?.value!,
          phone: this.popupForm.get('phone')?.value!,
          type: type
        }

        this.requestsService.sendRequestConsultation(params)
          .subscribe({
            next: ((data: DefaultResponseType) => {
              if (!data.error) {
                this.stylePopup = PopupStyleType.success;
              }
            }),
            error: ((error: DefaultResponseType) => {
              if (error.message) {
                this._snackBar.open(error.message)
              } else {
                this._snackBar.open("Произошла ошибка при отправке формы, попробуйте еще раз.");
              }
            })
          });
      }
    }

    // this.popupForm.get('order')?.markAsUntouched();
    // this.popupForm.get('name')?.markAsUntouched();
    // this.popupForm.get('phone')?.markAsUntouched();
    // this.popupForm.reset();
    // this.stylePopup = PopupStyleType.success;

  }

  protected readonly PopupStyleType = PopupStyleType;
}
