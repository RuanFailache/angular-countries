import { NgClass } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

import { Theme, ThemeService, ThemeType } from "~/services/theme/theme.service";

@Component({
	selector: "app-page-header",
	standalone: true,
	imports: [MatIconModule, NgClass, RouterLink],
	templateUrl: "./page-header.component.html",
	styleUrl: "./page-header.component.scss",
})
export class PageHeaderComponent implements OnInit {
	theme: ThemeType;

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.getTheme().subscribe((theme) => {
			this.theme = theme;
		});
	}

	get buttonText(): string {
		return this.theme === Theme.DARK ? "Dark Mode" : "Light Mode";
	}

	get icon(): string {
		return this.theme === Theme.DARK ? "dark_mode" : "light_mode";
	}

	onToggleTheme() {
		this.themeService.toggleTheme();
	}
}
