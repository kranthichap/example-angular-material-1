import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { timeInterval, TimeInterval } from 'rxjs/operators/timeInterval';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user = new User();
  loginStatus: boolean = true;
  currentUser:User;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    if(localStorage.getItem('isLoggedIn') == 'true') {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    console.log(this.user);
    this.user.isLoggedIn = true;
    this.userService.getUser(this.user as User).subscribe(
      res => {
        console.log("login");
        console.log(res.status);
        if(res.status == 200) {
          this.currentUser = res.data;
          sessionStorage.setItem('curUser', JSON.stringify(res.data));
          this.router.navigate(['/dashboard']);
        }else {
          this.loginStatus = res.message;
          setTimeout(() => {
            this.loginStatus = !res.message;
          }, 3000);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }
  
}
