/**
 * ToolbarComponent provides the main navigation toolbar with logo,
 * navigation links, and language switcher.
 * @author Estudiante U202319440
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  /** Currently selected language */
  selectedLanguage = 'EN';
  /** Available language options */
  languages = ['EN', 'ES'];

  /** Eventify logo URL from Clearbit Logo API */
  readonly logoUrl = 'https://logo.clearbit.com/eventify.io';

  constructor(private translateService: TranslateService) {}

  /**
   * Switches the application language.
   * @param lang - Language code to switch to
   */
  onLanguageChange(lang: string): void {
    this.selectedLanguage = lang;
    this.translateService.use(lang.toLowerCase());
  }
}
