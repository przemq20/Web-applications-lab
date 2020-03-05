import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notlogged',
  templateUrl: './notlogged.component.html',
  styleUrls: ['./notlogged.component.css']
})
export class NotloggedComponent implements OnInit {

  constructor(public authenticationService: AuthService) { }

  ngOnInit() {
  }

}
