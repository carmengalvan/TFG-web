import { getDayOfWeek, getDaysBetweenDates } from '@/utils/getDaysBetweenDates';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../components/ui/button';
import { Checkbox } from '../../../components/ui/checkbox';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { useConnect } from './connect';

const FormSchema = z.object({
	weekdays: z
		.array(
			z.object({
				id: z.string(),
				label: z.string(),
				checked: z.boolean(),
			})
		)
		.refine((value) => value.some((item) => item), {
			message: 'You have to select at least one item.',
		}),
});

interface CheckboxReactHookFormMultipleProps {
	onButtonClick: () => void;
	resourceId: string;
	startDate: Date;
	endDate: Date;
}

export const CheckboxReactHookFormMultiple2 = ({
	onButtonClick,
	resourceId,
	startDate,
	endDate,
}: CheckboxReactHookFormMultipleProps) => {
	const {
		timeSlots,
		setTimeSlots,
		handleAddTimeSlot,
		handleRemoveTimeSlot,
		createDayAvailability,
	} = useConnect();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			weekdays: [
				{
					checked: false,
					label: 'Lunes',
					id: 'Monday',
				},
				{
					checked: false,
					label: 'Martes',
					id: 'Tuesday',
				},
			],
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
	}

	const weekdays = form.watch('weekdays');
	console.log('Weekdays', weekdays);

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)(e);
				}}
				className="space-y-8 mt-10 ml-32"
			>
				<FormField
					control={form.control}
					name="weekdays"
					render={() => (
						<FormItem>
							<div className="mb-4">
								<FormLabel className="text-base">
									Disponibilidad diaria
								</FormLabel>
								<FormDescription>
									Selecciona los días y franjas horarias en los que tu recurso
									estará disponible
								</FormDescription>
							</div>
							{weekdays.map((item) => (
								<FormItem
									key={item.id}
									className="flex items-center space-x-3 space-y-0"
								>
									<FormControl>
										<Checkbox
											checked={item.checked}
											onCheckedChange={() => {
												form.setValue(
													'weekdays',
													weekdays.map((day) => {
														if (day.id === item.id) {
															return {
																...day,
																checked: !day.checked,
															};
														}
														return day;
													})
												);
											}}
										/>
									</FormControl>
									<FormLabel className="font-normal text-lg">
										{item.label}
									</FormLabel>
									{item.checked ? (
										<>
											<div className="flex flex-col">
												{timeSlots[item.id]?.map((timeSlot, slotIndex) => (
													<div
														key={`${item.id}-${slotIndex}`}
														className="flex items-center space-x-2"
													>
														<FormItem>
															<FormControl>
																<Input
																	placeholder="Hora de inicio"
																	type="time"
																	value={timeSlot[0]}
																	onChange={(e) => {
																		const newTimeSlots = { ...timeSlots };
																		newTimeSlots[item.id][slotIndex][0] =
																			e.target.value;
																		setTimeSlots(newTimeSlots);
																	}}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>

														<p className="mx-2"> - </p>
														<FormItem>
															<FormControl>
																<Input
																	placeholder="Hora de final"
																	type="time"
																	value={timeSlot[1]}
																	onChange={(e) => {
																		const newTimeSlots = { ...timeSlots };
																		newTimeSlots[item.id][slotIndex][1] =
																			e.target.value;
																		setTimeSlots(newTimeSlots);
																	}}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
														{timeSlots[item.id]?.length >= 1 && (
															<X
																onClick={() =>
																	handleRemoveTimeSlot(item.id, slotIndex)
																}
															/>
														)}
													</div>
												))}
											</div>
											<div className="flex items-center space-x-2">
												<PlusCircle
													onClick={() => handleAddTimeSlot(item.id)}
												/>
											</div>
										</>
									) : (
										<div className="flex items-center space-x-2">
											<p className="text-red-600">No seleccionado</p>
										</div>
									)}
								</FormItem>
							))}
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Continuar</Button>
			</form>
		</Form>
	);
};
