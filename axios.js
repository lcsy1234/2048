export const bestScoreReq = async function (params) {
  try {
    const response = await fetch("url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const result = response.json();
    if (result.success) {
      //   document.getElementById("highest-score").innerText = data.highestScore;
      //   document.getElementById("current-rank").innerText = data.currentRank;
    } else {
      console.error("提交失败:", result.message);
    }
  } catch (error) {
    console.log("%c Line:6 🍧 error", "color:#b03734", error);
    return null;
  }
  return result;
};
// bestScoreReq({ userIdentifier, currentScore: score })
// 生成/获取用户标识
// function getUserId() {
//   let userId = localStorage.getItem("userId");
//   if (!userId) {
//     // 生成唯一 ID（简单示例，可用 UUID 库）
//     userId = "user_" + crypto.randomUUID();
//     localStorage.setItem("userId", userId);
//   }
//   return userId;
// }
 export async function getUser() {
  const userId = getUserId();
  try {
    const response = await fetch("url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(params),
    });
    const result = response.json();
    if (result) {
      console.log("获取用户信息成功");
    }
  } catch (error) {
    console.log("%c Line:37 🍓 error", "color:#e41a6a", error);
    console.log("获取用户信息失败");
  }
  return result;
}
