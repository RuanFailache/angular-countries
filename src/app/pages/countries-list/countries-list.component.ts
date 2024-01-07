import { Component } from "@angular/core";

import { CountryCardComponent } from "~/components/molecules/country-card/country-card.component";

@Component({
	selector: "app-countries-list",
	standalone: true,
	imports: [CountryCardComponent],
	templateUrl: "./countries-list.component.html",
	styleUrl: "./countries-list.component.scss",
})
export class CountriesListComponent {
	protected readonly Array = Array;
}
