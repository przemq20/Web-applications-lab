import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profesors',
  templateUrl: './profesors.component.html',
  styleUrls: ['./profesors.component.css']
})
export class ProfesorsComponent implements OnInit {

  constructor(public authenticationService: AuthService) { }

  ngOnInit() {
  }

}
