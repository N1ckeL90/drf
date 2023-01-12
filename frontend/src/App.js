import React from "react";
import "./App.css";
import UserList from "./components/User";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from "./components/NaviBar";
import {Footer} from "./components/Footer";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

    }

    render() {
        return (

            <div>
                <NaviBar/>
                <UserList users={this.state.users}/>
                <Footer/>
            </div>
        )
    }
}

export default App;