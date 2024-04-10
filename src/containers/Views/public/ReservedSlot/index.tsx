import HeaderReservation from '@/components/HeaderReservation';
import ResourceDetailsReservation from '@/components/ResourceDetailsReservation';
import { UserDoesntExist } from '@/components/UserDoesntExist';
import { useResource } from '@/graphql/hooks/myResources/useResource';
import { useRouter } from 'next/router';

export function ReservedSlotView() {
	const router = useRouter();
	const { id } = router.query;

	const { resource, isResourceLoading } = useResource({ id: id });

	if (!resource) {
		return <UserDoesntExist />;
	}
	const title = `${resource.user.firstName} ${resource.user.lastName}`;

	return (
		<>
			<HeaderReservation title={title} />
			<ResourceDetailsReservation
				resource={resource}
				isResourceLoading={isResourceLoading}
			/>
		</>
	);
}
