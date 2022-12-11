import { Fact } from "../../types/fact";

export const mockPromiseHelper = (
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
