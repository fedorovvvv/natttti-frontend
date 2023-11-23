import dayjs from 'dayjs'
import { findNearest, unifyArray } from '../array'
import type { WeekDay } from './types'

export const getDayName = (date: Date, format = 'dd') => {
	if (date) {
		return dayjs(date).locale('en').format(format)
	}
	return
}

export const getAllDatesBetween = (dateFrom: Date, dateTo: Date) => {
	dateFrom && (dateFrom = new Date(dateFrom))
	dateTo && (dateTo = new Date(dateTo))
	const dateArray = []
	if (dateFrom && dateTo) {
		let currentDate = dateFrom
		while (currentDate <= dateTo) {
			dateArray.push(new Date(currentDate))
			currentDate = dayjs(currentDate).add(1, 'day').toDate()
		}
	}
	return dateArray
}

export const getAllDaysBetween = (dateFrom: Date, dateTo: Date, unique = false): WeekDay[] => {
	const days = getAllDatesBetween(dateFrom, dateTo).map((d) => getDayName(d))
	return unique ? unifyArray(days) : days
}

export const normalizeDateOffset = (date?: string | Date) => {
	if (!date) return
	const _date = new Date(date)
	return new Date(+_date - _date?.getTimezoneOffset() * 60 * 1000)
}

export const getJSONDate = (date: Date) => {
	return normalizeDateOffset(date)
}

export const sortDates = <T extends Date[]>(
	dates: T,
	sortFn: (a: Date, b: Date) => number = (a, b) => +a - +b
): T => {
	return dates?.sort(sortFn)
}

export const findNearestDate = (current: Date, dates: Date[]) => {
	const found = findNearest(
		+current,
		dates.map((d) => +d)
	)
	return found && new Date(found)
}

export const clearDate = (date: Date) =>
	dayjs(date).hour(0).minute(0).second(0).millisecond(0).toDate()

export const isDifferentDates = (dates: Date[]) => {
	return dates.every((current, index, arr) => {
		return +clearDate(current) === +clearDate(arr[0])
	})
}
