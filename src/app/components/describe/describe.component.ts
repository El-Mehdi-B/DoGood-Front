import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'app-describe',
  templateUrl: './describe.component.html',
  styleUrls: ['./describe.component.scss']
})
export class DescribeComponent implements OnInit {

  route: ActivatedRoute;
  httpClient: HttpClient;
  authService: AuthService;

  marker;
  
  
  constructor(route: ActivatedRoute,httpClient: HttpClient,authService: AuthService) { this.route=route;this.httpClient=httpClient; this.authService=authService}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.httpClient.get<any[]>("http://dogood.ddns.net/getDescription.php",{
        headers:{
          'Authorization': this.authService.getToken(),
          'Content-Type':'application/json'
        },
        params:{
          "id": params.get("id")
        }
      }).subscribe(res=>{
          this.marker=res;
      })
    });
      
  }


  getUri():string{
    return "http://dogood.ddns.net/images/IM/"+this.marker.image_uri;
  }

}
