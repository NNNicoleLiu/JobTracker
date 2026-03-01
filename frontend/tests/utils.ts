import { Page } from "@playwright/test";

export async function login(page: Page) {
  await page.goto("http://localhost:5173/login");
  await page.getByRole("button", { name: "Sign in with Email" }).click();
  await page.getByLabel("Email Address").fill("test@test.com");
  await page.fill('input[type="password"]', "Password123!");
  await page.click('button[type="submit"]');
}
