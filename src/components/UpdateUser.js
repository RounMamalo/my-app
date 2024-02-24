import axios from 'axios';
import React, { useState , useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUser(props) {

    const { id } = useParams()

    const navigate = useNavigate()

    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [idNum, setIdNum] = useState()
    const [course, setCourse] = useState()
    const [college, setCollege] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:3000/get/' + id)
                console.log(response)
                setName(response.data.name)
                setAge(response.data.age)
                setIdNum(response.data.idNum)
                setCourse(response.data.course)
                setCollege(response.data.college)
            }catch (err){
                console.log(err)
            }
        }
        fetchData();
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/update/' + id, {name, age, idNum, course, college})
            .then(res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleUpdate}>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input 
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={ (e) => setName(e.target.value) }
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Age</label>
                        <input 
                            type="text"
                            placeholder="Enter Age"
                            className="form-control"
                            value={age}
                            onChange={ (e) => setAge(e.target.value) }
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Id Number</label>
                        <input 
                            type="text"
                            placeholder="Enter Id Number"
                            className="form-control"
                            value={idNum}
                            onChange={ (e) => setIdNum(e.target.value) }
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Course</label>
                        <input 
                            type="text"
                            placeholder="Enter Course"
                            className="form-control"
                            value={course}
                            onChange={ (e) => setCourse(e.target.value) }
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>College</label>
                        <input 
                            type="text"
                            placeholder="Enter College"
                            className="form-control"
                            value={college}
                            onChange={ (e) => setCollege(e.target.value) }
                        />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;