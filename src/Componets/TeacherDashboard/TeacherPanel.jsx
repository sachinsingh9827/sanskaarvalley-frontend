import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ManageClasses from './ManageClasses';
import MarkAttendance from './MarkAttendance';
import Assignments from './Assignments';
import TeacherDashboard from './TeacherDashboard';

const TeacherPanel = () => {
    return (
        <Router>
            <Switch>
                <Route path="/teacher/dashboard" component={TeacherDashboard} />
                <Route path="/teacher/manage-classes" component={ManageClasses} />
                <Route path="/teacher/mark-attendance" component={MarkAttendance} />
                <Route path="/teacher/assignments" component={Assignments} />
            </Switch>
        </Router>
    );
};

export default TeacherPanel;
