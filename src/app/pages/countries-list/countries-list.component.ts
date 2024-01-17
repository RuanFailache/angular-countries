import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { CountryService } from "~/api/country/country.service";
import { ButtonColor, ButtonComponent } from "~/components/button/button.component";
import { CountryCardComponent } from "~/components/country-card/country-card.component";
import { DropdownButtonComponent } from "~/components/dropdown-button/dropdown-button.component";
import { LoadingComponent } from "~/components/loading/loading.component";
import { SearchTextFieldComponent } from "~/components/search-text-field/search-text-field.component";
import { Country } from "~/models/Country";
import { MapUtils } from "~/utils/map.utils";

const ALL_REGIONS = "All regions";

@Component({
	selector: "app-countries-list",
	styleUrl: "./countries-list.component.scss",
	templateUrl: "./countries-list.component.html",
	standalone: true,
	providers: [CountryService, MapUtils],
	imports: [
		CountryCardComponent,
		SearchTextFieldComponent,
		DropdownButtonComponent,
		RouterLink,
		LoadingComponent,
		MatIconModule,
		ButtonComponent,
	],
})
export class CountriesListComponent implements OnInit {
	protected readonly ButtonColor = ButtonColor;

	loading = true;
	countries: Country[] = [];
	selectedRegion: string = "";
	searchedCountryName: string = "";

	constructor(
		private countryService: CountryService,
		private toast: ToastrService,
		private mapUtils: MapUtils,
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
		return this.countries.reduce<string[]>(
			(regions, country) => {
				if (!regions.includes(country.region)) {
					regions.push(country.region);
				}
				return regions;
			},
			[ALL_REGIONS],
		);
	}

	get filteredCountries(): Country[] {
		return this.countries.filter((country) => {
			const countryName = country.name.common.toLowerCase();
			const searchedCountryName = this.searchedCountryName.toLowerCase();

			const isNameSearched = countryName.includes(searchedCountryName);
			const hasRegionSelected = Boolean(this.selectedRegion);
			const isAllRegionsSelected = this.selectedRegion === ALL_REGIONS;
			const isRegionSelected = country.region === this.selectedRegion;

			return isNameSearched && (!hasRegionSelected || isAllRegionsSelected || isRegionSelected);
		});
	}

	onFormatRegion(region: string) {
		return region;
	}

	onChangeRegion(region: string) {
		this.selectedRegion = region;
	}

	onSearchCountryByName(name: string) {
		this.searchedCountryName = name;
	}

	mapCountryToCardInput(country: Country) {
		const data = new Map();
		this.mapUtils.setIfExists(data, "Capital", country.capital?.join(", "), "-");
		this.mapUtils.setIfExists(data, "Population", country.population?.toLocaleString(), "-");
		this.mapUtils.setIfExists(data, "Region", country.region, "-");
		return {
			data,
			flagSource: country.flags.svg,
			name: country.name.common,
		};
	}

	clearFilter() {
		this.onChangeRegion("");
		this.onSearchCountryByName("");
	}
}
