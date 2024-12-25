import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClasses } from '../../store/teacherSlice'; // Ensure this path is correct

const TeacherDashboard = () => {
    const dispatch = useDispatch();
    const classes = useSelector((state) => state.teacher.classes); // Fetch classes from Redux state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                // Dispatch action to set classes for the teacher
                dispatch(setClasses([
                    { id: 1, name: 'Grade 1' },
                    { id: 2, name: 'Grade 2' },
                ]));
            } catch (err) {
                setError('Failed to load classes. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, [dispatch]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>
            {loading && <p>Loading classes...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div>
                <h2 className="text-2xl font-semibold">Your Classes</h2>
                {classes && classes.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {classes.map((classItem) => (
                            <li key={classItem.id} className="py-1">{classItem.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No classes available.</p>
                )}
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold">Quick Links</h2>
                <ul className="space-y-2 mt-2">
                    <li><a href="/manage-classes" className="text-blue-500 hover:underline">Manage Classes</a></li>
                    <li><a href="/mark-attendance" className="text-blue-500 hover:underline">Mark Attendance</a></li>
                    <li><a href="/assignments" className="text-blue-500 hover:underline">Manage Assignments</a></li>
                    <li><a href="/teacher-profile" className="text-blue-500 hover:underline">View Profile</a></li>
                    <li><a href="/logout" className="text-blue-500 hover:underline">Logout</a></li>
                </ul>
            </div>
        </div>
    );
};

export default TeacherDashboard;
