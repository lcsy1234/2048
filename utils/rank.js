import {request} from './axios.js'
export async function trackVisit() {
  try {
    const result = await request(
      "https://htsdgsfrswjh.sealoshzh.site/track-visit",
      {
        method: "GET",
      }
    );
    if (result) {
        console.log("%c Line:11 🍬 result", "color:#33a5ff", result);
        return result.bestScore ||0
    }
  } catch (error) {
    console.log("%c Line:37 🍓 error", "color:#e41a6a", error);
    console.log("获取用户信息失败");
  }
}
