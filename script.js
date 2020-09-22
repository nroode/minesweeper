document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10;
    let squares = [];
    let bombAmount = 20;

    function createBoard() {
        //get shuffled game array with placed bombs
        const bombsArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(width*width - bombAmount).fill('valid');
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(()=> Math.random() - 0.5);

        for(let i = 0; i < width*width; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square);

            //normal click
            square.addEventListener('click', function(e) {
                click(square);
            })
        }

        for(let i = 0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width - 1);

            if (squares[i].classList.contains('valid')) { 
                //check bomb to left
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;
                //check bomb to the right 
                if (i > 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++;

                //check bomb to northeast
                if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++;
                //check bomb above; no need to check edges
                if (i > 10 && squares[i - width].classList.contains('bomb')) total++;
                //check bomb northwest
                if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++;
                
                //check bomb to southwest
                if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++;
                //check bomb to south
                if (i < 89 && !isRightEdge && squares[i + width].classList.contains('bomb')) total++;
                //check bomb to southeast
                if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++;

                squares[i].setAttribute('data', total);
                console.log(squares[i]);

            }
        }
    }
    createBoard();

})

function click(square){
    if (square.classList.contains('bomb')){
        console.log('game over')
    } else {
        let total = square.getAttribute('data');
        if (total !== 0) {
            square.classList.add('checked');
            square.innerHTML = total;
        }
    }
}