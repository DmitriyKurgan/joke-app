import {JokeType} from "../components/Joke";

export const addJokeToLocalStorage = (joke: JokeType) => {
    if (typeof localStorage !== 'undefined') {
        const storedJokesString = localStorage.getItem('jokes');
        const storedJokes: JokeType[] = storedJokesString
            ? JSON.parse(storedJokesString)
            : [];
        const existingJoke = storedJokes.find((j) => j.id === joke.id);
        if (!existingJoke) {
            storedJokes.push(joke);
            localStorage.setItem('jokes', JSON.stringify(storedJokes));
        }
    }
};

export const deleteJokeFromLocalStorage = (id: number): void => {
    const jokesFromLocalStorage = JSON.parse(localStorage.getItem('jokes') || '[]');
    const updatedJokes = jokesFromLocalStorage.filter((joke: JokeType) => joke.id !== id);
    localStorage.setItem('jokes', JSON.stringify(updatedJokes));
}

export const loadJokesFromLocalStorage = (): JokeType[] => {
    if (typeof localStorage !== 'undefined') {
        const storedJokes = localStorage.getItem('jokes');
        if (storedJokes) {
            return JSON.parse(storedJokes);
        }
    }
    return [];
};
