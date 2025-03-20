/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/popup/Dashboard.jsx":
/*!*********************************!*\
  !*** ./src/popup/Dashboard.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dashboard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// import React, { useEffect, useState } from "react";

// export default function Dashboard({ page, setpage }) {
//   const [defaultstate, setdefaultstate] = useState(false);
//   const [isChecked, setIsChecked] = useState(defaultstate);

//   const handleCheckboxChange = ({ value }) => {
//     chrome.runtime.sendMessage(
//       { action: "sendToContent", data: { isChecked: value } },
//       (response) => {
//         //console.log("Response from Content:", response);
//       }
//     );

//     setIsChecked(value);
//   };

//   useEffect(()=>{
//       chrome.storage.local.get(["autotoken69"], (tokenResult) => {
//         const token = tokenResult.autotoken69;
//         if (!token) {
//           console.log("No token found.");
//           return;
//         }

//         console.log("Token retrieved:", token);

//         // Send request to backend
//         fetch("https://autonotebackend.shadowbites10.workers.dev/getalwayson", {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(4), // ✅ Fix: Removed extra stringify
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             console.log("Received response from backend:", data); // ✅ Debugging
//             if (data.success) {
//               setdefaultstate(data.res.alwayson);
//               console.log("Default state updated:", data.res.alwayson);
//             } else {
//               console.error("Backend returned failure:", data);
//             }
//           })
//           .catch((error) => {
//             console.error("Error updating default state:", error);
//           });
//       });
//     },[])

//   const handledefaultchange = () => {
//     chrome.storage.local.get(["autotoken69"], (tokenResult) => {
//       const token = tokenResult.autotoken69;
//       if (!token) {
//         console.log("No token found.");
//         return;
//       }

//       console.log("Token retrieved:", token);

//       // Send request to backend
//       fetch("https://autonotebackend.shadowbites10.workers.dev/setalwayson", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ alwayson: !defaultstate }), // ✅ Fix: Removed extra stringify
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Received response from backend:", data); // ✅ Debugging
//           if (data.success) {
//             setdefaultstate(data.res.alwayson);
//             console.log("Default state updated:", data.res.alwayson);
//           } else {
//             console.error("Backend returned failure:", data);
//           }
//         })
//         .catch((error) => {
//           console.error("Error updating default state:", error);
//         });
//     });
//   };

//   return (
//     <div>
//       <div>
//         <div className="popup shadow-md rounded-lg overflow-hidden">
//           <header className="flex justify-between items-center bg-gray-200 px-4 py-2">
//             <h1 className="text-lg font-semibold">AutoNote</h1>
//             <button
//               className="text-gray-500 hover:text-red-500 focus:outline-none"
//               onClick={() => {
//                 chrome.storage.local.remove(["autotoken69"], () => {
//                   chrome.runtime.sendMessage({
//                     action: "removeToken",
//                     autotoken69: "autotoken69",
//                   });
//                   chrome.runtime.sendMessage({
//                     action: "removesavedtabs",
//                     laststore: "laststore",
//                   });
//                   console.log("authToken removed from local storage");
//                 });
//                 setpage("login");
//               }}
//             >
//               Log Out
//             </button>
//           </header>
//           <main className="px-4 py-5">
//             <div className="flex justify-center my-6 pb-4">
//               <span className="inline-flex">
//                 <span className="pt-2 mr-4 ">
//                   <button
//                     className="font-bold px-3 py-2  rounded-md bg-green-400"
//                     onClick={() => {
//                       handleCheckboxChange({ value: false });
//                     }}
//                   >
//                     Show FLoating Menu
//                   </button>
//                 </span>
//                 <span className="pt-2 mr-4 ">
//                   <button
//                     className="font-bold px-3 py-2 rounded-md bg-gray-400"
//                     onClick={() => {
//                       handleCheckboxChange({ value: true });
//                     }}
//                   >
//                     Hide FLoating Menu
//                   </button>
//                 </span>
//               </span>
//             </div>

//             <hr class="border-t-4 border-gray-400 my-4 "></hr>
//             <div className="w-full mt-4">
//               <div className="text-center text-xl font-bold">
//                 On Website load :
//               </div>
//             </div>
//             <div className="flex justify-center mt-2 mb-5">
//               <span className="inline-flex">
//                 <span className={`pt-2 mr-5  ${
//                         !defaultstate ? "text-blue-600 font-bold" : ""
//                       }`}>

//                     Always Hide

//                 </span>
//                 <label className="flex cursor-pointer select-none items-center">
//                   <div className="relative">
//                     <input
//                       type="checkbox"
//                       checked={defaultstate}
//                       onChange={handledefaultchange}
//                       className="sr-only"
//                     />
//                     <div
//                       className={`box block h-8 w-14 rounded-full ${
//                         defaultstate ? "bg-blue-600" : "bg-gray-400"
//                       }`}
//                     ></div>
//                     <div
//                       className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
//                         defaultstate ? "translate-x-full" : ""
//                       }`}
//                     ></div>
//                   </div>
//                 </label>
//                 <span className={`pt-2 ml-5  ${
//                         defaultstate ? "text-blue-600 font-bold" : ""
//                       }`}>
//                     Always show
//                 </span>
//               </span>
//             </div>
//           </main>
//         </div>

//       </div>
//     </div>
//   );
// }


function Dashboard(_ref) {
  var page = _ref.page,
    setpage = _ref.setpage;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    defaultstate = _useState2[0],
    setdefaultstate = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultstate),
    _useState4 = _slicedToArray(_useState3, 2),
    isChecked = _useState4[0],
    setIsChecked = _useState4[1];
  var handleCheckboxChange = function handleCheckboxChange(_ref2) {
    var value = _ref2.value;
    chrome.runtime.sendMessage({
      action: "sendToContent",
      data: {
        isChecked: value
      }
    }, function (response) {
      //console.log("Response from Content:", response);
    });
    setIsChecked(value);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    chrome.storage.local.get(["autotoken69"], function (tokenResult) {
      var token = tokenResult.autotoken69;
      if (!token) {
        console.log("No token found.");
        return;
      }
      console.log("Token retrieved:", token);

      // Send request to backend
      fetch("https://autonotebackend.shadowbites10.workers.dev/getalwayson", {
        method: "POST",
        headers: {
          Authorization: "Bearer ".concat(token),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(4) // ✅ Fix: Removed extra stringify
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log("Received response from backend:", data); // ✅ Debugging
        if (data.success) {
          setdefaultstate(data.res.alwayson);
          console.log("Default state updated:", data.res.alwayson);
        } else {
          console.error("Backend returned failure:", data);
        }
      })["catch"](function (error) {
        console.error("Error updating default state:", error);
      });
    });
  }, []);
  var handledefaultchange = function handledefaultchange() {
    chrome.storage.local.get(["autotoken69"], function (tokenResult) {
      var token = tokenResult.autotoken69;
      if (!token) {
        console.log("No token found.");
        return;
      }
      console.log("Token retrieved:", token);

      // Send request to backend
      fetch("https://autonotebackend.shadowbites10.workers.dev/setalwayson", {
        method: "POST",
        headers: {
          Authorization: "Bearer ".concat(token),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          alwayson: !defaultstate
        }) // ✅ Fix: Removed extra stringify
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log("Received response from backend:", data); // ✅ Debugging
        if (data.success) {
          setdefaultstate(data.res.alwayson);
          console.log("Default state updated:", data.res.alwayson);
        } else {
          console.error("Backend returned failure:", data);
        }
      })["catch"](function (error) {
        console.error("Error updating default state:", error);
      });
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("header", {
    className: "bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    className: "text-xl font-bold text-white"
  }, "AutoNote"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "text-white hover:text-gray-200 focus:outline-none",
    onClick: function onClick() {
      chrome.storage.local.remove(["autotoken69"], function () {
        chrome.runtime.sendMessage({
          action: "removeToken",
          autotoken69: "autotoken69"
        });
        chrome.runtime.sendMessage({
          action: "removesavedtabs",
          laststore: "laststore"
        });
        console.log("authToken removed from local storage");
      });
      setpage("login");
    }
  }, "Log Out"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("main", {
    className: "px-6 py-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col space-y-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-center space-x-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200",
    onClick: function onClick() {
      return handleCheckboxChange({
        value: false
      });
    }
  }, "Show Floating Menu"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200",
    onClick: function onClick() {
      return handleCheckboxChange({
        value: true
      });
    }
  }, "Hide Floating Menu")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("hr", {
    className: "border-t-2 border-gray-200"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
    className: "text-lg font-semibold text-gray-700"
  }, "On Website Load:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-center items-center mt-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm font-medium ".concat(!defaultstate ? "text-blue-600" : "text-gray-500")
  }, "Always Hide"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "mx-4 relative inline-flex items-center cursor-pointer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "checkbox",
    checked: defaultstate,
    onChange: handledefaultchange,
    className: "sr-only"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-14 h-8 rounded-full transition-colors duration-200 ".concat(defaultstate ? "bg-blue-600" : "bg-gray-400")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ".concat(defaultstate ? "translate-x-6" : "")
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-sm font-medium ".concat(defaultstate ? "text-blue-600" : "text-gray-500")
  }, "Always Show"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-center mt-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://sahilcodes2002.github.io/autonoteweb/#/signin",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-5 w-5 mr-2",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fillRule: "evenodd",
    d: "M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z",
    clipRule: "evenodd"
  })), "See all your notes"))))));
}

/***/ }),

