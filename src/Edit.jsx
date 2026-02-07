import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Edit.css";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/task/get/${id}`);
      setDetails(response.data);
    } catch (error) {
      console.log( error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = {
        ...details,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        priority: priorityRef.current.value,

      };

      await axios.put(`http://localhost:8080/task/update/${id}`, updatedTask);
      alert("Task updated successfully!");
      navigate("/tasklist");
      console.log(updatedTask);
      
    } catch (error) {
      console.log( error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Edit Task</h2>
        <form onSubmit={handleSubmit} className="edit-form">
<label >Task Title</label>
          <input
            type="text"
            defaultValue={details.title}
            ref={titleRef}
            placeholder="Enter task title"
            required
          />

          <label>Description (Optional)</label>
          <textarea
            defaultValue={details.description}
            ref={descriptionRef}
            placeholder="Enter task description"
          ></textarea>

          <label>Priority</label>
          <select ref={priorityRef} defaultValue={details.priority}>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <div className="button-group">
            <button type="submit" className="update-btn">
              Update Task
            </button>
            <button
 type="button"
              className="cancel-btn"
              onClick={() => navigate("/tasklist")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
