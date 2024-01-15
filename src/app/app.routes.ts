import { Routes } from "@angular/router";

import { CountryDetailsComponent } from "~/pages/country-details/country-details.component";
import { NotFoundComponent } from "~/pages/not-found/not-found.component";

import { CountriesListComponent } from "./pages/countries-list/countries-list.component";

export const routes: Routes = [
	{ path: "", component: CountriesListComponent },
	{ path: "country/:code", component: CountryDetailsComponent },
	{ path: "**", component: NotFoundComponent },
];