/***/ "./src/popup/Loginpage.jsx":
/*!*********************************!*\
  !*** ./src/popup/Loginpage.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Loginpage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


// export default function Loginpage(){
//     return <div>
//         this is login page
//     </div>
// }



//import { useNavigate } from "react-router-dom";
//import { BottomWarning } from "../components/BottomWarning";
//import { Button } from "../components/Button";
//import { Heading } from "../components/Heading";
//import { InputField } from "../components/InputField";
//import { SubHeading } from "../components/SubHeading";
//import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil"
//import { todos } from "../store/atoms/todos";
//import { info } from "../store/atoms/userinfo";
//import { Link } from "react-router-dom"

function Loginpage(_ref) {
  var page = _ref.page,
    setpage = _ref.setpage;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    username = _useState2[0],
    setUsername = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    password = _useState4[0],
    setPassword = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1]; // State to manage loading state
  //const navigate = useNavigate();

  var handleSignIn = function handleSignIn() {
    //console.log("hi backend");
    setLoading(true); // Set loading state to true when sign-in button is clicked
    axios__WEBPACK_IMPORTED_MODULE_1__["default"].post("https://autonotebackend.shadowbites10.workers.dev/signin", {
      username: username,
      password: password
    }).then(function (response) {
      if (response.data.message == "no user found") {
        alert(response.data.message);
        //console.log(response.data.message)
      } else {
        var authToken = response.data.token;
        //localStorage.setItem("token69", response.data.token);
        chrome.storage.local.set({
          autotoken69: authToken
        }, function () {
          console.log("Token saved in storage.", authToken);
        });
        chrome.runtime.sendMessage({
          action: "setToken",
          autotoken69: authToken
        });
        console.log(response.data.token);
        setpage("dash");
      }

      //navigate(`/dashboard`);
    })["catch"](function (error) {
      console.error("Sign-in error:", error);
    })["finally"](function () {
      setLoading(false); // Set loading state back to false when request completes
    });
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var token = localStorage.getItem("token");
    if (token) {
      //navigate("/dashboard")
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "h-screen bg-slate-300 flex justify-center overflow-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-80 rounded-xl pt-3 pb-1 "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-4 pt-3 pb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    style: {
      fontWeight: 650
    },
    className: " text-center font-sans  leading-tight text-[30px] smd:text-[39px] text-black text-opacity-80"
  }, "Sign in"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    style: {
      fontWeight: 100
    },
    className: " text-center font-sans  leading-tight text-[15px] smd:text-[20px] text-black text-opacity-80"
  }, "Dont have an account", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: function onClick() {
      setpage("signup");
    },
    style: {
      fontWeight: 250
    },
    className: "text-blue-600 underline"
  }, "Sign up"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "pt-2 text-center pl-3 pr-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Enter your information to sign in")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "pt-2 text-center pl-3 pr-3 "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    onChange: function onChange(e) {
      setUsername(e.target.value);
    },
    type: "text",
    className: " w-[250px] bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 mb-2",
    placeholder: "Email",
    required: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    onChange: function onChange(e) {
      setPassword(e.target.value);
    },
    type: "password",
    className: " w-[250px] bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 ",
    placeholder: "*********",
    required: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "pl-3 mt-4 pr-3 flex justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "bg-[rgb(47,141,113)] hover:bg-[rgb(18,107,70)] text-white py-[16px] px-20 md:py-[16px] md:px-20 rounded-md transition duration-300 font-semibold border-none text-sm ".concat(loading ? "opacity-50 cursor-not-allowed" : ""),
    onClick: handleSignIn
  }, "Sign in")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "pb-2"
  }), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-white"
  }, "Loading...")))));
}

// function InputField({label,holder,onChange,type,value}){
//   return (
//       <div className="m-3">
//           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
//           <input value={value || ""} onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={holder} required />
//       </div>
//   )
// }

/***/ }),

