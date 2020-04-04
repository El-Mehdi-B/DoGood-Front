import { Component, OnInit } from '@angular/core';
import { trigger, animate, transition,state, style } from '@angular/animations';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('up', style({
        transform: 'translateY(-80px)',
      })),
      state('down', style({
        transform: 'translateY(0)'
      })),
      transition('up => down', [
        animate('500ms ease')
      ]),
      transition('down => up', [
        animate('500ms ease')
      ]),
    ]),
  ],
})
export class ToolbarComponent implements OnInit {
  toAnimate='down'; 
  toRender:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }
  animate(){
    this.toAnimate = 'up';
    setTimeout(()=> {this.toRender= !this.toRender, this.toAnimate='down'} ,500);
    
  }

}
