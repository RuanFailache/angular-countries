import { Location, NgOptimizedImage } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { CountryService } from "~/api/country/country.service";
import { ButtonComponent } from "~/components/button/button.component";
import { Country } from "~/models/Country";
import { CountryBorderData } from "~/pages/country-details/country-details.types";

interface Cell {
	label: string;
	value: string;
}

@Component({
	selector: "app-country-details",
	standalone: true,
	imports: [MatIconModule, ButtonComponent, NgOptimizedImage, RouterLink],
	templateUrl: "./country-details.component.html",
	styleUrl: "./country-details.component.scss",
})
export class CountryDetailsComponent implements OnInit {
	loading = true;
	loadingBorders = true;

	country: Country;
	borders: CountryBorderData[] = [];

	constructor(
		private countryService: CountryService,
		private toast: ToastrService,
		private location: Location,
		private router: Router,
		private route: ActivatedRoute,
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
				else this.loadingBorders = false;
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
			complete: () => {
				this.loadingBorders = false;
			},
		});
	}

	get firstGroup(): Cell[] {
		const data = new Map();
		data.set("Native name", this.country.name.official);
		data.set("Population", this.country.population.toLocaleString());
		data.set("Region", this.country.region);
		data.set("Sub Region", this.country.subregion);
		data.set("Capital", this.country.capital.join(", "));
		return this.formatMapToCell(data);
	}

	get secondGroup(): Cell[] {
		const data = new Map();
		data.set("Top Level Domain", this.country.tld.join(", "));
		const currencies = Object.values(this.country.currencies).map((c) => c.name);
		data.set("Currencies", currencies.join(", "));
		data.set("Languages", Object.values(this.country.languages).join(", "));
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
