
const numberColorMap = {
    2: 'num-2',
    4: 'num-4',
    8: 'num-8',
    16: 'num-16',
    32: 'num-32',
    64: 'num-64',
    128: 'num-128',
    256: 'num-256',
    512: 'num-512',
    1024: 'num-1024',
    2048: 'num-2048'
};
// const enumValue=[2,]
// const enumColor=[
//   '#eee4da', '#ede0c8', '#f2b179', '#f59563', 
//   '#f67c5f', '#f65e3b', '#edcf72', '#edcc61', 
//   '#edc850', '#edc53f', '#edc22e'
// ]
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
//随机生成数//
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
function moveAddRandom(arr, map) {
    const gamingMove = []
    for (let i = 0; i < 16; i++) {
        const child = squareParent.children[i]
        if (!child.hasChildNodes()) {
            gamingMove.push(i)
        }
    }
    const gamingRandom = randomTwoIndexArr(gamingMove.length, gamingMove)
    const firstRandomSquare = squareParent.children[gamingRandom[0]]
    firstRandomSquare.appendChild(randownGenerate())
    arr.push(gamingRandom[0])
    map.set(gamingRandom[0], firstRandomSquare.children[0].innerText)
}
//现在要完成的就是点击直接生成两个新的带有子节点的，这个时候需要定义一个全局的div数组索引
//
document.addEventListener('keydown', (event) => {
    // 获取按键信息
    const key = event.key; // 按键名称（如 "ArrowUp", "a", "Enter"）
    const squareHaveNum = []//全局的索引值待会儿可以一封装成全局获取索引的一个函数
    const squareHaveMap = new Map()

    for (let i = 0; i < 16; i++) {
        if (squareParent.children[i].hasChildNodes()) {
            const val = squareParent.children[i].children[0].innerText
            console.log("%c Line:82 🍣 val", "color:#4fff4B", val);
            squareHaveNum.push(i)
            squareHaveMap.set(i, val)//将有值的索引存起来，存他的值应该
        }
    }

    console.log("%c Line:77 🍑 squareHaveNum", "color:#ed9ec7", squareHaveNum);
    console.log("%c Line:79 🍕 squareHaveMap", "color:#93c0a4", squareHaveMap);
    let moveCount = 3
    const afterMoveArr = []
    // const mapArr = Array.from(squareHaveMap)//
    //现在我要处理的是将每次移动位置都将这个值更改，
    switch (key) {
        case 'ArrowUp':
            console.log('按下上方向键');
            for (let i = 0; i < squareHaveNum.length; i++) {
                squareHaveNum.sort((a, b) => a - b)
                moveCount = Math.floor(squareHaveNum[i] / 4)//2 3
                // debugger
                while (moveCount > 0) {
                    const mapArr = Array.from(squareHaveMap)//
                    console.log("%c Line:113 🥤 mapArr", "color:#2eafb0", mapArr);
                    mapArr.sort((a, b) => a[0] - b[0])
                    const nextSquareIndex = mapArr[i][0] - 4//只判断了当前值的下一个，我要判断的是每次的下一个
                    if (squareHaveMap.has(nextSquareIndex) || squareHaveNum[i] <= 3) {
                        break
                    }
                    mapArr[i] = [nextSquareIndex, squareHaveMap.get(squareHaveNum[i])]//
                    squareHaveMap.clear();
                    mapArr.forEach(([key, value]) => {
                        squareHaveMap.set(key, value);
                    });
                    // squareHaveMap.set(nextSquareIndex, squareHaveMap.get(squareHaveNum[i]))//将这个位置的下一个位置放进map,他是最后一个进去的所以第一个，栈，先进后出，很重要
                    // squareHaveMap.delete(mapArr[i])//删除当前的索引的位置,这一段代码错了，
                    moveCount--
                }
                const finalIndex = squareHaveNum[i] - (Math.floor(squareHaveNum[i] / 4) - moveCount) * 4
                afterMoveArr.push(finalIndex)
            }
            break;
        case 'ArrowDown':
            console.log('按下下方向键');
            for (let i = 0; i < squareHaveNum.length; i++) {
                squareHaveNum.sort((a, b) => b - a)
                moveCount = 3 - Math.floor(squareHaveNum[i] / 4)//
                //  debugger
                while (moveCount > 0) {
                    const mapArr = Array.from(squareHaveMap)//
                    mapArr.sort((a, b) => b[0] - a[0])
                    const nextSquareIndex = mapArr[i][0] + 4//下个位置的索引 假如是
                    if (squareHaveMap.has(nextSquareIndex) || squareHaveNum[i] >= 12) {
                        afterMoveArr.push(squareHaveNum[i])
                        break
                    }
                    mapArr[i] = [nextSquareIndex, squareHaveMap.get(squareHaveNum[i])]
                    squareHaveMap.clear();
                    mapArr.forEach(([key, value]) => {
                        squareHaveMap.set(key, value);
                    });
                    moveCount--
                }
                const finalIndex = squareHaveNum[i] + (3 - Math.floor(squareHaveNum[i] / 4) - moveCount) * 4
                afterMoveArr.push(finalIndex)
            }
            break;
        case 'ArrowLeft':
            console.log('按下左方向键');
            for (let i = 0; i < squareHaveNum.length; i++) {
                squareHaveNum.sort((a, b) => a - b)
                moveCount = squareHaveNum[i] % 4
                while (moveCount > 0) {
                    const mapArr = Array.from(squareHaveMap)//
                    mapArr.sort((a, b) => a[0] - b[0])
                    const nextSquareIndex = mapArr[i][0] - 1
                    if (squareHaveMap.has(nextSquareIndex) || squareHaveNum[i] % 4 === 0) {
                        afterMoveArr.push(squareHaveNum[i])
                        break
                    }
                    mapArr[i] = [nextSquareIndex, squareHaveMap.get(squareHaveNum[i])]
                    squareHaveMap.clear();
                    mapArr.forEach(([key, value]) => {
                        squareHaveMap.set(key, value);
                    });
                    moveCount--
                }
                const finalIndex = squareHaveNum[i] - (squareHaveNum[i] % 4 - moveCount) * 1
                afterMoveArr.push(finalIndex)

            }

            break;
        case 'ArrowRight':
            for (let i = 0; i < squareHaveNum.length; i++) {
                squareHaveNum.sort((a, b) => b - a)//解决谁先移动的问题
                moveCount = 3 - (squareHaveNum[i] % 4)//向右可移动的最大次数
                while (moveCount > 0) {
                    const mapArr = Array.from(squareHaveMap)//
                    mapArr.sort((a, b) => b[0] - a[0])
                    const nextSquareIndex = mapArr[i][0] + 1
                    if (squareHaveMap.has(nextSquareIndex) || squareHaveNum[i] % 4 === 3) {
                        afterMoveArr.push(squareHaveNum[i])
                        break
                    }
                    mapArr[i] = [nextSquareIndex, squareHaveMap.get(squareHaveNum[i])]
                    squareHaveMap.clear();
                    mapArr.forEach(([key, value]) => {
                        squareHaveMap.set(key, value);
                    });
                    moveCount--
                }
                const finalIndex = squareHaveNum[i] + (3 - (squareHaveNum[i] % 4) - moveCount) * 1
                afterMoveArr.push(finalIndex)
            }
            break;

    }
    // for(let i=0;i<16;i++){
    //     squareParent.children[i].children[0].innerText=''
    // }
    // afterMoveArr.forEach((key,index)=>{ squareParent.children[index].children[0].appendChild()})
    moveAddRandom(afterMoveArr, squareHaveMap)//向空的宫格里添加新的div
    console.log("%c Line:212 🍖 squareHaveMap", "color:#f5ce50", squareHaveMap);
    console.log("%c Line:133 🍡 最中的squareHaveNum", "color:#93c0a4", squareHaveNum);
    console.log("%c Line:134 🥪 afterMoveArr", "color:#4fff4B", afterMoveArr);
});






