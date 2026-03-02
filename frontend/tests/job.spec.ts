import { test, expect } from "@playwright/test";
import { login } from "./utils";
const BASE_URL = "http://localhost:5173";

test("full lifecycle", async ({ page }) => {
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

  //    create a job
  await page.click("text=NEW");

  await page.getByLabel("Company name").fill("Google");
  await page.getByLabel("Position").fill("Frontend Engineer");

  await page.click("text=Save");
  const jobRow = page.locator("text=Frontend Engineer").first();
  await expect(jobRow).toBeVisible();

  //   edit a job
  await jobRow.hover();

  await jobRow.click();
  await page.getByLabel("Position").fill("Senior Frontend Engineer");
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Interview" }).click();

  await page.click("text=Save");
  const jobUpdated = page.locator("tr", {
    hasText: "Google",
  });
  await expect(jobUpdated).toBeVisible();

  // delete a job
  await jobUpdated.hover();

  // Click delete icon that appears after hover
  const deleteButton = jobUpdated.getByTestId("delete-job-btn");
  //   await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  // Click "Yes" to confirm delete
  await page.getByRole("button", { name: "Yes" }).click();

  // Ensure job is removed
  await expect(page.locator("text=Senior Frontend Engineer")).not.toBeVisible();
});
