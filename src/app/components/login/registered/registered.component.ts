import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.scss']
})
export class RegisteredComponent implements OnInit, AfterViewInit {

  router: Router;
  constructor(router:Router) {this.router=router; }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.router.navigate(['login']);
    },3000)
  }

  ngOnInit(): void {

  }

}
