import HeaderReservation from '@/components/HeaderReservation';
import { UserDoesntExist } from '@/components/UserDoesntExist';
import { CardResource } from '@/containers/Layout/CardResource';
import { useResourceFromPublicName } from '@/graphql/hooks/myResources/useResourceFromPublicName';
import { format, isWithinInterval, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/router';

export function ResourceReservationView() {
	const router = useRouter();
	const { publicName } = router.query;

	if (typeof publicName !== 'string') {
		return <div>Cargando...</div>;
	}

	const { resources } = useResourceFromPublicName({ publicName });

	if (!resources || resources.length === 0) {
		return <UserDoesntExist publicName={publicName} />;
	}

	const user = resources?.[0].user;

	if (!user) {
		return <div>Cargando...</div>;
	}

	const title = `${user.firstName} ${user.lastName}`;
	const cards = resources.map((resource) => {
		const startDate = parseISO(resource.startDate);
		const endDate = parseISO(resource.endDate);

		const formattedStartDate = format(startDate, "d 'de' MMMM", {
			locale: es,
		});
		const formattedEndDate = format(endDate, "d 'de' MMMM", {
			locale: es,
		});
		const dateRange = `${formattedStartDate} - ${formattedEndDate}`;

		const isAvailableNow = isWithinInterval(new Date(), {
			start: startDate,
			end: endDate,
		});
		const availability = isAvailableNow ? 'Disponible ahora' : 'No disponible';
		const id = resource.id;

		return (
			<CardResource
				key={resource.id}
				resource={resource}
				dateRange={dateRange}
				availability={availability}
				publicName={publicName}
				id={id}
			/>
		);
	});

	return (
		<>
			<HeaderReservation title={title} />
			<section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
				{cards}
			</section>
		</>
	);
}
