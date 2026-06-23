// generated with @7nohe/openapi-react-query-codegen@2.0.0 

import { type Options } from "@hey-api/client-fetch";
import { type QueryClient } from "@tanstack/react-query";
import { healthControllerCheck, jobsControllerGet, jobsControllerList } from "../requests/services.gen";
import { JobsControllerGetData } from "../requests/types.gen";
import * as Common from "./common";
export const prefetchUseJobsControllerList = (queryClient: QueryClient, clientOptions: Options<unknown, true> = {}) => queryClient.prefetchQuery({ queryKey: Common.UseJobsControllerListKeyFn(clientOptions), queryFn: () => jobsControllerList({ ...clientOptions }).then(response => response.data) });
export const prefetchUseJobsControllerGet = (queryClient: QueryClient, clientOptions: Options<JobsControllerGetData, true>) => queryClient.prefetchQuery({ queryKey: Common.UseJobsControllerGetKeyFn(clientOptions), queryFn: () => jobsControllerGet({ ...clientOptions }).then(response => response.data) });
export const prefetchUseHealthControllerCheck = (queryClient: QueryClient, clientOptions: Options<unknown, true> = {}) => queryClient.prefetchQuery({ queryKey: Common.UseHealthControllerCheckKeyFn(clientOptions), queryFn: () => healthControllerCheck({ ...clientOptions }).then(response => response.data) });
