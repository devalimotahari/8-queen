import { useState } from 'react';
import './App.css';
import Board from './components/Board.jsx';
import { solveWithGenetic, solveWithHillClimbing, solveWithLBS } from './utils/algorithms.js';

function App() {
    const [algorithm, setAlgorithm] = useState('');
    const [solution, setSolution] = useState([]);

    const handleSolve = () => {
        let result;
        switch (algorithm) {
            case 'LBS':
                result = solveWithLBS();
                break;
            case 'HillClimbing':
                result = solveWithHillClimbing();
                break;
            case 'Genetic':
                result = solveWithGenetic();
                break;
            default:
                alert('Please select an algorithm');
                return;
        }
        setSolution(result);
    };

    return (
        <div>
            <h1>8-Queen Problem Solver</h1>
            <div>
                <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                    <option value="">Select Algorithm</option>
                    <option value="LBS">Local Beam Search</option>
                    <option value="HillClimbing">Hill Climbing</option>
                    <option value="Genetic">Genetic Algorithm</option>
                </select>
                <button onClick={handleSolve}>Solve</button>
            </div>
            <Board solution={solution}/>
        </div>
    );
}

export default App
