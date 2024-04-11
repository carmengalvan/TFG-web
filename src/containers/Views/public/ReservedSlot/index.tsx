import CalendarSelectSlot from '@/components/CalendarSelectSlot';
import HeaderReservation from '@/components/HeaderReservation';
import ResourceDetailsReservation from '@/components/ResourceDetailsReservation';
import { UserDoesntExist } from '@/components/UserDoesntExist';
import { useResource } from '@/graphql/hooks/myResources/useResource';
import { useRouter } from 'next/router';
import React from 'react';
import { DateRange } from 'react-day-picker';

export function ReservedSlotView() {
	const router = useRouter();
	const { id } = router.query;

	const { resource, isResourceLoading } = useResource({ id: id });

	const defaultDate = {
		from: resource ? new Date(resource.startDate) : undefined,
		to: resource ? new Date(resource.endDate) : undefined,
	};

	const title = `${resource?.user.firstName} ${resource?.user.lastName}`;

	return (
		<>
			{resource ? (
				<>
					<HeaderReservation title={title} />
					<ResourceDetailsReservation
						resource={resource}
						isResourceLoading={isResourceLoading}
					>
						<CalendarSelectSlot
							date={{ from: defaultDate?.from, to: defaultDate?.to }}
						/>
					</ResourceDetailsReservation>
				</>
			) : (
				<UserDoesntExist />
			)}
		</>
	);
}
