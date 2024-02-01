import Header from '@/components/Header';
import Menu from '@/components/Sidebar';

export function MyResourcesView() {
	return (
		<>
			<div className="hidden flex-col md:flex">
				<Menu />
				<Header title="Mis recursos" />
			</div>
		</>
	);
}
