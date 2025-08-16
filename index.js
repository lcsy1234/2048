import {trackVisit } from './utils/rank.js'
const numberColorMap = {
  2: "num-2",
  4: "num-4",
  8: "num-8",
  16: "num-16",
  32: "num-32",
  64: "num-64",
  128: "num-128",
  256: "num-256",
  512: "num-512",
  1024: "num-1024",
  2048: "num-2048",
};
//节流
let lastKeyTime = 0;
const score = document.querySelector(".score");
const historyBest = document.getElementById("max-history");
//统计当前得分
let curSum = 0;
let maxInHistory = 0;
const squareParent = document.getElementById("parent");
const squareArr = Array.from(document.querySelectorAll(".square"));
const gameStart = document.getElementById("gameStart");
// 点击事件
let clickCount = 0;
gameStart.addEventListener("click", () => {
  //历史最好
  if (curSum > maxInHistory) {
    historyBest.textContent = curSum;
  }
  curSum = 0;
  score.textContent = curSum;
  clickCount++;
  if (clickCount > 1) {
    for (let i = 0; i < 16; i++) {
      squareParent.children[i].innerHTML = "";
    }
  }
  const newBoardIndex = [...new Array(16)].map((item, index) => index);
  const newGameRandom = randomTwoIndexArr(16, newBoardIndex); //初始的随机index
  squareParent.children[newGameRandom[0]].appendChild(randownGenerate());
  squareParent.children[newGameRandom[1]].appendChild(randownGenerate());
});
// 随机生成两个不重复的索引
function randomTwoIndexArr(n, arr) {
  const randomIndexOne = arr[Math.floor(Math.random() * n)]; //他是随机生成数组的一个元素，第二个要包含不相同的元素就行
  const randomTwoIndex = Math.floor(Math.random() * (n - 1)); //他是第二个随机生成的索引的下标的随机数0，1，2
  const ArrIndexTwo = []; //
  for (let i = 0; i < n; i++) {
    if (arr[i] !== randomIndexOne) {
      ArrIndexTwo.push(arr[i]);
    }
  }
  const randomIndextwo = ArrIndexTwo[randomTwoIndex];
  return [randomIndexOne, randomIndextwo];
}
//随机生成数//
function randownGenerate() {
  const randomVal = [2, 4];
  let randomStart = randomVal[Math.floor(Math.random() * 2)];
  const squareNum = document.createElement("div");
  randomStart === 2
    ? (squareNum.className = "square-num num-2 random-num")
    : (squareNum.className = "square-num num-4 random-num");
  randomStart === 2 ? (squareNum.innerText = 2) : (squareNum.innerText = 4);
  return squareNum;
}

