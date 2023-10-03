import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const MessageItem = ({ message, pngFile, isLast, offers, handleFlightClick }) => {
  const userImage = "/assets/images/green-square.png";
  const botImage = `/assets/images/${pngFile}.png`;
  const [showSources, setShowSources] = useState(false);

  return (
    <div className={`flex flex-col ${isLast ? "flex-grow" : ""}`}>
      <div className="flex mb-4">
        <div className="rounded mr-4 h-10 w-10 relative overflow-hidden">
          <Image
            src={message.type === "user" ? userImage : botImage}
            alt={`${message.type}'s profile`}
            width={32}
            height={32}
            className="rounded"
            priority
            unoptimized
          />
        </div>
        <p
          className={message.type === "user" ? "user" : "bot"}
          style={{ maxWidth: "90%" }}
        >
          {message.text}

          {offers.length > 0 &&
            offers.slice(0, 3).map((item, index) => (
              <div key={index} className="content-center">
                <button
                  onClick={()=>{handleFlightClick(index + 1, item.total_amount)}}
                  className={`py-3 m-4 px-6 bg-white shadow text-gray-900 font-semibold rounded-full hover:shadow-xl transition-colors duration-200 `}
                >
                  flight {index + 1} Price {item.total_amount}
                </button>
              </div>
            ))}

          {/* {JSON.stringify(message)} */}
        </p>
      </div>

      {message.sourceDocuments && (
        <div className="mb-6">
          <button
            className="text-gray-600 text-sm font-bold"
            onClick={() => setShowSources(!showSources)}
          >
            Source Documents {showSources ? "(Hide)" : "(Show)"}
          </button>
          {showSources &&
            message.sourceDocuments.map((document, docIndex) => (
              <div key={docIndex}>
                <h3 className="text-gray-600 text-sm font-bold">
                  Source {docIndex + 1}:
                </h3>
                <p className="text-gray-800 text-sm mt-2">
                  {document.pageContent}
                </p>
                <pre className="text-xs text-gray-500 mt-2">
                  {JSON.stringify(document.metadata, null, 2)}
                </pre>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const ResultWithSources = ({ messages, pngFile, maxMsgs, offers, handleFlightClick }) => {
  const messagesContainerRef = useRef();

  useEffect(() => {
    if (messagesContainerRef.current) {
      const element = messagesContainerRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  // E.g. Before we reach the max messages, we should add the justify-end property, which pushes messages to the bottom
  const maxMsgToScroll = maxMsgs || 5;

  return (
    <div
      ref={messagesContainerRef}
      className={`bg-white p-10 rounded-3xl shadow-lg mb-8 overflow-y-auto h-[650px] max-h-[650px] flex flex-col space-y-4 ${
        messages.length < maxMsgToScroll && "justify-end"
      }`}
    >
      {messages &&
        messages.map((message, index) => (
          <MessageItem
            key={index}
            message={message}
            pngFile={pngFile}
            offers={offers}
            handleFlightClick={handleFlightClick}
          />
        ))}
    </div>
  );
};

export default ResultWithSources;
