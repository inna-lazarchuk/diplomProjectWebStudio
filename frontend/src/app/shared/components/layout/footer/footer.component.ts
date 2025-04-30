import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup.component";
import {PopupStyleType} from "../../../../../types/popup-style.type";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {
  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  openPopup(param: PopupStyleType) {
    this.popupComponent.openPopup(param);
  }

  protected readonly PopupStyleType = PopupStyleType;
}
