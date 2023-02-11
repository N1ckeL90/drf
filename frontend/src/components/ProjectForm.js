import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', link_repo: '', users_involved: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.link_repo, this.state. users_involved)
        event.preventDefault()

    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="name">Name</label>
                        <input type="text" className="form-control" name="name" value={this.state.name}
                            onChange={ (event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="link_repo">Link repo</label>
                        <input type="url" className="form-control" name="link_repo" value={this.state.link_repo}
                        onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="users_involved">Users involved</label>
                    <input type="text" className="form-control" name="users_involved" value={this.state.users_involved}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm