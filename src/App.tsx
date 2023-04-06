import {useEffect} from 'react';
import {Box, Button, CircularProgress, Container, Typography} from '@mui/material';
import JokeList from './components/JokeList';
import {RootState, useAppDispatch, useAppSelector} from "./store/store";
import {useGetJokesQuery} from "./api/jokesApi";
import {JokeType} from "./components/Joke";
import {loadJokesFromLocalStorage} from "./utills/localStorageHelpers";
import {setJokes} from "./store/jokesSlice";

export const selectJokes = (state: RootState) => state.joke.jokes;

const App = () => {
    const dispatch = useAppDispatch();
    const {data = {} as JokeType[], isLoading, isError, refetch} = useGetJokesQuery(null);
    const jokes = useAppSelector<JokeType[]>(selectJokes);

    const getInitialJokes = async (jokes: JokeType[]): Promise<JokeType[]> => {
        const storedJokes = await loadJokesFromLocalStorage();
        const uniqueJokes = jokes.filter(joke => !storedJokes.some(sj => sj.id === joke.id));
        const combinedJokes = [...storedJokes, ...uniqueJokes];
        const maxNumJokes = 10;
        return combinedJokes.slice(0, maxNumJokes);
    }

    const getJokes = async () => {
        const newJokes = await getInitialJokes(jokes);
        dispatch(setJokes(newJokes));
        console.log(newJokes)
    }

    useEffect(() => {
        getJokes();
    }, []);

    if (isLoading) {
        return <div style={styles.loading}><CircularProgress/></div>;
    }

    if (isError) {
        return <div>There was an error</div>;
    }

    return (
        <Container maxWidth="md" style={{display: 'grid', gridGap: '20px'}}>
            {data.length > 0 ? (
                <JokeList jokes={jokes} isLoading={false}/>
            ) : (
                <Typography
                    variant="body1"
                    align="center">
                    No jokes to display.
                </Typography>
            )}
            <Box display="flex" justifyContent="center" my={4}>
                <Button variant="contained" onClick={() => refetch()}>
                    Load more
                </Button>
            </Box>
        </Container>
    );
}

export default App;

const styles = {
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
};