import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  toggle!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.hideOrShow();
  }

 hideOrShow(){
   this.toggle  = !this.toggle;
 }

}
