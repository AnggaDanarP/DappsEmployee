import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Message } from 'semantic-ui-react';
import "../App.css";

class Login extends Component {
    state = {
        email: '',
        password: '',
        status: '',
        masuk: false,
        messagePopUp: ''
    }

    onLogin = async () => {
        if (this.state.email !== '' && this.state.password !== '') {
            let password = this.state.password.trim();
            let email = this.state.email;
            
            if (password.length < 6) {
                this.setState({
                    email: '',
                    password: '',
                    status: 'failed',
                    messagePopUp: 'Check your Password'
                });
                return;
            } else {
                let userAddress = await this.props.kontrak.methods.getUserAddress().call({ from: this.props.account });
                if (userAddress === '0x0000000000000000000000000000000000000000' || userAddress.toLowerCase() !== this.props.account.toLowerCase()) {
                    this.setState({
                        status: 'failed',
                        password: '',
                        email: '',
                        messagePopUp: 'Check your wallet address'
                    });
                    return;
                } else {
                    let signin = await this.props.kontrak.methods.signIn(email, password).call({ from:this.props.account });
                    if (!signin) {
                        this.setState({
                            status: 'failed',
                            email: '',
                            password: '',
                            messagePopUp: 'Login failed'
                        });
                        return;
                    } else {
                        this.setState({
                            email: '',
                            password: '',
                            status: 'success',
                            masuk: true,
                            messagePopUp: 'Login Success'
                        });
                        this.props.accountLogin({ masuk: this.state.masuk });
                        return;
                    }
                }
            }
        }
        this.setState({
            email: '',
            password: ''
        });
    }

    render() {
        return (
            <div className='sign-up'>
                Login account
                <div className='signup-form'>
                    <Card fluid centered>
                        <Card.Content>
                            <Form size='large'>
                                {
                                    this.state.messagePopUp !== '' || this.state.status === 'failed' ?
                                        <Message negative>
                                            {this.state.messagePopUp}
                                        </Message> :
                                        this.state.messagePopUp !== '' || this.state.status === 'success' ?
                                            <Message positive>
                                                {this.state.messagePopUp}
                                            </Message> :
                                            console.log('')
                                }
                                <Form.Field required>
                                    <input
                                        type='text'
                                        placeholder='email'
                                        value={this.state.email}
                                        autoComplete='email'
                                        onChange={e => this.setState({ email: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field required>
                                    <input
                                        type='password'
                                        placeholder='password'
                                        value={this.state.password}
                                        autoComplete='password'
                                        onChange={e => this.setState({ password: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Button type='submit' primary fluid size='large' onClick={this.onLogin}>
                                        Login
                                    </Button>
                                </Form.Field>
                            </Form>
                        </Card.Content>
                    </Card>
                    {
                        this.props.daftar ?
                            console.log() :
                            <div className='signin-onUp'>
                                Don't have an account? <Link to='/Register'>Register</Link>
                            </div>
                    }
                </div>
            </div>
        );
    }
}
export default Login;