import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useDayAvailabilityActions } from '@/graphql/hooks/myDayAvailability/useDayAvailabilityActions';
import { useMyDayAvailability } from '@/graphql/hooks/myDayAvailability/useMyDayAvailability';
import { isSameDay, isWithinInterval } from 'date-fns';
import { PlusCircle, X } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CalendarSelectProps {
	resourceId: string;
	date: {
		from: Date;
		to: Date;
	};
}

export const CalendarSelect = ({ resourceId, date }: CalendarSelectProps) => {
	const form = useForm();
	const [selectedDays, setSelectedDays] = useState<SelectedDay[]>([]);
	const startDate = date.from;
	const endDate = date.to;

	const { getDaysAvailabilities } = useMyDayAvailability();
	const { updateDayAvailability } = useDayAvailabilityActions();

	const handleInputChange = (
		date: Date,
		id: string,
		field: 'startTime' | 'endTime',
		value: string
	) => {
		setSelectedDays((prevSelectedDays) => {
			const updatedSelectedDays = prevSelectedDays.map((selectedDay) => {
				if (isSameDay(selectedDay.date, date)) {
					const updatedTimeRange = selectedDay.timeRange?.map((timeRange) => {
						if (timeRange.id === id) {
							return {
								...timeRange,
								[field]: value,
							};
						}
						return timeRange;
					});
					return {
						...selectedDay,
						timeRange: updatedTimeRange,
					};
				}
				return selectedDay;
			});
			return updatedSelectedDays;
		});
	};

	const getNewSelectedDay = async (day: Date): Promise<SelectedDay> => {
		const myDayAvailability = await getDaysAvailabilities({
			variables: {
				input: {
					resourceId: resourceId,
					month: day.getMonth() + 1,
					year: day.getFullYear(),
				},
			},
			fetchPolicy: 'cache-and-network',
		});

		const selectedDayAvailability =
			myDayAvailability.data?.myDailyAvailability.find(
				(availability) => day && isSameDay(availability.day, day)
			);

		return {
			date: day,
			timeRange: selectedDayAvailability?.availabilities.map((avail) => ({
				id: avail.id,
				startTime: avail.startTime,
				endTime: avail.endTime,
			})),
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

	async function onSubmit() {
		try {
			for (const day of sortedSelectedDays.flat()) {
				for (const timeRange of day.timeRange?.flat() ?? []) {
					const response = await updateDayAvailability({
						dayAvailabilityId: timeRange.id,
						startTime: timeRange.startTime,
						endTime: timeRange.endTime,
					});
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)(e);
				}}
			>
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
								<FormField
									control={form.control}
									name="selectedDays"
									render={() => (
										<FormItem>
											{sortedSelectedDays.map((day) => (
												<FormItem key={day?.date?.getTime()}>
													<li
														className="mt-2 flex items-center"
														key={day?.date?.getTime()}
													>
														<div className="flex flex-row">
															<div className="flex flex-col">
																<p>{day?.date?.toLocaleDateString()}</p>
																{day.timeRange?.map((timeRange, index) => (
																	<div
																		// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
																		key={index}
																		className="flex items-center space-x-2 mt-2"
																	>
																		<FormItem>
																			<FormControl>
																				<Input
																					type="time"
																					defaultValue={timeRange.startTime}
																					onChange={(e) =>
																						handleInputChange(
																							day.date,
																							timeRange.id,
																							'startTime',
																							e.target.value
																						)
																					}
																				/>
																			</FormControl>
																		</FormItem>
																		<p className="mx-2"> - </p>
																		<FormItem>
																			<FormControl>
																				<Input
																					type="time"
																					defaultValue={timeRange.endTime}
																					onChange={(e) =>
																						handleInputChange(
																							day.date,
																							timeRange.id,
																							'endTime',
																							e.target.value
																						)
																					}
																				/>
																			</FormControl>
																		</FormItem>
																		<X />
																	</div>
																))}
															</div>
															<PlusCircle />
														</div>
													</li>
												</FormItem>
											))}
										</FormItem>
									)}
								/>
							</ul>
						</div>
					)}
				</div>
				<div className="mt-10 mb-5 ml-32">
					<Button type="submit">Guardar</Button>
				</div>
			</form>
		</Form>
	);
};
