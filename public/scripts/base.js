const size = {
    'x': 12,
    'y': 10

};


var Cell = React.createClass({

    getInitialState: function() {
        return {
            isAlive: false
        };
    },
    handleClick: function() {
        this.setState({
            isAlive: !this.state.isAlive
        })
    },
    render: function() {
        var classCell = 'cell';

        if (this.state.isAlive){
            classCell += ' alive';
        }

        return (
            <td className={classCell} onClick={this.handleClick}>
            </td>
        );
    }
});

var Row = React.createClass({
    render: function() {
        var cells = []
        for (let i = 0; i < this.props.data; i++ ) {
            let k = 'cell' + i;
            cells.push(<Cell key={k} />);
        }
        return (
            <tr className="row">
                {cells}
            </tr>
        );
    }
});

var Bord = React.createClass({
    render: function() {
        var rows = []
        for (let i = 0; i < this.props.data.y; i++ ) {
            let k = 'row' + i;
            rows.push(<Row key={k} data={this.props.data.x}/>);
        }
        return (
        <table className="bord">
            <tbody>
                {rows}
            </tbody>
        </table>
        );
    }
});

ReactDOM.render(
    <Bord data={size} />,
    document.getElementById('content')
);