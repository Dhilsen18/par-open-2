/**
 * PageNotFoundComponent displays a 404 error message with the invalid route
 * and a button to navigate back to Home.
 * @author Estudiante U202319440
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  /** The current route path that was not found */
  currentPath = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentPath = this.router.url;
  }
}
