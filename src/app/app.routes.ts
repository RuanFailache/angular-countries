import { Routes } from "@angular/router";

import { CountryDetailsComponent } from "~/pages/country-details/country-details.component";

import { CountriesListComponent } from "./pages/countries-list/countries-list.component";

export const routes: Routes = [
	{ path: "", component: CountriesListComponent },
	{ path: "country", component: CountryDetailsComponent },
	{ path: "**", redirectTo: "" },
];
