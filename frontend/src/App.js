import React from "react";
import "./App.css";
import UsersList from "./components/Users";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from "./components/NaviBar";
import {Footer} from "./components/Footer";
import ProjectsList from "./components/Projects";
import ToDoList from "./components/ToDo";
import {HashRouter, Link, Route} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todo': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                const todo = response.data.results
                this.setState(
                    {
                        'todo': todo
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (

            <div className="App">
                <HashRouter>
                    <NaviBar/>
                    <Route exact path='/' component={() => <UsersList users={this.state.users} />} />
                    <Route exact path='/projects' component={() => <ProjectsList items={this.state.projects} />} />
                    <Route exact path='/todo' component={() => <ToDoList items={this.state.todo} />} />
                </HashRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
