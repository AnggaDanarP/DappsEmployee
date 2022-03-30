import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Divider, Menu } from "semantic-ui-react";
import DataPegawai from './DataPegawai';
import Verifikasi from './Verifikasi';
import Absensi from './Absensi';
import "../App.css";

class Admin extends Component {
    state = {
        activeItem: 'Home'
    }
    
    handleItemClick = (e, { nama }) => this.setState({ activeItem: nama, color: 'teal' });

    render() {
        const { activeItem, color } = this.state;
        return (
            <div className="App">
                <div className="main-page">
                    <BrowserRouter>
                        <div className="home-nav">
                            <Menu stackable inverted secondary size='large'>
                                <Menu.Item
                                    name="Home"
                                    color={color}
                                    active={activeItem === 'Home'}
                                    onClick={this.handleItemClick}
                                    as={Link}
                                    to='/'
                                />
                                <Menu.Item
                                    name="DataPegawai"
                                    color={color}
                                    active={activeItem === 'DataPegawai'}
                                    onClick={this.handleItemClick}
                                    as={Link}
                                    to='/DataPegawai'
                                />
                                <Menu.Item
                                    name="Verifikasi"
                                    color={color}
                                    active={activeItem === 'Verifikasi'}
                                    onClick={this.handleItemClick}
                                    as={Link}
                                    to='/Verifikasi'
                                />
                                <Menu.Item
                                    name="Absensi"
                                    color={color}
                                    active={activeItem === 'Absensi'}
                                    onClick={this.handleItemClick}
                                    as={Link}
                                    to='/Absensi'
                                />
                            </Menu>
                        </div>
                        <Divider inverted />
                        <Switch>
                            <Route exact path='/'>
                               Halo Admin
                            </Route>
                            <Route exact path='/DataPegawai' element={<DataPegawai/>}>
                                <DataPegawai
                                    account={this.props.account}
                                    kontrak={this.props.kontrak}
                                />
                            </Route>
                            <Route exact path='/Verifikasi' element={<Verifikasi/>}>
                                <Verifikasi
                                    account={this.props.account}
                                    kontrak={this.props.kontrak}
                                />
                            </Route>
                            <Route exact path='/Absensi' element={<Absensi/>}>
                                <Absensi
                                    account={this.props.account}
                                    kontrak={this.props.kontrak}
                                />
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}
export default Admin;