import { Fact } from "../../types/fact";

export const mockPromiseResolveHelper = (
	statusValue: number,
	statusTextValue: string,
	okValue: boolean,
	factValue: Fact
) => {
	return Promise.resolve({
		status: statusValue,
		statusText: statusTextValue,
		ok: okValue,
		json: () => Promise.resolve(factValue),
	} as Response);
};

export const mockPromiseRejectHelper = (
	statusValue: number,
	statusTextValue: string,
	okValue: boolean,
	factValue: Fact
) => {
	return Promise.reject({
		status: statusValue,
		statusText: statusTextValue,
		ok: okValue,
		json: () => Promise.resolve(factValue),
	} as Response);
};