/***/ "./src/popup/Signup.jsx":
/*!******************************!*\
  !*** ./src/popup/Signup.jsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Signup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



//import { useNavigate } from "react-router-dom"
//import { Link } from "react-router-dom"
//import designImage from "../images/Design.jpg";

function Signup(_ref) {
  var page = _ref.page,
    setpage = _ref.setpage;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    verified = _useState2[0],
    setVerified = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    codematch = _useState4[0],
    setCodematch = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    firstName = _useState6[0],
    setFirstName = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    verifytry = _useState8[0],
    setVerifytry = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState10 = _slicedToArray(_useState9, 2),
    username = _useState10[0],
    setUsername = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState12 = _slicedToArray(_useState11, 2),
    verifyCode = _useState12[0],
    setVerifyCode = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState14 = _slicedToArray(_useState13, 2),
    password = _useState14[0],
    setPassword = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    loading = _useState16[0],
    setLoading = _useState16[1];
  // const navigate = useNavigate()

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var token = localStorage.getItem("token");
    if (token) {
      //navigate("/dashboard")
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-gray-100 min-h-screen "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "h-screen bg-white  pb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-full flex justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "font-sans text-3xl font-bold mt-3 text-gray-500"
  }, "AutoNote")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "flex space-x-1 md:space-x-4"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", {
    className: "".concat(codematch ? "hidden" : ""),
    A: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      width: "90vw"
    },
    className: "flex justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-5xl mx-auto mt-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "max-w-2xl text-center mx-auto p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    style: {
      fontWeight: 650
    },
    className: " text-center font-sans  leading-tight text-[30px] smd:text-[39px] text-black text-opacity-80"
  }, "Automatically create notes with AutoNote"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    style: {
      fontWeight: 650
    },
    className: "mt-3 text-center font-sans  leading-tight text-[15px]  text-black text-opacity-80"
  }, "Already have a AutoNote Account?", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: function onClick() {
      setpage("login");
    },
    style: {
      fontWeight: 350
    },
    className: "text-blue-600 underline"
  }, "Sign in"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-center ".concat(codematch ? "mt-3" : "mt-10", " mx-5 ")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    "for": "first_name",
    className: "block mb-2  font-medium text-gray-900 "
  }, "Email"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-full flex justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    onChange: function onChange(e) {
      setUsername(e.target.value);
    },
    type: "text",
    className: "w-[250px] bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 ".concat(loading || verified || codematch ? "opacity-50 cursor-not-allowed" : ""),
    placeholder: "John@gmail.com",
    required: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", {
    className: "".concat(codematch ? "hidden" : "")
  }), !verified && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(username == "")) {
              _context.next = 4;
              break;
            }
            alert("fill all the credentials");
            _context.next = 21;
            break;
          case 4:
            console.log(username);
            setLoading(true);
            setVerifytry(function (x) {
              return x + 1;
            });
            _context.prev = 7;
            _context.next = 10;
            return axios__WEBPACK_IMPORTED_MODULE_1__["default"].post("https://autonotebackend.shadowbites10.workers.dev/varification", {
              email: username.trim()
            });
          case 10:
            response = _context.sent;
            if (response.data.success == true) {
              console.log(response.data);
              setVerified(true);
            }
            setLoading(false);

            //localStorage.setItem("token", response.data.token)
            //setTodoList(response.data.res.todo);
            // setInfo({
            //     name:response.data.res.name,
            //     username:response.data.res.username,
            //     id:response.data.res.id

            // })
            //navigate(`/dashboard`)
            _context.next = 18;
            break;
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](7);
            console.error("Error during signup", _context.t0);
          case 18:
            _context.prev = 18;
            setLoading(false);
            return _context.finish(18);
          case 21:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[7, 15, 18, 21]]);
    })),
    className: "bg-[rgb(47,141,113)] hover:bg-[rgb(18,107,70)] text-white py-[16px] px-20 md:py-[16px] md:px-20 rounded-md transition duration-300 font-semibold border-none text-sm ".concat(loading || verified ? "opacity-50 cursor-not-allowed" : ""),
    disabled: loading || verified
  }, !loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, verifytry > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Try again"), verifytry == 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Send verification code")), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Loading..")), verified && !codematch && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Verification code is sent to your mail"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    "for": "first_name",
    className: "block mb-2  font-medium text-gray-900 "
  }, "Enter 4 digit code"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-full flex justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    onChange: function onChange(e) {
      setVerifyCode(e.target.value);
    },
    type: "text",
    className: " w-[100px] bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 ",
    placeholder: "",
    required: true
  }))), !codematch && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var response;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(username == "")) {
              _context2.next = 4;
              break;
            }
            alert("please enter the code");
            _context2.next = 21;
            break;
          case 4:
            console.log(username);
            setLoading(true);
            setVerifytry(function (x) {
              return x + 1;
            });
            _context2.prev = 7;
            _context2.next = 10;
            return axios__WEBPACK_IMPORTED_MODULE_1__["default"].post("https://autonotebackend.shadowbites10.workers.dev/varifycode", {
              email: username.trim(),
              code: verifyCode.trim()
            });
          case 10:
            response = _context2.sent;
            if (response.data.success == true) {
              console.log(response.data);
              setCodematch(true);
            } else {
              setVerified(false);
              setCodematch(false);
            }
            setLoading(false);

            //localStorage.setItem("token", response.data.token)
            //setTodoList(response.data.res.todo);
            // setInfo({
            //     name:response.data.res.name,
            //     username:response.data.res.username,
            //     id:response.data.res.id

            // })
            //navigate(`/dashboard`)
            _context2.next = 18;
            break;
          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](7);
            console.error("Error during signup", _context2.t0);
          case 18:
            _context2.prev = 18;
            setLoading(false);
            return _context2.finish(18);
          case 21:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[7, 15, 18, 21]]);
    })),
    className: "bg-[rgb(47,141,113)] hover:bg-[rgb(18,107,70)] text-white py-[16px] mt-4 px-20 md:py-[16px] md:px-20 rounded-md transition duration-300 font-semibold border-none text-sm ".concat(loading || codematch ? "opacity-50 cursor-not-allowed" : ""),
    disabled: loading || codematch
  }, !loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Send verification code"), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Loading..")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null)), codematch && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    "for": "first_name",
    className: "block mb-2  font-medium text-gray-900 "
  }, "Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-full flex justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    maxLength: "50",
    onChange: function onChange(e) {
      setFirstName(e.target.value);
    },
    type: "text",
    className: " w-[250px] bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 ",
    placeholder: "John",
    required: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    "for": "first_name",
    className: "block mb-2  font-medium text-gray-900 "
  }, "Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-full flex justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    onChange: function onChange(e) {
      setPassword(e.target.value);
    },
    type: "password",
    className: " w-[250px] bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 ",
    placeholder: "*********",
    required: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var response, authToken;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!(firstName == "" || username == "" || password == "")) {
              _context3.next = 4;
              break;
            }
            alert("fill all the credentials");
            _context3.next = 19;
            break;
          case 4:
            setLoading(true);
            _context3.prev = 5;
            _context3.next = 8;
            return axios__WEBPACK_IMPORTED_MODULE_1__["default"].post("https://autonotebackend.shadowbites10.workers.dev/signup", {
              name: firstName,
              username: username,
              password: password
            });
          case 8:
            response = _context3.sent;
            console.log(response.data);
            if (response.data.message && response.data.message == "username already exists") {
              setVerified(false);
              setCodematch(false);
              alert("alreay used email");
            } else {
              authToken = response.data.token;
              chrome.storage.local.set({
                autotoken69: authToken
              }, function () {
                console.log("Token saved in storage.");
              });
              chrome.runtime.sendMessage({
                action: "setToken",
                autotoken69: authToken
              });
              setLoading(false);
              setpage("dash");
              //navigate(`/signin`)
            }
            _context3.next = 16;
            break;
          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](5);
            console.error("Error during signup", _context3.t0);
          case 16:
            _context3.prev = 16;
            setLoading(false);
            return _context3.finish(16);
          case 19:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[5, 13, 16, 19]]);
    })),
    className: "mt-4 bg-[rgb(47,141,113)] hover:bg-[rgb(18,107,70)] text-white py-[13px] px-20 md:py-[16px] md:px-20 rounded-md transition duration-300 font-semibold border-none text-sm ".concat(loading ? "opacity-50 cursor-not-allowed" : ""),
    disabled: loading
  }, !loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Sign up"), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Loading..")))))))))));
}

/***/ }),

