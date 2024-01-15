import { Component, OnInit } from "@angular/core";

import { ThemeService, ThemeType } from "~/services/theme/theme.service";

@Component({
	selector: "app-loading",
	standalone: true,
	imports: [],
	templateUrl: "./loading.component.html",
	styleUrl: "./loading.component.scss",
})
export class LoadingComponent implements OnInit {
	theme: ThemeType;

	constructor(private themeService: ThemeService) {}

	ngOnInit() {
		this.themeService.getTheme().subscribe((currentTheme) => {
			this.theme = currentTheme;
		});
	}
}
