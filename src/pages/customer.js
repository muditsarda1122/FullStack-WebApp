import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import NotFound from '../components/NotFound';
import { baseUrl } from '../shared';
import { LoginContext } from '../App';

export default function Customer() {
    const { id } = useParams()
    const [notFound, setNotFound] = useState(false)
    const [customer, setCustomer] = useState()
    const [tempCustomer, setTempCustomer] = useState()
    const [changed, setChanged] = useState(false)
    const [error, setError] = useState()

    const navigate = useNavigate()
    const location = useLocation();

    const [loggedIn, setLoggedIn] = useContext(LoginContext)

    useEffect(() => {
        if (!customer) return
        if (!tempCustomer) return
        let equalFlag = true;
        if (customer.name !== tempCustomer.name) {
            equalFlag = false
        }
        if (customer.industry !== tempCustomer.industry) {
            equalFlag = false
        }
        if (equalFlag) {
            setChanged(false)
        }
    })

    useEffect(() => {
        const url = baseUrl + 'api/customers/' + id
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            }
        })
            .then((response) => {
                if (response.status === 404) {
                    setNotFound(true)
                } else if (response.status === 401) {
                    setLoggedIn(false)
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname,
                        },
                    })
                }
                if (!response.ok) {
                    throw new Error('something went wrrong')
                }
                return response.json()
            })
            .then((data) => {
                setCustomer(data.customer)
                setTempCustomer(data.customer)
                setError(undefined)
            }).catch((e) => {
                setError(e.message)
            })
    }, [])

    function updateCustomer(e) {
        e.preventDefault()
        const url = baseUrl + 'api/customers/' + id;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(tempCustomer),
        }).then((response) => {
            if (response.status === 401) {
                setLoggedIn(false)
                navigate('/login', {
                    state: {
                        previousUrl: location.pathname,
                    },
                })
            }
            if (!response.ok) {
                throw new Error('something went wrrong')
            }
            return response.json()
        }).then((data) => {
            setCustomer(data.customer)
            setError(undefined)
            setChanged(false)
        }).catch((e) => {
            setError(e.message)
        })
    }

    return (
        <div className="p-3">
            {notFound ? <NotFound /> : null}
            {customer ?
                (<div>
                    <form
                        id="customer"
                        className="w-full max-w-sm"
                        onSubmit={updateCustomer}
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label
                                    className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                    for="name"
                                >
                                    Name
                                </label>
                            </div>
                            <div className="md:w-3/4">
                                <input
                                    id="name"
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type="text"
                                    value={tempCustomer.name}
                                    onChange={(e) => {
                                        setChanged(true)
                                        setTempCustomer({
                                            ...tempCustomer,
                                            name: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label
                                    className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                    for="industry"
                                >
                                    Industry
                                </label>
                            </div>
                            <div className="md:w-3/4">
                                <input
                                    id="industry"
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type="text"
                                    value={tempCustomer.industry}
                                    onChange={(e) => {
                                        setChanged(true)
                                        setTempCustomer({
                                            ...tempCustomer,
                                            industry: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                    {changed ? (
                        <div className="mb-2">
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={(e) => {
                                    setTempCustomer({ ...customer })
                                    setChanged(false)
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                form="customer"
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Save
                            </button>
                        </div>
                    ) : null}

                    <div>
                        <button className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                            onClick={(e) => {
                                const url = baseUrl + 'api/customers/' + id;
                                fetch(url, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                                    },
                                })
                                    .then((response) => {
                                        if (response.status === 401) {
                                            setLoggedIn(false)
                                            navigate('/login', {
                                                state: {
                                                    previousUrl: location.pathname,
                                                },
                                            })
                                        }
                                        if (!response.ok) {
                                            throw new Error('Something went wront, try again?')
                                        }
                                        navigate('/customers');
                                        setError(undefined)
                                    })
                                    .catch((e) => {
                                        setError(e.message)
                                    })
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                ) : null}
            {error ? <p>{error}</p> : null}
            <br />
            <Link
                to='/customers'
            >
                <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    ← Go back
                </button>
            </Link>
        </div>
    )
}