import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { CountryService } from "~/api/country/country.service";
import { CountryCardComponent } from "~/components/country-card/country-card.component";
import { CountryCardInput } from "~/components/country-card/country-card.types";
import { DropdownButtonComponent } from "~/components/dropdown-button/dropdown-button.component";
import { SearchTextFieldComponent } from "~/components/search-text-field/search-text-field.component";
import { SessionStorageKey } from "~/constants/session-storage.constants";
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
	countries: Country[] = [];
	selectedRegion: string = "";
	searchedCountryName: string = "";

	constructor(
		private countryService: CountryService,
		private toast: ToastrService,
		private router: Router,
	) {}

	ngOnInit(): void {
		sessionStorage.clear();

		this.countryService.getAllCountries().subscribe({
			next: (countries) => {
				this.countries = countries;
				this.toast.error("Countries search failed!");
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

	onNavigateToCountry(country: Country) {
		const countryName = country.name.common;
		this.router.navigate(["country"]).then((withSuccess) => {
			if (withSuccess) sessionStorage.setItem(SessionStorageKey.COUNTRY, JSON.stringify(country));
			else this.toast.error(`Navigation to ${countryName}'s details failed!`);
		});
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
