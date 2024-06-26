import { eachDayOfInterval, format } from 'date-fns';

export function getDaysBetweenDates(
	startDate: Date,
	endDate: Date,
	weekdays: string[]
) {
	const matchingDates: string[] = [];

	const daysBetween = eachDayOfInterval({
		start: startDate,
		end: endDate,
	});

	for (const day of daysBetween) {
		if (weekdays.includes(format(day, 'EEEE'))) {
			matchingDates.push(format(day, 'yyyy-MM-dd'));
		}
	}

	return matchingDates;
}

export const daysOfWeek = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

export function getDayOfWeek(dateString: string): string {
	const date = new Date(dateString);
	return daysOfWeek[date.getDay() - 1];
}
