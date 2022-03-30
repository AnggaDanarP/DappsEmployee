import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import img from '../img/images.jpg';
import '../App.css';

class Home extends Component {
    render() {
        return (
            <div className='home-page'>
                <Grid stackable columns={3} textAlign='left'>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            ini adalah sebuah demonstrasi dari autentikasi
                            blockchain dimana menggunakan teknologi Smart Contract 
                            serta menyimpan keseluruhan data dari Pegawai
                        </Grid.Column>
                        <Grid.Column width={1}>

                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Image src={img} alt='image' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Home;
