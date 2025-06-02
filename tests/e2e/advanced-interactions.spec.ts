import { test, expect } from '@playwright/test';

test.describe('Advanced Todo App Interactions', () => {
    test('should load more todos when clicking Load More button', async ({ page }) => {
        await page.goto('/');

        const initialTodoCount = await page.locator('[data-testid^="todo-item"]').count();
        await page.locator('button:has-text("Load More")').click();
        await page.waitForTimeout(500);
        const newTodoCount = await page.locator('[data-testid^="todo-item"]').count();
        expect(newTodoCount).toBeGreaterThan(initialTodoCount);
    });

    test('should hide Load More button when reaching total todos count', async ({ page }) => {
        await page.goto('/');

        while (await page.locator('button:has-text("Load More")').isVisible()) {
            await page.locator('button:has-text("Load More")').click();
            await page.waitForTimeout(500);

            const count = await page.locator('[data-testid^="todo-item"]').count();
            if (count > 201) {
                console.log('Osiągnięto limit zadań, przerywanie testu');
                break;
            }
        }

        await expect(page.locator('button:has-text("Load More")')).not.toBeVisible();
    });

    test('should show TodoNoTaskInfo when unchecking last completed task on Completed filter', async ({ page }) => {
        await page.goto('/');

        await page.locator('#tasks-status-filter').click();
        await page.locator('li[role="option"]:has-text("Completed")').click();
        await page.waitForTimeout(500);

        if (await page.locator('[data-testid^="todo-item"]').count() === 0) {
            await page.locator('#tasks-status-filter').click();
            await page.locator('li[role="option"]:has-text("All")').click();
            await page.waitForTimeout(500);

            const firstTodoItem = page.locator('li[data-testid^="todo-item"] .MuiListItemButton-root').first();
            if (!await page.locator('li[data-testid^="todo-item"] .line-through').first().isVisible()) {
                await firstTodoItem.click();
                await page.waitForTimeout(500);
            }

            await page.locator('#tasks-status-filter').click();
            await page.locator('li[role="option"]:has-text("Completed")').click();
            await page.waitForTimeout(500);
        }

        while (await page.locator('[data-testid^="todo-item"]').count() > 0) {
            await page.locator('li[data-testid^="todo-item"] .MuiListItemButton-root').first().click();
            await page.waitForTimeout(500);
        }

        await expect(page.locator('[data-testid="no-task-info"]')).toBeVisible();
    });
});

test.describe('Responsive design tests', () => {
    const viewports = [
        { width: 1920, height: 1080, name: 'Desktop' },
        { width: 1024, height: 768, name: 'Tablet' },
        { width: 414, height: 896, name: 'Mobile' },
    ];

    for (const viewport of viewports) {
        test(`layout should adapt to ${viewport.name} screen size`, async ({ page }) => {
            await page.setViewportSize({
                width: viewport.width,
                height: viewport.height,
            });

            await page.goto('/');

            await expect(page.locator('[data-testid="todo-list-container"]')).toBeVisible();

            if (viewport.width < 1024) {
                const headingElement = page.locator('h1:has-text("Todo List")');

                const className = await headingElement.getAttribute('class');
                expect(className).toContain('text-center');
                expect(className).toContain('w-full');

                await expect(headingElement).toHaveCSS('text-align', 'center');
            } else {
                const headingElement = page.locator('h1:has-text("Todo List")');
                const className = await headingElement.getAttribute('class');
                expect(className).toContain('lg:w-auto');
                expect(className).not.toContain('lg:text-center');
            }
        });
    }
});
