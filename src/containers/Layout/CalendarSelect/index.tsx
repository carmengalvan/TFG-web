import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { PAGE_SIZE } from '@/globals/constants';
import { useMyDayAvailability } from '@/graphql/hooks/myDayAvailability/useMyDayAvailability';
import { isSameDay, isWithinInterval } from 'date-fns';
import { PlusCircle, X } from 'lucide-react';
import React, { useState } from 'react';

interface CalendarSelectProps {
	date: {
		from: Date;
		to: Date;
	};
}

type SelectedDay = {
	date: Date;
	timeRange: {
		startTime: string;
		endTime: string;
	}[];
};

export const CalendarSelect = ({ date }: CalendarSelectProps) => {
	const [selectedDays, setSelectedDays] = useState<SelectedDay[]>([]);
	const startDate = date.from;
	const endDate = date.to;

	const { getDaysAvailabilities } = useMyDayAvailability();

	const getNewSelectedDay = async (day: Date): Promise<SelectedDay> => {
		const myDayAvailability = await getDaysAvailabilities({
			variables: {
				input: {
					month: day.getMonth() + 1,
					year: day.getFullYear(),
				},
				pagination: {
					page: 1,
					pageSize: PAGE_SIZE,
				},
			},
			fetchPolicy: 'cache-and-network',
		});

		const selectedDayAvailability =
			myDayAvailability.data?.myDailyAvailability.edges.find(
				(availability) => day && isSameDay(availability.day, day)
			);

		return {
			date: day,
			timeRange: [
				{
					startTime: selectedDayAvailability?.startTime ?? '',
					endTime: selectedDayAvailability?.endTime ?? '',
				},
			],
		};
	};

	const handleDayClick = async (day: Date) => {
		if (
			(startDate &&
				endDate &&
				isWithinInterval(day, { start: startDate, end: endDate })) ||
			isSameDay(day, startDate)
		) {
			const isAlreadySelected = selectedDays.some((selectedDay) =>
				isSameDay(selectedDay.date, day)
			);

			if (isAlreadySelected) {
				setSelectedDays((prevSelectedDays) =>
					prevSelectedDays.filter(
						(selectedDay) => !isSameDay(selectedDay.date, day)
					)
				);
			} else {
				const newSelectedDay = await getNewSelectedDay(day);
				setSelectedDays((prevSelectedDays) => [
					...prevSelectedDays,
					newSelectedDay,
				]);
			}
		}
	};
	const sortedSelectedDays = selectedDays
		.slice()
		.sort((a, b) => a.date.getTime() - b.date.getTime());

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
									key={day?.date?.getTime()}
								>
									{day?.date?.toLocaleDateString()}
									<Input
										className="ml-5"
										type="time"
										defaultValue={day?.timeRange?.[0].startTime}
									/>
									<p className="mx-2"> - </p>
									<Input
										type="time"
										defaultValue={day?.timeRange?.[0].endTime}
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
