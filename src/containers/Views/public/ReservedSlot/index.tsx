import HeaderReservation from '@/components/HeaderReservation';
import ResourceDetailsReservation from '@/components/ResourceDetailsReservation';
import { UserDoesntExist } from '@/components/UserDoesntExist';
import { useResource } from '@/graphql/hooks/myResources/useResource';
import { useResourceFromPublicName } from '@/graphql/hooks/myResources/useResourceFromPublicName';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function ReservedSlotView() {
	const router = useRouter();
	const { publicName, id } = router.query;
	const publicNameString = typeof publicName === 'string' ? publicName : '';
	const idString = typeof id === 'string' ? id : '';
	console.log(id);

	const { resources, userDoesntExist } = useResourceFromPublicName({
		publicName: publicNameString,
	});
	const { resource } = useResource({ id: idString });

	if (!resource || userDoesntExist || !resources || resources.length === 0) {
		return <UserDoesntExist />;
	}

	const user = resources[0].user;
	const title = `${user.firstName} ${user.lastName}`;

	return (
		<>
			<HeaderReservation title={title} />
			<ResourceDetailsReservation
				resourceName={resource.name}
				resourceDescription={resource.description}
				resourceAvailableTime={resource.availableTime}
				resourceLocation={resource.location}
			/>
		</>
	);
}
