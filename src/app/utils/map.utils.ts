import { Injectable } from "@angular/core";

@Injectable()
export class MapUtils {
	setIfExists(map: Map<string, string>, key: string, value: string, defaultValue?: string): void {
		if (value) map.set(key, value);
		else if (defaultValue) map.set(key, defaultValue);
	}
}
