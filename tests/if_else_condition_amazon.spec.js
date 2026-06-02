const {test, expect} = require('playwright/test');

test('amazon mobile search and 8GB storage selection', async ({page}) => {
    // Open Amazon India page
    await page.goto('https://www.amazon.in/');

    // Search for mobiles under 70000
    const searchBox = page.locator("#twotabsearchtextbox");
    await searchBox.fill("mobiles under 70000");
    await searchBox.press('Enter');

    // Wait for search results to load
    await page.waitForTimeout(3000);

    // Look for 8GB storage option in the RAM/Storage section
    const eightGBStorage = page.locator("a[aria-label*='8 GB'][aria-label*='Apply the filter']");

    if (await eightGBStorage.count() > 0) {
        // 8GB storage option is available, click it
        await eightGBStorage.first().click();
        console.log('8GB storage option found and selected.');
    } else {
        // 8GB storage not found in initial options, check for "See more" option
        console.log('8GB storage not found in initial options, checking for see more.');
        const seeMoreStorage = page.locator("a[aria-label*='See more'][aria-label*='RAM'] span[class='a-expander-prompt']");

        if (await seeMoreStorage.count() > 0) {
            await seeMoreStorage.first().click();
            await page.waitForTimeout(1500);

            // Look for 8GB in the expanded storage options
            const eightGBInExpanded = page.locator("//div[contains(@class,'a-expander-content')]//a[contains(@aria-label,'8 GB')]");
            if (await eightGBInExpanded.count() > 0) {
                await eightGBInExpanded.first().click();
                console.log('8GB storage found and selected from expanded options.');
            } else {
                console.log('8GB storage not found in expanded options.');
            }
        } else {
            console.log('See more option for storage not found.');
        }
    }

    // Wait to see the filtered results
    await page.waitForTimeout(5000);
});