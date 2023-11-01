import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const MessageItem = ({
  message,
  pngFile,
  isLast,
  offers,
  handleFlightClick,
  showbutton,
  confirmBooking,
  selectedSeat,
  isModalOpen,
  ConfirmMainBooking,
}) => {
  const userImage = "/assets/images/green-square.png";
  const botImage = `/assets/images/${pngFile}.png`;
  const [showSources, setShowSources] = useState(false);
  const styles = {
    container: {
      display: "flex",
      overflowX: "auto",
      whiteSpace: "nowrap",
    },
    card: {
      width: "300px",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      marginRight: "20px",
      display: "inline-block",
    },
  };

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

const ResultWithSources = ({
  messages,
  pngFile,
  maxMsgs,
  offers,
  handleFlightClick,
  showbutton,
  confirmBooking,
  isModalOpen,
  handleSeatSelectionBtn,
  selectedSeat,
  selectedFlight,
  seats,
  ConfirmMainBooking,
}) => {
  const messagesContainerRef = useRef();

  useEffect(() => {
    if (messagesContainerRef.current) {
      const element = messagesContainerRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const styles = {
    container: {
      display: "flex",
      overflowX: "auto",
      whiteSpace: "nowrap",
    },
    card: {
      width: "300px",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      marginRight: "20px",
      display: "inline-block",
    },
  };

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
            showbutton={showbutton}
            confirmBooking={confirmBooking}
            isModalOpen={isModalOpen}
            selectedSeat={selectedSeat}
            ConfirmMainBooking={ConfirmMainBooking}
          />
        ))}
      <div style={styles.container}>
        {offers &&
          offers.length > 0 &&
          offers.slice(0, 3).map((item, index) => (
            <div key={index} className="content-center" style={styles.card}>
              {console.log(item)}
              <div>
                <label> Flight Name:- </label> <p> {item.owner.name}</p>
              </div>
              <div>
                <label> Price :-</label>
                <p>
                  {item.total_amount} {item.total_currency}
                </p>
              </div>
              <button
                onClick={() => {
                  handleFlightClick(index + 1, item.total_amount, item);
                }}
                className={`py-3 m-4 px-6  shadow text-gray-900 font-semibold rounded-full hover:shadow-xl transition-colors duration-200 `}
              >
                Select Offer
                {/* flight {index + 1} Price {item.total_amount} */}
              </button>
            </div>
          ))}
        {seats &&
          seats.length > 0 &&
          seats.slice(0, 6).map((item, index) => (
            <button
              key={index}
              className="content-center bg-blue-500"
              style={styles.card}
            >
              <button
                onClick={() => {
                  handleSeatSelectionBtn(item);
                }}
                className={`bg-blue-500 shadow text-gray-900 font-semibold rounded-full hover:shadow-xl transition-colors duration-200 `}
              >
                {item.designator}
                {/* flight {index + 1} Price {item.total_amount} */}
              </button>
            </button>
          ))}
      </div>
      {showbutton && (
        <div>
          <div className="content-center ">
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  width: "300px",
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  marginRight: "20px",
                  marginTop: "10px",
                  display: "inline-block",
                }}
              >
                <h2>{selectedFlight.owner.name}</h2>
                <p>From: {selectedFlight.slices[0].origin.city_name}</p>
                <p>To: {selectedFlight.slices[0].destination.city_name}</p>
                <p>
                  Date: {selectedFlight.slices[0].segments[0].departing_at.date}
                </p>
                <p>
                  Price: ${selectedFlight.total_amount} $
                  {selectedFlight.total_currency}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-6">
              {" "}
              <button className="py-3 m-4 px-6 shadow bg-blue-500 text-gray-900 font-semibold rounded-full hover:shadow-xl transition-colors duration-200">
                {" "}
                More Info
              </button>
            </div>
            <div className="col-6">
              <button
                className="py-3 m-4 px-6 shadow bg-blue-500 text-gray-900 font-semibold rounded-full hover:shadow-xl transition-colors duration-200"
                onClick={() => ConfirmMainBooking()}
              >
                {" "}
                Confirm{" "}
              </button>{" "}
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div>
          <div className="bg-white p-8 w-96 rounded shadow-lg">
            <h2 className="text-xl mb-4">Enter Credit Card Details</h2>
            <div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Card Number</label>
                <input
                  type="text"
                  className="p-2 w-full border rounded"
                  placeholder="1234 1234 1234 1234"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Name on Card</label>
                <input type="text" className="p-2 w-full border rounded" />
              </div>
              <div className="flex space-x-4">
                <div className="mb-4">
                  <label className="block text-sm mb-2">Expiry Date</label>
                  <input
                    type="text"
                    className="p-2 w-full border rounded"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2">CVV</label>
                  <input
                    type="text"
                    className="p-2 w-full border rounded"
                    placeholder="123"
                  />
                </div>
              </div>
              <button
                className="bg-blue-500 text-white p-2 w-full rounded"
                onClick={() => ConfirmMainBooking()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultWithSources;
