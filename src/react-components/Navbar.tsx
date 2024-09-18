import { useState } from "react";
import logo from "../assets/app-logo.png";
import wavNav from "../assets/wave-navbar.svg";
import downSign from "../assets/down-sign.svg";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/appwrite/Auth";

export function Navbar() {
  const [openDropDown, setOpenDropDown] = useState<string | null>(null);
  const {state,dispatch} = useAuth()

  const handleLogout =()=>{
    authService.Logout().then(()=>{
      dispatch({type:"LOGOUT",payload:null})
    })
  }

  const handleDropDown = (dropdown: string) => {
    setOpenDropDown(dropdown);
  };

  const handleMouseOut = () => {
    setOpenDropDown(null);
  };

  return (
    <nav className="bg-transparent relative flex flex-col md:flex-row md:items-center">
      <div
        className="flex justify-center items-center"
        style={{ height: "80px", width: "160px" }}
      >
       <Link to="/">
        <img src={logo} alt="app-image" />
       </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mx-8 flex-1">
        <div className="relative">
          <span
            onMouseLeave={handleMouseOut}
            onMouseOver={() => {
              handleDropDown("home");
            }}
            className="px-6 hover:text-orange-400 flex gap-1 items-center"
          >
            <span className="font-medium"><Link to="/">HOME</Link></span>
            <img src={downSign} alt="down img" style={{ height: "5px" }} />
          </span>
          {openDropDown === "home" && (
            <div
              onMouseLeave={handleMouseOut}
              onMouseOver={() => {
                handleDropDown("home");
              }}
              className="absolute p-2 right-2 bg-[#F1EFEF] flex flex-col gap-4 rounded"
            >
              <span className="hover:text-orange-500 cursor-pointer"><Link to="/">HOME</Link></span>
              <span className="hover:text-orange-500 cursor-pointer"><Link to="/signin">GET STARTED</Link></span>
            </div>
          )}
        </div>
        <div className="relative">
          <span
            onMouseLeave={handleMouseOut}
            onMouseOver={() => {
              handleDropDown("special");
            }}
            className="px-6 hover:text-orange-400 flex gap-1 items-center"
          >
            <span className="font-medium">SPECIAL</span>
            <img src={downSign} alt="down img" style={{ height: "5px" }} />
          </span>
          {openDropDown === "special" && (
            <div
              onMouseLeave={handleMouseOut}
              onMouseOver={() => {
                handleDropDown("special");
              }}
              className="absolute p-2 right-2 bg-[#F1EFEF] flex flex-col gap-4 rounded"
            >
              <span className="hover:text-orange-500 cursor-pointer">PALAK PANEER</span>
              <span className="hover:text-orange-500 cursor-pointer">RAITA</span>
              <span className="hover:text-orange-500">PUALO</span>
              <span className="hover:text-orange-500 cursor-pointer">POHA</span>
            </div>
          )}
        </div>
        <div className="relative">
          <span
            className="px-6 hover:text-orange-400 flex gap-1 items-center"
          >
            <span className="font-medium">PRICING</span>
          </span>
          
        </div>
      </div>
      <div className="mx-10">
        {
          state.status && state.userData ? <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">Hi, {state.userData.name}</h1>
            <button className="p-2 bg-blue-900 hover:bg-blue-900 cursor-pointer text-white rounded" onClick={handleLogout}>LOGOUT</button>
          </div> : 
        <Link to="/signin" className="rounded-xl p-4 text-white bg-blue-800 hover:bg-blue-950" >Get Started</Link>
        }
      </div>
      <div
        className="absolute top-0 left-0 rotate-180 -z-10 inset-x-0"
        style={{
          height: "150px",
          backgroundImage: `url(${wavNav})`,
          backgroundPosition: "50%",
          backgroundRepeat: "repeat-x",
          backgroundAttachment: "scroll",
        }}
      ></div>
    </nav>
  );
}
