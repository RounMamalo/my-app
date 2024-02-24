import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
function Users() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [selectedCollege, setSelectedCollege] = useState('');
    const [sortOrder, setSortOrder] = useState('A-Z');

    console.log(search)
    const navigate = useNavigate()
    useEffect(()=> {
        axios.get('http://localhost:3000/').then(res => {
                console.log(res);
                setData(res.data);
            }).catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/deleteuser/${id}`)
            .then(res => {
                console.log(res);
                navigate('/');
                window.location.reload();
            })
            .catch(err => console.log(err));
    };
    
    const handleSort = () => {
        setSortOrder((prevOrder) => (prevOrder === 'A-Z' ? 'Z-A' : 'A-Z'));
      };
      

    return (
        <div className='d-flex vh-100 vg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <div className='d-flex mb-2'>
                    
                    <Link to="/create" className='btn btn-success btn-sm'>  
                        Add +
                    </Link>

                    <input 
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search student'
                        className='ml-1 p-1'
                    />

                    <select
                      onChange={(e) => setSelectedCollege(e.target.value)}
                      value={selectedCollege}
                      className='ml-1 p-1 dropdown-toggle'
                    >
                      <option value=''>Select Colleges</option>
                      <option value='CCS'>CCS</option>
                      <option value='CSM'>CSM</option>
                      <option value='COE'>COE</option>
                      <option value='CED'>CED</option>
                      <option value='CASS'>CASS</option>
                      <option value='CHS'>CHS</option>
                      <option value='CEBA'>CEBA</option>
                    </select>

                </div>
                
                <table className='table'>
                    <thead>
                        <tr>
                            <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                                Name 
                                <div className="bg-dark text-white border d-inline-block ml-1 px-1">
                                    {sortOrder === 'A-Z' ? '[A-Z]' : '[Z-A]'}
                                </div>
                                
                            </th>
                            <th>Id Number</th>
                            <th>Course</th>
                            <th>College</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.filter((user) => {
                                const nameMatches = user.name.toLowerCase().includes(search.toLowerCase());
                                const collegeMatches = selectedCollege === '' || user.college === selectedCollege;
                            
                                return nameMatches && collegeMatches;
                            }).sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                          
                                if (sortOrder === 'A-Z') {
                                  return nameA.localeCompare(nameB);
                                } else {
                                  return nameB.localeCompare(nameA);
                                }
                            })
                            //.filter((user) => {
                            //    return search.toLowerCase() === '' 
                            //    ? user 
                            //    : user.name.toLowerCase().includes(search);
                            //})
                            .map((user,index) => {
                                return <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.idNum}</td>
                                    <td>{user.course}</td>
                                    <td>{user.college}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className='btn btn-sm btn-success me-2'>Update</Link>
                                        <button onClick={() => handleDelete(user._id)} className='btn btn-sm btn-danger'>Delete</button>

                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;