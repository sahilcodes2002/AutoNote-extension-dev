import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Loginpage from './Loginpage.jsx';
import Dashboard from './Dashboard.jsx';
import Signup from './Signup.jsx';
import '../assets/tailwind.css';

const Popup = () => {
  const [page, setpage] = useState("login");

  const [inputValue, setInputValue] = useState('');
  const [isloading, setisloading] = useState(false);
  //console.log("hu")
  // Load the data from storage when the component mounts
  useEffect(() => {
    setisloading(true);
    chrome.storage.local.get(['autotoken69'], (result) => {
      if(result.autotoken69){
        chrome.runtime.sendMessage({ action: 'setToken', autotoken69: result.autotoken69}); 
        //console.log(result.token69)   
        setpage("dash");
      }
    });
    setisloading(false);
    
  }, []);

  return (
    <div className=''>
      {/* {isLoggedIn ? <Dashboard /> : <Loginpage onLogin={handleLogin} />} */}
      {page=="login"&& <Loginpage page = {page} setpage = {setpage}></Loginpage>}
      {page=="signup" && <Signup page = {page} setpage = {setpage}></Signup>}
      {page=="dash" && <Dashboard page = {page} setpage = {setpage}></Dashboard>}
      
      {/* <Signup></Signup> */}
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Popup />);
