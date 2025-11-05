import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  description: string;
  taskDate: string;          // assigned date
  completedDate?: string;    // date when completed
  status: "Pending" | "Completed";
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "status" | "completedDate">>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        status: "Pending",
        completedDate: undefined,
        ...action.payload,
      };
      state.tasks.push(newTask);
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        if (task.status === "Pending") {
          task.status = "Completed";
          task.completedDate = new Date().toLocaleDateString();
        } else {
          task.status = "Pending";
          task.completedDate = undefined;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTask, toggleTaskStatus, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
