import { useEffect, useRef, useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import axios from "axios";
import "./Tasklist.css";
import {TbLayoutSidebar} from "react-icons/tb";
import {LuSquareCheckBig} from "react-icons/lu";
import {MdOutlineDashboard} from "react-icons/md";
import {LuLogOut} from "react-icons/lu";
import {RiDeleteBinLine} from "react-icons/ri";
import {FiEdit2} from "react-icons/fi";
import {CiSearch} from "react-icons/ci";

const TaskList = () => {
const navigate=useNavigate();
  const [tasks, setTasks] = useState([]);
const [filtertask,setFiltertask]=useState([]);
const searchRef=useRef();
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/task/get");
      setTasks(res.data);
      setFiltertask(res.data)
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const removeTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:8080/task/del/${id}`);
        fetchData();
          } catch (err) {
        console.error("Error deleting task:", err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleToggle=async(id)=>{
    try{
      const selectedTask=tasks.find((t)=>t.id===id);
      const updatedTask={completed:!selectedTask.completed};
      await axios.patch(`http://localhost:8080/task/change/${id}`,updatedTask);
      fetchData();
    }catch(err){
      console.log(err);
      
    }
  }
  const handleSearch=()=>{
    const searchTerm=searchRef.current.value;
    const filtered=tasks.filter((t)=>t.title.toLowerCase().includes(searchTerm)||t.description.toLowerCase().includes(searchTerm)||t.priority.toLowerCase().includes(searchTerm));
    setFiltertask(filtered);

    
  }

  return (
     <div className="main-container">
    <div className="sidebar">
    <div className="logo"><LuSquareCheckBig className="logo-icon"/> TaskFlow</div>
    <ul className="nav">
      <li className="active" onClick={()=>navigate("/dashboard")}><MdOutlineDashboard className="dash-icon"/> Dashboard</li>
    <li className="active"><LuSquareCheckBig className="active-icon" /> Task</li>
    <div className="border"></div>
    </ul>
    <div className="log" onClick={()=>navigate("/")}><LuLogOut className="logout-icon"/> Logout</div>
    </div>
    <div className="task-page">
      <div className="navbar">  <TbLayoutSidebar className="navbar-icon"/></div>
      <h1 className="task-title">Tasks</h1>
      <p className="task-subtitle">Manage and track all your tasks</p>
    <div className="searchbar">
      <CiSearch className="search-icon"/>
      <input 
      type="text"
      placeholder=" search tasks..."
      ref={searchRef}
      className="search-input"
      onChange={handleSearch} />
      <div className="button-container">
      <div><button className="all-count">All <span>{tasks.length}</span></button></div>
      <div><button className="pending-count">Pending<span>{tasks.filter(t=>!t.completed).length}</span></button></div>
      <div><button className="completed-count">Completed<span>{tasks.filter(t=>t.completed).length}</span></button></div>
    </div>
    </div>
      <div className="task-table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
 </thead>
          <tbody>
            
            {filtertask.map((t) => (
              <tr key={t.id} className={t.completed?'completed-task':''}>
                <td>
                  <input type="checkbox" onClick={()=>handleToggle(t.id)} />
                </td>
                <td className="task-name">{t.title}</td>
                <td className="task-description">{t.description}</td>
                <td>
                  <span
                    className={`priority-badge ${
                      t.priority === "high"
                        ? "high"
                        : t.priority === "medium"
                        ? "medium"
                        : "low"
                    }`}
                  >
                    {t.priority}
                  </span>
                </td>
                <td>{t.created_date}</td>
                <td className="actions">
                  <Link to={`/edit/${t.id}`}>
                    <button className="edit-btn"><FiEdit2 className="edit-icon"/></button>
                    </Link>
 <button className="delete-btn" onClick={() => removeTask(t.id)}>
                    <RiDeleteBinLine className="delete-icon"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default TaskList;