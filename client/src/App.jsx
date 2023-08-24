import "./scss/App.scss";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import RecordsList from "./components/records/RecordsList";
import NotFound from "./components/NotFound";
import Signup from "./components/user/Signup";
import Login from "./components/user/Login";
import { setAxiosDefaults } from "./utils/axiosConfig";
// import Profile from "./components/user/Profile";

const App = () => {
  setAxiosDefaults();
  return (
    <div className='main'>
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/records' element={<RecordsList />}>
          <Route path='/records/:genre' element={<RecordsList />} />
        </Route>
        {/* <Route path='/profile' element={<Profile />} /> */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
