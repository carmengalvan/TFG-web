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
import { toast } from '../../../components/ui/use-toast';
import { useConnect } from './connect';

const items = [
	{
		id: 'lunes',
		label: 'Lunes',
	},
	{
		id: 'martes',
		label: 'Martes',
	},
	{
		id: 'miercoles',
		label: 'Miércoles',
	},
	{
		id: 'jueves',
		label: 'Jueves',
	},
	{
		id: 'viernes',
		label: 'Viernes',
	},
	{
		id: 'sabado',
		label: 'Sábado',
	},
	{
		id: 'domingo',
		label: 'Domingo',
	},
] as const;

const FormSchema = z.object({
	items: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: 'You have to select at least one item.',
	}),
});

export function CheckboxReactHookFormMultiple() {
	const { timeSlots, setTimeSlots, handleAddTimeSlot, handleRemoveTimeSlot } =
		useConnect();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			items: ['recents', 'home'],
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
	}

	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	useEffect(() => {
		form.setValue('items', selectedItems);
	}, [form.setValue, selectedItems]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 mt-10 ml-32"
			>
				<FormField
					control={form.control}
					name="items"
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
							{items.map((item) => (
								<FormItem
									key={item.id}
									className="flex items-center space-x-3 space-y-0"
								>
									<FormControl>
										<Checkbox
											checked={selectedItems.includes(item.id)}
											onCheckedChange={(checked) => {
												setSelectedItems((prevSelectedItems) =>
													checked
														? [...prevSelectedItems, item.id]
														: prevSelectedItems.filter((id) => id !== item.id)
												);
											}}
										/>
									</FormControl>
									<FormLabel className="font-normal text-lg">
										{item.label}
									</FormLabel>
									{selectedItems.includes(item.id) ? (
										<>
											<div className="flex flex-col">
												{timeSlots[item.id]?.map((timeSlot, slotIndex) => (
													<div
														key={`${item.id}-${slotIndex}`}
														className="flex items-center space-x-2"
													>
														<Input
															placeholder="Hora de inicio"
															value={timeSlot[0]}
															onChange={(e) => {
																const newTimeSlots = { ...timeSlots };
																newTimeSlots[item.id][slotIndex][0] =
																	e.target.value;
																setTimeSlots(newTimeSlots);
															}}
														/>
														<p className="mx-2"> - </p>
														<Input
															placeholder="Hora de final"
															value={timeSlot[1]}
															onChange={(e) => {
																const newTimeSlots = { ...timeSlots };
																newTimeSlots[item.id][slotIndex][1] =
																	e.target.value;
																setTimeSlots(newTimeSlots);
															}}
														/>
														{timeSlots[item.id]?.length >= 1 && (
															<X
																width={50}
																height={50}
																onClick={() => handleRemoveTimeSlot(item.id, 0)}
															/>
														)}
													</div>
												))}
											</div>
											<div className="flex items-center space-x-2">
												<Input placeholder="Hora de inicio" />
												<p className="mx-2"> - </p>
												<Input placeholder="Hora de final" />
												<PlusCircle
													width={50}
													height={50}
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
}
