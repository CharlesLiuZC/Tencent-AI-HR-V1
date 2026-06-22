// ==================== KV Cache 本地缓存系统 ====================
// 缓存 API Key 和配置值到 localStorage，避免重复请求

interface CacheEntry<T> {
  value: T;
  timestamp: number;
  ttl: number; // Time to live in ms
}

class KVCache {
  private prefix = 'gd_cache_';

  // 设置缓存
  set<T>(key: string, value: T, ttlMs: number = 3600000): void {
    const entry: CacheEntry<T> = {
      value,
      timestamp: Date.now(),
      ttl: ttlMs,
    };
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(entry));
    } catch (e) {
      console.warn('KVCache set failed:', e);
    }
  }

  // 获取缓存
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      if (!raw) return null;

      const entry: CacheEntry<T> = JSON.parse(raw);
      const now = Date.now();

      // 检查是否过期
      if (now - entry.timestamp > entry.ttl) {
        this.delete(key);
        return null;
      }

      return entry.value;
    } catch {
      return null;
    }
  }

  // 删除缓存
  delete(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  // 清除所有缓存
  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  // 检查是否存在且未过期
  has(key: string): boolean {
    return this.get(key) !== null;
  }
}

// 导出单例
export const kvCache = new KVCache();

// ==================== 预定义缓存键 ====================
export const CACHE_KEYS = {
  DEEPSEEK_API_KEY: 'deepseek_api_key',
  USER_PROFILE: 'user_profile',
  AVATAR_CONFIG: 'avatar_config',
  LEARNING_PROGRESS: 'learning_progress',
  SELECTED_ROLE: 'selected_role',
  LAST_DIAGNOSIS: 'last_diagnosis',
  COMPANION_HISTORY: 'companion_history',
} as const;

// ==================== 便捷函数 ====================

// 获取 DeepSeek API Key（优先从环境变量，其次从缓存）
export function getDeepSeekApiKey(): string {
  // 1. 先从环境变量获取
  const envKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  if (envKey) {
    kvCache.set(CACHE_KEYS.DEEPSEEK_API_KEY, envKey, 86400000); // 缓存24小时
    return envKey;
  }

  // 2. 从缓存获取
  const cachedKey = kvCache.get<string>(CACHE_KEYS.DEEPSEEK_API_KEY);
  if (cachedKey) return cachedKey;

  return '';
}

// 缓存诊断结果
export function cacheDiagnosisResult(result: any): void {
  kvCache.set(CACHE_KEYS.LAST_DIAGNOSIS, result, 86400000 * 7); // 缓存7天
}

// 获取缓存的诊断结果
export function getCachedDiagnosis(): any | null {
  return kvCache.get(CACHE_KEYS.LAST_DIAGNOSIS);
}

// 缓存伴侣对话历史
export function cacheCompanionHistory(history: any[]): void {
  kvCache.set(CACHE_KEYS.COMPANION_HISTORY, history, 86400000); // 缓存24小时
}

// 获取缓存的伴侣对话历史
export function getCachedCompanionHistory(): any[] | null {
  return kvCache.get(CACHE_KEYS.COMPANION_HISTORY);
}
