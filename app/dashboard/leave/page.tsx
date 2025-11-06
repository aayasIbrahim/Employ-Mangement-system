"use client";
import React, { useState } from "react";

interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function LeavePage() {
  const [leaveType, setLeaveType] = useState("Sick");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!startDate || !endDate || !reason) return;

    const newRequest: LeaveRequest = {
      id: Date.now().toString(),
      type: leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending",
    };

    setRequests([newRequest, ...requests]);
    setSubmitted(true);

    // Reset form
    setLeaveType("Sick");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Leave Request</h1>

      {/* Add Leave Form */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 mb-8">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option>Sick</option>
              <option>Casual</option>
              <option>Annual</option>
              <option>Unpaid</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for leave"
              className="w-full border rounded-lg p-3 resize-none h-24 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium mt-2"
          >
            Submit Leave Request
          </button>

          {submitted && (
            <p className="text-green-600 mt-3 font-medium">
              Leave request submitted successfully!
            </p>
          )}
        </div>
      </div>

      {/* Leave Requests List */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Leave Requests</h2>
        {requests.length === 0 ? (
          <p className="text-gray-500 text-center">No leave requests yet.</p>
        ) : (
          <div className="grid gap-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center border border-gray-200"
              >
                <div>
                  <p className="text-gray-800 font-semibold">
                    {req.type} Leave: {req.startDate} → {req.endDate}
                  </p>
                  <p className="text-gray-600 text-sm">{req.reason}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-medium text-sm ${
                    req.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : req.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
