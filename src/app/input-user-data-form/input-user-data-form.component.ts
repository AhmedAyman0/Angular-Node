import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-user-data-form',
  templateUrl: './input-user-data-form.component.html',
  styleUrls: ['./input-user-data-form.component.css']
})
export class InputUserDataFormComponent implements OnInit {
  registered = false;
  submitted = false;
  userForm: FormGroup;
  guid: string;
  serviceErrors: any = {};
  constructor(private fbuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.http.get('/api/v1/generate_uid').subscribe(
      (resp: any) => this.guid = resp.guid,
      error => console.log(error)
    )
  }

  invalidFirstName() {
    return (this.submitted && this.serviceErrors.firstName != null || this.userForm.controls.firstName.errors != null);
  }
  invalidLastName() {
    return (this.submitted && this.serviceErrors.lastName != null || this.userForm.controls.lastName.errors != null);
  }
  invalidPassword() {
    return (this.submitted && this.serviceErrors.password != null || this.userForm.controls.password.errors != null);
  }
  invalidEmail() {
    return (this.submitted && this.serviceErrors.email != null || this.userForm.controls.email.errors != null);
  }
  ngOnInit() {
    this.userForm = this.fbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.minLength(5), Validators.required, Validators.email]],
      password: ['', [Validators.minLength(5), Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    });
  }
  onSubmit() {
    alert('')
    this.submitted = true;
    if (this.userForm.invalid) {
      console.log('====================================');
      console.log();
      console.log('====================================');
      return;
    } else {
      this.registered = true;
      const data: any = Object.assign({ guid: this.guid }, this.userForm.value);
      this.http.post('/api/v1/customer', data).subscribe(
        (resp:any) => {
          console.log(resp);
          const path = '/user/' + resp.customer.uid;
          this.router.navigateByUrl(path);
        },
        error => this.serviceErrors = error.error.error
      )
    }

  }

}
