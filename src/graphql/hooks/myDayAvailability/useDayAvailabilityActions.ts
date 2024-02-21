import {
	CreateDayAvailabilityDocument,
	CreateDayAvailabilityMutation,
	CreateDayAvailabilityMutationVariables,
	DeleteDayAvailabilityDocument,
	DeleteDayAvailabilityMutation,
	DeleteDayAvailabilityMutationVariables,
	UpdateDayAvailabilityDocument,
	UpdateDayAvailabilityMutation,
	UpdateDayAvailabilityMutationVariables,
} from '@/graphql/generated/types';
import { ApolloError, useMutation } from '@apollo/client';
import { useCallback } from 'react';

export function useDayAvailabilityActions() {
	const [performCreate] = useMutation<
		CreateDayAvailabilityMutation,
		CreateDayAvailabilityMutationVariables
	>(CreateDayAvailabilityDocument);

	const [performDelete] = useMutation<
		DeleteDayAvailabilityMutation,
		DeleteDayAvailabilityMutationVariables
	>(DeleteDayAvailabilityDocument);

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

	const deleteDayAvailability = useCallback(
		async (id: DeleteDayAvailabilityMutationVariables['id']) => {
			try {
				const { data } = await performDelete({
					variables: { id },
				});
				if (data?.deleteDayAvailability) {
					return true;
				}
			} catch (e) {
				if (e instanceof ApolloError) {
					throw e;
				}
			}
		},
		[performDelete]
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
		deleteDayAvailability,
		updateDayAvailability,
	};
}
