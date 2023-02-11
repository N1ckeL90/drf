import React from "react";
import "./App.css";
import UsersList from "./components/Users";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from "./components/NaviBar";
import {Footer} from "./components/Footer";
import ProjectsList from "./components/Projects";
import ToDoList from "./components/ToDo";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie/es6";
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/ToDoForm";


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todo': [],
            'token': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout () {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(login, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: login, password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json',
        }
        if (this.is_authenticated())
            {
                headers['Authorization'] = 'Token ' + this.state.token
            }
        return headers
    }
    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo', {headers})
            .then(response => {
                const todo = response.data.results
                this.setState(
                    {
                        'todo': todo
                    }
                )
            }).catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item)=>item.id !==id)})
            }).catch(error => console.log(error))
    }

    createProject(name, link_repo, users_involved) {
        const headers = this.get_headers()
        const data = {name: name, linkRepo: link_repo, usersInvolved: []}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                let new_project = response.data
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    deleteToDo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`, {headers})
            .then(response => {
                this.setState({todo: this.state.todo.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }

    createToDo(project, note_text, author) {
        const headers = this.get_headers()
        const data = {project: project, noteText: note_text, author: author}
        console.log(data)
        axios.post('http://127.0.0.1:8000/api/todo/', data, {headers})
            .then(response => {
                let new_todo = response.data
                this.setState({todo: [...this.state.todo, new_todo]})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (

            <div className="App">
                <BrowserRouter>
                    <NaviBar is_authenticated={this.is_authenticated()} logout={() => {this.logout()}} />
                    <Switch>
                        <Route exact path='/' component={() => <UsersList users={this.state.users} />} />
                        <Route exact path='/projects' component={
                            () => <ProjectsList items={this.state.projects} deleteProject={(id)=>this.deleteProject(id)}/>} />
                        <Route exact path='/projects/create' component={ () => <ProjectForm
                            createProject={ (name, link_repo, users_involved) => this.createProject(name, link_repo, users_involved)}/> } />
                        <Route exact path='/todo' component={
                            () => <ToDoList items={this.state.todo} deleteToDo={(id)=>this.deleteToDo(id)}/>} />
                        <Route exact path='/todo/create'
                               component={() => <ToDoForm projects={this.state.projects}
                                                          authors={this.state.users}
                                                          createToDo={(project, note_text, author) =>
                                                              this.createToDo(project, note_text, author)} />} />
                        <Route exact path='/login' component={() => <LoginForm get_token={(login, password) => this.get_token(login, password)} />} />
                        <Route component={NotFound404} />
                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;

