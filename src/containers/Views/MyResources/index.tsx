import CustomCard from '@/components/Card';
import Header from '@/components/Header';
import Menu from '@/components/Sidebar';

export function MyResourcesView() {
	const resourceData = [
		{
			id: 1,
			title: 'Recurso 1',
			startDate: new Date('2024-01-01'),
			endDate: new Date('2024-01-10'),
			availableTime: 30,
		},
		{
			id: 2,
			title: 'Recurso 2',
			startDate: new Date('2024-02-15'),
			endDate: new Date('2024-02-28'),
			availableTime: 45,
		},
	];

	return (
		<>
			<div className="flex flex-row w-full h-full">
				<div className="w-[350px]">
					<Menu />
				</div>
				<div className="w-full">
					<Header title="Mis recursos" />
					{resourceData.map((resource) => (
						<CustomCard
							key={resource.id}
							title={resource.title}
							startDate={resource.startDate}
							endDate={resource.endDate}
							availableTime={resource.availableTime}
						/>
					))}
				</div>
			</div>
		</>
	);
}
