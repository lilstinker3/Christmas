const names = ["Sam", "Paul", "Clare", "Dad", "Mom", "Evan"];
const forbiddenPairs = [
    ["Paul", "Sam"],
    ["Evan", "Clare"],
    ["Dad", "Mom"],
];
let previousPairs = JSON.parse(localStorage.getItem("previousPairs")) || [];

function isValidPair(pair, allPairs) {
    return (
        !forbiddenPairs.some(
            (forbidden) =>
                (pair[0] === forbidden[0] && pair[1] === forbidden[1]) ||
                (pair[0] === forbidden[1] && pair[1] === forbidden[0])
        ) &&
        !allPairs.some(
            (pastPair) =>
                (pair[0] === pastPair[0] && pair[1] === pastPair[1]) ||
                (pair[0] === pastPair[1] && pair[1] === pastPair[0])
        )
    );
}

function drawPairs() {
    const shuffledNames = [...names].sort(() => Math.random() - 0.5);
    const pairs = [];
    for (let i = 0; i < shuffledNames.length; i += 2) {
        const pair = [shuffledNames[i], shuffledNames[i + 1]];
        if (isValidPair(pair, [...pairs, ...previousPairs])) {
            pairs.push(pair);
        } else {
            // Restart if we can't form valid pairs
            return drawPairs();
        }
    }
    previousPairs = pairs;
    localStorage.setItem("previousPairs", JSON.stringify(previousPairs));
    return pairs;
}

document.getElementById("draw-button").addEventListener("click", () => {
    const pairs = drawPairs();
    const pairsDiv = document.getElementById("pairs");
    pairsDiv.innerHTML = pairs.map((pair) => `<p>${pair[0]} ➡️ ${pair[1]}</p>`).join("");
    document.getElementById("message").textContent = "Pairs drawn successfully!";
});
