import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function AddCustomer(props) {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [img, setImg] = useState('');

  const [show, setShow] = useState(props.show);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={props.toggleShow} className="block mx-auto m-2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">+ Add Customer</button>

      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="editModal" className="w-full max-w-sm" onSubmit={(e) => {
            e.preventDefault()
            props.newCustomer(name, industry)
            setName('')
            setIndustry('')
            setImg('')

          }}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Nescafe" id="name" type="text" defaultValue={name} onChange={(e) => { setName(e.target.value) }} />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="industry">
                  Industry
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Coffee" id="industry" type="text" defaultValue={industry} onChange={(e) => { setIndustry(e.target.value) }} />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={props.toggleShow}>Close</button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" form="editModal" >Add</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCustomer;