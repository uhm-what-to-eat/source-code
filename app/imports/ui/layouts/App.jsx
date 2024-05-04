import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import AddStuff from '../pages/AddStuff';
import EditVendor from '../pages/EditVendor';
import NotFound from '../pages/NotFound';
import SignUpUser from '../pages/SignUpUser';
import SignUpVendor from '../pages/SignUpVendor';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import PlacesToEat from '../pages/PlacesToEat';
import CampusCenter from '../pages/places/CampusCenter';
import ParadisePalms from '../pages/places/ParadisePalms';
import FoodTrucks from '../pages/places/FoodTrucks';
import HemenwayHall from '../pages/places/HemenwayHall';
import ResidentialDining from '../pages/places/ResidentialDining';
import PlacesToEatAdmin from '../pages/PlacesToEatAdmin';
import AdminEdit from '../pages/AdminEdit';
import CampusCenterAdmin from '../pages/places/CampusCenterAdmin';
import EditCampusCenter from '../pages/places/EditCampusCenter';
import ParadisePalmsAdmin from '../pages/places/ParadisePalmsAdmin';
import EditParadisePalms from '../pages/places/EditParadisePalms';
import FoodTrucksAdmin from '../pages/places/FoodTrucksAdmin';
import EditFoodTrucks from '../pages/places/EditFoodTrucks';
import HemenwayHallAdmin from '../pages/places/HemenwayHallAdmin';
import EditHemenwayHall from '../pages/places/EditHemenwayHall';
import ResidentialDiningAdmin from '../pages/places/ResidentialDiningAdmin';
import EditResidentialDining from '../pages/places/EditResidentialDining';
import AddVendor from '../pages/AddVendor';
import AddMenuItem from '../pages/AddMenuItem';
import EditMenuItem from '../pages/EditMenuItem';
import OwnedVendor from '../pages/places/OwnedVendor';
import Menu from '../pages/Menu';
import Favorites from '../pages/Favorites';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signupuser" element={<SignUpUser />} />
          <Route path="/signupvendor" element={<SignUpVendor />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/list" element={<ProtectedRoute><PlacesToEat /></ProtectedRoute>} />
          <Route path="/cc" element={<ProtectedRoute><CampusCenter /></ProtectedRoute>} />
          <Route path="/pp" element={<ProtectedRoute><ParadisePalms /></ProtectedRoute>} />
          <Route path="/ft" element={<ProtectedRoute><FoodTrucks /></ProtectedRoute>} />
          <Route path="/hh" element={<ProtectedRoute><HemenwayHall /></ProtectedRoute>} />
          <Route path="/rd" element={<ProtectedRoute><ResidentialDining /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddStuff /></ProtectedRoute>} />
          <Route path="/edit/:_id" element={<ProtectedRoute><EditVendor /></ProtectedRoute>} />
          <Route path="/menu/:_id" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute ready={ready}><PlacesToEatAdmin /></AdminProtectedRoute>} />
          <Route path="/adminEdit" element={<AdminProtectedRoute ready={ready}><AdminEdit /></AdminProtectedRoute>} />
          <Route path="/adminCC" element={<ProtectedRoute><CampusCenterAdmin /></ProtectedRoute>} />
          <Route path="/editCC" element={<ProtectedRoute><EditCampusCenter /></ProtectedRoute>} />
          <Route path="/adminPP" element={<ProtectedRoute><ParadisePalmsAdmin /></ProtectedRoute>} />
          <Route path="/editPP" element={<ProtectedRoute><EditParadisePalms /></ProtectedRoute>} />
          <Route path="/adminFT" element={<ProtectedRoute><FoodTrucksAdmin /></ProtectedRoute>} />
          <Route path="/editFT" element={<ProtectedRoute><EditFoodTrucks /></ProtectedRoute>} />
          <Route path="/adminHH" element={<ProtectedRoute><HemenwayHallAdmin /></ProtectedRoute>} />
          <Route path="/editHH" element={<ProtectedRoute><EditHemenwayHall /></ProtectedRoute>} />
          <Route path="/adminRD" element={<ProtectedRoute><ResidentialDiningAdmin /></ProtectedRoute>} />
          <Route path="/editRD" element={<ProtectedRoute><EditResidentialDining /></ProtectedRoute>} />
          <Route path="/addVendor" element={<ProtectedRoute><AddVendor /></ProtectedRoute>} />
          <Route path="/addMenuItem/:_id" element={<ProtectedRoute><AddMenuItem /></ProtectedRoute>} />
          <Route path="/editMenuItem/:_id/:index" element={<ProtectedRoute><EditMenuItem /></ProtectedRoute>} />
          <Route path="/vendorStuff" element={<ProtectedRoute><OwnedVendor /></ProtectedRoute>} />
          <Route path="/favorite" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
