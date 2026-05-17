/**
 * Application configuration for Eventify.
 * Configures routing, HTTP client, animations, and ngx-translate for i18n.
 * @author Estudiante U202319440
 */
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { EVENT_REPOSITORY, ATTENDEE_REPOSITORY } from './registration/infrastructure/tokens/registration.tokens';
import { HttpEventRepository } from './registration/infrastructure/repositories/http-event.repository';
import { HttpAttendeeRepository } from './registration/infrastructure/repositories/http-attendee.repository';
import { RATING_REPOSITORY } from './engagement/infrastructure/tokens/engagement.tokens';
import { HttpRatingRepository } from './engagement/infrastructure/repositories/http-rating.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: EVENT_REPOSITORY, useClass: HttpEventRepository },
    { provide: ATTENDEE_REPOSITORY, useClass: HttpAttendeeRepository },
    { provide: RATING_REPOSITORY, useClass: HttpRatingRepository },
    provideAnimationsAsync(),
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: { prefix: '/i18n/', suffix: '.json' }
    },
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useClass: TranslateHttpLoader
        }
      })
    )
  ]
};
