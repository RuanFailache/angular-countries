import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { SessionStorageKey } from "~/constants/session-storage.constants";
import { Country } from "~/models/Country";

@Component({
	selector: "app-country-details",
	standalone: true,
	imports: [],
	templateUrl: "./country-details.component.html",
	styleUrl: "./country-details.component.scss",
})
export class CountryDetailsComponent implements OnInit {
	country: Country;

	constructor(private router: Router) {}

	async ngOnInit(): Promise<void> {
		const country = sessionStorage.getItem(SessionStorageKey.COUNTRY);
		if (country) this.country = JSON.parse(country);
		else await this.router.navigate([""]);
	}
}
