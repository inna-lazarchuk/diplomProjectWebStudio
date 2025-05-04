import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup.component";
import {PopupStyleType} from "../../../../../types/popup-style.type";
import {ActiveMenuService} from "../../../services/active-menu.service";
import {CategoryURLType} from "../../../../../types/categoryURL.type";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewChecked {
  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  constructor(private activeMenu: ActiveMenuService) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.activeMenu.activeMenuItem();
  }

  openPopup(param: PopupStyleType) {
    this.popupComponent.openPopup(param, CategoryURLType.smm);
  }

  protected readonly PopupStyleType = PopupStyleType;
}
