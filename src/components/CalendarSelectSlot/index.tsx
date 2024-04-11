import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';

interface CalendarSelectSlotProps {
	date: DateRange;
}

const CalendarSelectSlot = ({ date }: CalendarSelectSlotProps) => {
	const startDate = date.from;
	const endDate = date.to;

	return (
		<div className="flex flex-col w-full items-center justify-center">
			<div className="flex flex-col w-5/6 h-5/6 bg-white border border-gray-200 rounded-lg items-center">
				Selecciona fecha y hora
				<div className="flex flex-row mt-10">
					<div>
						<Calendar
							mode="range"
							selected={{ from: startDate, to: endDate }}
							className="rounded-md border"
						/>
					</div>
					<div>Slots</div>
				</div>
				<Button className="mt-10" type="submit">
					Guardar
				</Button>
			</div>
		</div>
	);
};

export default CalendarSelectSlot;
