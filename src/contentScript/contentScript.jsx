import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import FloatingIcon from "./FloatingIcon";

const style = document.createElement("style");
style.textContent = `
  pre, code {
    white-space: pre-wrap !important;
  }
`;
document.head.appendChild(style);

function MainComponent() {
  const [record, setRecord] = useState(false);
  const [selectedTexts, setSelectedTexts] = useState([]);
  const selectedTextsRef = useRef(selectedTexts);
  const selectionTimeoutRef = useRef(null);
  const originalClipboard = useRef("");
  const [clipboardStatus, setClipboardStatus] = useState("unknown");

  // Sync ref with state
  useEffect(() => {
    selectedTextsRef.current = selectedTexts;
  }, [selectedTexts]);

  // Check clipboard permissions
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const status = await navigator.permissions.query({ name: "clipboard-read" });
        setClipboardStatus(status.state);
      } catch (error) {
        setClipboardStatus("denied");
      }
    };
  
    document.addEventListener("focus", checkPermissions); // Re-check permissions when tab is focused
    checkPermissions();
  
    return () => {
      document.removeEventListener("focus", checkPermissions);
    };
  }, []);
  

  // async function handleClipboardCopy() {
  //   const errorMessages = [];
  //   try {
  //     const selection = window.getSelection();
      
  //     // Modern clipboard API attempt
  //     try {
  //       await navigator.clipboard.writeText(selection.toString());
  //     } catch (writeError) {
  //       errorMessages.push(`Write failed: ${writeError.message}`);
  //       throw writeError;
  //     }

  //     const copiedText = await navigator.clipboard.readText();
  //     originalClipboard.current = copiedText;

  //     return { text: copiedText, method: "clipboard" };
  //   } catch (error) {
  //     // DOM fallback
  //     try {
  //       const selection = window.getSelection();
  //       if (selection.rangeCount === 0) return { text: "", method: "dom" };

  //       let domText = "";
  //       for (let i = 0; i < selection.rangeCount; i++) {
  //         const range = selection.getRangeAt(i);
  //         const tempDiv = document.createElement("div");
  //         tempDiv.appendChild(range.cloneContents());
          
  //         const isCodeBlock = range.startContainer.parentElement.closest("pre, code");
  //         const hasPreFormatting = window.getComputedStyle(range.startContainer.parentElement).whiteSpace.startsWith("pre");

  //         domText += (isCodeBlock || hasPreFormatting) 
  //           ? tempDiv.textContent + "\n"
  //           : tempDiv.innerText + "\n";
  //       }

  //       return { text: domText.trim(), method: "dom" };
  //     } catch (domError) {
  //       return { text: "", method: "failed" };
  //     }
  //   } finally {
  //     if (originalClipboard.current) {
  //       try {
  //         await navigator.clipboard.writeText(originalClipboard.current);
  //       } catch (restoreError) {
  //         console.error("Failed to restore clipboard:", restoreError);
  //       }
  //     }
  //   }
  // }

  // function calculateJaccardSimilarity(text1, text2) {
  //   const set1 = new Set(text1.split(/\s+/));
  //   const set2 = new Set(text2.split(/\s+/));
  //   const intersection = new Set([...set1].filter(x => set2.has(x)));
  //   const union = new Set([...set1, ...set2]);
  //   return (intersection.size / union.size) * 100;
  // }

  // async function sendToBackend(text) {
  //   const newText = text.trim();
  //   if (!newText) return;

  //   const currentTexts = [...selectedTextsRef.current];
  //   let newSelectedTexts = currentTexts.filter(storedText => {
  //     const similarity = calculateJaccardSimilarity(newText, storedText);
  //     return !(
  //       newText.includes(storedText) ||
  //       storedText.includes(newText) ||
  //       similarity >= 90
  //     );
  //   });

  //   newSelectedTexts.push(newText);
  //   setSelectedTexts(newSelectedTexts);
  // }
  async function handleClipboardCopy() {
    if (!record) return { text: "", method: "disabled" }; // Don't interfere when recording is off
  
    const errorMessages = [];
    try {
      const selection = window.getSelection();
      if (!selection.toString()) return { text: "", method: "empty" };
  
      // Store clipboard only on first copy
      if (!originalClipboard.current) {
        try {
          originalClipboard.current = await navigator.clipboard.readText();
        } catch (error) {
          //console.warn("Failed to read clipboard:", error);
        }
      }
  
      // Modern clipboard API attempt
      try {
        await navigator.clipboard.writeText(selection.toString());
      } catch (writeError) {
        errorMessages.push(`Write failed: ${writeError.message}`);
        throw writeError;
      }
  
      return { text: selection.toString(), method: "clipboard" };
    } catch (error) {
      return { text: "", method: "failed" };
    }
  }
  

  function calculateJaccardSimilarity(text1, text2) {
    const set1 = new Set(text1.split(/\s+/));
    const set2 = new Set(text2.split(/\s+/));
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return (intersection.size / union.size) * 100;
  }
  
  async function sendToBackend(text) {
    const newText = text.trim();
  
    // Ignore very short selections (like space, single punctuation, or empty text)
    if (!newText || newText.length <= 2) return; 
  
    const currentTexts = [...selectedTextsRef.current];
  
    let newSelectedTexts = currentTexts.filter(storedText => {
      const similarity = calculateJaccardSimilarity(newText, storedText);
  
      // Ignore short selections when comparing
      if (newText.length <= 2) return true; 
  
      return !(
        newText.includes(storedText) ||
        storedText.includes(newText) ||
        similarity >= 90
      );
    });
  
    newSelectedTexts.push(newText);
    setSelectedTexts(newSelectedTexts);
  }
  

  useEffect(() => {
    // async function handleSelectionChange() {
    //   if (selectionTimeoutRef.current) {
    //     clearTimeout(selectionTimeoutRef.current);
    //   }

    //   selectionTimeoutRef.current = setTimeout(async () => {
    //     if (!record) return;

    //     try {
    //       const { text } = await handleClipboardCopy();
    //       if (text) await sendToBackend(text);
    //     } catch (error) {
    //       console.error("Selection processing error:", error);
    //     }
    //   }, 350);
    // }

    async function handleSelectionChange(event) {
      if (!record) return;
    
      // Ignore clipboard handling when user is pasting
      if (event.type === "keyup" && (event.ctrlKey || event.metaKey) && event.key === "v") {
        return;
      }
    
      if (selectionTimeoutRef.current) {
        clearTimeout(selectionTimeoutRef.current);
      }
    
      selectionTimeoutRef.current = setTimeout(async () => {
        try {
          const { text } = await handleClipboardCopy();
          if (text) await sendToBackend(text);
        } catch (error) {
          //console.error("Selection processing error:", error);
        }
      }, 350);
    }    
    document.addEventListener("mouseup", handleSelectionChange);
    document.addEventListener("keyup", handleSelectionChange);
    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("mouseup", handleSelectionChange);
      document.removeEventListener("keyup", handleSelectionChange);
      document.removeEventListener("selectionchange", handleSelectionChange);
      if (selectionTimeoutRef.current) {
        clearTimeout(selectionTimeoutRef.current);
      }
    };
  }, [record]);

  return (
    <FloatingIcon
      selectedTexts={selectedTexts}
      record={record}
      setRecord={setRecord}
      setSelectedTexts={setSelectedTexts}
    />
  );
}

function init() {
  const container = document.body;
  const floatingIconContainer = document.createElement("div");
  floatingIconContainer.style.position = "relative";
  container.appendChild(floatingIconContainer);
  
  const root = createRoot(floatingIconContainer);
  root.render(<MainComponent />);
}

init();