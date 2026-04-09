# 仓库规范

## 项目结构与模块组织

这个仓库是一个基于 Vite 的小型 React 应用。应用入口位于 `src/`：`main.jsx` 负责挂载应用，`App.jsx` 包含主要的 UI 与状态逻辑，`styles.css` 用于引入 Tailwind CSS。静态 HTML 位于 `index.html`。构建与工具配置文件位于仓库根目录，包括 `vite.config.js` 和 `eslint.config.js`。目前还没有单独的 `tests/` 或 `assets/` 目录。

## 构建、测试与开发命令

- `npm run dev`：启动本地 Vite 开发服务器并启用热更新。
- `npm run build`：生成生产环境构建产物到 `dist/`。
- `npm run preview`：本地预览生产构建结果以便验证。
- `npm run lint`：对整个项目运行 ESLint 检查。

请在仓库根目录执行这些命令，例如：`npm run dev`。

## 编码风格与命名约定

使用 ES modules，并使用 `const` 箭头函数来编写 React 函数组件，不要使用 `function` 声明。遵循 `src/App.jsx` 中现有的代码风格：使用双引号、分号，组件文件采用 PascalCase 命名（例如 `App.jsx`）。局部变量和辅助函数使用 camelCase。简单的 UI 逻辑优先与组件放在一起，只有在出现明确复用边界时再进行拆分。

项目通过 `@tailwindcss/vite` 提供 Tailwind 支持；默认采用 utility-first 的样式编写方式。ESLint 默认明确禁止使用 `useMemo`、`useCallback` 和 `memo`，除非规则或项目约定发生变化，否则不要添加这些 API。

## 语言与沟通

默认情况下，贡献者在 issue、评审以及 agent/user 协作中的沟通应使用中文。代码标识符、import 名称和 npm script 名称请保持英文，以便与代码库及生态系统保持一致。面向用户的 UI 文案可以使用中文，`src/App.jsx` 中已有示例，但代码内部命名应保持一致。

## 测试规范

目前项目尚未配置自动化测试框架。现阶段请通过 `npm run lint`、`npm run build` 以及使用 `npm run dev` 或 `npm run preview` 进行浏览器手动检查来验证改动。将来如果引入测试，请将测试文件放在对应功能附近，或放入专门的 `tests/` 目录，并使用清晰的命名，例如 `App.test.jsx`。

## 提交与 Pull Request 规范

当前 Git 历史较少，提交信息以简短的祈使句为主，例如 `init`。后续提交也应保持简洁、使用祈使语气，并聚焦单一范围，例如 `add task filter styling` 或 `refactor local storage sync`。

Pull Request 应包含简要摘要、主要修改的文件，以及手动验证步骤。涉及可见 UI 变化时，请附上截图或简短录屏。
