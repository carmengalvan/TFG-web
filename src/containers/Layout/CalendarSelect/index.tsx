import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { PAGE_SIZE } from '@/globals/constants';
import { useMyDayAvailability } from '@/graphql/hooks/myDayAvailability/useMyDayAvailability';
import { isSameDay, isWithinInterval } from 'date-fns';
import { set } from 'lodash';
import { PlusCircle, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

interface CalendarSelectProps {
	startDate: Date;
	endDate: Date;
	date: DateRange;
}

export const CalendarSelect = ({
	startDate,
	endDate,
	date,
}: CalendarSelectProps) => {
	const [selectedDays, setSelectedDays] = useState<Date[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date>();

	const handleDayClick = (day: Date) => {
		setSelectedDate(day);
		if (
			(startDate &&
				endDate &&
				isWithinInterval(day, { start: startDate, end: endDate })) ||
			isSameDay(day, startDate)
		) {
			const isAlreadySelected = selectedDays.some((selectedDay) =>
				isSameDay(selectedDay, day)
			);

			if (isAlreadySelected) {
				setSelectedDays((prevSelectedDays) =>
					prevSelectedDays.filter((selectedDay) => !isSameDay(selectedDay, day))
				);
			} else {
				setSelectedDays((prevSelectedDays) => [...prevSelectedDays, day]);
			}
		}
	};
	const sortedSelectedDays = selectedDays
		.slice()
		.sort((a, b) => a.getTime() - b.getTime());

	const myDayAvailability = useMyDayAvailability({
		input: {
			month: selectedDate ? selectedDate.getMonth() + 1 : 1,
			year: selectedDate?.getFullYear() ?? 2024,
		},
		pagination: {
			page: 1,
			pageSize: PAGE_SIZE,
		},
	});

	const selectedDayAvailability =
		myDayAvailability.dailyAvailability.edges.find(
			(availability) =>
				selectedDate && isSameDay(availability.day, selectedDate)
		);

	return (
		<>
			<h2 className="mt-10 ml-32 text-2xl">Disponibilidad</h2>
			<p className="mt-5 ml-32">
				¿Hay algún día en el que tu recurso no esté disponible?
			</p>
			<div className="flex flex-row w-full mt-5 ml-28">
				<Calendar
					initialFocus
					mode="range"
					defaultMonth={date?.from}
					selected={{ from: startDate, to: endDate }}
					numberOfMonths={2}
					onDayClick={handleDayClick}
				/>
				{sortedSelectedDays.length > 0 && (
					<div className="ml-8">
						<p>Fechas seleccionadas:</p>
						<ul className="mt-2">
							{sortedSelectedDays.map((day) => (
								<li
									className="mt-2 flex items-center space-x-2"
									key={day.getTime()}
								>
									{day.toLocaleDateString()}
									<Input
										className="ml-5"
										type="time"
										defaultValue={selectedDayAvailability?.startTime}
									/>
									<p className="mx-2"> - </p>
									<Input
										type="time"
										defaultValue={selectedDayAvailability?.endTime}
									/>
									<X />
									<PlusCircle />
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
			<div className="mt-10 mb-5 ml-32">
				<Button type="submit">Guardar</Button>
			</div>
		</>
	);
};
