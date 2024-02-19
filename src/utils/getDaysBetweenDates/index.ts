import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';

export function getDaysBetweenDates(
	startDate: Date,
	endDate: Date,
	weekdays: string[]
) {
	const startDayOfWeek = startOfWeek(startDate);
	const endDayOfWeek = endOfWeek(endDate);

	const matchingDates: string[] = [];

	const daysBetween = eachDayOfInterval({
		start: startDayOfWeek,
		end: endDayOfWeek,
	});
	for (const day of daysBetween) {
		if (weekdays.includes(format(day, 'EEEE'))) {
			matchingDates.push(format(day, 'yyyy-MM-dd'));
		}
	}

	return matchingDates;
}

export function getDayOfWeek(dateString: string): string {
	const daysOfWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const date = new Date(dateString);
	return daysOfWeek[date.getDay()];
}