/***/ "./src/popup/popup.jsx":
/*!*****************************!*\
  !*** ./src/popup/popup.jsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _Loginpage_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Loginpage.jsx */ "./src/popup/Loginpage.jsx");
/* harmony import */ var _Dashboard_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Dashboard.jsx */ "./src/popup/Dashboard.jsx");
/* harmony import */ var _Signup_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Signup.jsx */ "./src/popup/Signup.jsx");
/* harmony import */ var _assets_tailwind_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/tailwind.css */ "./src/assets/tailwind.css");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// import React from 'react';
// import {createRoot} from 'react-dom/client'
// import '../assets/tailwind.css'
// const test = (
//     <div>
//         <h1 className='text-sky-500 text-lg'>Hello, world!</h1>
//         <img src="hi.jpg" alt="hi"></img>
//     </div>
// )

// const container = document.createElement('div')
// document.body.appendChild(container)
// const root = createRoot(container)
// root.render(test)







var Popup = function Popup() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("login"),
    _useState2 = _slicedToArray(_useState, 2),
    page = _useState2[0],
    setpage = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    inputValue = _useState4[0],
    setInputValue = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isloading = _useState6[0],
    setisloading = _useState6[1];
  //console.log("hu")
  // Load the data from storage when the component mounts
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setisloading(true);
    chrome.storage.local.get(['autotoken69'], function (result) {
      if (result.autotoken69) {
        chrome.runtime.sendMessage({
          action: 'setToken',
          autotoken69: result.autotoken69
        });
        //console.log(result.token69)   
        setpage("dash");
      }
    });
    setisloading(false);
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: ""
  }, page == "login" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Loginpage_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    page: page,
    setpage: setpage
  }), page == "signup" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Signup_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    page: page,
    setpage: setpage
  }), page == "dash" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Dashboard_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
    page: page,
    setpage: setpage
  }));
};
var container = document.createElement('div');
document.body.appendChild(container);
var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Popup, null));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"popup": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktab_saver_extension"] = self["webpackChunktab_saver_extension"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_sour-b53f7e","vendors-node_modules_axios_lib_axios_js","src_assets_tailwind_css"], () => (__webpack_require__("./src/popup/popup.jsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=popup.js.map