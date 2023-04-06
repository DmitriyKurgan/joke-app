import {FC, useState} from 'react';
import {Button, Card, CardContent, Typography} from '@mui/material';
import {useAppDispatch} from "../store/store";
import {addJoke, deleteJoke} from "../store/jokesSlice";
import {useLazyRefreshJokeQuery} from "../api/jokesApi";
import {addJokeToLocalStorage, deleteJokeFromLocalStorage} from "../utills/localStorageHelpers";

export type JokeType = {
    type: string
    setup: string
    punchline: string
    id: number
};


const Joke: FC<{ joke: JokeType }> = ({joke}) => {
    const [getJokeTrigger, {data = {} as JokeType, isFetching}] = useLazyRefreshJokeQuery();
    const {type, setup, punchline, id} = joke;

    const dispatch = useAppDispatch();
    const [hover, setHover] = useState(false);

    const handleAddJoke = (joke: JokeType) => {
        dispatch(addJoke(joke));
        addJokeToLocalStorage(joke);
    };

    const handleDeleteJoke = (id: number) => {
        dispatch(deleteJoke(id));
        deleteJokeFromLocalStorage(id);
    };

    const handleRefreshJoke = (id: number) => {
        if (isFetching) {
            return;
        }
        dispatch(deleteJoke(id));
        getJokeTrigger(null)
            .unwrap()
            .then((joke) => {
                dispatch(addJoke(joke));
            });
    };

    return (
        <Card
            style={{
                marginBottom: '10px',
                background: 'grey',
                position: 'relative',
                borderRadius: '20px',
                width: '250px',
                height: '250px'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <CardContent>
                <Typography style={inlineCaptionStyles}>
                    Type:<Typography style={highlightedTextStyles}>{type}</Typography>
                </Typography>
                <Typography style={highlightedTextStyles}>
                    ID:#{id}
                </Typography>
                <Typography style={captionStyles}>
                    Setup:<Typography>{setup}</Typography>
                </Typography>
                <Typography style={captionStyles}>
                    Punchline:<Typography>{punchline}</Typography>
                </Typography>
                <Typography align="center" style={{}}>
                    {hover && (<>
                            <Button onClick={() => handleDeleteJoke(id)} variant="contained" color="inherit"
                                    style={buttonStyles}>Delete</Button>
                            <Button onClick={() => handleAddJoke(joke)} variant="contained" color="inherit"
                                    style={buttonStyles}>Add</Button>
                            <Button onClick={() => handleRefreshJoke(id)} variant="contained" color="inherit"
                                    style={buttonStyles}>Refresh</Button>
                        </>
                    )}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Joke;

const captionStyles = {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '18px'
}

const inlineCaptionStyles = {
    display: 'inline',
    color: '#fff',
    fontSize: '18px'
}

const highlightedTextStyles = {
    color: 'blue',
    display: 'inline',
    fontSize: '18px'
}

const buttonStyles = {
    color: 'black',
    fontSize: '12px',
    padding: '5px',
    margin: '2px',
}

