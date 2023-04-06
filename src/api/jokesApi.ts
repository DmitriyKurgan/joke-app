import {apiSlice} from "./apiSlice";
import {JokeType} from "../components/Joke";


export const jokesApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getJokes: build.query<JokeType[], null>({
            query: () => ({
                url: 'jokes/ten'
            }),
            providesTags: result => [{type: 'Jokes'}]
        }),
        refreshJoke: build.query<JokeType, null>({
            query: () => ({
                url: 'jokes/random'
            }),
            providesTags: result => [{type: 'Jokes'}]
        }),
    })
});

export const {useGetJokesQuery, useLazyRefreshJokeQuery} = jokesApi;

