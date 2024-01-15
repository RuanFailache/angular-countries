import { Injectable } from "@angular/core";

@Injectable()
export class MapUtils {
	setIfExists<Key, Value>(map: Map<Key, Value>, key: Key, value: Value) {
		if (value) map.set(key, value);
	}
}
