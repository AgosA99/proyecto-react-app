import { createContext, useState } from "react";
import { getTaskMockup } from "../mockup/getTaskMockup";


export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(getTaskMockup());

    

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
        {children}
        </TaskContext.Provider>
    );
};
