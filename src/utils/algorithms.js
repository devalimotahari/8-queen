import { N_QUEEN_SIZE } from '../constants.js';

const getRandomInt = (max) => Math.floor(Math.random() * max);

const calculateConflicts = (state) => {
    let conflicts = 0;
    const n = state.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (state[i] === state[j] || state[i] - state[j] === i - j || state[j] - state[i] === i - j) {
                conflicts++;
            }
        }
    }

    return conflicts;
};

const getSuccessors = (state) => {
    const successors = [];

    for (let i = 0; i < N_QUEEN_SIZE; i++) {
        for (let j = i + 1; j < N_QUEEN_SIZE; j++) {
            const newState = [...state];
            [newState[i], newState[j]] = [newState[j], newState[i]];
            successors.push(newState);
        }
    }

    return successors;
};

export const solveWithLBS = (beamWidth = 5) => {
    let beams = Array.from({ length: beamWidth }, () => {
        const state = Array.from({ length: N_QUEEN_SIZE }, (_, i) => i);
        state.sort(() => Math.random() - 0.5);
        return state;
    });

    let counter = beamWidth;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const allSuccessors = beams.flatMap(getSuccessors);
        const sortedSuccessors = allSuccessors.sort((a, b) => calculateConflicts(a) - calculateConflicts(b));

        beams = sortedSuccessors.slice(0, beamWidth);

        counter += allSuccessors.length;

        if (calculateConflicts(beams[0]) === 0) {
            console.log({ counter });
            return beams[0];
        }
    }
};

const generateIndividual = () => {
    let individual = Array.from({ length: N_QUEEN_SIZE }, (_, i) => i);
    for (let i = individual.length - 1; i > 0; i--) {
        const j = getRandomInt(i + 1);
        [individual[i], individual[j]] = [individual[j], individual[i]];
    }
    return individual;
};

const crossover = (parent1, parent2) => {
    const crossoverPoint = getRandomInt(N_QUEEN_SIZE);
    const child = parent1.slice(0, crossoverPoint).concat(
        parent2.filter((gene) => !parent1.slice(0, crossoverPoint).includes(gene)),
    );
    return child;
};

const mutate = (individual, mutationRate) => {
    if (Math.random() < mutationRate) {
        const [i, j] = [getRandomInt(N_QUEEN_SIZE), getRandomInt(N_QUEEN_SIZE)];
        [individual[i], individual[j]] = [individual[j], individual[i]];
    }
};

export const solveWithGenetic = () => {
    const populationSize = 100;
    const mutationRate = 0.03;
    const maxGenerations = 1000;

    let counter = 1;

    let population = Array.from({ length: populationSize }, generateIndividual);

    for (let generation = 0; generation < maxGenerations; generation++) {
        population.sort((a, b) => calculateConflicts(a) - calculateConflicts(b));

        if (calculateConflicts(population[0]) === 0) {
            console.log({ counter });
            return population[0];
        }

        const newPopulation = population.slice(0, populationSize / 2);

        while (newPopulation.length < populationSize) {
            const parent1 = newPopulation[getRandomInt(newPopulation.length)];
            const parent2 = newPopulation[getRandomInt(newPopulation.length)];
            const child = crossover(parent1, parent2);
            mutate(child, mutationRate);
            newPopulation.push(child);
            counter += 1;
        }

        population = newPopulation;
    }

    population.sort((a, b) => calculateConflicts(a) - calculateConflicts(b));
    console.log({ counter });
    return population[0];
};

const isSafe = (board, row, col) => {
    // Check this column on upper side
    for (let i = 0; i < row; i++)
        if (board[i] === col)
            return false;

    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i] === j)
            return false;

    // Check upper diagonal on right side
    for (let i = row, j = col; i >= 0 && j < N_QUEEN_SIZE; i--, j++)
        if (board[i] === j)
            return false;

    return true;
};

const solveCSPUtil = (board, row) => {
    if (row >= N_QUEEN_SIZE) return true;

    for (let col = 0; col < N_QUEEN_SIZE; col++) {
        if (isSafe(board, row, col)) {
            board[row] = col;
            if (solveCSPUtil(board, row + 1)) return true;
            board[row] = -1; // Backtrack
        }
    }

    return false;
};

export const solveWithCSP = () => {
    const board = Array(N_QUEEN_SIZE).fill(-1);
    if (solveCSPUtil(board, 0)) return board;
    return null;
};