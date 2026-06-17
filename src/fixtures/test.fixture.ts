import { test as base } from '@playwright/test';
import { LoginPage } from '../pom/login.page';
import { PostPage } from '../pom/post.page';
import { UserPage } from '../pom/user.page';

type MyFixtures = {
  loginPage: LoginPage;
  postPage: PostPage;
  userPage: UserPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  postPage: async ({ page }, use) => {
    await use(new PostPage(page));
  },
  userPage: async ({ page }, use) => {
    await use(new UserPage(page));
  },
});

export { expect } from '@playwright/test';