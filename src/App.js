import React, { useState, useEffect } from "react";
import axios from "axios";


const App = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const BASE_URL = "http://localhost:4000"; 

const getStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/status`);
      return response.data;
    } catch (error) {
      console.error("Error fetching status:", error);
      throw error;
    }
  };
  
  const updateMessage = async (newMessage) => {
    try {
      const response = await axios.post(`${BASE_URL}/update`, { newMessage });
      return response.data;
    } catch (error) {
      console.error("Error updating message:", error);
      throw error;
    }
  };
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const data = await getStatus();
        setCurrentMessage(data.data.message);
      } catch (error) {
        console.error("Failed to fetch message", error);
      }
    };

    fetchMessage();
  }, []);

  // Handle form submission to update the message
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateMessage(newMessage);
      alert(`Transaction successful: ${result.txHash}`);
      setCurrentMessage(newMessage); // Update the frontend with the new message
      setNewMessage(""); // Clear the input field
    } catch (error) {
      console.error("Failed to update message", error);
    }
  };

  return (
    <div>
      <h1>Ethereum Smart Contract Interaction</h1>
      <div>
        <h2>Current Message: {currentMessage}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            New Message:
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </label>
          <button type="submit">Update Message</button>
        </form>
      </div>
    </div>
  );
};

export default App;
