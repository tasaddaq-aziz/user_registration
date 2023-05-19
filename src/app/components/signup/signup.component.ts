import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: NgToastService) { }
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [
        Validators.required,
        Validators.email]],
      Password: ['', [Validators.required, Validators.pattern('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[()*;:!@#$%^&\\-`.+=]).*$')]]

    })
  }
  onSubmit() {
    if (this.signUpForm.valid) {
      this.auth.signup(this.signUpForm.value)
        .subscribe({
          next: (res) => {
            if (res.status == 0 && res.message == "error") {
              this.toastr.error({ detail: "ERROR", summary: "Something went wrong, please try again!", duration: 5000 });
            } else if (res.status == 0) {
              this.toastr.error({ detail: "ERROR", summary: res.message, duration: 5000 });
            }else if (res.status == 1) {
              this.toastr.success({ detail: "SUCCESS", summary: 'Registration Success!', duration: 5000 });
              this.signUpForm.reset();
            }
          },
          error: (err) => {
            this.toastr.error({ detail: "ERROR", summary: "Something went wrong, please try again!", duration: 5000 });
          }
        })
    }
    else {
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }
}
