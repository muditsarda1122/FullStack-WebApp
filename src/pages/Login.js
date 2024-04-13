import { useState, useEffect, useContext } from 'react'
import { baseUrl } from '../shared'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoginContext } from '../App'

export default function Login() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const location = useLocation()
    const navigate = useNavigate()

    const [loggedIn, setLoggedIn] = useContext(LoginContext)

    function login(e) {
        e.preventDefault()
        const url = baseUrl + 'api/token/'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                localStorage.setItem('accessToken', data.access)
                localStorage.setItem('refreshToken', data.refresh)
                setLoggedIn(true)
                console.log(location?.state?.previousUrl)
                navigate(location?.state?.previousUrl
                    ? location.state.previousUrl
                    : '/customers')
            }).catch()
    }

    return (

        <form
            id="customer"
            className="w-full m-2 max-w-sm"
            onSubmit={login}
        >
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label
                        className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                        for="username"
                    >
                        Username
                    </label>
                </div>
                <div className="md:w-3/4">
                    <input
                        id="username"
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label
                        className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                        for="password"
                    >
                        Password
                    </label>
                </div>
                <div className="md:w-3/4">
                    <input
                        id="password"
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Login
            </button>
        </form>
    )
}