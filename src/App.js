import './index.css';
import Header from './components/header';
import Employees from './pages/employees';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Customers from './pages/customers';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition'
import NotFound from './components/NotFound';
import Customer from './pages/customer'
import Login from './pages/Login'
import Register from './pages/Register'
import { createContext, useState, useEffect } from 'react';
import { baseUrl } from './shared';

export const LoginContext = createContext()

function App() {
  function refreshTokens() {
    if (localStorage.refresh) {
      const url = baseUrl + 'api/token/refresh/'
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh: localStorage.refresh,
        }),
      }).then((response) => {
        return response.json()
      }).then((data) => {
        console.log(data)
        localStorage.access = data.access
        localStorage.refresh = data.refresh
        setLoggedIn(true)
      })
    }
  }

  useEffect(() => {
    const minute = 1000 * 60
    refreshTokens()
    setInterval(refreshTokens, minute * 3)
  }, [])

  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false)

  function changeLoggedIn(value) {
    setLoggedIn(value)
    if (value === false) {
      localStorage.clear()
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path='/Employees' element={<Employees />} />
            <Route path='/Customers' element={<Customers />} />
            <Route path='/customers/:id' element={<Customer />} />
            <Route path='/Dictionary' element={<Dictionary />} />
            <Route path='/Dictionary/:search' element={<Definition />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  )
}

export default App;
