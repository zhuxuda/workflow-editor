# 贡献指南

感谢您对 Workflow Editor 的兴趣！

## 如何贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 开发设置

```bash
git clone https://github.com/zhuxuda/workflow-editor.git
cd workflow-editor
pnpm install
cd packages/editor
pnpm dev
```

## 代码规范

- 使用 ES6+ 语法
- 遵循 Vue 3 Composition API 风格
- 文件名使用小写和连字符 (kebab-case)
- 组件名使用大驼峰 (PascalCase)

## 提交信息

请遵循 Conventional Commits 规范：

- `feat:` - 新功能
- `fix:` - 修复
- `docs:` - 文档
- `style:` - 代码样式
- `refactor:` - 重构
- `perf:` - 性能优化
- `test:` - 测试
- `chore:` - 构建配置等

示例：`feat: add auto-layout feature`

## 报告问题

使用 GitHub Issues 报告问题。请提供：

1. 问题描述
2. 步骤重现
3. 预期行为
4. 实际行为
5. 截图或日志

## 许可证

通过贡献，您同意您的贡献在 MIT 许可证下进行。
