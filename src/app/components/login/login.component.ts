import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: NgToastService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    })
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            if (res.status == 0 && res.message == "error") {
              this.toastr.error({ detail: "ERROR", summary: "Something went wrong, please try again!", duration: 5000 });
            } else if (res.status == 0) {
              this.toastr.error({ detail: "ERROR", summary: res.message, duration: 5000 });
            } else if (res.status == 1) {
              this.auth.storeToken(res.token);
              this.router.navigate(["dashboard"]);
              this.loginForm.reset();
            }
          },
          error: (err) => {
            this.toastr.error({ detail: "ERROR", summary: "Something went wrong, please try again!", duration: 5000 });
          }
        })
    }
    else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}
