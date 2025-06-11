import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const [orderItem, setOrderItem] = useState({
    courier: "",
    status: "High",
  });

  const [orderList, setOrderList] = useState([]);

  const [selectedTab, setSelectedTab] = useState("All");

  // Save list to localstorage on every change
  useEffect(() => {
    if (orderList.length === 0) return;
    localStorage.setItem("orderList", JSON.stringify(orderList));
  }, [orderList]);

  // Load List from localstorage on first render
  useEffect(() => {
    const listFromLS = JSON.parse(localStorage.getItem("orderList") || "[]");
    setOrderList(listFromLS);
  }, []);

  const onDelete = (index) => {
    const listAfterDeletion = orderList.filter((_, i) => i !== index);
    setOrderList(listAfterDeletion);
    toast.success("Courier Status Deleted Successfully...");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">

        <h1 className="text-3xl font-bold text-center text-blue-700 mt-3">
          Courier Order Tracker
        </h1>

        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Order</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Enter courier name"
              onChange={(e) => {
                setOrderItem({
                  ...orderItem,
                  courier: e.target.value
                });
              }}
              value={orderItem.courier}
              className="text-md bg-white p-2 border border-gray-300 rounded-md w-full md:w-[45%] focus:outline-blue-400"
            />

            <select
              onChange={(e) => {
                setOrderItem({
                  ...orderItem,
                  status: e.target.value
                });
              }}
              value={orderItem.status}
              className="text-md bg-white p-2 border border-gray-300 rounded-md w-full md:w-[30%]"
            >
              <option value={""}>Select Status</option>
              <option value={"Order Placed"}>Order Placed</option>
              <option value={"Dispatched"}>Dispatched</option>
              <option value={"On The Way"}>On The Way</option>
              <option value={"Delivered"}>Delivered</option>
              <option value={"Rejected"}>Rejected</option>
              <option value={"Attempted"}>Attempted</option>
            </select>

            <button
              className="text-md bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full md:w-[20%]"
              onClick={() => {
                if (!orderItem.courier) {
                  toast.error("Please enter courier name..!");
                  return;
                }

                if (!orderItem.status) {
                  toast.error("Please select status..!");
                  return;
                }

                setSelectedTab("All");
                setOrderList([orderItem, ...orderList]);
                setOrderItem({
                  courier: "",
                  status: "",
                });
                toast.success("Courier Status Added Successfully...");
              }}
            >
              ADD
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/4 border border-gray-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center md:text-left">Order Status</h2>

            <div className="flex flex-col space-y-2">
              {
                ["All", "Order Placed", "Dispatched", "On The Way", "Delivered", "Rejected", "Attempted"].map((tab, i) => (
                  <span
                    key={i}
                    className={`w-full text-center text-md md:text-lg rounded-md py-2 cursor-pointer transition-all ${tab === selectedTab
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-blue-100'
                      }`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </span>
                ))
              }
            </div>
          </div>

          <div className="w-full md:w-3/4 flex flex-col gap-4">
            <div className="overflow-y-auto max-h-[60vh] md:max-h-[68vh] pr-2">
              {orderList.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No orders available.</p>
              )}
              {orderList.map((taskItem, index) => {
                const { courier, status } = taskItem;
                if (selectedTab !== "All" && status !== selectedTab) return null;

                return (
                  <OrderCard
                    courier={courier}
                    status={status}
                    key={index}
                    index={index}
                    onDelete={onDelete}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <Toaster />
      </div>
    </div>
  );
}

export default App;
