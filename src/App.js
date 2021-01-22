import React from 'react';
import nurbs from 'nurbs';
import IntervalTimer from 'react-interval-timer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouse_loc: [-1, -1],
            pts: [-1,-1],
            counter: 0
        };
    }

    onmousemove(e) {
        const mx = e.clientX - 15;
        const my = e.clientY;
        this.setState((prevState) => {
            return {
                mouse_loc: [mx, my],
                pts: prevState.pts,
                counter: prevState.counter
            }
        });
    }

    timer_callback(e) {
        this.setState((prevState) => {
            const pt = prevState.mouse_loc;
            let a = prevState.pts.concat([pt]);
            if (a.length > 25) {
                a = a.slice(a.length - 25);
            }
            return {
                mouse_loc: prevState.mouse_loc,
                pts: a,
                counter: prevState.counter + 1
            }
        });
    }

    render() {
        const w = 1000;
        const h = 960;
        const box = [0, 0, w, h];
        const r = 5;

        const num_cpts = 6;
        let cpts = [];
        for (let i=0; i<num_cpts; i++) {
            const t = i / (num_cpts-1);
            const idx = Math.floor(t * (this.state.pts.length-1));
            cpts.push([this.state.pts[idx][0], this.state.pts[idx][1]]);
        }

        const curve = nurbs({
            points: cpts,
            degree: 2,
            boundary: 'clamped'
        });

        let pts = [];
        const num_steps = 35;
        for (let i=0; i<num_steps; i++) {
            const t = 2 + (num_cpts-2) * i / (num_steps-1);
            pts.push(curve.evaluate([],t));
        }

        let path_data = "M " + pts[0][0].toString() + "," + pts[0][1].toString();
        for (let i=1; i<pts.length; i++) {
            path_data += " L " + pts[i][0].toString() + "," + pts[i][1].toString();
        }

        return (
            <div class="wrapper">
                <IntervalTimer timeout={12} callback={this.timer_callback.bind(this)} enabled='true' repeat='true' />
                <svg xmlns="http://www.w3.org/2000/svg"
                     width={w}
                     height={h}
                     viewBox={box}
                     onMouseMove={ this.onmousemove.bind(this)}
                     tabIndex="1"
                >
                    <g>
                        <circle cx={curve.points[0][0]} cy={curve.points[0][1]} r={r}/>
                        <circle cx={curve.points[1][0]} cy={curve.points[1][1]} r={r}/>
                        <circle cx={curve.points[2][0]} cy={curve.points[2][1]} r={r}/>
                        <circle cx={curve.points[3][0]} cy={curve.points[3][1]} r={r}/>
                        <circle cx={curve.points[4][0]} cy={curve.points[4][1]} r={r}/>
                        <circle cx={curve.points[5][0]} cy={curve.points[5][1]} r={r}/>
                        <path d={path_data} stroke="red" fill="none"/>
                    </g>
                </svg>
                </div>
        );
    }
}

export default App;
