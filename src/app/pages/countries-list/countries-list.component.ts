import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import { CountryService } from "~/api/country/country.service";
import { DropdownButtonComponent } from "~/components/atoms/dropdown-button/dropdown-button.component";
import { SearchTextFieldComponent } from "~/components/atoms/search-text-field/search-text-field.component";
import { CountryCardComponent } from "~/components/molecules/country-card/country-card.component";
import { CountryCardInput } from "~/components/molecules/country-card/country-card.types";
import { Country } from "~/models/Country";

@Component({
	selector: "app-countries-list",
	styleUrl: "./countries-list.component.scss",
	templateUrl: "./countries-list.component.html",
	standalone: true,
	imports: [CountryCardComponent, SearchTextFieldComponent, DropdownButtonComponent],
})
export class CountriesListComponent implements OnInit {
	loading = true;
	countries: CountryCardInput[] = [];
	regions: string[] = [];
	selectedRegion: string = "";
	searchedCountryName: string = "";

	constructor(
		private countryService: CountryService,
		private snackBar: MatSnackBar,
	) {}

	ngOnInit(): void {
		this.countryService.getAllCountries().subscribe({
			next: (countries) => {
				this.countries = countries.map(this.mapResponseToCountries);
				this.reduceResponseToRegions(countries);
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

	get filteredCountries(): CountryCardInput[] {
		return this.countries.filter((country) => {
			const countryName = country.title.toLowerCase();
			const searchedCountryName = this.searchedCountryName.toLowerCase();
			const isNameSearched = countryName.includes(searchedCountryName);

			const region = country.data.get("Region");
			const isRegionSelected = !this.selectedRegion || region === this.selectedRegion;

			return isNameSearched && isRegionSelected;
		});
	}

	onFormatRegion(region: string) {
		return region;
	}

	onChangeRegion(region: string) {
		this.selectedRegion = region;
	}

	onChangeCountryName(name: string) {
		this.searchedCountryName = name;
	}

	private reduceResponseToRegions(countries: Country[]) {
		this.regions = countries.reduce<string[]>((regions, country) => {
			if (!regions.includes(country.region)) {
				regions.push(country.region);
			}
			return regions;
		}, []);
	}

	private mapResponseToCountries(country: Country) {
		const data = new Map();

		if (country.population) data.set("Population", country.population.toLocaleString());
		if (country.region) data.set("Region", country.region);
		if (country.capital) data.set("Capital", country.capital.join(", "));

		return {
			data,
			flagSource: country.flags.svg,
			title: country.name.common,
		};
	}
}
