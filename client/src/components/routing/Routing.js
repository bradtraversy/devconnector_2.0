import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import ProfileForm from '../profile-forms/ProfileForm';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';

const Routing = () => {
  return (
    <section className="container">
      <Alert />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profile/:id" element={<Profile />} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/create-profile" component={ProfileForm} />
        <PrivateRoute path="/edit-profile" component={ProfileForm} />
        <PrivateRoute path="/add-experience" component={AddExperience} />
        <PrivateRoute path="/add-education" component={AddEducation} />
        <PrivateRoute path="/posts" component={Posts} />
        <PrivateRoute path="/posts/:id" component={Post} />
        <Route element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default Routing;
