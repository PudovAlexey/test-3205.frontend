// generated with @7nohe/openapi-react-query-codegen@2.0.0 

import { type Options } from "@hey-api/client-fetch";
import { type QueryClient } from "@tanstack/react-query";
import { healthControllerCheck, jobsControllerGet, jobsControllerList } from "../requests/services.gen";
import { JobsControllerGetData } from "../requests/types.gen";
import * as Common from "./common";
export const ensureUseJobsControllerListData = (queryClient: QueryClient, clientOptions: Options<unknown, true> = {}) => queryClient.ensureQueryData({ queryKey: Common.UseJobsControllerListKeyFn(clientOptions), queryFn: () => jobsControllerList({ ...clientOptions }).then(response => response.data) });
export const ensureUseJobsControllerGetData = (queryClient: QueryClient, clientOptions: Options<JobsControllerGetData, true>) => queryClient.ensureQueryData({ queryKey: Common.UseJobsControllerGetKeyFn(clientOptions), queryFn: () => jobsControllerGet({ ...clientOptions }).then(response => response.data) });
export const ensureUseHealthControllerCheckData = (queryClient: QueryClient, clientOptions: Options<unknown, true> = {}) => queryClient.ensureQueryData({ queryKey: Common.UseHealthControllerCheckKeyFn(clientOptions), queryFn: () => healthControllerCheck({ ...clientOptions }).then(response => response.data) });
