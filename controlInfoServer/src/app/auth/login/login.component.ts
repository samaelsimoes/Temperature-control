import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModalAnimations } from 'app/components/modalLoad/modal-animations';
import { AuthService } from '../auth.service';

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
    public dialog: MatDialog,
    private auth: AuthService,
    private snackBar: MatSnackBar,
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
    //this.router.navigateByUrl('/dashboard');
    const credentials = this.loginForm.value;

    if (this.loginForm.valid) {
      const dialogRef = this.dialog.open(ModalAnimations);

      this.auth.login(credentials)
      .subscribe(
        (user) => {
          setTimeout(() => {
            this.snackBar.open(
              'Login realizado com sucesso. Bem vindo ! ', 'OK', {duration: 2000}
            );
          }, 3000);
          dialogRef.close('success');

          setTimeout(() => {
            this.router.navigateByUrl('/dashboard');
          }, 2000);
        },
        (err) => {
          dialogRef.close('success');
          this.snackBar.open(
             err.error.errors[0], 'OK', {duration: 5000}
          )
        }
      )
    }
  }
}
