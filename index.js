
const numberColorMap = {
    2: 'num-2',
    4: 'num-4',
    8: 'num-8',
    16: 'num-16',
    32: 'num-32',
    64: 'num-64',
    128: 'num-128',
    256: 'num-256'
};
const squareParent = document.getElementById('parent')
const gameStart = document.getElementById("gameStart")
// 点击事件
let clickCount = 0
gameStart.addEventListener('click', () => {
    clickCount++
    console.log('dayin')
    if (clickCount > 1) {
        for (let i = 0; i < 16; i++) {
            squareParent.children[i].innerHTML = ''
        }
    }
    const newBoardIndex = [...new Array(16)].map((item, index) => index)
    const newGameRandom = randomTwoIndexArr(16, newBoardIndex)//初始的随机index
    squareParent.children[newGameRandom[0]].appendChild(randownGenerate())
    squareParent.children[newGameRandom[1]].appendChild(randownGenerate())
})
// 随机生成两个不重复的索引
function randomTwoIndexArr(n, arr) {
    console.log('随机索引')
    const randomIndexOne = arr[Math.floor(Math.random() * n)]//他是随机生成数组的一个元素，第二个要包含不相同的元素就行
    const randomTwoIndex = Math.floor(Math.random() * (n - 1))//他是第二个随机生成的索引的下标的随机数0，1，2
    const ArrIndexTwo = []//
    for (let i = 0; i < n; i++) {
        if (arr[i] !== randomIndexOne) {
            ArrIndexTwo.push(arr[i])
        }
    }
    const randomIndextwo = ArrIndexTwo[randomTwoIndex]
    console.log(randomIndexOne)
    console.log([randomIndexOne, randomIndextwo])
    return [randomIndexOne, randomIndextwo]
}
//随机生成数
function randownGenerate() {
    const randomVal = [2, 4]
    let randomStart = randomVal[Math.floor(Math.random() * 2)]
    const squareNum = document.createElement('div')
    randomStart === 2 ? squareNum.className = 'square-num num-2' : squareNum.className = 'square-num num-4'
    randomStart === 2 ? squareNum.innerText = 2 : squareNum.innerText = 4
    console.log("%c Line:48 🍕 squareNum", "color:#93c0a4", squareNum);
    return squareNum
}
//得到宫格中的空值
//移动要完成两个功能，首先要移动之后看空格中的数字，逻辑（
//移动数字，
// function moveClick() {

//     const gameingArr = []
//     for (let i = 0; i < 16; i++) {
//         const child = squareParent.children[i]
//         if (child === null || child === undefined) {
//             gameingArr.push(i)
//         }
//     }
//     const gamingRandom = randomTwoIndexArr(gameingArr.length, gameingArr)
//     //问题是randomStartTwo这个能够再一次执行随机数吗
//     squareParent.children[gamingRandom[0]].appendChild(randownGenerate())
//     squareParent.children[gamingRandom[1]].appendChild(randownGenerate())
// }
document.addEventListener('keydown', (event) => {
    // 获取按键信息
    const key = event.key; // 按键名称（如 "ArrowUp", "a", "Enter"）
    //   const code = event.code; // 按键代码（如 "ArrowUp", "KeyA", "Enter"）
    // const squareHaveNum = document.querySelectorAll('.square-num')
    const squareHaveNum = []
    const squareHaveMap = new Map()
    for (let i = 0; i < 16; i++) {
        if (squareParent.children[i].hasChildNodes()) {
            squareHaveNum.push(i)
            squareHaveMap.set(i, 1)
        }
    }
    let moveCount = 3
    const afterMoveArr = []
    switch (key) {
        case 'ArrowUp':
            console.log('按下上方向键');
            for (let i = 0; i < squareHaveNum.length; i++) {
                moveCount=3
                while (moveCount--) {
                    if (squareHaveMap.has(squareHaveNum[i]-4) || squareHaveNum[i] <= 3 ) {
                       
                        break
                    }
                    console.log("%c Line:99 🥓 squareHaveNum[i]- 4", "color:#3f7cff", squareHaveNum[i]- 4);
                }
                    const finalIndex=squareHaveNum[i]- (3-moveCount)*4
                    afterMoveArr.push(finalIndex)

            }
            break;
        case 'ArrowDown':
            console.log('按下下方向键');
            for (let i = 0; i < squareHaveNum.length; i++) {
                moveCount=3
                while (moveCount--) {
                    if (squareHaveMap.has(squareHaveNum[i] + 4) || squareHaveNum[i] >= 12) {
                        afterMoveArr.push(squareHaveNum[i])
                         break
                    }
                    afterMoveArr.push(squareHaveNum[i] + 4)
                }
            }
            break;
        case 'ArrowLeft':
            console.log('按下左方向键');
            for (let i = 0; i < squareHaveNum.length; i++) {
                moveCount=3
                while (moveCount--) {
                    if (squareHaveMap.has(squareHaveNum[i] - 1) || squareHaveNum[i] % 4 === 0) {
                        afterMoveArr.push(squareHaveNum[i])
                        break
                    }
                    afterMoveArr.push(squareHaveNum[i] - 1)
                }
            }

            break;
        case 'ArrowRight':
            for (let i = 0; i < squareHaveNum.length; i++) {
                moveCount=3
                while (moveCount--) {
                    if (squareHaveMap.has(squareHaveNum[i] + 1) || squareHaveNum[i] % 4 === 3 || squareHaveNum[i] === 0) {
                        afterMoveArr.push(squareHaveNum[i])
                        break
                }
                   afterMoveArr.push(squareHaveNum[i] + 1)
            }
            break;
    }
}
    console.log("%c Line:133 🍡 最中的squareHaveNum", "color:#93c0a4", squareHaveNum);
    console.log("%c Line:134 🥪 afterMoveArr", "color:#4fff4B", afterMoveArr);


});






