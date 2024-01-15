import { Injectable } from "@angular/core";

@Injectable()
export class MapUtils {
	setIfExists(map: Map<string, string>, key: string, value: string, defaultValue = "-") {
		if (value) map.set(key, value);
		else map.set(key, defaultValue);
	}
}
