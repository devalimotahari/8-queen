import styled from '@emotion/styled';

const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 50px);
    grid-template-rows: repeat(8, 50px);
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
        let board = Array(8).fill(0).map(() => Array(8).fill(false));
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