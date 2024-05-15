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

    for (let i = 0; i < 8; i++) {
        for (let j = i + 1; j < 8; j++) {
            const newState = [...state];
            [newState[i], newState[j]] = [newState[j], newState[i]];
            successors.push(newState);
        }
    }

    return successors;
};

export const solveWithLBS = (beamWidth = 3) => {
    let beams = Array.from({ length: beamWidth }, () => {
        const state = Array.from({ length: 8 }, (_, i) => i);
        state.sort(() => Math.random() - 0.5);
        return state;
    });

    while (true) {
        const allSuccessors = beams.flatMap(getSuccessors);
        const sortedSuccessors = allSuccessors.sort((a, b) => calculateConflicts(a) - calculateConflicts(b));

        beams = sortedSuccessors.slice(0, beamWidth);

        if (calculateConflicts(beams[0]) === 0) {
            return beams[0];
        }
    }
};

export const solveWithHillClimbing = () => {
    let state = Array.from({ length: 8 }, (_, i) => i);
    state.sort(() => Math.random() - 0.5);
    let currentConflicts = calculateConflicts(state);

    while (currentConflicts !== 0) {
        let nextState = [...state];
        let nextConflicts = currentConflicts;

        for (let i = 0; i < 8; i++) {
            for (let j = i + 1; j < 8; j++) {
                const newState = [...state];
                [newState[i], newState[j]] = [newState[j], newState[i]];
                const newConflicts = calculateConflicts(newState);

                if (newConflicts < nextConflicts) {
                    nextState = newState;
                    nextConflicts = newConflicts;
                }
            }
        }

        if (nextConflicts >= currentConflicts) break;

        state = nextState;
        currentConflicts = nextConflicts;
    }

    return state;
};

export const solveWithGenetic = () => {
    const populationSize = 100;
    const mutationRate = 0.03;
    const maxGenerations = 1000;

    const generateIndividual = () => {
        let individual = Array.from({ length: 8 }, (_, i) => i);
        individual.sort(() => Math.random() - 0.5);
        return individual;
    };

    const crossover = (parent1, parent2) => {
        const crossoverPoint = getRandomInt(8);
        const child = parent1.slice(0, crossoverPoint).concat(parent2.slice(crossoverPoint));
        return child;
    };

    const mutate = (individual) => {
        if (Math.random() < mutationRate) {
            const [i, j] = [getRandomInt(8), getRandomInt(8)];
            [individual[i], individual[j]] = [individual[j], individual[i]];
        }
    };

    let population = Array.from({ length: populationSize }, generateIndividual);

    for (let generation = 0; generation < maxGenerations; generation++) {
        population.sort((a, b) => calculateConflicts(a) - calculateConflicts(b));

        if (calculateConflicts(population[0]) === 0) {
            return population[0];
        }

        const newPopulation = population.slice(0, populationSize / 2);

        for (let i = 0; i < populationSize / 2; i++) {
            const parent1 = newPopulation[getRandomInt(newPopulation.length)];
            const parent2 = newPopulation[getRandomInt(newPopulation.length)];
            const child = crossover(parent1, parent2);
            mutate(child);
            newPopulation.push(child);
        }

        population = newPopulation;
    }

    population.sort((a, b) => calculateConflicts(a) - calculateConflicts(b));
    return population[0];
};