import {
	CreateResourceDocument,
	CreateResourceMutation,
	CreateResourceMutationVariables,
} from '@/graphql/generated/types';
import { useMutation } from '@apollo/client/react';
import { useCallback } from 'react';

export function useResourceActions() {
	const [performCreate, { loading: isCreateLoading }] = useMutation<
		CreateResourceMutation,
		CreateResourceMutationVariables
	>(CreateResourceDocument);

	const createResource = useCallback(
		async (input: CreateResourceMutationVariables['input']) => {
			const raw = await performCreate({
				variables: { input },
			});
			return raw.data?.createResource;
		},
		[performCreate]
	);

	return {
		createResource,
		isCreateLoading,
	};
}
