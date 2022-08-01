import "./App.css";
import BannerImage from "../src/assets/images/banner.jpg";
import { useState } from "react";

import LoginPage from "./components/LoginPage";
import Signup from "./components/SignupPage";
import Home from "./pages/Home";

function App() {
  const [pageState, setPageState] = useState(0);
  const [user,setLoginUser]=useState(); 


  return (
    <div className="overflow-hidden">
      <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Banner Image */}
        <div className="hidden md:block md:col-span-1 h-full bg-blue-500 -skew-x-6 shadow-gray-800 -ml-16 shadow-2xl">
          <img
            src={BannerImage}
            className="w-full h-screen object-cover shadow-black"
            alt="banner-image"
          />
        </div>

        {/* Login or signup based on state */}
        {pageState === 0 ? (
          <LoginPage handlePageState={setPageState} />
        ) : (
          <Signup handlePageState={setPageState} />
        ) 
        }        
      </div>
    </div>
  );
}

export default App;
