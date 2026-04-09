import { expect, test } from "@playwright/test";

const STORAGE_KEY = "pulse-list-tasks-react";
const taskTitle = "编写 Playwright 回归测试";

test.beforeEach(async ({ page }) => {
  await page.addInitScript((key) => {
    window.localStorage.removeItem(key);
  }, STORAGE_KEY);
});

test("can manage tasks across add, filter, complete, and clear flows", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "PulseList" })).toBeVisible();
  await expect(page.getByRole("listitem")).toHaveCount(3);
  await expect(page.locator("article", { hasText: "Tasks" })).toContainText("3");
  await expect(page.locator("article", { hasText: "Done" })).toContainText("1");
  await expect(page.locator("article", { hasText: "Progress" })).toContainText(
    "33%"
  );
  await expect(page.locator("section").filter({ hasText: "Active Queue" })).toContainText("2");

  await page.getByRole("textbox", { name: "New mission" }).fill(taskTitle);
  await page.getByRole("combobox", { name: "Priority" }).selectOption("low");
  await page.getByRole("button", { name: "Add Task" }).click();

  const addedTask = page.getByRole("listitem").filter({ hasText: taskTitle });
  await expect(addedTask).toBeVisible();
  await expect(addedTask).toContainText("low");
  await expect(page.locator("article", { hasText: "Tasks" })).toContainText("4");
  await expect(page.locator("section").filter({ hasText: "Active Queue" })).toContainText("3");

  await page.getByRole("button", { name: "done", exact: true }).click();
  await expect(page.getByRole("listitem")).toHaveCount(1);
  await expect(page.getByRole("listitem")).toContainText(
    "把静态版 ToDoList 改成 Vite + React 项目"
  );

  await page.getByRole("button", { name: "all", exact: true }).click();
  await addedTask.getByRole("button", { name: "切换完成状态" }).click();

  await expect(page.locator("article", { hasText: "Done" })).toContainText("2");
  await expect(page.locator("article", { hasText: "Progress" })).toContainText(
    "50%"
  );
  await expect(page.locator("section").filter({ hasText: "Active Queue" })).toContainText("2");

  await page.getByRole("button", { name: "done", exact: true }).click();
  await expect(page.getByRole("listitem")).toHaveCount(2);
  await expect(page.getByRole("listitem").filter({ hasText: taskTitle })).toBeVisible();

  await page.getByRole("button", { name: "Clear Done" }).click();
  await expect(page.getByRole("listitem")).toHaveCount(1);
  await expect(page.getByRole("listitem")).toContainText("还没有已完成任务。");
  await expect(page.getByRole("listitem").filter({ hasText: taskTitle })).toHaveCount(0);
  await expect(page.locator("article", { hasText: "Tasks" })).toContainText("2");
  await expect(page.locator("article", { hasText: "Done" })).toContainText("0");
  await expect(page.locator("article", { hasText: "Progress" })).toContainText("0%");
  await expect(page.locator("section").filter({ hasText: "Active Queue" })).toContainText("2");

  await page.getByRole("button", { name: "all", exact: true }).click();
  await expect(page.getByRole("listitem")).toHaveCount(2);
});
