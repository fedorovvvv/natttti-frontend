/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/ban-ts-comment */
export const encodeQueryData = (data: Record<string, any>, postfix?: string): string => {
	const str = []
	let dataKey
	for (dataKey in data) {
		if (Object.prototype.hasOwnProperty.call(data, dataKey)) {
			const key = postfix ? postfix + '[]' : dataKey
			let value = data[dataKey]
      if (value) {
        if (value instanceof Date) value = value.toISOString()
        str.push(
          value !== null && typeof value === 'object'
            ? encodeQueryData(value, key)
            : encodeURIComponent(key) + '=' + encodeURIComponent(value),
        )
      }
		}
	}
	return str.join('&').replaceAll('.', '%2E')
}