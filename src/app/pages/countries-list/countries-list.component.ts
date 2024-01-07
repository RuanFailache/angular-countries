import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import { CountryService } from "~/api/country/country.service";
import { CountryCardComponent } from "~/components/molecules/country-card/country-card.component";
import {
	CountryCardInput,
	DataCell,
} from "~/components/molecules/country-card/country-card.types";
import { Country } from "~/models/Country";

@Component({
	selector: "app-countries-list",
	standalone: true,
	imports: [CountryCardComponent],
	templateUrl: "./countries-list.component.html",
	styleUrl: "./countries-list.component.scss",
})
export class CountriesListComponent implements OnInit {
	loading = true;
	countries: CountryCardInput[] = [];

	constructor(
		private countryService: CountryService,
		private snackBar: MatSnackBar,
	) {}

	ngOnInit(): void {
		this.countryService.getAllCountries().subscribe({
			next: (countries) => {
				this.countries = countries.map(this.mapResponse);
			},
			error: () => {
				this.snackBar.open("Countries search failed!", "", {
					horizontalPosition: "end",
					verticalPosition: "top",
					duration: 3000,
				});
			},
			complete: () => {
				this.loading = false;
			},
		});
	}

	private mapResponse(country: Country) {
		const data: DataCell[] = [];

		if (country.population) {
			data.push({
				label: "Population",
				value: country.population.toLocaleString(),
			});
		}

		if (country.region) {
			data.push({
				label: "Region",
				value: country.region,
			});
		}

		if (country.capital) {
			data.push({
				label: "Capital",
				value: country.capital.join(", "),
			});
		}

		return {
			data,
			flagSource: country.flags.svg,
			title: country.name.common,
		};
	}
}
