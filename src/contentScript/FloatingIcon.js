import { stringify } from "postcss";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const FloatingIconWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  width: ${({ x }) => (x >= window.innerWidth - 40 ? "40px" : "37px")};
  height: 37px;
  background-color: ${({ isDragging }) => (isDragging ? "#FFFFFF" : "#FFFFFF")};
  border-radius: ${({ x }) => (x >= window.innerWidth - 40 ? "0%" : "50%")};
  border-top-left-radius: ${({ x }) =>
    x >= window.innerWidth - 40 ? "45%" : "50%"};
  border-bottom-left-radius: ${({ x }) =>
    x >= window.innerWidth - 40 ? "45%" : "50%"};
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  transition: background-color 0.3s;
  visibility: ${({ hide }) => (hide ? "hidden" : "visible")};
`;

// const FloatingIconButton = styled.button`
//   background: none;
//   border: none;
//   color: white;
//   font-weight: bold;
// `;
// background-color: ${({ isDragging }) => (isDragging ? '#FF7F50' : '#FFD700')};
const FloatingIconButton = styled.button`
  background: none;
  border-radius: 50%;
  border: none;
  color: white;
  font-weight: bold;
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margin */
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  &:hover {
    color: black; /* Change text color to green on hover */
  }
`;

const OptionsWrapper3 = styled.div`
  position: fixed;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  top: ${({ y }) => y - 22}px; /* Adjust position to be below the main icon */
  left: ${({ x }) => x + 6}px;
  transition: opacity 0.3s;
  visibility: ${({ hide }) => (hide ? "hidden" : "visible")};
`;

const OptionsWrapper2 = styled.div`
  position: fixed;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  top: ${({ y }) => y - 7}px; /* Adjust position to be below the main icon */
  left: ${({ x }) => x - 4}px;
  transition: opacity 0.3s;
  visibility: ${({ hide }) => (hide ? "hidden" : "visible")};
`;

const OptionsWrapper = styled.div`
  position: fixed;
  z-index: 999;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  gap: 10px;
  top: ${({ y }) => y + 45}px; /* Adjust position to be below the main icon */
  left: ${({ x }) => x + 4}px;
  transition: opacity 0.3s;
  opacity: ${({ show }) => (show === "true" ? 1 : 0)};
  visibility: ${({ hide }) => (hide ? "hidden" : "visible")};
`;

const OptionIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({ isDragging }) => (isDragging ? "#FFFFFF" : "#FFFFFF")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  visibility: ${({ hide }) => (hide ? "hidden" : "visible")};
`;

const OptionIcon2 = styled.div`
  padding: 1px; /* Remove padding */
  background-color: ${({ isDragging }) => (isDragging ? "#FFFFFF" : "#FFFFFF")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  color: black;
  align-items: center;
  cursor: pointer;
`;

const OptionIcon3 = styled.div`
  padding: 1px; /* Remove padding */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  color: black;
  align-items: center;
  cursor: pointer;
`;

export default function FloatingIcon({
  selectedTexts,
  record,
  setRecord,
  setSelectedTexts,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [regetfiles, setRegetfiles] = useState(false);
  const [hide, sethide] = useState(true);
  const [shownotes, setShownotes] = useState(false);
  const [allfiles, setAllfiles] = useState([]);

  const [showallfile, setshowallfiles] = useState(false);
  const [autotoken69, setautotoken69] = useState("");
  const [file, setfile] = useState(0);
  const [filetitle, setfiletitle] = useState(null);
  const [bakchodiover, setbakchodiover] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth - 40,
    y: 100,
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "processMessage") {
      //console.log(message.data.isChecked);
      sethide(message.data.isChecked);
      sendResponse({ status: "Message received!", receivedData: message.data });
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "setautotoken69") {
      //console.log("Message received in content script:");
      //console.log(message.token69); // Correct way to access the token

      if (message.token69) {
        setautotoken69(message.token69);
      }
    }
  });

  useEffect(() => {
    //console.log(file);
  }, [file]);

  useEffect(() => {
    chrome.storage.local.get(["autotoken69"], (tokenResult) => {
      const token = tokenResult.autotoken69;
      if (!token) {
        //console.log("No token found.");
        return;
      }

      //console.log("Token retrieved:", token);

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
          //console.log("Received response from backend:", data); // ✅ Debugging
          if (data.success) {
            sethide(!data.res.alwayson);
            //console.log("Default state updated:", data.res.alwayson);
          } else {
            //console.error("Backend returned failure:", data);
          }
        })
        .catch((error) => {
          //console.error("Error updating default state:", error);
        });
    });
  }, []);

  useEffect(() => {
    if (file !== 0 && selectedTexts != [] && bakchodiover) {
      //console.log(file);

      chrome.storage.local.get(["autotoken69"], (tokenResult) => {
        const token = tokenResult.autotoken69;
        if (!token) {
          //console.log("No token found.");
          return;
        }

        //console.log("Token retrieved:", token);

        fetch("https://autonotebackend.shadowbites10.workers.dev/addcontent", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: JSON.stringify(selectedTexts),
            id: file,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              //console.log("File updated:", data.res.id);
            } else {
              //console.error("Backend returned failure:", data);
            }
          })
          .catch((error) => {
            //console.error("Error storing tabs in the backend:", error);
          });
      });
    }
  }, [selectedTexts]); // ✅ Now properly re-runs when `file` or `selectedTexts` change

  useEffect(() => {
    if (autotoken69 === "") {
      //console.log("asking for token");
      chrome.runtime.sendMessage({
        action: "givetoken",
        data: "Hello from content script!",
      });
    } else {
      //console.log("Token already exists :" + autotoken69);
    }
  }, []);

  useEffect(() => {
    if (record) {
      chrome.storage.local.get(["autotoken69"], (tokenResult) => {
        const token = tokenResult.autotoken69;
        if (!token) {
          //console.log("No token found.");
          return;
        }

        //console.log("Token retrieved:", token);

        // Send request to backend
        fetch("https://autonotebackend.shadowbites10.workers.dev/getallfiles", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(4), // ✅ Fix: Removed extra stringify
        })
          .then((response) => response.json())
          .then((data) => {
            //console.log("Received response from backend:", data); // ✅ Debugging
            if (data.success) {
              setAllfiles(data.res);
              //console.log("Default state updated:", data.res.alwayson);
            } else {
              //console.error("Backend returned failure:", data);
            }
          })
          .catch((error) => {
            // //console.error("Error updating default state:", error);
          });
      });
    }
  }, [record, regetfiles]);

  useEffect(() => {
    if (record) {
      // Request tab information from the background script
      chrome.runtime.sendMessage({ action: "getTabInfo" }, (response) => {
        if (!response) return;

        const url = response.url;
        const title = response.title;
        const favicon = response.favicon;

        // //console.log("Tab URL:", url);
        // //console.log("Tab Title:", title);
        // //console.log("Tab Favicon:", favicon);

        if (!url) return; // If URL is empty, exit early

        // Retrieve the saved token
        chrome.storage.local.get(["autotoken69"], (tokenResult) => {
          const token = tokenResult.autotoken69;
          if (!token) {
            // //console.log("No token found.");
            return;
          }

          // //console.log("Token retrieved:", token);

          // Check if the URL is already stored
          chrome.storage.local.get([url], (storedResult) => {
            if (storedResult[url]) {
              setfile(JSON.parse(storedResult[url]));

              // //console.log(
              //   "file id is already there for this" +
              //     JSON.parse(storedResult[url])
              // );
              setbakchodiover(false);
              fetch(
                "https://autonotebackend.shadowbites10.workers.dev/getfiletitle",
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ id: JSON.parse(storedResult[url]) }),
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  if (data.success) {
                    // //console.log(data);
                    setfiletitle(data.res.title);
                    setSelectedTexts(JSON.parse(data.res.content));
                    setbakchodiover(true);
                    //console.log("File title:", data.res.title);
                  } else {
                    fetch(
                      "https://autonotebackend.shadowbites10.workers.dev/newfile",
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          title: title,
                          tab: url,
                          faviconicon: favicon,
                        }),
                      }
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.success) {
                          setfile(data.res.id);
                          setfiletitle(data.res.title);
                          setbakchodiover(true);
                          chrome.storage.local.set(
                            { [url]: JSON.stringify(data.res.id) },
                            () => {
                              // //console.log("Tab data stored.");
                            }
                          );
                          if (
                            file !== 0 &&
                            selectedTexts != [] &&
                            bakchodiover
                          ) {
                            // //console.log(file);
                          }
                          fetch(
                            "https://autonotebackend.shadowbites10.workers.dev/upserturl",
                            {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                url: url,
                                file: data.res.id,
                              }),
                            }
                          )
                            .then((response) => response.json())
                            .then((data) => {
                              if (data.success) {
                              }
                            })
                            .catch((error) => {
                              //console.error(
                              //   "Error storing tabs in the backend:",
                              //   error
                              // );
                            });
                        }
                      })
                      .catch((error) => {
                        //console.error(
                        //   "Error storing tabs in the backend:",
                        //   error
                        // );
                      });
                  }
                })
                .catch((error) => {
                  //console.error("Error storing tabs in the backend:", error);
                });

              // fetch("https://autonotebackend.shadowbites10.workers.dev/getfilecontent", {
              //   method: "POST",
              //   headers: {
              //     Authorization: `Bearer ${token}`,
              //     "Content-Type": "application/json",
              //   },
              //   body: JSON.stringify({ id: JSON.parse(storedResult[url]) }),
              // })
              //   .then((response) => response.json())
              //   .then((data) => {
              //     if (data.success) {
              //       setSelectedTexts(JSON.parse(data.res.content));
              //       setbakchodiover(true);
                    // //console.log(
              //         "File contnent from BACKEND:",
              //         data.res.content
              //       );
              //     }
              //   })
              //   .catch((error) => {
                  // //console.error("Error storing tabs in the backend:", error);
              //   });
            } else {
              // Fetch from backend
              var fileurlfound = false;
              setbakchodiover(false);
              fetch(
                "https://autonotebackend.shadowbites10.workers.dev/geturl",
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    url: url,
                  }),
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  if (data.success) {
                    fileurlfound = true;
                    setfile(data.res.id);
                    chrome.storage.local.set(
                      { [url]: JSON.stringify(data.res.file_id) },
                      () => {
                        //console.log("Tab data stored.");
                      }
                    );
                    fetch(
                      "https://autonotebackend.shadowbites10.workers.dev/getfiletitle",
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: data.res.file_id }),
                      }
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.success) {
                          //console.log(data);
                          setfiletitle(data.res.title);
                          setSelectedTexts(JSON.parse(data.res.content));
                          setbakchodiover(true);

                          //console.log("File title:", data.res.title);
                        } else {
                          fetch(
                            "https://autonotebackend.shadowbites10.workers.dev/newfile",
                            {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                title: title,
                                tab: url,
                                faviconicon: favicon,
                              }),
                            }
                          )
                            .then((response) => response.json())
                            .then((data) => {
                              if (data.success) {
                                setfile(data.res.id);
                                setfiletitle(data.res.title);
                                setbakchodiover(true);
                                chrome.storage.local.set(
                                  { [url]: JSON.stringify(data.res.id) },
                                  () => {
                                    //console.log("Tab data stored.");
                                  }
                                );
                                if (
                                  file !== 0 &&
                                  selectedTexts != [] &&
                                  bakchodiover
                                ) {
                                  //console.log(file);

                                  // Fetch the token first
                                  // chrome.storage.local.get(
                                  //   ["autotoken69"],
                                  //   (tokenResult) => {
                                  //     const token = tokenResult.autotoken69;
                                  //     if (!token) {
                                        // //console.log("No token found.");
                                  //       return;
                                  //     }

                                      // //console.log("Token retrieved:", token);

                                  // Send content to the backend
                                  // fetch("https://autonotebackend.shadowbites10.workers.dev/addcontent", {
                                  //   method: "POST",
                                  //   headers: {
                                  //     Authorization: `Bearer ${token}`,
                                  //     "Content-Type": "application/json",
                                  //   },
                                  //   body: JSON.stringify({
                                  //     content: JSON.stringify(selectedTexts),
                                  //     id: data.res.id,
                                  //   }),
                                  // })
                                  //   .then((response) => response.json())
                                  //   .then((data) => {
                                  //     if (data.success) {
                                        //console.log("File updated:", data.res.content);
                                  //     } else {
                                        // //console.error("Backend returned failure:", data);
                                  //     }
                                  //   })
                                  //   .catch((error) => {
                                      // //console.error("Error storing tabs in the backend:", error);
                                  //   });
                                  //   }
                                  // );
                                }
                                fetch(
                                  "https://autonotebackend.shadowbites10.workers.dev/upserturl",
                                  {
                                    method: "POST",
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      url: url,
                                      file: data.res.id,
                                    }),
                                  }
                                )
                                  .then((response) => response.json())
                                  .then((data) => {
                                    if (data.success) {
                                    }
                                  })
                                  .catch((error) => {
                                    //console.error(
                                    //   "Error storing tabs in the backend:",
                                    //   error
                                    // );
                                  });
                              }
                            })
                            .catch((error) => {
                              //console.error(
                              //   "Error storing tabs in the backend:",
                              //   error
                              // );
                            });
                        }
                      })
                      .catch((error) => {
                        //console.error(
                        //   "Error storing tabs in the backend:",
                        //   error
                        // );
                      });
                  } else {
                    fetch(
                      "https://autonotebackend.shadowbites10.workers.dev/newfile",
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          title: title,
                          tab: url,
                          faviconicon: favicon,
                        }),
                      }
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.success) {
                          setfile(data.res.id);
                          setfiletitle(data.res.title);
                          setbakchodiover(true);
                          chrome.storage.local.set(
                            { [url]: JSON.stringify(data.res.id) },
                            () => {
                              //console.log("Tab data stored.");
                            }
                          );
                          if (
                            file !== 0 &&
                            selectedTexts != [] &&
                            bakchodiover
                          ) {
                            //console.log(file);

                            // Fetch the token first
                            // chrome.storage.local.get(
                            //   ["autotoken69"],
                            //   (tokenResult) => {
                            //     const token = tokenResult.autotoken69;
                            //     if (!token) {
                                  // //console.log("No token found.");
                            //       return;
                            //     }

                                // //console.log("Token retrieved:", token);

                            // Send content to the backend
                            // fetch("https://autonotebackend.shadowbites10.workers.dev/addcontent", {
                            //   method: "POST",
                            //   headers: {
                            //     Authorization: `Bearer ${token}`,
                            //     "Content-Type": "application/json",
                            //   },
                            //   body: JSON.stringify({
                            //     content: JSON.stringify(selectedTexts),
                            //     id: data.res.id,
                            //   }),
                            // })
                            //   .then((response) => response.json())
                            //   .then((data) => {
                            //     if (data.success) {
                                  //console.log("File updated:", data.res.content);
                            //     } else {
                                  // //console.error("Backend returned failure:", data);
                            //     }
                            //   })
                            //   .catch((error) => {
                                // //console.error("Error storing tabs in the backend:", error);
                            //   });
                            //   }
                            // );
                          }
                          fetch(
                            "https://autonotebackend.shadowbites10.workers.dev/upserturl",
                            {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                url: url,
                                file: data.res.id,
                              }),
                            }
                          )
                            .then((response) => response.json())
                            .then((data) => {
                              if (data.success) {
                              }
                            })
                            .catch((error) => {
                              //console.error(
                              //   "Error storing tabs in the backend:",
                              //   error
                              // );
                            });
                        }
                      })
                      .catch((error) => {
                        //console.error(
                        //   "Error storing tabs in the backend:",
                        //   error
                        // );
                      });
                  }
                })
                .catch((error) => {
                  //console.error("Error storing tabs in the backend:", error);
                });
            }
          });
        });
      });
    }
  }, [record]);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const mouseStartRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition((prev) => ({
      x: dragStartRef.current.x + (e.clientX - mouseStartRef.current.x),
      y: dragStartRef.current.y + (e.clientY - mouseStartRef.current.y),
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  useEffect(() => {
    //console.log(isDragging);
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = { x: position.x, y: position.y };
    mouseStartRef.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const toggleHide = () => {
    sethide((prev) => !prev);
  };

  return (
    <>
      <OptionsWrapper2
        x={position.x}
        y={position.y}
        show={showOptions.toString()}
        hide={hide}
      >
        <OptionIcon2 title="Hide" isDragging={isDragging} hide={hide}>
          <FloatingIconButton
            onClick={(e) => {
              e.stopPropagation();
              if (!isDragging) {
                toggleHide();
                setShowOptions(false);
              }
            }}
            title="Hide"
          >
            {/* ⟲ */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
            >
              <path
                fill="grey"
                d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12L5.293 6.707a1 1 0 0 1 0-1.414z"
              />
            </svg>
          </FloatingIconButton>
        </OptionIcon2>
      </OptionsWrapper2>
      {record && (
        <OptionsWrapper3
          x={position.x}
          y={position.y}
          show={showOptions.toString()}
          hide={hide}
        >
          <OptionIcon3
            title="AutoNote note active"
            isDragging={isDragging}
            hide={hide}
          >
            <FloatingIconButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="0" fill="red">
                  <animate
                    attributeName="r"
                    begin=".67"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle cx="12" cy="12" r="0" fill="yellow">
                  <animate
                    attributeName="r"
                    begin="0"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
              </svg>
            </FloatingIconButton>
          </OptionIcon3>
        </OptionsWrapper3>
      )}
      <FloatingIconWrapper
        onMouseDown={handleMouseDown}
        x={position.x}
        y={position.y}
        isDragging={isDragging}
        hide={hide}
      >
        {shownotes && (
          <NotesDisplay
            selectedTexts={selectedTexts}
            position={position}
            setselectdtexts={setSelectedTexts}
            record={record}
          />
        )}
        {showallfile && (
          <FilesDisplay
            file={file}
            allfiles={allfiles}
            position={position}
            setAllfiles={setAllfiles}
            setfile={setfile}
            setfiletitle={setfiletitle}
            setbakchodiover={setbakchodiover}
            setSelectedTexts={setSelectedTexts}
            selectedTexts={selectedTexts}
            filetitle={filetitle}
            record={record}
            setRegetfiles={setRegetfiles}
          />
        )}
        <FloatingIconButton
          onClick={(e) => {
            e.stopPropagation();
            if (!isDragging) {
              toggleOptions();
            }
          }}
          title="Show options"
        >
          {/* ⟲ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="blue"
              d="M4.088 6.412a2.837 2.837 0 0 0-1.347-.955l-1.378-.448a.544.544 0 0 1 0-1.025l1.378-.448A2.838 2.838 0 0 0 4.5 1.774l.011-.034L4.96.363a.544.544 0 0 1 1.027 0l.447 1.377a2.836 2.836 0 0 0 1.798 1.796l1.378.448l.028.007a.544.544 0 0 1 0 1.025l-1.378.448A2.839 2.839 0 0 0 6.461 7.26l-.448 1.377A.547.547 0 0 1 5.5 9a.544.544 0 0 1-.513-.363L4.539 7.26a2.835 2.835 0 0 0-.45-.848Zm7.695 3.801l-.765-.248a1.577 1.577 0 0 1-1-.999l-.248-.764a.302.302 0 0 0-.57 0l-.25.764a1.575 1.575 0 0 1-.983.999l-.765.248a.302.302 0 0 0 0 .57l.765.249a1.577 1.577 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.576 1.576 0 0 1 .999-.999l.765-.248a.302.302 0 0 0 0-.57l-.015-.004Zm.347-.944c.254.091.475.259.63.48l-.04.05a1.29 1.29 0 0 1 0 1.5a1.29 1.29 0 0 1-.65.49l-.76.24a.682.682 0 0 0-.23.14a.742.742 0 0 0-.14.22l-.25.79a1.31 1.31 0 0 1-.48.63a1.29 1.29 0 0 1-1.5 0a1.35 1.35 0 0 1-.49-.65l-.24-.76a.59.59 0 0 0-.14-.23a.741.741 0 0 0-.22-.14l-.539-.17l-3.14 3.14a3.105 3.105 0 0 0-.825 1.477L2.02 21.077a.75.75 0 0 0 .904.903l4.601-1.095a3.106 3.106 0 0 0 1.477-.826L19 10.06a1.75 1.75 0 0 1-.005 2.47l-1.783 1.784a.75.75 0 0 0 1.06 1.06l1.784-1.783A3.25 3.25 0 0 0 20.06 9l.891-.892a3.578 3.578 0 0 0-5.06-5.06l-5.068 5.067l.176.534a.55.55 0 0 0 .11.22a.5.5 0 0 0 .22.13l.73.27h.07Z"
            />
          </svg>
        </FloatingIconButton>
        <OptionsWrapper
          x={position.x}
          y={position.y}
          show={showOptions.toString()}
          hide={hide}
        >
          <OptionIcon isDragging={isDragging} hide={hide}>
            <FloatingIconButton
              onClick={(e) => {
                e.stopPropagation();

                setRecord((prevRecord) => !prevRecord);
                //toggleOptions();
              }}
              title={!record ? "Start Auto Note" : "Stop auto note"}
            >
              {/* ⟲ */}
              {!record && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="blue"
                    d="M15.544 9.59a1 1 0 0 1-.053 1.728L6.476 16.2A1 1 0 0 1 5 15.321V4.804a1 1 0 0 1 1.53-.848l9.014 5.634Z"
                  />
                </svg>
              )}
              {record && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="blue"
                    fill-rule="evenodd"
                    d="M6.75 3a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2Zm6.5 0a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
              )}
            </FloatingIconButton>
          </OptionIcon>
          <OptionIcon isDragging={isDragging} hide={hide}>
            <FloatingIconButton
              onClick={(e) => {
                e.stopPropagation();
                if (!isDragging) {
                }
                if (!shownotes) {
                  setshowallfiles(false);
                }
                setShownotes((x) => !x);

                //console.log("x" + shownotes);
              }}
              title="toggle notes"
            >
              {!shownotes && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 17 16"
                >
                  <path
                    fill="blue"
                    fill-rule="evenodd"
                    d="M14.938 0H3a2 2 0 0 0-2 2v2h16l-.062-2a2 2 0 0 0-2-2zM1 8h4v2H1zm0 3h4v2H1zm4 5v-2H1c.066 1.045.927 2 1.987 2H5zM1 5h4v2H1zm5 0v2h11l-.062-2H6zm0 6v2h11l-.062-2H6zm8.938 5C16 16 16.935 15.045 17 14H6v2h8.938zM6 8v2h11l-.062-2H6z"
                  />
                </svg>
              )}
              {shownotes && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="blue"
                    stroke="blue"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h3M3 21h3m0 0h4a2 2 0 0 0 2-2V9M6 21V9m0-6h4a2 2 0 0 1 2 2v4M6 3v6M3 9h3m0 0h6m-9 6h9m3-6l3 3m0 0l3 3m-3-3l3-3m-3 3l-3 3"
                  />
                </svg>
              )}
            </FloatingIconButton>
          </OptionIcon>
          <OptionIcon isDragging={isDragging} hide={hide}>
            <FloatingIconButton
              onClick={(e) => {
                e.stopPropagation();
                if (!isDragging) {
                }
                if (!showallfile) {
                  setShownotes(false);
                }
                setshowallfiles((x) => !x);
              }}
              title="toggle notes"
            >
              {!showallfile && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="blue"
                    d="M186.2 139.6h139.6V0H186.2v139.6zM372.4 0v139.6H512V0H372.4zM0 139.6h139.6V0H0v139.6zm186.2 186.2h139.6V186.2H186.2v139.6zm186.2 0H512V186.2H372.4v139.6zM0 325.8h139.6V186.2H0v139.6zM186.2 512h139.6V372.4H186.2V512zm186.2 0H512V372.4H372.4V512zM0 512h139.6V372.4H0V512z"
                  />
                </svg>
              )}
              {showallfile && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="blue"
                    d="M3 6h10v2H3V6m0 10h10v2H3v-2m0-5h12v2H3v-2m13-4l-1.42 1.39L18.14 12l-3.56 3.61L16 17l5-5l-5-5Z"
                  />
                </svg>
              )}
            </FloatingIconButton>
          </OptionIcon>
        </OptionsWrapper>
      </FloatingIconWrapper>
    </>
  );
}

function NotesDisplay({ selectedTexts, position, setselectdtexts, record }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const side = position.x > windowWidth / 2 ? "left" : "right";
  const offset = side === "left" ? -230 : 50; // Adjusted the offset to place the notes beside the icon

  return (
    <NotesContainer y={position.y} x={position.x + offset}>
      {/* {selectedTexts.map((text, index) => (
        <Note key={index}>{text}</Note>
      ))} */}
      {!record && (
        <Notewarning>
          {"Click on play button to start auto note and see old notes !"}
        </Notewarning>
      )}
      {record && selectedTexts && selectedTexts.length == 0 && (
        <Notewarning>{"Start selecting text to create notes"}</Notewarning>
      )}
      {selectedTexts
        .slice()
        .reverse()
        .map((text, index) => (
          <Note key={index}>
            <Combine
              onClick={() => {
                // setRegetfiles(x=!x);
                setselectdtexts((prev) => prev.filter((item) => item !== text));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                  clip-rule="evenodd"
                />
                <path
                  fill="currentColor"
                  d="M11.854 4.854a.5.5 0 0 0-.707-.707L8 7.293L4.854 4.147a.5.5 0 1 0-.707.707L7.293 8l-3.146 3.146a.5.5 0 0 0 .707.708L8 8.707l3.147 3.147a.5.5 0 0 0 .707-.708L8.708 8z"
                />
              </svg>
            </Combine>
            {text}
          </Note>
        ))}
    </NotesContainer>
  );
}

function FilesDisplay({
  allfiles,
  position,
  setAllfiles,
  setfile,
  setfiletitle,
  filetitle,
  setbakchodiover,
  setSelectedTexts,
  selectedTexts,
  record,
  setRegetfiles,
  file,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filetodel, setFiletodelete] = useState(null);
  const [isDeleting, setisDeleting] = useState(false);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const side = position.x > windowWidth / 2 ? "left" : "right";
  const offset = side === "left" ? -230 : 50; // Adjusted the offset to place the notes beside the icon

  return (
    <NotesContainer y={position.y} x={position.x + offset}>
      {/* {selectedTexts.map((text, index) => (
        <Note key={index}>{text}</Note>
      ))} */}
      {record && (
        <Heading>
          <Subheading title="You are adding notes to this file.">
            {"Current file: "}
          </Subheading>
          {filetitle ? filetitle : ""}
          {filetitle && selectedTexts.length == 0 ? " (new file)" : ""}
        </Heading>
      )}

      {record && (
        <Subheading>
          Switch files from below{" "}
          {selectedTexts && selectedTexts.length != 0 ? (
            <>
              {" "}
              {" or create a"}{" "}
              {selectedTexts && selectedTexts.length != 0 && (
                <MyButton
                  title="Create a new file!"
                  onClick={() => {
                    chrome.runtime.sendMessage(
                      { action: "getTabInfo" },
                      (response) => {
                        if (!response) return;

                        const url = response.url;
                        const title = response.title;
                        const favicon = response.favicon;

                        //console.log("Tab URL:", url);
                        //console.log("Tab Title:", title);
                        //console.log("Tab Favicon:", favicon);

                        if (!url) return; // If URL is empty, exit early

                        chrome.storage.local.get(
                          ["autotoken69"],
                          (tokenResult) => {
                            const token = tokenResult.autotoken69;
                            if (!token) {
                              //console.log("No token found.");
                              return;
                            }

                            fetch(
                              "https://autonotebackend.shadowbites10.workers.dev/newfile",
                              {
                                method: "POST",
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  title: title,
                                  tab: url,
                                  faviconicon: favicon,
                                }),
                              }
                            )
                              .then((response) => response.json())
                              .then((data) => {
                                if (data.success) {
                                  setfile(data.res.id);
                                  setfiletitle(title);
                                  setbakchodiover(true);
                                  setSelectedTexts([]);
                                  chrome.storage.local.remove([url]);
                                  chrome.storage.local.set(
                                    { [url]: JSON.stringify(data.res.id) },
                                    () => {
                                      //console.log("Tab data stored.");
                                    }
                                  );
                                  //setRegetfiles((x) => !x);
                                  setAllfiles((filee) => [
                                    ...filee,
                                    { id: data.res.id, title: data.res.title },
                                  ]);
                                  fetch(
                                    "https://autonotebackend.shadowbites10.workers.dev/upserturl",
                                    {
                                      method: "POST",
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        url: url,
                                        file: data.res.id,
                                      }),
                                    }
                                  )
                                    .then((response) => response.json())
                                    .then((data) => {
                                      if (data.success) {
                                      }
                                    })
                                    .catch((error) => {
                                      //console.error(
                                      //   "Error storing tabs in the backend:",
                                      //   error
                                      // );
                                    });
                                }
                              })
                              .catch((error) => {
                                //console.error(
                                //   "Error storing tabs in the backend:",
                                //   error
                                // );
                              });
                          }
                        );
                      }
                    );
                  }}
                >
                  New File
                </MyButton>
              )}
              {"    "}
              {
                <Combine
                  title="Refresh!"
                  onClick={() => {
                    setRegetfiles((x) => !x);
                  }}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 21 21"
                  >
                    <g
                      fill="white"
                      fill-rule="evenodd"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M6.5 3.5c-2.412 1.378-4 4.024-4 7a8 8 0 0 0 8 8m4-1c2.287-1.408 4-4.118 4-7a8 8 0 0 0-8-8" />
                      <path d="M6.5 7.5v-4h-4m12 10v4h4" />
                    </g>
                  </svg>{" "}
                </Combine>
              }
            </>
          ) : (
            <>
              {":  "}
              {
                <Combine
                  title="Refresh!"
                  onClick={() => {
                    setRegetfiles((x) => !x);
                  }}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 21 21"
                  >
                    <g
                      fill="white"
                      fill-rule="evenodd"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M6.5 3.5c-2.412 1.378-4 4.024-4 7a8 8 0 0 0 8 8m4-1c2.287-1.408 4-4.118 4-7a8 8 0 0 0-8-8" />
                      <path d="M6.5 7.5v-4h-4m12 10v4h4" />
                    </g>
                  </svg>{" "}
                </Combine>
              }
            </>
          )}
        </Subheading>
      )}

      {record && allfiles && allfiles.length == 0 && (
        <Notewarning>{"You have no old files!"}</Notewarning>
      )}
      {!record && <Notewarning>{"start recording to see files!!"}</Notewarning>}

      {allfiles.map((x, index) => (
        <StyledDiv key={index}>
          {filetodel != x.id && (
            <Notea
              onClick={() => {
                if (x.id != file) {
                  if (selectedTexts.length == 0) {
                    chrome.runtime.sendMessage(
                      { action: "getTabInfo" },
                      (response) => {
                        if (!response) return;

                        const url = response.url;
                        const title = response.title;
                        const favicon = response.favicon;

                        //console.log("Tab URL:", url);
                        //console.log("Tab Title:", title);
                        //console.log("Tab Favicon:", favicon);

                        if (filetitle == title) {
                          setisDeleting(true);
                          chrome.storage.local.get(
                            ["autotoken69"],
                            (tokenResult) => {
                              const token = tokenResult.autotoken69;
                              if (!token) {
                                //console.log("No token found.");
                                return;
                              }
                              fetch(
                                "https://autonotebackend.shadowbites10.workers.dev/deletefile",
                                {
                                  method: "POST",
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    id: file,
                                  }),
                                }
                              )
                                .then((response) => response.json())
                                .then((data) => {
                                  setisDeleting(false);
                                  if (data.success) {
                                    setAllfiles((prevFiles) =>
                                      prevFiles.filter((f) => f.id !== file)
                                    );
                                    setfile(x.id);
                                    setfiletitle(x.title);

                                    setFiletodelete(null);
                                  }
                                })
                                .catch((error) => {
                                  setfile(x.id);
                                  setfiletitle(x.title);
                                  setisDeleting(false);
                                  //console.error(
                                  //   "Error storing tabs in the backend:",
                                  //   error
                                  // );
                                });
                            }
                          );
                        } else {
                          setfile(x.id);
                          setfiletitle(x.title);
                        }
                      }
                    );
                  } else {
                    setfile(x.id);
                    setfiletitle(x.title);
                  }

                  chrome.storage.local.get(["autotoken69"], (tokenResult) => {
                    const token = tokenResult.autotoken69;
                    if (!token) {
                      //console.log("No token found.");
                      return;
                    }
                    //console.log("getting content of " + x.id);
                    fetch(
                      "https://autonotebackend.shadowbites10.workers.dev/getfiletitle",
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: x.id }),
                      }
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.success) {
                          setSelectedTexts(JSON.parse(data.res.content));
                          setbakchodiover(true);
                          //console.log("File title:", data.res.title);
                        }
                      })
                      .catch((error) => {
                        //console.error(
                        //   "Error storing tabs in the backend:",
                        //   error
                        // );
                      });
                  });
                  //setSelectedTexts(JSON.parse(x.content));
                  chrome.runtime.sendMessage(
                    { action: "getTabInfo" },
                    (response) => {
                      if (!response) return;

                      const url = response.url;
                      chrome.storage.local.set(
                        { [url]: JSON.stringify(x.id) },
                        () => {
                          //console.log("Tab data stored.");
                        }
                      );
                      chrome.storage.local.get(
                        ["autotoken69"],
                        (tokenResult) => {
                          const token = tokenResult.autotoken69;
                          if (!token) {
                            //console.log("No token found.");
                            return;
                          }
                          fetch(
                            "https://autonotebackend.shadowbites10.workers.dev/upserturl",
                            {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                url: url,
                                file: x.id,
                              }),
                            }
                          )
                            .then((response) => response.json())
                            .then((data) => {
                              if (data.success) {
                              }
                            })
                            .catch((error) => {
                              //console.error(
                              //   "Error storing tabs in the backend:",
                              //   error
                              // );
                            });
                        }
                      );
                    }
                  );
                }
              }}
              key={index}
            >
              {x.id != file && (
                <Combine
                  onClick={(e) => {
                    if (!isDeleting) {
                      e.stopPropagation();
                      setFiletodelete(x.id);
                    }
                  }}
                  title={`delete ${x.title}`}
                >
                  {x.id !== file ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="currentColor"
                        d="M14 12.5a.5.5 0 0 0-1 0v11a.5.5 0 0 0 1 0zm4.5-.5a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5m2-5.5V7h8a.5.5 0 0 1 0 1h-2.543l-1.628 17.907A4.5 4.5 0 0 1 19.847 30h-7.694a4.5 4.5 0 0 1-4.482-4.093L6.043 8H3.5a.5.5 0 0 1 0-1h8v-.5a4.5 4.5 0 1 1 9 0m-8 0V7h7v-.5a3.5 3.5 0 1 0-7 0M7.048 8l1.62 17.817A3.5 3.5 0 0 0 12.152 29h7.694a3.5 3.5 0 0 0 3.486-3.183L24.953 8z"
                      />
                    </svg>
                  ) : (
                    ""
                  )}

                  {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 304 384"
              >
                <path
                  fill="currentColor"
                  d="M21 341V85h256v256q0 18-12.5 30.5T235 384H64q-18 0-30.5-12.5T21 341zM299 21v43H0V21h75L96 0h107l21 21h75z"
                />
              </svg> */}
                </Combine>
              )}
              {x.id == file ? <Mytextgreen>{">> (current) "}</Mytextgreen> : ""}
              {x.title}
            </Notea>
          )}

          {filetodel == x.id ? (
            <Noteaa>
              Delete : {x.title}{" "}
              <Combine
                onClick={() => {
                  setisDeleting(true);
                  chrome.storage.local.get(["autotoken69"], (tokenResult) => {
                    const token = tokenResult.autotoken69;
                    if (!token) {
                      //console.log("No token found.");
                      return;
                    }
                    fetch(
                      "https://autonotebackend.shadowbites10.workers.dev/deletefile",
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          id: x.id,
                        }),
                      }
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        setisDeleting(false);
                        if (data.success) {
                          setAllfiles((prevFiles) =>
                            prevFiles.filter((file) => file.id !== x.id)
                          );
                          setFiletodelete(null);
                        }
                      })
                      .catch((error) => {
                        setisDeleting(false);
                        //console.error(
                        //   "Error storing tabs in the backend:",
                        //   error
                        // );
                      });
                  });
                }}
              >
                <Mytextyes>{"  Yes"}</Mytextyes>
              </Combine>
              {"  /  "}
              <Combine
                onClick={(e) => {
                  e.stopPropagation();
                  setFiletodelete(null);
                }}
              >
                <Mytextno>No</Mytextno>
              </Combine>
            </Noteaa>
          ) : (
            ""
          )}
        </StyledDiv>
      ))}
    </NotesContainer>
  );
}

const StyledDiv = styled.div``;

const NotesContainer = styled.div`
  position: fixed;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
  max-width: 200px;
  width: 200px; /* Fixed width */
  height: 300px; /* Fixed height */
  overflow-y: scroll; /* Enable vertical scrolling */

  /* Hide scrollbar */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NotesContainerright = styled.div`
  position: fixed;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
  max-width: 200px;
  width: 200px; /* Fixed width */
  height: 300px; /* Fixed height */
  overflow-y: scroll; /* Enable vertical scrolling */
  text-align: right; /* Right-align text */

  /* Hide scrollbar */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Notewarning = styled.div`
  font-size: 10px;
  margin: 5px 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  color: #8b0000; /* Adding text color as deep red */
  &:last-child {
    border-bottom: none;
  }
`;

const Heading = styled.div`
  font-size: 11px;
  margin: 5px 0;
  border-bottom: 1px solid #ccc;
  color: #004d00; /* Darker green color */
  font-weight: 600; /* Slightly bolder font */
  &:last-child {
    border-bottom: none;
  }
`;

const Subheading = styled.div`
  display: inline; /* Make it inline */
  font-size: 10px;
  margin: 5px 0;
  border-bottom: 1px solid #ccc;
  color: #0000ff; /* Changed text color to blue */
  &:last-child {
    border-bottom: none;
  }
`;

const Mytextno = styled.div`
  color: #ff0000; /* Red color */
  &:hover {
    color: #006400; /* Green color */
    font-size: 12px; /* Increases text size on hover */
  }
`;
const Mytextyes = styled.div`
  color: #0000ff; /* Blue color */
  &:hover {
    color: #006400; /* Green color */
    font-size: 12px; /* Increases text size on hover */
  }
`;

const Mytextgreen = styled.div`
  color: #daa520; /* Green color */
  display: inline-block; /* Ensures it behaves like an inline element with control over dimensions */
`;

const Combine = styled.div`
  display: inline-block;
  margin-right: 3px;
  cursor: pointer;
  &:hover svg {
    color: red;
  }
`;

const Note = styled.div`
  font-size: 10px;
  white-space: pre-wrap;
  margin: 5px 0;
  padding: 5px;
  color: black;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }

  button {
    color: #8b0000; /* Deep red */
    font-size: 12px; /* Really small */
    background: transparent; /* No background */
    border: none; /* No boundaries */
    padding: 0;
    margin-right: 5px; /* Optional spacing */
    cursor: pointer;
  }
`;

const Notea = styled.div`
  font-size: 10px;
  white-space: pre-wrap;
  margin: 5px 0;
  padding: 5px;
  color: black;
  border-bottom: 1px solid #ccc;
  background-color: #f9f9f9; /* Light background for contrast */
  transition: background-color 0.2s ease-in-out;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #e0e0e0; /* Slightly darker on hover */
    cursor: pointer; /* Make it feel clickable */
  }

  button {
    color: #8b0000; /* Deep red */
    font-size: 12px; /* Small text */
    background: transparent;
    border: none;
    padding: 0;
    margin-right: 5px;
    cursor: pointer;
  }
`;
const Noteaa = styled.div`
  font-size: 10px;
  white-space: pre-wrap;
  margin: 5px 0;
  padding: 5px;
  color: black;
  border-bottom: 1px solid #ccc;
  background-color: #f9f9f9; /* Light background for contrast */
  transition: background-color 0.2s ease-in-out;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #e0e0e0; /* Slightly darker on hover */
  }
`;

const MyButton = styled.button`
  font-size: 9px; /* Small button */
  background-color: #28a745; /* Green color */
  color: white; /* White text */
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #218838; /* Darker green on hover */
  }
`;
