import { Location, NgOptimizedImage } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { CountryService } from "~/api/country/country.service";
import { ButtonComponent } from "~/components/button/button.component";
import { LoadingComponent } from "~/components/loading/loading.component";
import { Country } from "~/models/Country";
import { CountryBorderData } from "~/pages/country-details/country-details.types";
import { MapUtils } from "~/utils/map.utils";
import { ObjectUtils } from "~/utils/object.utils";

interface Cell {
	label: string;
	value: string;
}

@Component({
	selector: "app-country-details",
	styleUrl: "./country-details.component.scss",
	templateUrl: "./country-details.component.html",
	standalone: true,
	providers: [CountryService, ObjectUtils, MapUtils],
	imports: [MatIconModule, ButtonComponent, NgOptimizedImage, RouterLink, LoadingComponent],
})
export class CountryDetailsComponent implements OnInit {
	loading = true;

	country: Country;
	borders: CountryBorderData[] = [];

	constructor(
		private countryService: CountryService,
		private toast: ToastrService,
		private location: Location,
		private router: Router,
		private route: ActivatedRoute,
		private objectUtils: ObjectUtils,
		private mapUtils: MapUtils,
	) {}

	private formatMapToCell(map: Map<string, string>): Cell[] {
		const cells = [];
		for (const [label, value] of map.entries()) {
			cells.push({ label, value });
		}
		return cells;
	}

	private loadCountryByCode(code: string): void {
		this.countryService.getByCode(code).subscribe({
			next: ([country]) => {
				this.country = country;
				if (country.borders) this.loadBordersCountry(country.borders);
			},
			error: async () => {
				this.toast.error("Unknown error on load country");
				this.goBack();
			},
			complete: () => {
				this.loading = false;
			},
		});
	}

	private loadBordersCountry(borders: string[]): void {
		this.countryService.getByCodes(borders).subscribe({
			next: (countries) => {
				this.borders = countries.map((country) => ({
					name: country.name.common,
					code: country.ccn3,
				}));
			},
			error: () => {
				this.toast.error("Unknown error on load country borders");
			},
		});
	}

	get firstGroup(): Cell[] {
		const data = new Map();
		this.mapUtils.setIfExists(data, "Native name", this.country.name.official);
		this.mapUtils.setIfExists(data, "Population", this.country.population?.toLocaleString());
		this.mapUtils.setIfExists(data, "Region", this.country.region);
		this.mapUtils.setIfExists(data, "Sub Region", this.country.subregion);
		this.mapUtils.setIfExists(data, "Capital", this.country.capital?.join(", "));
		return this.formatMapToCell(data);
	}

	get secondGroup(): Cell[] {
		const data = new Map();
		this.mapUtils.setIfExists(data, "Top Level Domain", this.country.tld?.join(", "));
		const currencies = this.objectUtils.formatValues(this.country.currencies, (currency) => currency.name);
		this.mapUtils.setIfExists(data, "Currencies", currencies);
		this.mapUtils.setIfExists(data, "Languages", this.objectUtils.formatValues(this.country.languages));
		return this.formatMapToCell(data);
	}

	async ngOnInit(): Promise<void> {
		this.route.params.subscribe((params) => {
			const countryCode: string = params["code"];
			this.loadCountryByCode(countryCode);
		});
	}

	async navigateToCountry(country: string) {
		await this.router.navigate(["country", country]);
	}

	goBack() {
		this.location.back();
	}
}
