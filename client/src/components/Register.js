import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { Form, Button, Card, Message} from 'semantic-ui-react';
import "../App.css";

class Register extends Component {
    state = {
        nama: '',
        jabatan : '',
        email : '',
        password: '',
        status: '',
        Regist: false,
        messagePopUp: ''
    }

    onRegister = async () => {
        if (this.state.nama !== '' && this.state.jabatan !== '' && this.state.email !== '' && this.state.password !== '') {
            let password = this.state.password.trim();

            if (password.length < 6) {
                this.setState({
                    status: 'failes',
                    nama: '',
                    password: '',
                    jabatan: '',
                    email: '',
                    messagePopUp: 'Password need 6 character'
                });
                return;
            } else {
                let userAddress = await this.props.kontrak.methods.getUserAddress().call({ from: this.props.account});
                
                if (userAddress !== '0x0000000000000000000000000000000000000000') {
                    this.setState({
                        status: 'failed',
                        nama: '',
                        password: '',
                        jabatan: '',
                        email: '',
                        messagePopUp: 'This account already exist'
                    });
                    return;
                } else {
                    await this.props.kontrak.methods.registrasi(this.state.nama, this.state.jabatan, this.state.email, this.state.password).send({ from: this.props.account, gas: 1000000});

                    this.setState({
                        status: 'success',
                        nama: '',
                        password: '',
                        jabatan: '',
                        email: '',
                        Regist: true,
                        messagePopUp: 'Register success'
                    });                   
                    this.props.accountRegistered({daftar: this.state.Regist});
                    return;
                }
            }
        }
    }

    render() {
        return (
            <div className="sign-up">
                Registrasi Akun
                <div className="signup-form">
                    <Card fluid centered>
                        <Card.Content>
                            <Form size='large'>
                                {
                                    this.state.messagePopUp !=='' || this.state.status === 'success' ?
                                        <Message positive>
                                            {this.state.messagePopUp}
                                        </Message> :
                                        this.state.messagePopUp !=='' || this.state.status === 'failed'?
                                            <Message negative>
                                                {this.state.messagePopUp}
                                            </Message> :
                                            console.log('')
                                }
                                <Form.Field>
                                    <input
                                        required
                                        type='text'
                                        placeholder="nama"
                                        value={this.state.nama}
                                        autoComplete="nama"
                                        onChange={e => this.setState({ nama: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        required
                                        type='text'
                                        placeholder="jabatan"
                                        value={this.state.jabatan}
                                        autoComplete="jabatan"
                                        onChange={e => this.setState({ jabatan: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        required
                                        type='text'
                                        placeholder="email"
                                        value={this.state.email}
                                        autoComplete="email"
                                        onChange={e => this.setState({ email: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        required
                                        type='password'
                                        placeholder="password"
                                        value={this.state.password}
                                        autoComplete="password"
                                        onChange={e => this.setState({ password: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Button type='submit' primary fluid size='large' onClick={this.onRegister}>
                                        Create
                                    </Button>
                                </Form.Field>
                            </Form>
                        </Card.Content>    
                    </Card>  
                    <div className="signin-onUp">
                        Sudah memiliki Akun? <Link to='/Login'>Login</Link>      
                    </div>             
                </div>
            </div>
        );
    }
}

export default Register;