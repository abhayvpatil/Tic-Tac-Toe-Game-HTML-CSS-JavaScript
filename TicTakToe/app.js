let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let ResetBtn = document.querySelector(".reset-Btn");
let newGameBtn = document.querySelector("#new-btn")
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let turnO = true;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
};

ResetBtn.classList.remove("Hide");

const showWinner = (winner) => {
    msg.innerText = ` Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    ResetBtn.classList.add("Hide");
};

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") {
            return;
        }
        box.innerText = turnO ? "X" : "O";
        turnO = !turnO;
        checkWinner();
        if (checkWinner()){
             return;
        }

        if (checkDraw()) {
            showDraw();
        }
    });
});

resetGame = () => {
    turnO = true;
    msgContainer.classList.add("hide");
    enableBoxes();
    ResetBtn.classList.remove("Hide");
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

function checkDraw() {
    return [...boxes].every(box => box.innerText !== "");
}

function showDraw() {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
    ResetBtn.classList.add("Hide");
}
