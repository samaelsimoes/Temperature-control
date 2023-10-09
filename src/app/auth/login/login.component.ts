import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = "";
  password = "";
  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(2)]],
  });


  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm.get('login')?.valueChanges.pipe().subscribe((value:any) => {
      this.login = value;
    });
    this.loginForm.get('password')?.valueChanges.pipe().subscribe((value:any) => {
      this.password = value;
    });
  }


  onSubmit() {
    this.router.navigateByUrl('/dashboard');
  }
}
