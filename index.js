
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
    const beforeNums = []//全局的索引值待会儿可以一封装成全局获取索引的一个函数
    const beforeMap = new Map()
    const afterMap = new Map()

    for (let i = 0; i < 16; i++) {
        if (squareParent.children[i].hasChildNodes()) {
            const val = squareParent.children[i].children[0].innerText
            console.log("%c Line:82 🍣 val", "color:#4fff4B", val);
            beforeNums.push(i)
            beforeMap.set(i, val)//将有值的索引存起来，存他的值应该
            afterMap.set(i, val);
        }
    }

    console.log("%c Line:77 🍑 beforeNums", "color:#ed9ec7", beforeNums);
    console.log("%c Line:79 🍕 beforeMap", "color:#93c0a4", beforeMap);
    let moveCount = 3
    const afterMoveNums = [];
    // const mapArr = Array.from(beforeMap)//
    //现在我要处理的是将每次移动位置都将这个值更改，
    console.log("%c Line:107 🌰 key", "color:#465975", key);
    switch (key) {

        case 'ArrowUp':
            console.log('按下上方向键');
            for (let i = 0; i < beforeNums.length; i++) {
                moveCount = 3;
                let tempIndex = beforeNums[i]; // 移动的临时坐标
                while (moveCount > 0) {
                    tempIndex = tempIndex - 4;
                    if (afterMap.has(tempIndex) || tempIndex < 0) {
                        break;
                    }
                    moveCount--;
                }
                const finalIndex = beforeNums[i] - ((3 - moveCount) * 4); // 最终坐标
                const beforeVal = beforeMap.get(beforeNums[i]);
                afterMap.delete(beforeNums[i]); // 删除之前的坐标
                afterMap.set(finalIndex, beforeVal); // 记录最终坐标
                afterMoveNums.push(finalIndex);
            }
            break;
        case 'ArrowDown':
            console.log('按下下方向键');
            for (let i = 0; i < beforeNums.length; i++) {
                beforeNums.sort((a, b) => b - a)
                moveCount = 3 - Math.floor(beforeNums[i] / 4)//
                //  debugger
                while (moveCount > 0) {
                    const mapArr = Array.from(beforeMap)//
                    mapArr.sort((a, b) => b[0] - a[0])
                    const nextSquareIndex = mapArr[i][0] + 4//下个位置的索引 假如是
                    if (beforeMap.has(nextSquareIndex) || beforeNums[i] >= 12) {
                        afterMoveNums.push(beforeNums[i])
                        break
                    }
                    mapArr[i] = [nextSquareIndex, beforeMap.get(beforeNums[i])]
                    beforeMap.clear();
                    mapArr.forEach(([key, value]) => {
                        beforeMap.set(key, value);
                    });
                    moveCount--
                }
                const finalIndex = beforeNums[i] + (3 - Math.floor(beforeNums[i] / 4) - moveCount) * 4
                afterMoveNums.push(finalIndex)
            }
            break;
        case 'ArrowLeft':
            console.log('按下左方向键');
            for (let i = 0; i < beforeNums.length; i++) {
                beforeNums.sort((a, b) => a - b)
                moveCount = beforeNums[i] % 4
                while (moveCount > 0) {
                    const mapArr = Array.from(beforeMap)//
                    mapArr.sort((a, b) => a[0] - b[0])
                    const nextSquareIndex = mapArr[i][0] - 1
                    if (beforeMap.has(nextSquareIndex) || beforeNums[i] % 4 === 0) {
                        afterMoveNums.push(beforeNums[i])
                        break
                    }
                    mapArr[i] = [nextSquareIndex, beforeMap.get(beforeNums[i])]
                    beforeMap.clear();
                    mapArr.forEach(([key, value]) => {
                        beforeMap.set(key, value);
                    });
                    moveCount--
                }
                const finalIndex = beforeNums[i] - (beforeNums[i] % 4 - moveCount) * 1
                afterMoveNums.push(finalIndex)

            }

            break;
        case 'ArrowRight':
            for (let i = 0; i < beforeNums.length; i++) {
                beforeNums.sort((a, b) => b - a)//解决谁先移动的问题
                moveCount = 3 - (beforeNums[i] % 4)//向右可移动的最大次数
                while (moveCount > 0) {
                    const mapArr = Array.from(beforeMap)//
                    mapArr.sort((a, b) => b[0] - a[0])
                    const nextSquareIndex = mapArr[i][0] + 1
                    if (beforeMap.has(nextSquareIndex) || beforeNums[i] % 4 === 3) {
                        afterMoveNums.push(beforeNums[i])
                        break
                    }
                    mapArr[i] = [nextSquareIndex, beforeMap.get(beforeNums[i])]
                    beforeMap.clear();
                    mapArr.forEach(([key, value]) => {
                        beforeMap.set(key, value);
                    });
                    moveCount--
                }
                const finalIndex = beforeNums[i] + (3 - (beforeNums[i] % 4) - moveCount) * 1
                afterMoveNums.push(finalIndex)
            }
            break;

    }
    for (let i = 0; i < 16; i++) {
        squareParent.children[i]?.children?.[0]?.remove()
    }

    afterMoveNums.forEach((key)=>{ 
        const newNumDom=document.createElement('div')
        const val=afterMap.get(key)
        newNumDom.className=`square-num ${numberColorMap[val]}`
        newNumDom.innerText=val
        squareParent.children[key].appendChild(newNumDom)})
    moveAddRandom(afterMoveNums, beforeMap)//向空的宫格里添加新的div
    console.log("%c Line:212 🍖 beforeMap", "color:#f5ce50", beforeMap);
    console.log("%c Line:133 🍡 beforeNums", "color:#93c0a4", beforeNums);
    console.log("%c Line:134 🥪 afterMoveNums", "color:#4fff4B", afterMoveNums);
});






