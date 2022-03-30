import React, { Component } from "react";
import './style/Verifikasi.css';

class DataPegawai extends Component {
  state = {
    daftarSeluruhPegawai: null,
  };

  componentDidMount = async () => {
    let jumlahPegawai = await this.props.kontrak.methods.getJumlahPegawai().call({ from: this.props.account });
    let daftarPegawai = [];
    for (let i = 1; i <= jumlahPegawai; i++) {
        let alamatPegawai = await this.props.kontrak.methods.pegawai(i).call({ from: this.props.account });
        let pegawaiTemp = await this.props.kontrak.methods.user(alamatPegawai).call({ from: this.props.account });
        daftarPegawai.push(pegawaiTemp);
    }
    
    this.setState({ daftarSeluruhPegawai: daftarPegawai });
  };

  render() {
    let daftarPegawaiTampilkan;
    if (this.state.daftarSeluruhPegawai) {
      daftarPegawaiTampilkan = this.state.daftarSeluruhPegawai.map((pegawai) => {
        return (
          <div className="pegawai">
            <div className="nama">{pegawai.nama}</div>
            <div className="pegawaiDetails">
              <div>Jabatan: Belum disetting</div>
              <div>Harusnya ditampilkan biodatanya yang lainnya</div>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <div className="tittle-page">
          <div className="tittle-page-title">
            <h1>Data Pegawai</h1>
          </div>
        </div>

        <div>{daftarPegawaiTampilkan}</div>
      </div>
    );
  }
}
export default DataPegawai;
