"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  addTask,
  toggleTaskStatus,
  deleteTask,
} from "../../../redux/features/taskSlice";
import { Trash2, CheckCircle, Circle } from "lucide-react";

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleAddTask = () => {
    if (!title.trim() || !taskDate || !assignedTo.trim()) return;
    dispatch(addTask({ title, description, taskDate, assignedTo }));
    setTitle("");
    setDescription("");
    setTaskDate("");
    setAssignedTo("");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Add your task
      </h1>

      {/* Add Task Form */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Add New Task
        </h2>

        <div className="flex flex-col gap-4">
          {/* Task Title */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="taskTitle"
            >
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              id="taskTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Task Description */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="taskDescription"
            >
              Description
            </label>
            <textarea
              id="taskDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none h-24"
            />
          </div>

          {/* Assigned To */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="assignedTo"
            >
              Assign To <span className="text-red-500">*</span>
            </label>
            <input
              id="assignedTo"
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Employee name"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Task Date */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="taskDate"
            >
              Task Date <span className="text-red-500">*</span>
            </label>
            <input
              id="taskDate"
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddTask}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium mt-2"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="grid gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row justify-between items-start hover:shadow-xl transition border border-gray-200"
            >
              {/* Task Details */}
              <div className="flex-1 mb-4 md:mb-0">
                <h3
                  className={`text-lg font-semibold mb-1 ${
                    task.status === "Completed"
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-gray-600 mb-1">
                  {task.description || "No description provided."}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Assigned to:{" "}
                  <span className="font-medium text-gray-700">
                    {task.assignedTo || "Unassigned"}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Task Date:{" "}
                  <span className="font-medium text-gray-700">
                    {task.taskDate}
                  </span>
                </p>
                {task.status === "Completed" && task.completedDate && (
                  <p className="text-sm text-green-600 mt-1">
                    Completed on: {task.completedDate}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => dispatch(toggleTaskStatus(task.id))}
                  className={`transition transform hover:scale-110 ${
                    task.status === "Completed"
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                  title={
                    task.status === "Completed"
                      ? "Mark as Pending"
                      : "Mark as Completed"
                  }
                >
                  {task.status === "Completed" ? (
                    <CheckCircle size={28} />
                  ) : (
                    <Circle size={28} />
                  )}
                </button>
                <button
                  onClick={() => dispatch(deleteTask(task.id))}
                  className="text-red-500 hover:scale-110 transition"
                  title="Delete Task"
                >
                  <Trash2 size={28} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center text-lg">
            No tasks yet. Add your first task!
          </p>
        )}
      </div>
    </div>
  );
}
