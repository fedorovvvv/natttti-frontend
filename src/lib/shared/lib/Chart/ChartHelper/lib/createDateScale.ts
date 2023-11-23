import { clearDate, getAllDatesBetween } from '$shared/lib/Date'

export const createDateScale = (from: Date, to: Date) => {
	const dates = getAllDatesBetween(clearDate(from), clearDate(to))
	return {
		days: dates
	}
}
