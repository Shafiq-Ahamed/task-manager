import Dashboard from './Dashboard'
import Home from './Home'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import TaskList from './Tasklist'
import Edit from './Edit'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/dashboard" element={<Dashboard/>} />
       <Route path="/tasklist" element={<TaskList/>} />
       <Route path="/edit/:id" element={<Edit/>} />
</Routes>
</BrowserRouter>
    </>
  )
}

export default App
