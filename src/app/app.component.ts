import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { PageHeaderComponent } from "./components/organisms/page-header/page-header.component";
import { Theme, ThemeService, ThemeType } from "./services/theme/theme.service";

@Component({
	selector: "app-root",
	standalone: true,
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	imports: [CommonModule, RouterOutlet, PageHeaderComponent],
})
export class AppComponent implements OnInit {
	protected theme: ThemeType = Theme.LIGHT;

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.getTheme().subscribe((theme) => {
			this.theme = theme;
		});
	}
}
