type Score = (frames: string[]) => number;

export const score: Score = (frames) => {
    let total = 0;
    let rollIndex = 0;
    const rolls: number[] = [];

    // Convertir todas las tiradas a números
    for (const frame of frames) {
        if (frame === 'X') {
            rolls.push(10)
        } else if (frame.includes('/')) {
            const first = parseInt(frame[0]) || 0
            rolls.push(first)
            rolls.push(10 - first)
        } else {
            const first = parseInt(frame[0]) || 0
            const second = parseInt(frame[1]) || 0
            rolls.push(first)
            rolls.push(second)
        }
        console.log(rolls)
    }

   
    if (frames.length > 10) {
        const extraFrames = frames.slice(10)
        for (const frame of extraFrames) {
            if (frame === 'X') {
                rolls.push(10)
            } else if (frame.includes('/')) {
                const first = parseInt(frame[0]) || 0
                rolls.push(first)
                rolls.push(10 - first)
            } else {
                rolls.push(parseInt(frame[0]) || 0)
                if (frame.length > 1) {
                    rolls.push(parseInt(frame[1]) || 0)
                }
            }
        }
    }

    // Calcular la puntuación frame por frame
    for (let frame = 0; frame < 10; frame++) {
        const firstRoll = rolls[rollIndex]
        
        if (firstRoll === 10) { 
            // Sumamos 10 + las siguientes 2 tiradas
            total += 10 + (rolls[rollIndex + 1] || 0) + (rolls[rollIndex + 2] || 0)
            rollIndex += 1
        } else {
            const secondRoll = rolls[rollIndex + 1] || 0
            
            if (firstRoll + secondRoll === 10) { 
                total += 10 + (rolls[rollIndex + 2] || 0)
            } else { 
                total += firstRoll + secondRoll
            }
            rollIndex += 2
        }
    }

    return total
};


console.log(score(["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]))
console.log(score(["9/", "9/", "9/", "9/", "9/", "9/", "9/", "9/", "9/", "9/", "9"]))
console.log(score(["45", "54", "36", "27", "09", "63", "81", "18", "90", "72"]))