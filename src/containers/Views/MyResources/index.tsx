import CustomCard from '@/components/Card';
import Header from '@/components/Header';
import Menu from '@/components/Sidebar';
import { useConnect } from './connect';

export function MyResourcesView() {
	const { resources, loadMore } = useConnect();

	return (
		<>
			<div className="flex flex-row w-full h-full">
				<div className="w-[350px]">
					<Menu />
				</div>
				<div className="w-full">
					<Header title="Mis recursos" />
					{resources.edges.map((resource) => (
						<CustomCard
							key={resource.id}
							title={resource.name}
							startDate={new Date(resource.startDate)}
							endDate={new Date(resource.endDate)}
							availableTime={resource.availableTime}
						/>
					))}
				</div>
			</div>
		</>
	);
}
