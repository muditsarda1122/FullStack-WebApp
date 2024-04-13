import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function AddEmployee(props) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [img, setImg] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <button onClick = {handleShow} className="block mx-auto m-2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">+ Add Employee</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form id ="editModal" className="w-full max-w-sm" onSubmit={(e) => {
            e.preventDefault()
            props.newEmployee(name, role, img) 
            setName('')
            setRole('')
            setImg('')

        }}>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">
                        Full Name
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Mudit Sarda" id="name" type="text" defaultValue={name} onChange={(e) => {setName(e.target.value)}}/>
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="role">
                        Role
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Developer" id="role" type="text" defaultValue={role} onChange={(e) => {setRole(e.target.value)}}/>
                </div>
            </div> 
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="img">
                        Image URL
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="https://www.google.com" id="img" type="text" defaultValue={img} onChange={(e) => {setImg(e.target.value)}}/>
                </div>
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
        <button className ="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>Close</button>
          <button className ="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" form="editModal" onClick={handleClose}>Add</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEmployee;