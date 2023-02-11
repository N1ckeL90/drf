import React from "react";

class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {project: props.projects[0].id, note_text: '', author: props.authors[0].id}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.createToDo(this.state.project, this.state.note_text, this.state.author)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="project">Project</label>
                        {/*<input type="text" className="form-control" name="project" value={this.state.project}*/}
                        {/*    onChange={ (event)=>this.handleChange(event)} />*/}
                        <select name="project" className="form-control" onChange={(event)=>this.handleChange(event)}>
                            {this.props.projects.map((item)=><option value={item.name}>{item.name}</option>)}
                        </select>
                </div>
                <div className="form-group">
                    <label for="note_text">Note text</label>
                        <input type="text" className="form-control" name="note_text" value={this.state.note_text}
                        onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="author">Author</label>
                    {/*<input type="text" className="form-control" name="author" value={this.state.author}*/}
                    {/*       onChange={(event) => this.handleChange(event)}/>*/}
                        <select name="author" className="form-control" onChange={(event)=>this.handleChange(event)}>
                                {this.props.authors.map((item)=><option value={item.username}>{item.username}</option>)}
                            </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ToDoForm