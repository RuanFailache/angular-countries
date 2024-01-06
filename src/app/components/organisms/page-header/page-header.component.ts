import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import {
	Theme,
	ThemeService,
	ThemeType,
} from "../../../services/theme/theme.service";
import { NgClass } from "@angular/common";

@Component({
	selector: "app-page-header",
	standalone: true,
	imports: [MatIconModule, NgClass],
	templateUrl: "./page-header.component.html",
	styleUrl: "./page-header.component.scss",
})
export class PageHeaderComponent implements OnInit {
	theme: ThemeType = Theme.LIGHT;

	themeMode: string = this.theme === Theme.DARK ? "Dark Mode" : "Light Mode";

	themeIcon: string = this.theme === Theme.DARK ? "dark_mode" : "light_mode";

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.getTheme().subscribe((theme) => {
			this.theme = theme;
		});
	}

	onToggleTheme() {
		this.themeService.toggleTheme();
	}

	protected readonly Theme = Theme;
}