function moveAddRandom(arr, map) {
  const gamingMove = [];
  for (let i = 0; i < 16; i++) {
    const child = squareParent.children[i];
    if (!child.hasChildNodes()) {
      gamingMove.push(i);
    }
  }
  const gamingRandom = randomTwoIndexArr(gamingMove.length, gamingMove);
  const firstRandomSquare = squareParent.children[gamingRandom[0]];
  firstRandomSquare.appendChild(randownGenerate());
  arr.push(gamingRandom[0]);
  map.set(gamingRandom[0], Number(firstRandomSquare.children[0].innerText));
}
const THROTTLE_DELAY = 310; // 限制300ms内只执行一次
document.addEventListener("keydown", (event) => {
  //节流函数
  const now = Date.now();
  if (now - lastKeyTime < THROTTLE_DELAY) {
    return;
  }
  lastKeyTime = now;
  // 获取按键信息
  const key = event.key; // 按键名称（如 "ArrowUp", "a", "Enter"）
  const beforeNums = []; //全局的索引值待会儿可以一封装成全局获取索引的一个函数
  const beforeMap = new Map();
  const afterMap = new Map();
  let afterMoveNums = [];
  let moveCount = 3;
  let isAgrrate = false;
  //每次下一个按键都要获取
  for (let i = 0; i < 16; i++) {
    if (squareParent.children[i].hasChildNodes()) {
      const val = Number(squareParent.children[i].children[0].innerText);
      beforeNums.push(i);
      beforeMap.set(i, val); //将有值的索引存起来，存他的值应该
      afterMap.set(i, val);
    }
  }
  //这个beforeNums
  const beforeNumsLen = beforeNums.length;
  if (afterMap.has("keyRecord")) {
    afterMap.delete("keyRecord");
  }
  const moveConfig = {
    ArrowDown: {
      checkBoundary: (index) => index >= 16,
    },
    ArrowUp: {
      checkBoundary: (index) => index < 0,
    },
  };
  //获取点击的键
  switch (key) {
    case "ArrowUp":
      console.log("按下上方向键");
      publicMoveFunc(-4, "ArrowUp");
      break;
    case "ArrowDown":
      console.log("按下下方向键");
      beforeNums.sort((a, b) => b - a);
      publicMoveFunc(4, "ArrowDown");
      break;
    case "ArrowLeft":
      console.log("按下左方向键");
      for (let i = 0; i < beforeNumsLen; i++) {
        moveCount = 3;
        let tempIndex = beforeNums[i]; // 移动的临时坐标
        let leftCase = Math.floor(beforeNums[i] / 4) * 4;
        //上移遇到值就直接跳出，如果合并就不能跳出，
        while (moveCount > 0) {
          tempIndex = tempIndex - 1;
          //如果下一个有值就退出
          if (afterMap.has(tempIndex) || tempIndex < leftCase) {
            if (
              afterMap.get(tempIndex) === afterMap.get(beforeNums[i]) &&
              tempIndex >= leftCase
            ) {
              isAgrrate = true;
              moveCount--;
            }
            break;
          }
          moveCount--;
        }
        const finalIndex = beforeNums[i] - (3 - moveCount); // 最终坐标
        // const beforeVal = beforeMap.get(beforeNums[i]);
        publicChangeFunc(finalIndex, beforeNums[i]);
        afterMap.set("keyRecord", "ArrowLeft");
      }
      break;
    case "ArrowRight":
      console.log("按下右边方向键");
      beforeNums.sort((a, b) => b - a);
      for (let i = 0; i < beforeNumsLen; i++) {
        moveCount = 3;
        let tempIndex = beforeNums[i];
        let rightCase = Math.floor(beforeNums[i] / 4) * 4 + 3;
        while (moveCount > 0) {
          tempIndex = tempIndex + 1; //直接记录了当前的位置
          if (afterMap.has(tempIndex) || tempIndex > rightCase) {
            if (
              afterMap.get(tempIndex) === afterMap.get(beforeNums[i]) &&
              tempIndex <= rightCase
            ) {
              isAgrrate = true;
              moveCount--;
            }
            break;
          }
          moveCount--;
        }
        const finalIndex = beforeNums[i] + (3 - moveCount);
        publicChangeFunc(finalIndex, beforeNums[i]);
        afterMap.set("keyRecord", "ArrowRight");
      }
      break;
  }
  //将所有有值的节点都移动
  const keyRecorded = afterMap.get("keyRecord");
  const time = 300;
  beforeNums.forEach((hasValIndex, index) => {
    const moveDistance = Math.abs(hasValIndex - afterMoveNums[index]); //00

    //找到当前有值的索引的div让他可以改变transform
    const squareNum = squareParent.children[hasValIndex].children[0];
    switch (keyRecorded) {
      case "ArrowUp":
        squareNum.style.transform = `translateY(${
          -110 * (moveDistance / 4)
        }px)`;
        setTimeout(() => {
          squareNum.remove();
        }, time);
        //没有移动
        break;
      case "ArrowDown":
        squareNum.style.transform = `translateY(${110 * (moveDistance / 4)}px)`;
        setTimeout(() => {
          squareNum.remove();
        }, time);
        break;
      case "ArrowLeft":
        squareNum.style.transform = `translateX(${-110 * moveDistance}px)`;
        setTimeout(() => {
          squareNum.remove();
        }, time);
        break;
      case "ArrowRight":
        squareNum.style.transform = `translateX(${110 * moveDistance}px)`;
        setTimeout(() => {
          squareNum.remove();
        }, time);
        break;
    }
  });

  score.textContent = curSum;
  //将最终的数组的值遍历添加有值的节点
  afterMoveNums = [...new Set(afterMoveNums)];
  setTimeout(() => {
    afterMoveNums.forEach((key) => {
      const newNumDom = document.createElement("div");
      const val = afterMap.get(key);
      newNumDom.className = `square-num ${numberColorMap[val]} `;
      newNumDom.innerText = val;
      squareParent.children[key].appendChild(newNumDom);
    });
    moveAddRandom(afterMoveNums, afterMap); //向空的宫格里添加新的div
  }, time);
  //处理after后的map和num数组
  function publicChangeFunc(finalIndex, position) {
    const startVal = Number(beforeMap.get(position));
    const beforeVal = isAgrrate ? 2 * startVal : startVal;
    if (isAgrrate) {
      curSum += beforeVal;
    }
    afterMoveNums.push(finalIndex);
    isAgrrate = false;
    afterMap.delete(position);
    afterMap.set(finalIndex, beforeVal);
  }
  //moveDistance是向上-4；向下+4；derection是向上还是向下
  function publicMoveFunc(moveDistance, derection) {
    for (let i = 0; i < beforeNumsLen; i++) {
      moveCount = 3;
      let tempIndex = beforeNums[i];
      while (moveCount > 0) {
        tempIndex += moveDistance; //直接记录了当前的位置 12+4=16
        //当下一个有值的时候或者到边界
        const isBoundary = moveConfig[derection].checkBoundary(tempIndex);
        if (afterMap.has(tempIndex) || isBoundary) {
          //我忘了这是干什么了，如果当前位置跟原始值相同就会
          if (afterMap.get(tempIndex) === afterMap.get(beforeNums[i])) {
            isAgrrate = true;
            moveCount--;
          }
          break;
        } else if (tempIndex === beforeNums[beforeNumsLen - 1]) {
          alert("该方向已没有可移动的值");
        }
        moveCount--;
      }

      const finalIndex = beforeNums[i] + (3 - moveCount) * moveDistance;
      publicChangeFunc(finalIndex, beforeNums[i]);
      afterMap.set("keyRecord", derection);
    }
  }
  function canMove(afterMap) {
    // 遍历所有有值的格子，检查上下左右是否有相同值或空白可移动
    const keys = [...afterMap.keys()];
    for (const key of keys) {
      const val = afterMap.get(key);
      const row = Math.floor(key / 4); // 当前格子所在行（0~3）
      const col = key % 4; // 当前格子所在列（0~3）

      // 检查上方（row-1）
      const upKey = (row - 1) * 4 + col;
      if (row > 0 && (afterMap.get(upKey) === val || !afterMap.has(upKey))) {
        return true;
      }
      // 检查下方（row+1）
      const downKey = (row + 1) * 4 + col;
      if (
        row < 3 &&
        (afterMap.get(downKey) === val || !afterMap.has(downKey))
      ) {
        return true;
      }
      // 检查左方（col-1）
      const leftKey = row * 4 + (col - 1);
      if (
        col > 0 &&
        (afterMap.get(leftKey) === val || !afterMap.has(leftKey))
      ) {
        return true;
      }
      // 检查右方（col+1）
      const rightKey = row * 4 + (col + 1);
      if (
        col < 3 &&
        (afterMap.get(rightKey) === val || !afterMap.has(rightKey))
      ) {
        return true;
      }
    }
    // 所有格子都检查完，没有可移动方向
    return false;
  }
  setTimeout(() => {
    // 重新收集当前棋盘数据（因为 DOM 可能刚更新，需要重新读 afterMap）
    const currentMap = new Map();
    for (let i = 0; i < 16; i++) {
      if (squareParent.children[i].hasChildNodes()) {
        currentMap.set(
          i,
          Number(squareParent.children[i].children[0].innerText)
        );
      }
    }
    // 判断是否还能移动
    if (!canMove(currentMap)) {
      alert("已没有可移动的值，游戏结束～");
      // （可选）如果需要重置游戏，可在此处调用初始化逻辑
      // gameStart.click(); // 比如触发重新开始
    }
  }, 350); // 延迟 350ms，确保 DOM 更新完成后再检查
});
document.addEventListener('DOMContentLoaded', async() => {
 historyBest.textContent =  await trackVisit();
 console.log("%c Line:341 🥃 maxInHistory", "color:#2eafb0", maxInHistory);
});



