import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            email: '', 
            password: '', 
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this); 
        this.renderErrors = this.renderErrors.bind(this);
    }

    //once user has been authenticated, redirect to tweets page
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/tweets')
        }

        this.setState({errors: nextProps.errors})
    }

    //handle field updates
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault(); 
        let user = {
            email: this.state.email, 
            password: this.state.password
        }
        this.props.login(user); 
    }

    renderErrors() {
        return(
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li>
                        {this.state.errors[error]}
                    </li> //key = {`error-${li}`}
                ))}
            </ul>
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <br />
                        <input type="submit" value="Submit" />
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginForm); 