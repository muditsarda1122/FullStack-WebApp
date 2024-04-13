import '../index.css';
import {useState} from 'react';
import Employee from '../components/Employee';
import AddEmployee from '../components/AddEmployee';
import {v4 as uuidv4} from 'uuid';
import EditEmployee from '../components/EditEmployee';
import Header from '../components/header'

function Employees() {
  const showEmployee = true;
  const [role, setRole] = useState('developer')
  const [employees, setEmployees] = useState(
    [
      {id: 1, name: "Kaushal", role: "CFO", img: "https://images.pexels.com/photos/2505026/pexels-photo-2505026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},
      {id: 2, name: "Mudit", role: "CTO", img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"},
      {id: 3, name: "Sarita", role: "CEO", img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},
      {id: 4, name: "Vidhi", role: "COO", img: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},
      {id: 5, name: "Gauri", role: "MD", img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},
      {id: 6, name: "Moksh", role: "intern", img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    ]
  )

  function updateEmployee(id, newName, newRole){
    const updateEmployees = employees.map((employee) => {
      if(id===employee.id){
        return {...employee, name:newName, role:newRole}
      }
      return employee
    })
    setEmployees(updateEmployees)
  }

  function newEmployee(name, role, img){
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img
    }
    setEmployees([...employees, newEmployee])
  }

  return (
    <div className="">
      {showEmployee ? 
      <>
        <div className="flex flex-wrap justify-center">
          {employees.map((employee) => {
            const editEmployee = <EditEmployee id={employee.id} name={employee.name} role={employee.role} updateEmployee={updateEmployee}/>
            return(
              <Employee key={employee.id} id={employee.id} name={employee.name} role={employee.role} img={employee.img} editEmployee={editEmployee}/>
            )
          })}
        </div>
        <AddEmployee newEmployee={newEmployee}/>
      </>
      :
        <p>teri ma ki chut</p>
      }
    </div>
  );
}

export default Employees;
