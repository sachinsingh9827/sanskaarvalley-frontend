import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClasses } from "../../store/teacherSlice"

const ManageClasses = () => {
    const dispatch = useDispatch();
    const classes = useSelector((state) => state.teacher.classes);
    const [newClass, setNewClass] = useState('');

    const addClass = () => {
        const updatedClasses = [...classes, { id: classes.length + 1, name: newClass }];
        dispatch(setClasses(updatedClasses));
        setNewClass('');
    };

    return (
        <div>
            <h1>Manage Classes</h1>
            <ul>
                {classes.map((classItem) => (
                    <li key={classItem.id}>{classItem.name}</li>
                ))}
            </ul>
            <input 
                type="text" 
                value={newClass} 
                onChange={(e) => setNewClass(e.target.value)} 
                placeholder="Add new class"
            />
            <button onClick={addClass}>Add Class</button>
        </div>
    );
};

export default ManageClasses;
