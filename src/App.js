import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PoemsList from "./components/poems-list.component";
import CorpusList from "./components/corpus-list.component";
import CreateRojak from "./components/create-rojak.component";
import EditCorpus from "./components/edit-corpus.component";
import RojakPoem from "./components/rojak-poem.component";
import AddSauce from "./components/add-sauce.component";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import AboutUs from "./components/about-us.component";


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar /> 
        <Route path="/" exact component={PoemsList}/>
        <Route path="/edit/:id" component={EditCorpus}/>
        <Route path="/view/:id" component={RojakPoem}/> 
        <Route path="/corpus" component={CorpusList}/>
        <Route path="/createrojak" component={CreateRojak}/> 
        <Route path='/addSauce' component={AddSauce}/>
        <Route path="/aboutUs" component={AboutUs}/>
      </div>
    </Router>
  );
}
export default App;
