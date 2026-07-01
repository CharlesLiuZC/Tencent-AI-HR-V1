# 数据契约

## UserProfile

包含身份、能力方向、AI Level、优势、弱项、学习重点、推荐节奏和岗位建议。

## UserProgress

包含周单元、每日提交、阶段分数、奖励兑换与最近活跃时间。旧版 `art/design/dev/ops` 必须迁移到当前 Capability。

## DailySubmission

```ts
type DailySubmission = {
  lessonId: string;
  note: string;
  fileName?: string;
  completedAt: string;
}
```

正式环境应把附件写入对象存储；当前 Demo 只保存文件名和成果说明。

## LearningEvent

未来持久化事件：`quest_start | quest_complete | assessment_submit | companion_chat | path_adjust`。
