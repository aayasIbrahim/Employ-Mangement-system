"use client";
import React, { useState } from "react";

interface Attendance {
  date: string;
  clockIn?: string;
  clockOut?: string;
  status: "Present" | "Left Office";
}

export default function AttendancePage() {
  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);
  const [isClockedIn, setIsClockedIn] = useState(false);

  const handleClockIn = () => {
    const now = new Date();
    const newEntry: Attendance = {
      date: now.toLocaleDateString(),
      clockIn: now.toLocaleTimeString(),
      status: "Present",
    };
    setAttendanceList([...attendanceList, newEntry]);
    setIsClockedIn(true);
  };

  const handleClockOut = () => {
    const now = new Date();
    const updatedList = [...attendanceList];
    const lastIndex = updatedList.length - 1;

    if (lastIndex >= 0) {
      updatedList[lastIndex] = {
        ...updatedList[lastIndex],
        clockOut: now.toLocaleTimeString(),
        status: "Left Office",
      };
    }

    setAttendanceList(updatedList);
    setIsClockedIn(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Make sure Your attendance
      </h1>

      {/* Clock In / Clock Out Buttons */}
      <div className="flex items-center gap-4 mb-6">
        {!isClockedIn ? (
          <button
            onClick={handleClockIn}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Clock In
          </button>
        ) : (
          <button
            onClick={handleClockOut}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition"
          >
            Clock Out
          </button>
        )}
      </div>

      {/* Attendance List */}
      <ul className="space-y-4">
        {attendanceList.length > 0 ? (
          attendanceList.map((record, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <p className="text-gray-700 font-semibold">{record.date}</p>
                <p className="text-sm text-gray-500">
                  Clock In:{" "}
                  <span className="font-medium text-green-600">
                    {record.clockIn || "--"}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Clock Out:{" "}
                  <span className="font-medium text-red-500">
                    {record.clockOut || "--"}
                  </span>
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  record.status === "Present"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {record.status}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No attendance records yet.</p>
        )}
      </ul>
    </div>
  );
}
