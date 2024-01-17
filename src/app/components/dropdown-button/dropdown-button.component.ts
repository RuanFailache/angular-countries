import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { ThemeService, ThemeType } from "~/services/theme/theme.service";

@Component({
	selector: "app-dropdown-button",
	standalone: true,
	imports: [MatIconModule],
	templateUrl: "./dropdown-button.component.html",
	styleUrl: "./dropdown-button.component.scss",
})
export class DropdownButtonComponent<T> implements OnInit {
	@Input() placeholder: string = "";
	@Input({ required: true }) value: T;
	@Input({ required: true }) options: T[];
	@Input({ required: true }) formatOption: (option: T) => string;

	@Output() changeOption = new EventEmitter<T>();

	theme: ThemeType;
	isActive = false;

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.getTheme().subscribe((currentTheme) => {
			this.theme = currentTheme;
		});
	}

	get selectedOption(): string {
		return this.value ? this.formatOption(this.value) : this.placeholder;
	}

	toggleDropdown() {
		this.isActive = !this.isActive;
	}

	selectOption(option: T) {
		this.changeOption.emit(option);
		this.toggleDropdown();
	}
}
