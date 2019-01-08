import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatRadioChange } from '@angular/material';

import * as _moment from 'moment';

const moment = _moment;

import { ErrorStateMatcher } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './app.registration.html',
  styleUrls: ['./app.registration.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class RegistrationComponent implements OnInit {
  
  user = new User();
  genders = ['Male', 'Female'];

  date = new FormControl(moment());

  userNameStatus:boolean;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  gender: FormGroup;

  myGender = new FormControl('', []);

  constructor(private fb: FormBuilder, private userService: UserService, private router:Router) {

  }

  ngOnInit() {
    this.gender = new FormGroup({
      myGender: this.myGender
    });
    if(localStorage.getItem('isLoggedIn') == 'true') {
      this.router.navigate(['/dashboard']);
    }
  }

  setGender(gender: string): void {
    console.log(gender);
    this.user.gender = gender;
  }

  checkMail() {
    console.log("check Mail");
    this.userService.checkEmail(this.user.email).subscribe(
      res => {
        console.log(res.status);
        if(res.status == 200 && res.message==true) {
          this.userNameStatus = true;
        }else {
          this.userNameStatus = false;
        }
      },
      err => {
        console.log("Error occured");
      }
    )
  }

  onSubmit() {
    console.log(this.user);
    this.userService.addUser(this.user as User).subscribe(res => {
      console.log(res);
      this.router.navigate(['/login']);
    },
      err => {
        console.log("Error occured");
      }
    );
  }

}
