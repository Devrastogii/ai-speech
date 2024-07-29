import React, { useRef, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Detect from "./Detect";
import Speak from "./Speak";
import axios from "axios";
import exampleGif from "../images/voicy.gif";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const Home = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [btn, setBtn] = useState("0");
  const [pdfData, setPdfData] = useState("");
  const [data, setData] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [resumePosition, setResumePosition] = useState(0);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      stopSpeaking();
    };

    const handleVoicesChanged = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    handleVoicesChanged();

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleBtnChange = async (num) => {
    if (isSpeaking) {
      stopSpeaking();
    }
    setBtn(num);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("/read-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPdfData(response.data);

      const response2 = await axios.post("/extract-entities", {
        text: response.data,
      });

      setData(response2.data);

      if (num === "2") {
        speakText(response.data, resumePosition);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const speakText = (text, startPosition = 0) => {
    if (window.speechSynthesis) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text.slice(startPosition));
      // const voice = voices.find(v => v.name === "Google UK English Female");
      // if (voice) {
      //   utterance.voice = voice;
      // }

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          const wordIndex = event.charIndex;
          setResumePosition(startPosition + wordIndex);
        }
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setResumePosition(0);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis is not available.");
    }
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <>
      <section className="w-auto min-h-screen bg-[#08192A] text-white py-5">
        <Navbar />
        <div className="flex justify-center text-2xl font-semibold mt-5">
          UPLOAD PDF
        </div>

        <div className="flex justify-center items-center w-full">
          <div className="mt-10 border-4 w-[30rem] h-[19rem] flex justify-center items-center border-dotted flex-col border-[#5F7D96]">
            <div>
              <i className="bi bi-cloud-upload-fill text-[3rem]"></i>
            </div>
            <div className="mt-3 text-xl">Drag and drop pdf here</div>
            <div className="mt-3">--- OR ---</div>
            <div className="mt-3 text-center">
              <button
                onClick={handleButtonClick}
                className="w-[10rem] h-[2.5rem] border-2 font-bold rounded-3xl border-[#5F7D96] bg-[#5F7D96] hover:bg-[#456076] transition-all duration-300"
              >
                Browse Files
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {selectedFile && (
                <div className="text-center mt-4">
                  <p className="font-bold text-sm">{selectedFile.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedFile && (
          <div className="flex justify-center my-12 gap-x-5">
            <div>
              <button
                onClick={() => handleBtnChange("1")}
                className="w-[10rem] h-[2.5rem] border-2 font-bold rounded-3xl"
              >
                Detect Emotions
              </button>
            </div>
            <div>
              <button
                id="clickable"
                onClick={() => handleBtnChange("2")}
                className="font-bold rounded-3xl flex justify-center items-center"
              >
                <img src={exampleGif} alt="Example GIF" className="w-[3rem]" />
              </button>

              <Tooltip anchorSelect="#clickable">
                <button>Speak PDF</button>
              </Tooltip>
            </div>
            <div>
              <button
                onClick={stopSpeaking}
                className="w-[10rem] h-[2.5rem] border-2 font-bold rounded-3xl"
              >
                Stop Speaker
              </button>
            </div>
          </div>
        )}

        {btn === "1" && <Detect data={data} />}
        {btn === "2" && <Speak data={pdfData} />}
      </section>
    </>
  );
};

export default Home;
