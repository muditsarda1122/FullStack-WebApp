import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { baseUrl } from '../shared';
import AddCustomer from '../components/AddCustomer';
import { LoginContext } from '../App';
import useFetch from '../hooks/useFetch';

export default function Customers() {
    //const [customers, setCustomers] = useState();
    const [show, setShow] = useState();

    const [loggedIn, setLoggedIn] = useContext(LoginContext)

    function toggleShow() {
        setShow(!show)
    }

    const location = useLocation();
    const Navigate = useNavigate();

    const url = baseUrl + 'api/customers/'
    //we got a 'reading undefined' error while reading customers before it was even fetched, hence instantiated with an empty array
    const { request, appendData, data: { customers } = {}, errorStatus } = useFetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
    })

    useEffect(() => {
        request()
    }, [])

    function newCustomer(name, industry) {
        appendData({ name: name, industry: industry })

        if (!errorStatus) {
            toggleShow()
        }
    }

    // this part uses that state to display it on the website
    return (
        <>
            <h1>Here are our customers: </h1>
            {customers ? customers.map((customer) => {
                return (
                    <div className="m-2" key={customer.id}>
                        <Link to={'/customers/' + customer.id}>
                            <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                {customer.name}
                            </button>
                        </Link>
                    </div>
                )
            }) : null}
            <AddCustomer newCustomer={newCustomer} show={show} toggleShow={toggleShow} />
        </>
    )
}