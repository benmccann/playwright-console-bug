import { expect, test } from '@playwright/test';

test('using window.fetch causes a warning', async ({ page }) => {
	/** @type {string[]} */
	const warnings = [];

	page.on('console', (msg) => {
		if (msg.type() === 'warning') {
			warnings.push(msg.text());
		}
	});

	await page.goto('/load/window-fetch/incorrect');
	expect(await page.textContent('h1')).toBe('42');

	const { origin } = new URL(page.url());
	expect(warnings).toContain(
		`Loading ${origin}/load/window-fetch/data.json using \`window.fetch\`. For best results, use the \`fetch\` that is passed to your \`load\` function: https://kit.svelte.dev/docs/load#making-fetch-requests`
	);

	warnings.length = 0;

	await page.goto('/load/window-fetch/correct');
	expect(await page.textContent('h1')).toBe('42');

	expect(warnings).not.toContain(
		`Loading ${origin}/load/window-fetch/data.json using \`window.fetch\`. For best results, use the \`fetch\` that is passed to your \`load\` function: https://kit.svelte.dev/docs/load#making-fetch-requests`
	);
});
