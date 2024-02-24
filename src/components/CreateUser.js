import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


function CreateUser(props) {
    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [idNum, setIdNum] = useState()
    const [course, setCourse] = useState()
    const [college, setCollege] = useState()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/create', {name, idNum, age, course, college})
            .then(res =>{
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input 
                            type='text'
                            placeholder='Enter Name'
                            className='form-control'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Age</label>
                        <input 
                            type='text'
                            placeholder='Enter Age'
                            className='form-control'
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Id Number</label>
                        <input 
                            type='text'
                            placeholder='Enter Id Number'
                            className='form-control'
                            onChange={ (e) => setIdNum(e.target.value) }
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Course</label>
                        <input 
                            type='text'
                            placeholder='Enter Course'
                            className='form-control'
                            onChange={(e) => setCourse(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>College</label>
                        <input 
                            type='text'
                            placeholder='Enter College'
                            className='form-control'
                            onChange={(e) => setCollege(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;