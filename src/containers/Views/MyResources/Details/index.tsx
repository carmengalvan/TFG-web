import Header from '@/components/Header';
import Menu from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useConnect } from '../connect';

const FormSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
	available_time: z.number(),
	time_measurement: z.string({
		required_error: 'Please select an measurement to display.',
	}),
	start_date: z.date({
		required_error: 'Please select a date',
	}),
	end_date: z.date({
		required_error: 'Please select a date',
	}),
	location: z.string(),
});

export function MyResourcesDetailsView() {
	const { resources } = useConnect();

	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(2022, 0, 20), 20),
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<>
			<div className="flex flex-row w-full h-full">
				<div className="w-[350px]">
					<Menu
						resourcesNumber={
							resources.pageInfo ? resources.pageInfo.totalResults || 0 : 0
						}
					/>
				</div>
				<div className="w-full">
					<Header title="Crear nuevo recurso" />
					<div className="mt-16 flex flex-row">
						<div className="ml-10 w-3/5">
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input type="name" {...field} />
												</FormControl>
												<FormDescription>
													Introduce el nombre del recurso.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="flex flex-row">
										<div className="w-1/2">
											<FormField
												control={form.control}
												name="available_time"
												render={({ field }) => (
													<FormItem className="mt-10">
														<FormLabel>Duración</FormLabel>
														<FormControl>
															<Input type="available_time" {...field} />
														</FormControl>
														<FormDescription>
															Introduce la duración de la reserva del recurso.
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="w-1/2 ml-10">
											<FormField
												control={form.control}
												name="time_measurement"
												render={({ field }) => (
													<FormItem className="mt-[72px]">
														<Select
															onValueChange={field.onChange}
															defaultValue={field.value}
														>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Selecciona" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value="hours">hora/s</SelectItem>
																<SelectItem value="minutes">minutos</SelectItem>
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
									<FormField
										control={form.control}
										name="location"
										render={({ field }) => (
											<FormItem className="mt-10">
												<FormLabel>Ubicación</FormLabel>
												<FormControl>
													<Input type="location" {...field} />
												</FormControl>
												<FormDescription>
													Introduce la ubicación del recurso.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem className="mt-10">
												<FormLabel>Descripción</FormLabel>
												<FormControl>
													<Input type="description" {...field} />
												</FormControl>
												<FormDescription>
													Introduce la decripción del recurso.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="mt-10 mb-5">
										<Button type="submit">Continuar</Button>
									</div>
								</form>
							</Form>
						</div>
						<div className="w-2/5 ml-10">
							<p className="text-xl">Disponibilidad</p>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-8"
								>
									<FormField
										control={form.control}
										name="start_date"
										render={({ field }) => (
											<FormItem className="flex flex-col mt-10">
												<FormLabel>Fechas</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<Button
															id="date"
															variant={'outline'}
															className={cn(
																'w-[300px] justify-start text-left font-normal',
																!date && 'text-muted-foreground'
															)}
														>
															<CalendarIcon className="mr-2 h-4 w-4" />
															{date?.from ? (
																date.to ? (
																	<>
																		{format(date.from, 'LLL dd, y')} -{' '}
																		{format(date.to, 'LLL dd, y')}
																	</>
																) : (
																	format(date.from, 'LLL dd, y')
																)
															) : (
																<span>Pick a date</span>
															)}
														</Button>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
															initialFocus
															mode="range"
															defaultMonth={date?.from}
															selected={date}
															onSelect={setDate}
															numberOfMonths={2}
														/>
													</PopoverContent>
												</Popover>
												<FormDescription>
													Los días que estará disponible el recurso en creación.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</form>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
