"use client";
import React, { useState } from "react";
import PageHeader from "./components/PageHeader";
import PromptBox from "./components/PromptBox";
import Title from "./components/Title";
import TwoColumnLayout from "./components/TwoColumnLayout";
import ResultWithSources from "./components/ResultWithSources";
import Table from "./components/Table";
import "./globals.css";
// import CreditCardModal from "./components/CreditCardModal";

const Memory = () => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [firstMsg, setFirstMsg] = useState(true);
  const [flightDetails, setFlightDetails] = useState(false);
  const [flights, setFlights] = useState([]);
  const [fly_from, setfly_from] = useState(null);
  const [fly_to, setfly_to] = useState(null);
  const [date_from, setdate_from] = useState(null);
  const [date_to, setdate_to] = useState(null);
  const [sort, setsort] = useState(null);
  const [offers, SetOffers] = useState([]);
  const [showbutton, setShowButtons] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  // fly_from="", fly_to="", date_from="", date_to="", sort=""

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmitPrompt = async () => {
    // console.log("sending ", prompt);
    try {
      // Update the user message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: "user", sourceDocuments: null },
      ]);
      const data = {
        fly_from: fly_from,
        fly_to: fly_to,
        date_from: date_from,
        date_to: date_to,
        sort: sort,
      };
      console.log({ input: prompt, firstMsg, data });
      const response = await fetch("http://localhost:8000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: prompt, firstMsg, data: data }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      } else {
        console.log("response", response);
      }

      setPrompt("");
      // So we don't reinitialize the chain
      setFirstMsg(false);
      const searchRes = await response.json();
      // console.log({ searchRes });
      // Add the bot message
      // console.log(searchRes);
      console.log("data", searchRes);
      if (searchRes?.offers) {
        SetOffers(searchRes?.offers?.data?.offers);
      }
      if (searchRes) {
        if (fly_from == null) {
          setfly_from(searchRes?.flight_details?.fly_from);
        }
        if (fly_to == null) {
          setfly_to(searchRes?.flight_details?.fly_to);
        }
        setdate_from(searchRes?.flight_details?.date_from);
        setdate_to(searchRes?.flight_details?.date_to);
        setsort(searchRes?.flight_details?.sort);
      }
      if (searchRes.success) {
        setFlights(searchRes?.data);
        setFlightDetails(true);
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: searchRes.response, type: "bot", sourceDocuments: null },
      ]);

      // console.log({ searchRes });
      // Clear any old error messages
      setError("");
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const handleFlightClick = (index, price, item) => {
    setSelectedSeat(item);
    console.log("eddddddd", item);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text:
          "Do you want to confirm  " +
          item.owner.name +
          " with price " +
          price +
          " ?",
        type: "bot",
        sourceDocuments: null,
      },
    ]);
    SetOffers([]);
    setShowButtons(true);
  };

  const confirmBooking = async () => {
    // setModalOpen(true);
    // const response = await fetch("http://localhost:8000/api/ai/bookflight", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ data: selectedSeat }),
    // });
    // const searchRes = await response.json();
    // setShowButtons(false);
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   { text: searchRes.response, type: "bot", sourceDocuments: null },
    // ]);
    const response = await fetch("http://localhost:8000/api/ai/bookflight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: selectedSeat, selectedId: selectedSeat.id }),
    });
    const searchRes = await response.json();
    setShowButtons(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: searchRes.response + " with " + selectedSeat.owner.name,
        type: "bot",
        sourceDocuments: null,
      },
    ]);
  };

  const ConfirmMainBooking = async () => {
    const response = await fetch("http://localhost:8000/api/ai/bookflight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: selectedSeat }),
    });
    const searchRes = await response.json();
    setShowButtons(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: searchRes.response + " with " + selectedSeat.owner.name,
        type: "bot",
        sourceDocuments: null,
      },
    ]);
    setModalOpen(false);
  };

  return (
    <>
      <Title headingText={"Memory"} emoji="🧠" />
      {/* <CreditCardModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      /> */}
      <TwoColumnLayout
        leftChildren={
          <>
            <PageHeader
              heading="Booked.ai - Flight Booking Assistant"
              description="Your Personal Travel Assistant"
            />
            {flightDetails && <Table data={flights} />}
          </>
        }
        rightChildren={
          <>
            <ResultWithSources
              messages={messages}
              pngFile="brain"
              offers={offers}
              handleFlightClick={handleFlightClick}
              showbutton={showbutton}
              confirmBooking={confirmBooking}
              selectedSeat={selectedSeat}
              isModalOpen={isModalOpen}
              ConfirmMainBooking={ConfirmMainBooking}
            />
            <PromptBox
              prompt={prompt}
              handleSubmit={handleSubmitPrompt}
              error={error}
              handlePromptChange={handlePromptChange}
            />
          </>
        }
      />
    </>
  );
};

export default Memory;
