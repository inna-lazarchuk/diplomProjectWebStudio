import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupStyleType} from "../../../../types/popup-style.type";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {CategoriesType} from "../../../../types/categories.type";

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
    request: [''],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^\+[0-9]{11,12}$/)]],
  })
  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.getCategories();

  }

  openPopup(param: PopupStyleType): void {
    this.stylePopup = param;
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();
    this.modalService.open(this.popup);
  }

  closePopup(){
    this.popupForm.get('request')?.markAsUntouched();
    this.popupForm.get('name')?.markAsUntouched();
    this.popupForm.get('phone')?.markAsUntouched();
    this.popupForm.reset();
    this.modalService.dismissAll();
  }

  callBack() {
    if (this.popupForm.valid && this.popupForm.get('name')?.value && this.popupForm.get('phone')?.value) {
      this.popupForm.get('request')?.markAsUntouched();
      this.popupForm.get('name')?.markAsUntouched();
      this.popupForm.get('phone')?.markAsUntouched();
      this.popupForm.reset();
      this.stylePopup = PopupStyleType.success;
    }
  }

  getCategories(): void {
    this.http.get<CategoriesType[] | []>(environment.api + 'categories')
      .subscribe({
        next: ((data: CategoriesType[] | []) => {
          this.categories = data;
          console.log(this.categories);
      }),
        error: ((error) => {
          console.log(error)
        })
      })
  }

  protected readonly PopupStyleType = PopupStyleType;
}
