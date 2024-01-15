import { Injectable } from "@angular/core";

@Injectable()
export class ObjectUtils {
	formatValues<T>(object?: Record<string, T>, mapValue?: (value: T) => string, separator = ", "): string {
		if (!object) return "-";
		const values = Object.values(object);
		if (mapValue) return values.map(mapValue).join(separator);
		return values.join(separator);
	}
}
