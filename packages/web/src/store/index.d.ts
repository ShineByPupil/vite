export interface RootState {
  // 根模块的共享状态
  count: number;
  router_cache_set: set<RouteRecordName>;
}
