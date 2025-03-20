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



import React, { useEffect, useState } from "react";

export default function Dashboard({ page, setpage }) {
  const [defaultstate, setdefaultstate] = useState(false);
  const [isChecked, setIsChecked] = useState(defaultstate);

  const handleCheckboxChange = ({ value }) => {
    chrome.runtime.sendMessage(
      { action: "sendToContent", data: { isChecked: value } },
      (response) => {
        //console.log("Response from Content:", response);
      }
    );

    setIsChecked(value);
  };

  useEffect(() => {
    chrome.storage.local.get(["autotoken69"], (tokenResult) => {
      const token = tokenResult.autotoken69;
      if (!token) {
        console.log("No token found.");
        return;
      }

      console.log("Token retrieved:", token);

      // Send request to backend
      fetch("https://autonotebackend.shadowbites10.workers.dev/getalwayson", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(4), // ✅ Fix: Removed extra stringify
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Received response from backend:", data); // ✅ Debugging
          if (data.success) {
            setdefaultstate(data.res.alwayson);
            console.log("Default state updated:", data.res.alwayson);
          } else {
            console.error("Backend returned failure:", data);
          }
        })
        .catch((error) => {
          console.error("Error updating default state:", error);
        });
    });
  }, []);

  const handledefaultchange = () => {
    chrome.storage.local.get(["autotoken69"], (tokenResult) => {
      const token = tokenResult.autotoken69;
      if (!token) {
        console.log("No token found.");
        return;
      }

      console.log("Token retrieved:", token);

      // Send request to backend
      fetch("https://autonotebackend.shadowbites10.workers.dev/setalwayson", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ alwayson: !defaultstate }), // ✅ Fix: Removed extra stringify
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Received response from backend:", data); // ✅ Debugging
          if (data.success) {
            setdefaultstate(data.res.alwayson);
            console.log("Default state updated:", data.res.alwayson);
          } else {
            console.error("Backend returned failure:", data);
          }
        })
        .catch((error) => {
          console.error("Error updating default state:", error);
        });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">AutoNote</h1>
            <button
              className="text-white hover:text-gray-200 focus:outline-none"
              onClick={() => {
                chrome.storage.local.remove(["autotoken69"], () => {
                  chrome.runtime.sendMessage({
                    action: "removeToken",
                    autotoken69: "autotoken69",
                  });
                  chrome.runtime.sendMessage({
                    action: "removesavedtabs",
                    laststore: "laststore",
                  });
                  console.log("authToken removed from local storage");
                });
                setpage("login");
              }}
            >
              Log Out
            </button>
          </div>
        </header>
        <main className="px-6 py-6">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
                onClick={() => handleCheckboxChange({ value: false })}
              >
                Show Floating Menu
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
                onClick={() => handleCheckboxChange({ value: true })}
              >
                Hide Floating Menu
              </button>
            </div>

            <hr className="border-t-2 border-gray-200" />

            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-700">
                On Website Load:
              </h2>
              <div className="flex justify-center items-center mt-4">
                <span
                  className={`text-sm font-medium ${
                    !defaultstate ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  Always Hide
                </span>
                <label className="mx-4 relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={defaultstate}
                    onChange={handledefaultchange}
                    className="sr-only"
                  />
                  <div
                    className={`w-14 h-8 rounded-full transition-colors duration-200 ${
                      defaultstate ? "bg-blue-600" : "bg-gray-400"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                      defaultstate ? "translate-x-6" : ""
                    }`}
                  ></div>
                </label>
                <span
                  className={`text-sm font-medium ${
                    defaultstate ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  Always Show
                </span>
              </div>
            </div>

            <div className="text-center mt-6">
  <a
    href="https://sahilcodes2002.github.io/autonoteweb/#/signin"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
      <path
        fillRule="evenodd"
        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
        clipRule="evenodd"
      />
    </svg>
    See all your notes
  </a>
</div>
          </div>
        </main>
      </div>
    </div>
  );
}