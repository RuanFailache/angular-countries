import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { CountryService } from "~/api/country/country.service";
import { CountryCardComponent } from "~/components/country-card/country-card.component";
import { DropdownButtonComponent } from "~/components/dropdown-button/dropdown-button.component";
import { SearchTextFieldComponent } from "~/components/search-text-field/search-text-field.component";
import { Country } from "~/models/Country";

@Component({
	selector: "app-countries-list",
	styleUrl: "./countries-list.component.scss",
	templateUrl: "./countries-list.component.html",
	standalone: true,
	imports: [CountryCardComponent, SearchTextFieldComponent, DropdownButtonComponent, RouterLink],
})
export class CountriesListComponent implements OnInit {
	loading = true;
	countries: Country[] = [];
	selectedRegion: string = "";
	searchedCountryName: string = "";

	constructor(
		private countryService: CountryService,
		private toast: ToastrService,
	) {}

	ngOnInit(): void {
		this.countryService.getAllCountries().subscribe({
			next: (countries) => {
				this.countries = countries;
			},
			error: () => {
				this.toast.error("Countries search failed!");
			},
			complete: () => {
				this.loading = false;
			},
		});
	}

	get regions(): string[] {
		return this.countries.reduce<string[]>((regions, country) => {
			if (!regions.includes(country.region)) {
				regions.push(country.region);
			}
			return regions;
		}, []);
	}

	get filteredCountries(): Country[] {
		return this.countries.filter((country) => {
			const countryName = country.name.common.toLowerCase();
			const searchedCountryName = this.searchedCountryName.toLowerCase();

			const isNameSearched = countryName.includes(searchedCountryName);
			const isRegionSelected = !this.selectedRegion || country.region === this.selectedRegion;

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

	mapCountryToCardInput(country: Country) {
		const data = new Map();

		if (country.capital) data.set("Capital", country.capital.join(", "));
		if (country.population) data.set("Population", country.population.toLocaleString());
		if (country.region) data.set("Region", country.region);

		return {
			data,
			flagSource: country.flags.svg,
			name: country.name.common,
		};
	}
}
