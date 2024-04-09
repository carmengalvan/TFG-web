import { useResource } from '@/graphql/hooks/myResources/useResource';
import { generateRandomColor } from '@/utils/generateRandomColor';
import { Clock9, Info, MapPin } from 'lucide-react';

interface ResourceDetailsReservationProps {
	id: string;
	children?: React.ReactNode;
}

const ResourceDetailsReservation = ({
	id,
	children,
}: ResourceDetailsReservationProps) => {
	console.log(id);
	const { resource, isResourceLoading } = useResource({ id });

	const cardColor = generateRandomColor();
	return (
		<div className="flex justify-center items-center h-screen">
			<div
				className="flex flex-row w-5/6 h-5/6 bg-white border border-gray-200 rounded-lg"
				style={{ borderLeft: `15px solid ${cardColor}` }}
			>
				{isResourceLoading ? (
					<div>Cargando...</div>
				) : (
					<div className="mt-20 ml-20 flex flex-col">
						<div className="text-4xl font-semibold">{resource?.name}</div>
						<div className="mt-10 flex flex-row">
							<Info />
							<div className="text-xl ml-4 mb-1">{resource?.description}</div>x
						</div>
						<div className="mt-10 flex flex-row">
							<Clock9 />
							<div className="text-xl ml-4">
								Duración:{' '}
								{resource?.availableTime
									? resource.availableTime >= 60
										? `${resource.availableTime / 60} hora/s`
										: `${resource.availableTime} minutos`
									: 'No disponible'}
							</div>
						</div>
						{resource?.location && (
							<div className="mt-10 flex flex-row">
								<MapPin />
								<div className="text-xl ml-4">
									Ubicación: {resource.location}
								</div>
							</div>
						)}
					</div>
				)}
				<div>{children}</div>
			</div>
		</div>
	);
};

export default ResourceDetailsReservation;
