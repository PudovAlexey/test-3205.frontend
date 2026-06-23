// generated with @7nohe/openapi-react-query-codegen@2.0.0 

import { type Options } from "@hey-api/client-fetch";
import { UseQueryResult } from "@tanstack/react-query";
import { healthControllerCheck, jobsControllerCancel, jobsControllerCreate, jobsControllerGet, jobsControllerList } from "../requests/services.gen";
import { JobsControllerGetData } from "../requests/types.gen";
export type JobsControllerListDefaultResponse = Awaited<ReturnType<typeof jobsControllerList>>["data"];
export type JobsControllerListQueryResult<TData = JobsControllerListDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useJobsControllerListKey = "JobsControllerList";
export const UseJobsControllerListKeyFn = (clientOptions: Options<unknown, true> = {}, queryKey?: Array<unknown>) => [useJobsControllerListKey, ...(queryKey ?? [clientOptions])];
export type JobsControllerGetDefaultResponse = Awaited<ReturnType<typeof jobsControllerGet>>["data"];
export type JobsControllerGetQueryResult<TData = JobsControllerGetDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useJobsControllerGetKey = "JobsControllerGet";
export const UseJobsControllerGetKeyFn = (clientOptions: Options<JobsControllerGetData, true>, queryKey?: Array<unknown>) => [useJobsControllerGetKey, ...(queryKey ?? [clientOptions])];
export type HealthControllerCheckDefaultResponse = Awaited<ReturnType<typeof healthControllerCheck>>["data"];
export type HealthControllerCheckQueryResult<TData = HealthControllerCheckDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useHealthControllerCheckKey = "HealthControllerCheck";
export const UseHealthControllerCheckKeyFn = (clientOptions: Options<unknown, true> = {}, queryKey?: Array<unknown>) => [useHealthControllerCheckKey, ...(queryKey ?? [clientOptions])];
export type JobsControllerCreateMutationResult = Awaited<ReturnType<typeof jobsControllerCreate>>;
export const useJobsControllerCreateKey = "JobsControllerCreate";
export const UseJobsControllerCreateKeyFn = (mutationKey?: Array<unknown>) => [useJobsControllerCreateKey, ...(mutationKey ?? [])];
export type JobsControllerCancelMutationResult = Awaited<ReturnType<typeof jobsControllerCancel>>;
export const useJobsControllerCancelKey = "JobsControllerCancel";
export const UseJobsControllerCancelKeyFn = (mutationKey?: Array<unknown>) => [useJobsControllerCancelKey, ...(mutationKey ?? [])];
