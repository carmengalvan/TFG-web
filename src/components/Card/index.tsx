import {
	CalendarDays,
	ChevronDownIcon,
	CircleIcon,
	Settings,
	Settings2,
	Trash2,
} from 'lucide-react';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface CustomCardProps {
	title: string;
	startDate: Date;
	endDate: Date;
	availableTime: number;
}

const CustomCard = ({
	title,
	startDate,
	endDate,
	availableTime,
}: CustomCardProps) => {
	return (
		<div className="mt-10">
			<Card className="w-11/12 ml-5">
				<CardHeader className="grid grid-cols-[auto,1fr_110px] items-start gap-4 space-y-0">
					<div className="flex items-center">
						<CircleIcon className="mr-1 fill-green-500 text-green-500" />
					</div>
					<div className="space-y-1">
						<CardTitle>{title}</CardTitle>
						<CardDescription>
							Disponibilidad: {startDate.toDateString()} -{' '}
							{endDate.toDateString()}
						</CardDescription>
					</div>
					<div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
						<Button variant="secondary" className="px-1 shadow-none">
							<Settings2 className="mr-2 h-4 w-4" />
							Settings
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="secondary" className="px-2 shadow-none">
									<ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								alignOffset={-5}
								className="w-[200px]"
								forceMount
							>
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<Settings className="mr-2 h-4 w-4" />
										<span>Editar</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Trash2 className="mr-2 h-4 w-4" />
										<span>Eliminar</span>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex space-x-4 text-sm text-muted-foreground">
						<div className="flex items-center">
							<CalendarDays className="mr-1 h-3 w-3" />
							Tiempo disponible por reserva: {'   '}
							{availableTime} minutos
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default CustomCard;