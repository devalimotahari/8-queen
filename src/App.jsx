import { useState } from 'react';
import './App.css';
import Board from './components/Board.jsx';
import { solveWithCSP, solveWithGenetic, solveWithLBS } from './utils/algorithms.js';

function App() {
    const [algorithm, setAlgorithm] = useState('');
    const [solution, setSolution] = useState([]);

    const handleSolve = () => {
        let result;
        switch (algorithm) {
            case 'LBS':
                result = solveWithLBS();
                console.log({ result });
                break;
            case 'CSP':
                result = solveWithCSP();
                console.log({ result });
                break;
            case 'Genetic':
                result = solveWithGenetic();
                console.log({ result });
                break;
            default:
                alert('Please select an algorithm');
                return;
        }
        setSolution(result);
    };

    return (
        <div>
            <div>
                <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                    <option value="">Select Algorithm</option>
                    <option value="LBS">Local Beam Search</option>
                    <option value="CSP">Constraint Satisfaction Problem</option>
                    <option value="Genetic">Genetic Algorithm</option>
                </select>
                <button onClick={handleSolve}>Solve</button>
            </div>
            <Board solution={solution}/>
        </div>
    );
}

export default App;
