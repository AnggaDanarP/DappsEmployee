import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import './style/Verifikasi.css';

class Verifikasi extends Component {
  state = {
    jumlahPegawaiVerifikasi: null,
  };

  componentDidMount = async () => {
    let jumlahPegawai = await this.props.kontrak.methods.getJumlahPegawai().call({ from: this.props.account });
    let daftarPegawai = [];
    for (let i = 1; i <= jumlahPegawai; i++) {
        let alamatPegawai = await this.props.kontrak.methods.pegawai(i).call({ from: this.props.account });
        let pegawaiTemp = await this.props.kontrak.methods.user(alamatPegawai).call({ from: this.props.account });
        if (!pegawaiTemp.verifikasi) {
            daftarPegawai.push(pegawaiTemp);
          }
    }
    
    this.setState({ jumlahPegawaiVerifikasi: daftarPegawai });
    console.log(this.state.jumlahPegawaiVerifikasi);
  };

  onVerifikasi = async event => {
    await this.props.kontrak.methods.memverifikasi(event.target.value).send({ from: this.props.account, gas: 1000000 });
  };

  render() {
    let daftarPegawaiTampilkan;
    if (this.state.jumlahPegawaiVerifikasi) {
        daftarPegawaiTampilkan = this.state.jumlahPegawaiVerifikasi.map((pegawai) => {
        return (
          <div className="pegawai">
            <div className="nama">{pegawai.nama}</div>
            <div className="pegawaiDetails">
              <div>Jabatan: Belum disetting</div>
              <div>Harusnya ditampilkan biodatanya yang lainnya</div>
            </div>
            {pegawai.verifikasi ? (
              <Button className="button-verified">
                Verifikasi
              </Button>
            ) : (
              <Button
                onClick={this.onVerifikasi}
                value={pegawai.alamatPerangkat}
                className="button-verify"
              >
                Belum Verifikasi
              </Button>
            )}
          </div>
        );
      });
    }
    return (
      <div>
        <div className="tittle-page">
          <div className="tittle-page-title">
            <h1>Verifikasi Pegawai</h1>
          </div>
        </div>

        <div>{daftarPegawaiTampilkan}</div>
      </div>
    );
  }
}
export default Verifikasi;
