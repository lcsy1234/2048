// // 收集浏览器特征（生成指纹）
 function getBrowserFingerprint() {
  const { userAgent, language } = navigator;
  const { width, height } = screen;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // 简单哈希函数（将特征转为唯一字符串）
  const hash = (str) => {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      result = ((result << 5) - result) + char;
      result = result & result; // 转为32位整数
    }
    return Math.abs(result).toString(16);
  };
  
  // 组合特征并哈希
  const features = `${userAgent}${language}${width}x${height}${timezone}`;
  return hash(features);
}

// 生成或获取用户唯一标识（结合指纹和本地存储）
export function getUserId() {
  // 先检查本地存储是否已有标识
  let userId = localStorage.getItem('uniqueUserId');
  if (!userId) {
    // 生成新标识：指纹 + 时间戳 + 随机数
    const fingerprint = getBrowserFingerprint();
    const timestamp = Date.now().toString(36);
    const random =crypto.randomUUID()
    userId = `user_${fingerprint}_${timestamp}_${random}`;
    // 存储到本地
    localStorage.setItem('uniqueUserId', userId);
  }
  return userId;
}


