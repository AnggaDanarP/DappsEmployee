import React, { Component} from "react";

class Logout extends Component {
    componentDidMount = () => {
        this.props.accountLogout({masuk: false});
        window.location.reload();
    }

    render() {
        return (
            <>
            </>
        );
    }
}
export default Logout;