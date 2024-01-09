import { PRECONNECT_CHECK_BLOCKLIST } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideToastr } from "ngx-toastr";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		provideToastr(),
		importProvidersFrom(HttpClientModule),
		{
			provide: PRECONNECT_CHECK_BLOCKLIST,
			useValue: ["https://upload.wikimedia.org", "https://flagcdn.com"],
		},
	],
};
