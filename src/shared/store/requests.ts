import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICity, IRequest } from './types'

export const requestsApi = createApi({
  reducerPath: 'requestsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL as string }),
  endpoints: (builder) => ({
    getRequests: builder.query<IRequest[], void>({
      query: () => "requests",
    }),
    getCities: builder.query<ICity[], void>({
      query: () => "cities",
    }),
  }),
})

export const { useGetRequestsQuery, useGetCitiesQuery } = requestsApi
