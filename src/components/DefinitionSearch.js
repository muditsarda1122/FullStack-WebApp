import {useState, useEffect} from 'react' 
import {useNavigate} from 'react-router-dom'

export default function DefinitionSearch() {
    const [word, setWord] = useState('')
    const navigate = useNavigate()

    return(
        <form className='flex space-between space-x-2' onSubmit={() => {
            navigate('/Dictionary/'+word)
        }}>
            <input className='px-2 py-1 shrink min-w-0 rounded' placeholder='Dinosaur' type="text" onChange={(e) => {
                setWord(e.target.value)
                }}
            />
            <button className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded'>Search</button>
        </form>
    )
}