import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private router: Router) { }
  username:string;
  ngOnInit() {
	   if(!localStorage.getItem("token")){
		this.router.navigate(['/']);
	   }
	   this.username=localStorage.getItem("username");
  }
  
  logout() {
      localStorage.clear();
	  if(!localStorage.getItem("token")){
		this.router.navigate(['/']);
	  }
  }

}
