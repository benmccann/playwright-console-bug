import { expect, test } from '@playwright/test';

test('using window.fetch causes a warning', async ({ page, baseURL }) => {
	await Promise.all([
		page.goto('/load/window-fetch/incorrect'),
		page.waitForEvent('console', {
			predicate: (message) => {
				return (
					message.text() ===
					`Loading ${baseURL}/load/window-fetch/data.json using \`window.fetch\`. For best results, use the \`fetch\` that is passed to your \`load\` function: https://kit.svelte.dev/docs/load#making-fetch-requests`
				);
			},
			timeout: 3_000
		})
	]);
	expect(await page.textContent('h1')).toBe('42');
});
