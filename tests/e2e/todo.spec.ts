import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
    test('should load todos and display them', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveTitle(/Todo List/);

        const todoList = page.locator('ul');
        await expect(todoList).toBeVisible();

        const todoItems = page.locator('[data-testid^="todo-item"]');

        const count = await todoItems.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should toggle todo completion', async ({ page }) => {
        await page.goto('/');

        const firstTodoItem = page.locator('li[data-testid^="todo-item"] .MuiListItemButton-root').first();

        await firstTodoItem.click();

        const firstTodoText = page.locator('li[data-testid^="todo-item"] .line-through').first();
        await expect(firstTodoText).toBeVisible();

        await page.reload();

        await expect(page.locator('li[data-testid^="todo-item"] .line-through').first()).toBeVisible();
    });

    test('should filter todos', async ({ page }) => {
        await page.goto('/');

        const initialTodoCount = await page.locator('[data-testid^="todo-item"]').count();

        await page.locator('#tasks-status-filter').click();

        await page.locator('li[role="option"]:has-text("Completed")').click();

        await page.waitForTimeout(500);

        const filteredTodoCount = await page.locator('[data-testid^="todo-item"]').count();

        expect(filteredTodoCount).toBeLessThanOrEqual(initialTodoCount);
    });
});
