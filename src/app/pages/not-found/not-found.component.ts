import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { ButtonColor, ButtonComponent } from "~/components/button/button.component";

@Component({
	selector: "app-not-found",
	standalone: true,
	imports: [ButtonComponent, RouterLink],
	templateUrl: "./not-found.component.html",
	styleUrl: "./not-found.component.scss",
})
export class NotFoundComponent {
	protected readonly ButtonColor = ButtonColor;
}
