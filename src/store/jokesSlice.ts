import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {JokeType} from "../components/Joke";
import {jokesApi} from "../api/jokesApi";

interface JokesState {
    jokes: JokeType[];
}

const initialState: JokesState = {
    jokes: [],
};

export const jokesSlice = createSlice({
    name: 'jokes',
    initialState,
    reducers: {
        addJoke: (state, action: PayloadAction<JokeType>) => {
            state.jokes.unshift(action.payload);
        },
        deleteJoke: (state, action: PayloadAction<number>) => {
            state.jokes = state.jokes.filter(joke => joke.id !== action.payload);
        },
        setJokes: (state, action: PayloadAction<JokeType[]>) => {
            state.jokes = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(jokesApi.endpoints.getJokes.matchFulfilled, (state, {payload}) => {
            const missingJokes = payload.filter(newJoke => !state.jokes.find(joke => joke.id === newJoke.id));
            if (state.jokes.length < 10) {
                state.jokes.push(...missingJokes.slice(0, 10 - state.jokes.length));
            } else {
                state.jokes.push(...missingJokes);
            }
        });
    }
});


export const {addJoke, deleteJoke, setJokes} = jokesSlice.actions;

export default jokesSlice.reducer;