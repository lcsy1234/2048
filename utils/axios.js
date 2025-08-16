
import {getUserId } from './fingerprint.js'
export async function request(url, options = {}) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const config = { ...defaultOptions, ...options };
    const userId = getUserId()
    console.log("%c Line:11 🥛 userId", "color:#4fff4B", userId);
    if (userId) {
      config.headers.Authorization = `Bearer ${userId}`;
    }
  const response = await fetch(url, config)
      // 处理响应
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }  const result = await response.json();
    return result;
  } 

