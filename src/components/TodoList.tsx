import { useState, type ChangeEvent, type FormEvent } from "react";
import type { ErrorData, UserData } from "../typescript/interface/interface";
import { taskList } from "../services/json/taskData";

function TodoList() {
  const [userTask, setUserTask] = useState<UserData[]>(taskList);
  const [curentData, setCurrentData] = useState<UserData>({
    task: "",
    completed: false
  });

  const [errors, setErrors] = useState<ErrorData>({})
  

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name,value,checked} = event.target;
    if (name !== "isPublished") {
      setCurrentData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setCurrentData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let validationErrorData:ErrorData = {};
    let  isValid = true;

    if(!curentData.task.trim()){
      validationErrorData.error = "Please add a task";
      isValid = false; 
    }

    setErrors(validationErrorData);

    if(!isValid)return;

    const updatedUser = [...userTask, curentData];
    setUserTask(updatedUser);

    localStorage.setItem("taskList", JSON.stringify(updatedUser));
    setCurrentData({ task: "", completed: false});
  };

  const handleCompleted = (id:number) => {
    const updadeTask = userTask.map((item,index) => index === id? {...item, completed: !item.completed}: item);
    setUserTask(updadeTask);
    localStorage.setItem("taskList",JSON.stringify(updadeTask));
  };

  const handleRemove = (removeItem:number) => {
    const deletedTask = userTask.filter((_,index) => index !== removeItem);
    setUserTask(deletedTask);
    localStorage.setItem("taskList", JSON.stringify(deletedTask));
  };

  const handleReset = () => {
    setUserTask([]);
    localStorage.setItem("taskList",JSON.stringify([]));
  }

  let taskCount = userTask.filter((item) => item.completed === false).length;
  
 
  return (
    <>
      <div className="flex flex-wrap justify-center items-center w-full h-[100vh] bg-gray-950 justify-self-center">
        <div className={` ${errors.error? "shadow-red-900" : "shadow-cyan-900"} shadow-xl w-[450px] border border-cyan-300  p-5 rounded-3xl bg-white`}> 
            <h2 className="text-3xl font-bold mb-6 w-full text-cyan-500">Your To Do</h2>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-wrap justify-between">
                  <div className="w-[90%]">
                    <input
                      className="w-full py-[10px] pl-2 outline-none border-none text-sm"
                      type="text"
                      placeholder={errors.error? errors.error: "Add new task"}
                      name="task"
                      value={curentData.task}
                      onChange={handleChange}
                    />
                    <div className={`${errors.error? "bg-red-600":"bg-black"} w-full h-[1px]`}></div>
                  </div>
                  <div>
                    <button className="bg-gray-700 p-2 rounded-xl text-white hover:bg-cyan-500 hover:text-black hover:translate-y-[-2px] hover:transition transition-all">
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="w-full h-[450px] my-4 p-2 overflow-y-scroll no-scrollbar border border-gray-500 rounded-3xl bg-cyan-100">
                {userTask?.map((item,index) => (
                    <div className={` ${item.completed? "line-through text-gray-500":"text-black"} bg-white/50 backdrop-blur-md flex flex-wrap justify-between items-center h-[50px] px-[10px] mb-3 border border-black rounded-2xl`} key={index}>
                        <div className="w-[70%]">
                            <p>{index+1} : {item.task}</p>
                        </div>
                        <div className="w-[15%] flex flex-nowrap justify-between pr-[15px]">
                            <input type="checkbox" checked = {item.completed} onChange={()=>handleCompleted(index)}/>
                            <button onClick={() => handleRemove(index)} className={`${item.completed? "text-gray-400 hover:text-green-600":"text-gray-700 hover:text-red-600"} hover:translate-y-[-2px] hover:transition transition-all text-[14px]`}><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full h-[1px] bg-black"></div>
            <div className="w-full flex flex-wrap justify-between items-center">
            <p className="text-black m-4 text-md font-semibold fontstyle" >{taskCount <=0? "All task completed":`Your remaining todos : ${taskCount}`}</p>
            <div><button onClick={handleReset} className="bg-cyan-300 py-1 px-6 rounded-xl border border-gray-500 text-black font-semibold text-md hover:bg-cyan-500 hover:text-white hover:translate-y-[-2px] hover:transition transition-all">Reset</button></div>
            </div>
          </div>
      </div>
    </>
  );
}

export default TodoList;
