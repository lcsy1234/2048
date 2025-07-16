
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
    return [randomIndexOne, randomIndextwo]
}
//随机生成数//
function randownGenerate() {
    const randomVal = [2, 4]
    let randomStart = randomVal[Math.floor(Math.random() * 2)]
    const squareNum = document.createElement('div')
    randomStart === 2 ? squareNum.className = 'square-num num-2' : squareNum.className = 'square-num num-4'
    randomStart === 2 ? squareNum.innerText = 2 : squareNum.innerText = 4
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
    map.set(gamingRandom[0], Number(firstRandomSquare.children[0].innerText))
}
//现在要完成的就是点击直接生成两个新的带有子节点的，这个时候需要定义一个全局的div数组索引
//封装九宫格的有值的索引
// function publicStartstore() {

// }
document.addEventListener('keydown', (event) => {
    // 获取按键信息
    const key = event.key; // 按键名称（如 "ArrowUp", "a", "Enter"）
    const beforeNums = []//全局的索引值待会儿可以一封装成全局获取索引的一个函数
    const beforeMap = new Map()
    const afterMap = new Map()
    const afterMoveNums = [];
    let isAgrrate = false

    for (let i = 0; i < 16; i++) {
        if (squareParent.children[i].hasChildNodes()) {
            const val = Number(squareParent.children[i].children[0].innerText)
            beforeNums.push(i)
            beforeMap.set(i, val)//将有值的索引存起来，存他的值应该
            afterMap.set(i, val);
        }
    }
    const beforeNumsLen = beforeNums.length
    let moveCount = 3
    // const mapArr = Array.from(beforeMap)//
    //现在我要处理的是将每次移动位置都将这个值更改，
    switch (key) {
        case 'ArrowUp':
            console.log('按下上方向键');
            if (afterMap.has(keyRecord)) {
                afterMap.delete(keyRecord)
            }
            for (let i = 0; i < beforeNumsLen; i++) {
                moveCount = 3;
                // debugger
                let tempIndex = beforeNums[i]; // 移动的临时坐标
                while (moveCount > 0) {
                    tempIndex = tempIndex - 4;
                    if (afterMap.has(tempIndex) || tempIndex < 0) {
                        //下一个位置的值等与当前位置的值
                        if (afterMap.get(tempIndex) === afterMap.get(beforeNums[i])) {
                            //beforeVal要变成2倍
                            isAgrrate = true
                            moveCount--
                        }
                        break;
                    }
                    moveCount--;
                }
                const finalIndex = beforeNums[i] - ((3 - moveCount) * 4); // 最终坐标
                // // //获取原始值
                // const startVal = Number(beforeMap.get(beforeNums[i]))
                // const beforeVal = isAgrrate ? 2 * startVal : startVal
                // // 删除之前的位置，因为已经不需要之前的位置了
                // afterMap.delete(beforeNums[i]);
                // // 记录最终坐标以及值
                // afterMap.set(finalIndex, beforeVal);
                // //可以去重也可以根据isAgrrate来判断,不重复push重复的位置
                // isAgrrate ? isAgrrate = false : afterMoveNums.push(finalIndex)
                // console.log("%c Line:127 🍩 beforeMap", "color:#33a5ff", beforeMap);
                publicChangeFunc(finalIndex, beforeNums[i])
                afterMap.set(keyRecord, 'arrow-up')
            }
            break;
        case 'ArrowDown':
            console.log('按下下方向键');
            if (afterMap.has(keyRecord)) {
                afterMap.delete(keyRecord)
            }
            beforeNums.sort((a, b) => b - a)
            for (let i = 0; i < beforeNumsLen; i++) {
                moveCount = 3
                let tempIndex = beforeNums[i]

                while (moveCount > 0) {
                    tempIndex = tempIndex + 4//直接记录了当前的位置
                    if (afterMap.has(tempIndex) || tempIndex >= 16) {
                        if (afterMap.get(tempIndex) === afterMap.get(beforeNums[i])) {
                            isAgrrate = true
                            moveCount--
                        }
                        break
                    }
                    moveCount--
                }
                //整理出函数，输入参数，beforeNums[i] moveCount，isAgrrate

                const finalIndex = beforeNums[i] + (3 - moveCount) * 4
                publicChangeFunc(finalIndex, beforeNums[i])
                afterMap.set(keyRecord, 'arrow-down')
            }
            break;
        case 'ArrowLeft':
            console.log('按下左方向键');
            if (afterMap.has(keyRecord)) {
                afterMap.delete(keyRecord)
            }
            for (let i = 0; i < beforeNumsLen; i++) {
                moveCount = 3;
                let tempIndex = beforeNums[i]; // 移动的临时坐标
                let leftCase = Math.floor(beforeNums[i] / 4) * 4
                //上移遇到值就直接跳出，如果合并就不能跳出，
                while (moveCount > 0) {
                    tempIndex = tempIndex - 1;
                    if (afterMap.has(tempIndex) || tempIndex < leftCase) {
                        if (afterMap.get(tempIndex) === afterMap.get(beforeNums[i])) {
                            isAgrrate = true
                            moveCount--
                        }
                        break;
                    }
                    moveCount--;
                }
                const finalIndex = beforeNums[i] - ((3 - moveCount)); // 最终坐标
                // const beforeVal = beforeMap.get(beforeNums[i]);
                publicChangeFunc(finalIndex, beforeNums[i])
                afterMap.set(keyRecord, 'arrow-left')

            }
            break;
        case 'ArrowRight':
            beforeNums.sort((a, b) => b - a)
            if (afterMap.has(keyRecord)) {
                afterMap.delete(keyRecord)
            }
            for (let i = 0; i < beforeNumsLen; i++) {
                moveCount = 3
                let tempIndex = beforeNums[i]
                let rightCase = Math.floor(beforeNums[i] / 4) * 4 + 3 //3 7

                while (moveCount > 0) {
                    tempIndex = tempIndex + 1//直接记录了当前的位置
                    if (afterMap.has(tempIndex) || tempIndex > rightCase) {
                        if (afterMap.get(tempIndex) === afterMap.get(beforeNums[i])) {
                            isAgrrate = true
                            moveCount--
                        }
                        break
                    }
                    moveCount--
                }
                const finalIndex = beforeNums[i] + (3 - moveCount)
                publicChangeFunc(finalIndex, beforeNums[i])
                afterMap.set(keyRecord, 'arrow-right')
            }
            break;
    }
    //将所有有值的节点移除
    for (let i = 0; i < 16; i++) {
        squareParent.children[i]?.children?.[0]?.remove()
    }
    //将最终的数组的值遍历添加有值的节点
    console.log("%c Line:220 🍎 afterMap", "color:#e41a6a", afterMap);
    console.log("%c Line:220 🍎 beforeMap", "color:#e41a6a", beforeMap);
    console.log("%c Line:220 🍎 beforeNums", "color:#e41a6a", beforeNums);
    console.log("%c Line:220 🍎 afterMoveNums", "color:#e41a6a", afterMoveNums);
    afterMoveNums.forEach((key) => {
        const newNumDom = document.createElement('div')
        const val = afterMap.get(key)
        newNumDom.className = `square-num ${numberColorMap[val]} `
        newNumDom.innerText = val
        squareParent.children[key].appendChild(newNumDom)
    })
    moveAddRandom(afterMoveNums, afterMap)//向空的宫格里添加新的div
    //处理after后的map和num数组
    function publicChangeFunc(finalIndex, position) {
        const startVal = Number(beforeMap.get(position))
        const beforeVal = isAgrrate ? 2 * startVal : startVal
        if (!isAgrrate) {
            afterMoveNums.push(finalIndex);
        }
        isAgrrate = false
        afterMap.delete(position)
        afterMap.set(finalIndex, beforeVal)
    }
});








