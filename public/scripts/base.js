const size = {
    'col': 12,
    'row': 10

};

function life (board) {
    return board.map(function (row, y){
        return row.map(function (cell, x) {
            let n = 0;
            if (y > 0){
                n += x > 0 ? board[y-1][x-1] : 0;
                n += board[y-1][x];
                n += x < row.length-1 ? board[y-1][x+1] : 0;
                    }
            n += x < row.length-1 ? board[y][x+1] : 0;
            if ( x > 0){
                n += board[y][x-1];
                n += y < board.length-1 ? board[y+1][x-1] : 0;

            }
            if (y < board.length-1) {
                n += board[y+1][x];
                n += x < row.length-1 ? board[y+1][x+1] : 0;

            }

            return n===3 || (n === 2 && cell) ? 1 : 0;

        })
    })

}

var Cell = React.createClass({

    handleClick() {
        this.props.clickCell(this.props.n_cell, this.props.n_row);
    },

    render() {
        let classCell = 'cell';

        if (this.props.isLife) {
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
        let cells = [];
        for (let i = 0; i < this.props.data.length; i++ ) {
            let k = 'cell' + i;
            let life = false;
            if (this.props.data[i] === 1 ) {
                life = true;
            }
            cells.push(<Cell key={k} isLife={life} n_row={this.props.n_row} n_cell={i} clickCell={this.props.clickCell}/>);
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
        let rows = [];
        for (let i = 0; i < this.props.data.length; i++ ) {
            let k = 'row' + i;
            rows.push(<Row key={k} data={this.props.data[i]} n_row={i} clickCell={this.props.clickCell}/>);
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

var StartButton = React.createClass({

    render: function() {

        return (
            <button className="startButton btn btn-success" onClick={this.props.clickBtn}>
                Round
            </button>
        )

    }
});



var GameBox = React.createClass({
    getInitialState: function() {
        return {data: this.props.data};
    },

    handleChangeCell: function (x, y) {
        this.state.data[y][x] = this.state.data[y][x] ? 0 : 1;
        this.setState({
            data: this.state.data
        });
    },
    handleClick: function() {
        let newGen = life(this.state.data);
        this.setState({
            data: newGen
        });
    },


    render: function() {

        return (

            <div className="gameBox">
                <Bord data={this.state.data} clickCell={this.handleChangeCell}/>
                <StartButton clickBtn={this.handleClick} />
            </div>
        );

    }
});


var Desk = React.createClass({

    render: function() {
        var gen = [];

        for (let j = 0; j < this.props.dataSize.row; j++) {
            gen.push([]);
            for (let i = 0; i < this.props.dataSize.col; i++) {
                gen[j].push(0);
            }
        }
        return (
            <div className="desk">
                <GameBox data={gen}/>
            </div>
        );

    }
});

ReactDOM.render(
    <Desk dataSize={size} />,
    document.getElementById('content')
);