import React, { Component } from "react";
import Employee from "./contracts/Employee.json";
import getWeb3 from "./getWeb3";
import 'semantic-ui-css/semantic.min.css'
import "./App.css";
import { Menu, Divider } from "semantic-ui-react";
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import HomePage from './components/HomePage';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {  
      web3: null, 
      account: null, 
      kontrak: undefined,
      daftar: false,
      masuk: false,
      activeItem: 'home',
    };
  }

  handleItemClick = (e, { nama }) => this.setState({ activeItem: nama, color: 'teal' });

  componentDidMount = async () => {
    if (!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Employee.networks[networkId];
      const Employeeinstance = new web3.eth.Contract(
          Employee.abi,
          deployedNetwork && deployedNetwork.address,
      );

      this.setState({ kontrak: Employeeinstance, web3: web3, account: accounts[0] });

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    await this.getAccount();
  };

  getAccount = async () => {
    if (this.state.web3 !== null || this.state.web3 !== undefined) {
      await window.ethereum.on('accountsChanged', async (accounts) => {
        this.setState({
          account: accounts[0],
          masuk: false
        });
      });
    }
  }

  accountRegistered = async (daftar) => {
    this.setState({ daftar });
  }

  accountLogin = async (masuk) => {
    this.setState({ masuk });
  }

  accountLogout = async (masuk) => {
    this.setState({ masuk });
  }

  render() {
    const { activeItem, color } = this.state;

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div className="main-page">
          <BrowserRouter>
            <div className="home-nav">
              <Menu stackable inverted secondary size='large'>
                <Menu.Item
                  name="home"
                  color={color}
                  active={activeItem === 'home'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to='/'
                />
                <Menu.Item
                  name="help"
                  color={color}
                  active={activeItem === 'help'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to='/help'
                />
                {
                  this.state.masuk ?
                  <Menu.Item
                    position="right"
                    name="HomePage"
                    color={color}
                    active={activeItem === 'HomePage'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/HomePage'
                  />
                  :
                  <Menu.Item
                    position="right"
                    name="Login"
                    color={color}
                    active={activeItem === 'Login'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/Login'
                  />
                }
                {
                  this.state.masuk ?
                    <Menu.Item
                      name='Logout'
                      color='red'
                      active={activeItem === 'Logout'}
                      onClick={this.handleItemClick}
                      as={Link}
                      to='/Logout'
                    />
                    :
                    <Menu.Item
                      name='Register'
                      color={color}
                      active={activeItem === 'Register'}
                      onClick={this.handleItemClick}
                      as={Link}
                      to='/Register'
                    />
                }
              </Menu>
            </div>
            <Divider inverted />
            <Switch>
              <Route exact path='/' element={<Home/>}>
                <Home/>
              </Route>
              <Route path='/help'>
                Help page
              </Route>
              {
                this.state.masuk ?
                <Route path='/HomePage' element={<HomePage/>} >
                  <HomePage
                    account={this.state.account}
                    kontrak={this.state.kontrak}
                  />
                </Route>
                :
                <Route path='/HomePage' element={<HomePage/>}>
                  Anda telah logout dari sistem
                </Route>
              }
              {
                <Route path='/Login' element={<Login/>}>
                  {
                    this.state.masuk ?
                      <Redirect  to='/HomePage'/>
                      :
                      <Login
                        kontrak={this.state.kontrak}
                        account={this.state.account}
                        daftar={this.state.daftar}
                        accountLogin={this.accountLogin}
                      />
                  }
                </Route>
              }
              {
                this.state.masuk ?
                  <Route path='/Logout' element={<Logout/>}>
                    <Logout
                      accountLogout={this.accountLogout}
                    />
                    Anda telah logout dari sistem
                    <br></br>
                    Terima Kasih
                  </Route>
                  :
                  <Route path='/Register' element={<Register/>}>
                    <Register
                      kontrak={this.state.kontrak}
                      account={this.state.account}
                      accountRegistered={this.accountRegistered}
                    />
                  </Route>
              }
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
export default App;