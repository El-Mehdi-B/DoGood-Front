import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  falseUrl:string;
  router:Router

  constructor(router : Router) {
    this.falseUrl= router.url;
    this.router=router;
   }

  ngOnInit(): void {
    setTimeout(()=>this.router.navigate(['']),5000);
  }

}
