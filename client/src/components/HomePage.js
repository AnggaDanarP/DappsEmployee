import React, { Component } from "react";
import { Card, Grid, Message, Image } from 'semantic-ui-react';
import ipfs from '../utils/ipfs';
import "../App.css";

class HomePage extends Component {
    state = {
        nama: '',
        id: '',
        jabatan: '',
        image: '',
        buffer: null
    }
    componentDidMount = async () => {
        let idPegawai = await this.props.kontrak.methods.getId().call({ from: this.props.account});
        let namaPegawai = await this.props.kontrak.methods.getNama().call({ from: this.props.account});
        let jabatanPegawai = await this.props.kontrak.methods.getJabatan().call({ from: this.props.account});
        let profileImage = await this.props.kontrak.methods.getImage().call({ from: this.props.account});
        this.setState({
            id: idPegawai,
            nama: namaPegawai,
            jabatan: jabatanPegawai,
            image: profileImage
        });       
    }

    captureFile = async (event) => {
        event.preventDefault();
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) })
        }
    }

    onSubmit = async (event) => {
        event.preventDefault()
        if (this.state.buffer) {
            const file = await ipfs.add(this.state.buffer)
            const imageHash = file[0]["hash"]
            this.props.kontrak.methods.setImage(imageHash).send({ from: this.props.account }).then((r) => {
                this.setState({ image: imageHash });
            })
        }
    }

    render() {
        return (
            <div className="user-account">
                <Grid centered stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Card fluid>
                                {
                                    this.state.image === "" ?
                                        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped ui={false} />
                                        :
                                        <Image src={`https://ipfs.io/ipfs/${this.state.image}`} wrapped ui={false} />
                                }
                                <form onSubmit={this.onSubmit}>
                                    <input type="file" onChange={this.captureFile}/>
                                    <input type="submit"/>
                                </form>
                                <Card.Content>
                                    <Card.Header>{this.props.nama}</Card.Header>
                                    <Card.Meta>
                                        <span>user</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        <strong>
                                            {
                                                this.state.nama
                                            }
                                        </strong> 
                                        <br></br>
                                        {
                                            this.state.id
                                        }
                                        <br></br>
                                        {
                                            this.state.jabatan
                                        }
                                        <br></br>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Message size="mini">
                                        {this.props.account.toLowerCase()}
                                    </Message>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
export default HomePage;