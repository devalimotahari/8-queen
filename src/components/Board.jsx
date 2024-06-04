import styled from '@emotion/styled';
import { N_QUEEN_SIZE } from '../constants.js';

const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${N_QUEEN_SIZE}, 50px);
    grid-template-rows: repeat(${N_QUEEN_SIZE}, 50px);
    gap: 2px;
`;

const Cell = styled.div`
    width: 50px;
    height: 50px;
    background-color: ${({ isQueen }) => (isQueen ? 'black' : 'white')};
    border: 1px solid black;
`;

const Board = ({ solution }) => {
    const createBoard = () => {
        let board = Array(N_QUEEN_SIZE).fill(0).map(() => Array(N_QUEEN_SIZE).fill(false));
        solution.forEach((col, row) => {
            board[row][col] = true;
        });
        return board;
    };

    const board = createBoard();

    return (
        <BoardContainer>
            {board.flat().map((isQueen, index) => (
                <Cell key={index} isQueen={isQueen}/>
            ))}
        </BoardContainer>
    );
};

export default Board;