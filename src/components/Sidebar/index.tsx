import { cn } from '@/lib/utils';
import {
	CalendarClock,
	HelpCircle,
	LogOutIcon,
	Plus,
	Rocket,
	User,
} from 'lucide-react';
import React from 'react';
import { Separator } from '../ui/separator';
import { TooltipProvider } from '../ui/tooltip';
import { Nav } from './components';

const Menu = () => {
	return (
		<TooltipProvider delayDuration={0}>
			<div className={cn('max-w-[350px]')}>
				<div
					className={cn('flex h-[52px] items-center justify-center', 'px-2')}
				>
					Menú
				</div>
				<Separator />
				<Nav
					links={[
						{
							title: 'Mi perfil',
							icon: User,
							variant: 'ghost',
						},
						{
							title: 'Ayuda',
							icon: HelpCircle,
							variant: 'ghost',
						},
					]}
				/>
				<Separator />
				<Nav
					links={[
						{
							title: 'Mis recursos',
							label: '5',
							icon: Rocket,
							variant: 'default',
						},
						{
							title: 'Próximos eventos',
							label: '7',
							icon: CalendarClock,
							variant: 'ghost',
						},
						{
							title: 'Nuevo recurso',
							icon: Plus,
							variant: 'ghost',
						},
					]}
				/>
				<Separator />
				<Nav
					links={[
						{
							title: 'Cerrar sesión',
							icon: LogOutIcon,
							variant: 'ghost',
						},
					]}
				/>
			</div>
		</TooltipProvider>
	);
};

export default Menu;
