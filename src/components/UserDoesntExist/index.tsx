interface UserDoesntExistProps {
	publicName: string;
}

export const UserDoesntExist = ({ publicName }: UserDoesntExistProps) => {
	return (
		<div className="bg-gray-100 p-8 rounded-lg shadow-md">
			<p className="text-lg text-gray-800 text-center">
				El usuario {publicName} no existe o no tiene recursos disponibles.
			</p>
		</div>
	);
};
