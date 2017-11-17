import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/index';
import { AuthService } from '../../providers/auth-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    returnUrl: string;
    
    loginError=false;
	loginErrormsg="";
	

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,		
        private alertService: AlertService) { }

    ngOnInit() {
       if(localStorage.getItem("token")){
		this.router.navigate(['/dashboard']);
	   }
    }

    login() {
        this.loading = true;
        console.log(this.model);
        
        this.auth.login(this.model).subscribe(allowed => {
        this.loading = false;

         console.log("allowed",allowed);		
        
         if(allowed.success==true){
	     this.loginError=false;
	     this.loginErrormsg="";		 
			 
         localStorage.setItem('email',allowed.email);
         localStorage.setItem('username',allowed.username);
         localStorage.setItem('token',allowed.token);
         this.router.navigate(['dashboard']);
         }else{
		  this.loginError=true;
	      this.loginErrormsg=allowed.message;	 
          
         }
         
         

        },
        error => {
          this.loading = false;	
		  this.loginError=true;
	      this.loginErrormsg=error;	 
          
        });    
    }


}
