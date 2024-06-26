import {
	ResourceFromPublicNameDocument,
	ResourceFromPublicNameQuery,
	ResourceFromPublicNameQueryVariables,
} from '@/graphql/generated/types';
import { useQuery } from '@apollo/client';

export const useResourceFromPublicName = ({
	publicName,
}: { publicName?: string | string[] }) => {
	const { data } = useQuery<
		ResourceFromPublicNameQuery,
		ResourceFromPublicNameQueryVariables
	>(ResourceFromPublicNameDocument, {
		variables: {
			publicName: String(publicName),
		},
		skip: (!!publicName && typeof publicName !== 'string') || !publicName,
	});

	const resources = data?.resourceFromPublicName;
	const userDoesntExist = typeof publicName !== 'string';

	return {
		resources,
		userDoesntExist,
	};
};
