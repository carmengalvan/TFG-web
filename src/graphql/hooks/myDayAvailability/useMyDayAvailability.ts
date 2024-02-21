import {
	MonthInput,
	MyDailyAvailabilityDocument,
	MyDailyAvailabilityQuery,
	MyDailyAvailabilityQueryVariables,
	PaginationInput,
} from '@/graphql/generated/types';
import { FetchPolicy, useQuery } from '@apollo/client';

export const useMyDayAvailability = ({
	input,
	pagination,
}: {
	input?: MonthInput;
	pagination?: PaginationInput;
	fetchPolicy?: FetchPolicy;
	pollInterval?: number;
}) => {
	const { data } = useQuery<
		MyDailyAvailabilityQuery,
		MyDailyAvailabilityQueryVariables
	>(MyDailyAvailabilityDocument, {
		variables: {
			input: {
				month: input?.month || 1,
				year: input?.year || 2024,
			},
			pagination: {
				...pagination,
			},
		},
	});

	const dailyAvailability = data?.myDailyAvailability.edges ?? [];

	return {
		dailyAvailability: {
			edges: dailyAvailability.filter(
				({ id }, index, self) =>
					index === self.findIndex(({ id: findId }) => findId === id)
			),
			pageInfo: data?.myDailyAvailability.pageInfo,
		},
	};
};
