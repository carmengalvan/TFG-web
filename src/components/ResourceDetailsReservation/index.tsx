import { generateRandomColor } from '@/utils/generateRandomColor';
import { Clock9, Info, MapPin } from 'lucide-react';

interface ResourceDetailsReservationProps {
	resourceName: string;
	resourceDescription: string;
	resourceAvailableTime: number;
	resourceLocation: string | undefined;
	children?: React.ReactNode;
}

const ResourceDetailsReservation = ({
	resourceName,
	resourceDescription,
	resourceAvailableTime,
	resourceLocation,
	children,
}: ResourceDetailsReservationProps) => {
	const cardColor = generateRandomColor();
	return (
		<div className="flex justify-center items-center h-screen">
			<div
				className="flex flex-row w-5/6 h-5/6 bg-white border border-gray-200 rounded-lg"
				style={{ borderLeft: `15px solid ${cardColor}` }}
			>
				<div className="mt-20 ml-20 flex flex-col">
					<div className="text-4xl font-semibold">{resourceName}</div>
					<div className="mt-10 flex flex-row">
						<Info />
						<div className="text-xl ml-4 mb-1">{resourceDescription}</div>
					</div>
					<div className="mt-10 flex flex-row">
						<Clock9 />
						<div className="text-xl ml-4">
							Duración:{' '}
							{resourceAvailableTime >= 60
								? `${resourceAvailableTime / 60} hora/s`
								: `${resourceAvailableTime} minutos`}
						</div>
					</div>
					{resourceLocation && (
						<div className="mt-10 flex flex-row">
							<MapPin />
							<div className="text-xl ml-4">Ubicación: {resourceLocation}</div>
						</div>
					)}
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default ResourceDetailsReservation;
