# GitHub Actions 自动构建说明

## 工作流功能

这个 GitHub Actions 工作流会自动构建和打包 Chrome 扩展。

### 触发条件

工作流会在以下情况下自动运行：

1. **推送到主分支**
   ```bash
   git push origin main
   ```

2. **创建版本标签**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. **Pull Request**
   - 当创建或更新 PR 时自动构建

4. **手动触发**
   - 在 GitHub 仓库的 Actions 页面手动运行

### 构建产物

每次构建会生成：

1. **dist/** - 构建后的扩展文件
2. **aesthetic-newtab-extension.zip** - 打包的 ZIP 文件

### 下载构建产物

#### 方式 1: 从 Actions 页面下载

1. 访问仓库的 **Actions** 页面
2. 选择最新的构建任务
3. 在 **Artifacts** 部分下载 `chrome-extension-build`

#### 方式 2: 从 Releases 下载（仅限标签构建）

1. 访问仓库的 **Releases** 页面
2. 下载对应版本的 `aesthetic-newtab-extension.zip`

## 发布新版本

### 步骤 1: 更新版本号

编辑 `public/manifest.json`:
```json
{
  "version": "1.0.1"
}
```

### 步骤 2: 提交更改

```bash
git add public/manifest.json
git commit -m "chore: bump version to 1.0.1"
git push origin main
```

### 步骤 3: 创建标签

```bash
git tag v1.0.1
git push origin v1.0.1
```

### 步骤 4: 自动发布

GitHub Actions 会自动：
- ✅ 构建扩展
- ✅ 创建 ZIP 包
- ✅ 创建 GitHub Release
- ✅ 上传构建产物

## 本地测试构建

在推送前，可以本地测试构建：

```bash
# 安装依赖
npm install

# 构建
npm run build

# 创建 ZIP（可选）
cd dist
zip -r ../aesthetic-newtab-extension.zip .
cd ..
```

## 故障排查

### 构建失败

1. 检查 Actions 页面的日志
2. 确保 `package.json` 中的脚本正确
3. 确保所有依赖都在 `package.json` 中

### 无法创建 Release

1. 确保标签格式为 `v*`（如 `v1.0.0`）
2. 检查仓库的 Settings > Actions > General 权限设置
3. 确保启用了 "Read and write permissions"

## 配置选项

### 修改 Node.js 版本

编辑 `.github/workflows/build.yml`:
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # 改为你需要的版本
```

### 修改构建保留时间

```yaml
- name: Upload build artifact
  uses: actions/upload-artifact@v4
  with:
    retention-days: 30  # 改为你需要的天数
```

### 添加自动测试

在 `build.yml` 中添加测试步骤：
```yaml
- name: Run tests
  run: npm test
```

## 工作流状态徽章

在 README.md 中添加构建状态徽章：

```markdown
![Build Status](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Build%20Chrome%20Extension/badge.svg)
```

替换 `YOUR_USERNAME` 和 `YOUR_REPO` 为你的实际值。
