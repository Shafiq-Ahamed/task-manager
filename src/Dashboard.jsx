import  { useEffect, useRef, useState } from "react";
import "./Dashboard.css"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {LuLogOut} from "react-icons/lu";
import {MdOutlineDashboard} from "react-icons/md";
import {LuSquareCheckBig} from "react-icons/lu";
import {TbLayoutSidebar} from "react-icons/tb";
import {FaTasks} from "react-icons/fa";
import {CiCircleCheck} from "react-icons/ci";
import {GoTasklist} from "react-icons/go";
function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const titleRef = useRef();
  const descRef = useRef();
  const priorityRef = useRef();
  const navigate=useNavigate();
   const fetchTasks = async () => {
      try {
        const res =await  axios.get("http://localhost:8080/task/get");
        setTasks(res.data); 
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    useEffect(()=>{
      fetchTasks();
    },[]);
  const handleAddTask = async() => {
    // const created=new Date().toLocaleDateString('en-US',{
    //   year:'numeric',
    //   month:'short',
    //   day:'numeric'
    // })
    const title = titleRef.current.value;
    const description = descRef.current.value;
    const priority = priorityRef.current.value;
      const newTask = {
        title,
        description,
        priority
      };
    try{
     await axios.post("http://localhost:8080/task/create",newTask);
     alert("added successfully");
     navigate("/tasklist");
     console.log(newTask);
    }catch (error){
      console.log(error);
     
    }
    
    
  };
  return (
    <>
    <div className="main-container">
    <div className="sidebar">
    <div className="logo"><LuSquareCheckBig size={20} color="#6213ebff"/> TaskFlow</div>
    <ul className="nav">
      <li className="active"><MdOutlineDashboard size={22}/>  Dashboard</li>
     <div className="line"></div>
    </ul>
   <div className="logout" onClick={()=>navigate("/")}><LuLogOut size={18}/>  Logout</div>
    </div>
    <div className="dashboard-container">
    <div className="navbar">  <TbLayoutSidebar size={18}/></div>
      <h1>Dashboard</h1>
      <p>Welcome to TaskFlow - Your productivity companion</p>
      <div className="task-stats">
        <div className="stat-box">
          <div className="task-icon">
      <FaTasks color="#6213ebff"/>
      </div>
      <div className="task-info">
          <span> Total Tasks</span>
          <span className="count1">{tasks.length}</span>
          </div>
        </div>
        <div className="stat-box">
             <div className="task-icon">
      <CiCircleCheck color="#008000"/>
      </div>
      <div className="task-info">
          <span className="txt">Completed</span><br />
          <span className="count" >{ tasks.filter((t)=>t.completed).length}</span>
          </div>
        </div>
        <div className="stat-box">
          <div>
            <GoTasklist size={35}/>
          </div>
          <div className="task-info">
          <span className="txt">Pending</span><br />
          <span className="count">{ tasks.filter((t)=>!t.completed).length}</span>
          </div>
        </div>
      </div>
 <h2>Create New Task</h2>
      <div className="new-task-form">
        <label>Task Title</label>
        <input
          type="text"
          ref={titleRef}
          placeholder="Enter task title..."
        />

        <label>Description (Optional)</label>
        <textarea
          ref={descRef}
          placeholder="Add more details..."
        />

        <label>Priority</label>
        <select ref={priorityRef} defaultValue="Medium">
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
    </div>
    </>
  );
}
export default Dashboard
