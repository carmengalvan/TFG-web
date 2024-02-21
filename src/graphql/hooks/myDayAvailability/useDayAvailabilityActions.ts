import {
	CreateDayAvailabilityDocument,
	CreateDayAvailabilityMutation,
	CreateDayAvailabilityMutationVariables,
	UpdateDayAvailabilityDocument,
	UpdateDayAvailabilityMutation,
	UpdateDayAvailabilityMutationVariables,
} from '@/graphql/generated/types';
import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

export function useDayAvailabilityActions() {
	const [performCreate] = useMutation<
		CreateDayAvailabilityMutation,
		CreateDayAvailabilityMutationVariables
	>(CreateDayAvailabilityDocument);

	const [performUpdate] = useMutation<
		UpdateDayAvailabilityMutation,
		UpdateDayAvailabilityMutationVariables
	>(UpdateDayAvailabilityDocument);

	const createDayAvailability = useCallback(
		async (variables: CreateDayAvailabilityMutationVariables) => {
			const raw = await performCreate({
				variables,
			});
			return raw.data?.createDayAvailability;
		},
		[performCreate]
	);

	const updateDayAvailability = useCallback(
		async (input: UpdateDayAvailabilityMutationVariables['input']) => {
			const raw = await performUpdate({
				variables: { input },
			});
			return raw.data?.updateDayAvailability;
		},
		[performUpdate]
	);

	return {
		createDayAvailability,
		updateDayAvailability,
	};
}
