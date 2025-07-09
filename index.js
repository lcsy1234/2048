//思路：点击触发事件，生成随机数字，在随机一个位置更新代码,先用byid再用索引
//点击事件然后刷新
//点击之后动态更新
//动态更新代码优化（先用gpt搜索一下）
//

// let randomStartTwo=randomVal[Math.floor(Math.random()*2)]
const gameStart=document.getElementById("gameStart")
const squareVal=document.getElementById('square-val')
gameStart.addEventListener('click',()=>{
    console.log('dayin')
    const randomVal=[2,4]
    const randomStart=randomVal[Math.floor(Math.random()*2)]
    squareVal.innerText=randomStart
})