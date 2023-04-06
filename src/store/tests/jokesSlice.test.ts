import jokesReducer, { addJoke, deleteJoke } from '../jokesSlice';
import { JokeType } from '../../components/Joke';

describe('jokesSlice reducer', () => {
    const initialState = {
        jokes: []
    };

    it('should handle addJoke', () => {
        const joke: JokeType = { id: 1, type: 'knock-knock', setup: "Knock knock", punchline: "Who's there?" };
        const newState = jokesReducer(initialState, addJoke(joke));
        expect(newState.jokes).toEqual([joke]);
    });

    it('should handle deleteJoke', () => {
        const initialState = {
            jokes: [{ id: 1, type: 'knock-knock', setup: "Knock knock", punchline: "Who's there?" }]
        };
        const newState = jokesReducer(initialState, deleteJoke(1));
        expect(newState.jokes).toEqual([]);
    });
});
