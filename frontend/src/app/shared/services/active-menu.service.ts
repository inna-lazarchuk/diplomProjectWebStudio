import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ActiveMenuService {

  constructor(private router: Router) { }

  activeMenuItem() {
    if (this.router.url.includes('offers')){
      let itemFromHeader = document.getElementById('offersLink');
      if (itemFromHeader){
        itemFromHeader.classList.add('active');
      }
      let itemFromFooter = document.getElementById('offersLinkFooter');
      if (itemFromFooter){
        itemFromFooter.classList.add('active');
      }
    }  else {
      let itemFromHeader = document.getElementById('offersLink');
      if (itemFromHeader){
        itemFromHeader.classList.remove('active');
      }
      let itemFromFooter = document.getElementById('offersLinkFooter');
      if (itemFromFooter){
        itemFromFooter.classList.remove('active');
      }
    }

    if (this.router.url.includes('about')){
      let itemFromHeader = document.getElementById('aboutLink');
      if (itemFromHeader){
        itemFromHeader.classList.add('active');
      }
      let itemFromFooter = document.getElementById('aboutLinkFooter');
      if (itemFromFooter){
        itemFromFooter.classList.add('active');
      }
    }  else {
      let itemFromHeader = document.getElementById('aboutLink');
      if (itemFromHeader){
        itemFromHeader.classList.remove('active');
      }
      let itemFromFooter = document.getElementById('aboutLinkFooter');
      if (itemFromFooter){
        itemFromFooter.classList.remove('active');
      }
    }

    if (this.router.url.includes('blog')){
      let itemFromHeader = document.getElementById('blogLink');
      if (itemFromHeader){
        itemFromHeader.classList.add('active');
      }
      let itemFromFooter = document.getElementById('blogLinkFooter');
      if (itemFromFooter){
        itemFromFooter.classList.add('active');
      }
    }  else {
      let itemFromHeader = document.getElementById('blogLink');
      if (itemFromHeader){
        itemFromHeader.classList.remove('active');
      }
      let itemFromFooter = document.getElementById('blogLinkFooter');
      if (itemFromFooter){
        itemFromFooter.classList.remove('active');
      }
    }

    if (this.router.url.includes('reviews')){
      let itemFromHeader = document.getElementById('reviewsLink');
      if (itemFromHeader){
        itemFromHeader.classList.add('active');
      }
      let itemFromFooter = document.getElementById('reviewsLinkFooter');
      if (itemFromFooter){
        itemFromFooter.classList.add('active');
      }
    }  else {
      let itemFromHeader = document.getElementById('reviewsLink');
      if (itemFromHeader){
        itemFromHeader.classList.remove('active');
      }
      let itemFromFooter = document.getElementById('reviewsLinkFooter');
      if (itemFromFooter){
        itemFromFooter.classList.remove('active');
      }
    }

    if (this.router.url.includes('contacts')){
      let itemFromHeader = document.getElementById('contactsLink');
      if (itemFromHeader){
        itemFromHeader.classList.add('active');
      }
      let itemFromFooter = document.getElementById('contactsLinkFooter');
      if (itemFromFooter){
        itemFromFooter.classList.add('active');
      }
    }  else {
      let itemFromHeader = document.getElementById('contactsLink');
      if (itemFromHeader){
        itemFromHeader.classList.remove('active');
      }
    }
    let itemFromFooter = document.getElementById('contactsLinkFooter');
    if (itemFromFooter){
      itemFromFooter.classList.remove('active');
    }
  }
}
