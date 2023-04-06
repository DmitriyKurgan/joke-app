import React, {useState} from "react";
import Joke, {JokeType} from "./Joke";
import {CircularProgress, Theme} from "@mui/material";

import {createStyles, makeStyles} from "@mui/styles";

interface JokeListProps {
    jokes: JokeType[]
    onLoadMore: () => void
    isLoading: boolean
    onDelete: (id: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            columnCount: 4,
            columnGap: "20px",
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        progress: {
            margin: theme.spacing(2),
        },
        button: {
            marginTop: theme.spacing(2),
        },
    })
);

const JokeList: React.FC<JokeListProps> = ({
                                               jokes,
                                               isLoading,
                                           }) => {
    const classes = useStyles();

    const [error, setError] = useState<string | null>(null);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading && jokes.length === 0) {
        return <CircularProgress className={classes.progress}/>;
    }

    return (
        <div className={classes.root}>
            {jokes.map((joke) => (
                <Joke
                    key={joke.id}
                    joke={joke}
                />
            ))}
        </div>
    );
};

export default JokeList;