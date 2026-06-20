import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class PostPage extends BasePage {
  btnAddNewPost: Locator;
  txtSearchPost: Locator;
  btnSearchSubmit: Locator;

  txtPostTitle: Locator;
  btnPublishToggle: Locator;
  btnPublishSubmit: Locator;
  // btnAddPostLink: Locator;

  txtCategoryName: Locator;
  btnAddCategory: Locator;
  txtSearchCategories: Locator;
  btnSearchCategories: Locator;

  txtTagName: Locator;
  btnAddTag: Locator;
  txtSearchTags: Locator;
  btnSearchTags: Locator;

  constructor(page: Page) {
    super(page);

    this.btnAddNewPost = this.page.locator('.wrap').getByRole('link', { name: 'Add Post', exact: true });
    this.txtSearchPost = this.page
      .getByRole('searchbox', { name: 'Search Posts' })
      .or(this.page.locator('#post-search-input'));
    this.btnSearchSubmit = this.page.getByRole('button', { name: 'Search Posts' });

    const editorFrame = this.page.locator('iframe[name="editor-canvas"]').contentFrame();
    this.txtPostTitle = editorFrame.getByLabel('Add title');

    this.btnPublishToggle = this.page
      .getByRole('button', { name: 'Publish', exact: true })
      .and(this.page.locator('.editor-post-publish-panel__toggle'));
    this.btnPublishSubmit = this.page
      .getByRole('button', { name: 'Publish', exact: true })
      .and(this.page.locator('.editor-post-publish-button'));
    // this.btnAddPostLink = this.page.getByRole('link', { name: 'Add Post', exact: true });

    this.txtCategoryName = this.page.locator('#addtag').getByLabel('Name');
    this.btnAddCategory = this.page.getByRole('button', { name: 'Add Category' });
    this.txtSearchCategories = this.page.locator('.search-box').getByRole('searchbox');
    this.btnSearchCategories = this.page.locator('.search-box').getByRole('button');

    this.txtTagName = this.page.locator('#addtag').getByLabel('Name');
    this.btnAddTag = this.page.getByRole('button', { name: 'Add Tag' });
    this.txtSearchTags = this.page.locator('.search-box').getByRole('searchbox');
    this.btnSearchTags = this.page.locator('.search-box').getByRole('button');
  }

  async createCategory(categoryName: string) {
    await this.clickMenu('Posts');
    await this.page.getByRole('link', { name: 'Categories' }).click();
    await this.txtCategoryName.fill(categoryName);
    await this.btnAddCategory.click();
  }

  async createTag(tagName: string) {
    await this.clickMenu('Posts');
    await this.page.getByRole('link', { name: 'Tags' }).click();
    await this.txtTagName.fill(tagName);
    await this.btnAddTag.click();
  }

  async createPostWithTagAndCategory(title: string, categoryName: string, tagName: string) {
    await this.clickMenu('Posts');
    await this.btnAddNewPost.click();

    const btnCloseGuide = this.page.getByRole('button', { name: 'Close dialog' });
    if (await btnCloseGuide.isVisible({ timeout: 2000 })) {
      await btnCloseGuide.click();
    }

    await this.txtPostTitle.fill(title);

    await this.btnPublishToggle.click();

    await this.page.getByRole('button', { name: 'Assign a category' }).click();
    await this.page.getByPlaceholder('Search Categories').fill(categoryName);
    const categoryCheckbox = this.page.getByRole('checkbox', { name: categoryName });
    await categoryCheckbox.check();

    await this.page.getByRole('button', { name: 'Add Tag' }).click();
    const tagInput = this.page.getByRole('combobox', { name: 'Add Tag' });
    await tagInput.fill(tagName);
    await tagInput.press('Enter');
    await this.page.waitForTimeout(500);

    await this.btnPublishSubmit.click();
    await this.page.waitForTimeout(500);

    // await this.btnAddPostLink.click();

    // await this.page.getByRole('link', { name: 'View Posts' }).click();
    await this.page.goto(`${process.env.BASE_URL}/edit.php`)
  }

  async createSimplePost(title: string) {
    await this.clickMenu('Posts');
    await this.btnAddNewPost.click();

    await this.page.getByRole('button', { name: 'Close' }).click();
    await this.txtPostTitle.fill(title);
    await this.btnPublishToggle.click();
    await this.btnPublishSubmit.click();

    await this.btnAddPostLink.click();
    await this.page.getByRole('link', { name: 'View Posts' }).click();
  }

  async searchTag(tagName: string) {
    await this.txtSearchTags.fill(tagName);
    await this.btnSearchTags.click();
  }
  async searchCategory(categoryName: string) {
    await this.txtSearchCategories.fill(categoryName);
    await this.btnSearchCategories.click();
  }

  async searchPost(title: string) {
    await this.clickMenu('Posts');
    await this.txtSearchPost.fill(title);
    await this.btnSearchSubmit.click();
  }

  async deletePost(title: string) {
    const row = this.page.getByRole('row', { name: title, exact: false });
    await row.hover();
    await row.getByRole('link', { name: 'Trash' }).click();
  }

  async deleteCategory(categoryName: string) {
    await this.clickMenu('Posts');
    await this.page.getByRole('link', { name: 'Categories' }).click();
    await this.txtSearchCategories.fill(categoryName);
    await this.btnSearchCategories.click();

    this.page.once('dialog', async (dialog) => dialog.accept());
    const targetRow = this.page.getByRole('row', { name: categoryName });
    await targetRow.hover();
    await targetRow.getByRole('button', { name: 'Delete' }).click();
  }

  async deleteTag(tagName: string) {
    await this.clickMenu('Posts');
    await this.page.getByRole('link', { name: 'Tags' }).click();

    await this.txtSearchTags.fill(tagName);
    await this.btnSearchTags.click();

    this.page.once('dialog', async (dialog) => dialog.accept());
    const targetRow = this.page.getByRole('row', { name: tagName });
    await targetRow.hover();
    await targetRow.getByRole('button', { name: 'Delete' }).click();
  }
}