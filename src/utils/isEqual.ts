
export function isPlainObject(value: any): boolean {
	return typeof value === 'object'
		&& value !== null
		&& value.constructor === Object
		&& Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: any): value is [] {
	return Array.isArray(value);
}

function isArrayOrObject(value: any): boolean {
	return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: any, rhs: any) {
	if (typeof lhs === 'string' && typeof rhs === 'string') {
		return lhs === rhs;
	}
	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}

	for (const [key, value] of Object.entries(lhs)) {
		// @ts-ignore
		const rightValue = rhs[key];
		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			if (isEqual(value, rightValue)) {
				continue;
			}
			return false;
		}

		if (value !== rightValue) {
			return false;
		}
	}


	return true;
}

export default isEqual;