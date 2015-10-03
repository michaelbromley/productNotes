import React from 'react';
import {Link} from 'react-router';
import Data from 'common/dataService';

class PadList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pads: []
        };
    }

    componentDidMount() {
        Data.fetchPadList()
            .then(pads => {
                this.setState({ pads: pads });
            });
    }

    createPad = () => {
        //PadActions.createPad(this.refs.newPadName.getDOMNode().value);
    };

    deletePad = (id) => {
        //PadActions.deletePad(id);
    };

    render() {
        return (
            <div>
                <ul>
                {this.state.pads.map(pad => {
                    return (
                        <li key={pad._id}>
                            <Link to="pad" params={{ id: pad._id }}>{pad.name}</Link>
                            <button onClick={this.deletePad.bind(this, pad._id)}>x</button>
                        </li>
                    );
                })}
                </ul>
                <input type="text" ref="newPadName" />
                <button onClick={this.createPad}>New Pad</button>
            </div>
        );
    }
}

export default PadList;