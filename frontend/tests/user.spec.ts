import { test, expect } from "@playwright/test";
import { login } from "./utils";

const BASE_URL = "http://localhost:5173";

test("User can register", async ({ page }) => {
  const name = `user${Date.now()}`;
  const email = `${name}@test.com`;

  await page.goto(`${BASE_URL}/register`);

  await page.getByRole("button", { name: "Sign up with Email" }).click();
  await page.getByLabel("Name").fill(name);
  await page.getByLabel("Email Address").fill(email);
  await page.fill('input[type="password"]', "Password123!");
  await page.getByLabel("Confirm Password").fill("Password123!");

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator("text=Job Applications Tracker")).toBeVisible();
});

test("User can login and check profile", async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL(/dashboard/);
  await page.getByLabel("openmenu").click();
  await page.getByRole("menuitem", { name: "Profile" }).click();

  await expect(page.locator("text=Name: user")).toBeVisible();
  await expect(page.locator("text=Email: test@test.com")).toBeVisible();
});

test("User can logout", async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL(/dashboard/);
  await page.getByLabel("openmenu").click();
  await page.getByRole("menuitem", { name: "Logout" }).click();
  await expect(page).toHaveURL(/login/);
});
