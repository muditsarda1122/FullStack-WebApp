import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import NotFound from '../components/NotFound';
import DefinitionSearch from '../components/DefinitionSearch';
import useFetch from '../hooks/useFetch'

export default function ElementDefinitionOptions() {
    //const [word, setWord] = useState();
    //const [notFound, setNotFound] = useState(false);
    //const [error, setError] = useState(false)

    let { search } = useParams()

    const navigate = useNavigate()
    const location = useLocation()
    const { request, data: [{ meanings: word }] = [{}], errorStatus } = useFetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search)

    useEffect(() => {
        request()
    }, [])

    if (errorStatus === 404) {
        return (
            <>
                <NotFound />
                <Link to='/Dictionary'>Search another word</Link>
            </>
        )
    }

    if (errorStatus) {
        return (
            <>
                <p>Something went wrong with the server, try again?</p>
                <Link to='/Dictionary'>Search another word</Link>
            </>
        )
    }


    return (
        <>
            <div>
                {word ? (
                    <>
                        <h1>Here is the meaning of the word: </h1>
                        {word.map((x) => {
                            return (
                                <p key={uuidv4()}>{x.partOfSpeech + ': '}{x.definitions[0].definition}</p>
                            )

                        })}
                        <p>Search again: </p>
                        <DefinitionSearch />
                    </>
                ) : null}
            </div>
        </>
    )
}