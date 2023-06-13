import { FetchResult, MutationFunctionOptions, OperationVariables } from "@apollo/client";

export const mutations = async (
	handler: (options?: MutationFunctionOptions<any, OperationVariables> | undefined) => Promise<FetchResult<any>>,
	variables?: OperationVariables | undefined
) => {
	try {
		const result = await handler({ variables });
		return result.data
	} catch (error) {
		return error;
	}
};
