import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pts: [-1,-1] };
    }

    onmousemove(e) {
        const mx = e.clientX;
        const my = e.clientY;
        this.setState((prevState) => {
            let a = prevState.pts.concat([[mx,my]]);
            if (a.length > 25) {
                a = a.slice(a.length - 25);
            }
            return {pts: a}
        });
    }

    render() {
        const w = 1000;
        const h = 960;
        const box = [0, 0, w, h];
        const r = 5;
        const i1 = 0;
        const pt1 = this.state.pts[i1]
        const i4 = this.state.pts.length-1;
        const pt4 = this.state.pts[i4];
        const i2 = Math.floor(i4 / 3);
        const pt2 = this.state.pts[i2];
        const i3 = Math.floor(2 * i4 / 3);
        const pt3 = this.state.pts[i3];
        console.log('indices = ' + i1 + ', ' + i2 + ', ' + i3 + ', ' + i4);
        const path_data = "M "
              + pt1[0] + ", " + pt1[1]
              + " C "
              + pt2[0] + ", " + pt2[1] + " "
              + pt3[0] + ", " + pt3[1] + " "
              + pt4[0] + ", " + pt4[1];
        return (
            <div class="wrapper">
                <svg xmlns="http://www.w3.org/2000/svg"
                     width={w}
                     height={h}
                     viewBox={box}
                     onMouseMove={ this.onmousemove.bind(this)}
                     tabIndex="1"
                >
                    <g>
                        <circle cx={pt1[0]} cy={pt1[1]} r={r}/>
                        <circle cx={pt2[0]} cy={pt2[1]} r={r}/>
                        <circle cx={pt3[0]} cy={pt3[1]} r={r}/>
                        <circle cx={pt4[0]} cy={pt4[1]} r={r}/>
                        <path fill="none" stroke="red" d={path_data}/>
                    </g>
                </svg>
                </div>
        );
    }
}

export default App;
