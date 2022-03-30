// SPDX-License-Identifier: Unlicense
pragma solidity >=0.4.21 <8.10.0;

contract Employee {

    uint jumlahPegawai;

    constructor () {
        jumlahPegawai = 0;
    }

    struct Pegawai {
        address alamatPerangkat;
        string nama;
        string id;
        string jabatan;
        bytes32 password;
        string imageHash;
    }

    address[] public pegawai;
    mapping(address => Pegawai) public user;

    event LogPegawai(address indexed alamatPerangkat, string nama, string metode);

    function setID(address _pegawai, string memory _nama, string memory _jabatan, uint _jumlahPegawai) private pure returns(string memory){
        uint _i = uint(keccak256(abi.encodePacked(_pegawai, _nama, _jabatan, _jumlahPegawai))) % 10000000000;
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function registrasi(string memory _nama, string memory _jabatan, string memory _email, string memory _password) public {
        require(user[msg.sender].alamatPerangkat == address(0x0000000000000000000000000000000000000000), "Already Registered");
        Pegawai memory newPegawai = Pegawai({
            alamatPerangkat: msg.sender,
            nama : _nama,
            id : setID(msg.sender, _nama, _jabatan, jumlahPegawai),
            jabatan : _jabatan,
            password : keccak256(abi.encodePacked(_email, _password)),
            imageHash: ""
        });
        user[msg.sender] = newPegawai;
        pegawai.push(msg.sender);
        jumlahPegawai++;
        emit LogPegawai(msg.sender, _nama, "registrasi");
    }

    function getUserAddress() public view returns (address) {
        return user[msg.sender].alamatPerangkat;
    }

    function getNama() public view returns (string memory) {
        return user[msg.sender].nama;
    }
    function getId() public view returns (string memory) {
        return user[msg.sender].id;
    }

    function getJabatan() public view returns (string memory) {
        return user[msg.sender].jabatan;
    }

    function setImage(string memory _imageHash) public {
        user[msg.sender].imageHash = _imageHash;
        emit LogPegawai(msg.sender, user[msg.sender].nama, "Mengganti foto profil");
    }

    function getImage() public view returns (string memory) {
        return user[msg.sender].imageHash;
    }

    function signIn(string memory _email, string memory _password) public view returns (bool) {
        if (keccak256(abi.encodePacked(_email, _password)) == user[msg.sender].password) {
            return true;
        }
        return false;
    }
    
}