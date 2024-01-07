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
	@Input({ required: true }) options: T[];
	@Input({ required: true }) formatOption: (option: T) => string;

	@Output() changeOption: EventEmitter<T> = new EventEmitter<T>();

	theme: ThemeType;
	selectedOption: T;
	isActive = false;

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.getTheme().subscribe((currentTheme) => {
			this.theme = currentTheme;
		});
	}

	get selectedOptionText(): string {
		return this.selectedOption
			? this.formatOption(this.selectedOption)
			: this.placeholder;
	}

	toggleDropdown() {
		this.isActive = !this.isActive;
	}

	selectOption(option: T) {
		this.selectedOption = option;
		this.changeOption.emit(option);
		this.toggleDropdown();
	}
}
