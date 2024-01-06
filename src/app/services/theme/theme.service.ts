import { Injectable } from "@angular/core";
import { ValueOf } from "../../utils/type.utils";
import { BehaviorSubject, Observable } from "rxjs";

export const Theme = {
	LIGHT: "light",
	DARK: "dark",
} as const;

export type ThemeType = ValueOf<typeof Theme>;

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	private theme = new BehaviorSubject<ThemeType>(Theme.LIGHT);

	public getTheme(): Observable<ThemeType> {
		return this.theme.asObservable();
	}

	public toggleTheme(): void {
		const currentTheme = this.theme.value;
		if (currentTheme === Theme.DARK) this.theme.next(Theme.LIGHT);
		else this.theme.next(Theme.DARK);
	}
}
