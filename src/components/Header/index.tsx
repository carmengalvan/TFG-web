import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface HeaderProps {
	title: string;
}

const Header = ({ title }: HeaderProps) => {
	return (
		<div className="text-center mt-10">
			<div className="flex items-center">
				<h1 className="flex-1 font-bold text-5xl text-teal-600">{title}</h1>
				<div className="mr-10">
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>Z1</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</div>
	);
};

export default Header;
