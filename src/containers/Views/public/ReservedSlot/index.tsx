import HeaderReservation from '@/components/HeaderReservation';
import ResourceDetailsReservation from '@/components/ResourceDetailsReservation';
import { UserDoesntExist } from '@/components/UserDoesntExist';
import { useResourceFromPublicName } from '@/graphql/hooks/myResources/useResourceFromPublicName';
import { useRouter } from 'next/router';

export function ReservedSlotView() {
	const router = useRouter();
	const { publicName, id } = router.query;

	const { resources, userDoesntExist } = useResourceFromPublicName({
		publicName: publicName,
	});

	if (userDoesntExist || !resources || resources.length === 0) {
		return <UserDoesntExist />;
	}

	const user = resources[0].user;
	const title = `${user.firstName} ${user.lastName}`;

	return (
		<>
			<HeaderReservation title={title} />
			{id && typeof id === 'string' && <ResourceDetailsReservation id={id} />}
		</>
	);
}
