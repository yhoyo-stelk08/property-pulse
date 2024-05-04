'use client';

import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PropertyContactForm = ({ property }) => {
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [messages, setMessages] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    recipent: '',
    property: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setMessages((prevMessages) => {
      return {
        ...prevMessages,
        [id]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: messages.name,
      email: messages.email,
      phone: messages.phone,
      message: messages.message,
      recipent: property.owner,
      property: property._id,
    };

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const dataObject = await response.json();
      if (response.status === 200) {
        toast.success(dataObject.message);
        setWasSubmitted(true);
      } else if (response.status === 400 || response.status === 401) {
        toast.error(dataObject.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMessages({
        name: '',
        email: '',
        phone: '',
        message: '',
        recipent: '',
        property: '',
      });
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      {wasSubmitted ? (
        <p className="text-green-500 text-xl m-4">
          Your message has been sent successfully
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              value={messages.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={messages.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={messages.phone}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter your message"
              value={messages.message}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <FaPaperPlane className="mr-2" /> Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PropertyContactForm;
