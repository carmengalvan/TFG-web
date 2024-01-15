import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { RegisterDocument, RegisterMutation, RegisterMutationVariables, useRegisterMutation } from '../generated';

export const useAuthActions = () => {
  const [registerMutation] = useRegisterMutation();

  const [performRegister, { loading: isRegisterLoading }] =
    useMutation<RegisterMutation, RegisterMutationVariables>(
      RegisterDocument,
    );

  const handleRegister = useCallback(
    async (input: RegisterMutationVariables['input']) => {
      const raw = await performRegister({
        variables: { input },
      });

      return raw.data?.register;
    },
    [registerMutation]
  );

  return {
    handleRegister,
    isRegisterLoading,
  };
};
