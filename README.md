# Endurance Protection Group Website

A single-page website for Endurance Protection Group, built with [Astro](https://astro.build).

## Prerequisites

Before you begin, make sure you have the following installed on your computer:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Choose the LTS (Long Term Support) version
   - After installing, verify by opening Terminal and running:
     ```bash
     node --version
     ```

2. **Git**
   - Download from: https://git-scm.com/downloads
   - After installing, verify by running:
     ```bash
     git --version
     ```

3. **A GitHub Account**
   - Sign up at: https://github.com/

---

## Local Development

### 1. Install Dependencies

Open Terminal, navigate to this project folder, and run:

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

This will start a local server. Open your browser and go to `http://localhost:4321` to see your website.

### 3. Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` folder.

### 4. Preview Production Build

```bash
npm run preview
```

---

## Deploying to GitHub Pages

Follow these steps carefully to deploy your website for free using GitHub Pages.

### Step 1: Create a GitHub Repository

1. Go to https://github.com and log in
2. Click the **+** icon in the top right corner
3. Select **New repository**
4. Fill in the details:
   - **Repository name**: `endurance-protection-group` (or any name you prefer)
   - **Description**: (optional) "Endurance Protection Group website"
   - **Public** or **Private**: Choose Public (required for free GitHub Pages)
   - **Do NOT** check "Add a README file" (we already have one)
5. Click **Create repository**

### Step 2: Update the Astro Configuration

Open `astro.config.mjs` and update the `site` and `base` values:

```javascript
export default defineConfig({
  site: 'https://YOUR_GITHUB_USERNAME.github.io',
  base: '/YOUR_REPOSITORY_NAME',
});
```

**Example:** If your GitHub username is `johndoe` and your repository is named `endurance-protection-group`:

```javascript
export default defineConfig({
  site: 'https://johndoe.github.io',
  base: '/endurance-protection-group',
});
```

**Special case:** If you name your repository `YOUR_USERNAME.github.io`, set `base` to `'/'` instead.

### Step 3: Initialize Git and Push to GitHub

Open Terminal in your project folder and run these commands one at a time:

```bash
# Initialize a new Git repository
git init

# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: Endurance Protection Group website"

# Rename the default branch to 'main'
git branch -M main

# Add GitHub as a remote (replace with YOUR URL from GitHub)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push your code to GitHub
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and repository name. You can copy the exact URL from GitHub after creating the repository.

### Step 4: Create the GitHub Actions Workflow

Create a file at `.github/workflows/deploy.yml` with the deployment configuration.

First, create the folder structure:

```bash
mkdir -p .github/workflows
```

Then create the file `.github/workflows/deploy.yml` with this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build Astro
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

After creating this file, commit and push it:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow"
git push
```

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (tab at the top)
3. In the left sidebar, click **Pages**
4. Under **Source**, select **GitHub Actions**
5. That's it! GitHub will now automatically deploy your site

### Step 6: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. Once it shows a green checkmark, your site is live!

### Step 7: View Your Live Site

Your website will be available at:

```
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/
```

---

## Making Updates

After your initial deployment, updating your site is simple:

1. Make your changes locally
2. Test them with `npm run dev`
3. Commit and push:

```bash
git add .
git commit -m "Description of your changes"
git push
```

GitHub Actions will automatically rebuild and deploy your site.

---

## Project Structure

```
endurance-protection-group/
├── public/              # Static assets (favicon, images)
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navigation.astro
│   │   ├── HeroSection.astro
│   │   ├── AboutSection.astro
│   │   ├── TeamSection.astro
│   │   └── ContactSection.astro
│   ├── layouts/
│   │   └── Layout.astro # Main page layout
│   └── pages/
│       └── index.astro  # Home page
├── astro.config.mjs     # Astro configuration
├── package.json
└── README.md
```

---

## Customization

### Editing Content

- **Hero Section**: Edit `src/components/HeroSection.astro`
- **About Section**: Edit `src/components/AboutSection.astro`
- **Team Section**: Edit `src/components/TeamSection.astro` (update the `team` array)
- **Contact Section**: Edit `src/components/ContactSection.astro`

### Adding Team Members

Open `src/components/TeamSection.astro` and modify the `team` array:

```javascript
const team = [
  {
    name: "John Smith",
    role: "Principal",
    bio: "John brings 15 years of insurance industry experience..."
  },
  // Add more team members here
];
```

### Adding Images

1. Place images in the `public/` folder
2. Reference them in your components with a leading slash: `/image-name.jpg`

---

## Troubleshooting

### "Permission denied" when pushing to GitHub

Run this command to store your GitHub credentials:
```bash
git config --global credential.helper store
```
Then try pushing again. You may need to enter your GitHub username and a Personal Access Token (not your password).

To create a Personal Access Token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `repo` permissions
3. Use this token as your password when prompted

### Site shows 404 after deployment

1. Make sure GitHub Pages is enabled (Settings → Pages → Source: GitHub Actions)
2. Verify `base` in `astro.config.mjs` matches your repository name exactly
3. Wait a few minutes for DNS propagation

### Changes not showing up

1. Hard refresh your browser: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
2. Check the Actions tab to make sure the deployment completed successfully

---

## Using a Custom Domain (Optional)

If you have your own domain (like `enduranceprotectiongroup.com`):

1. In your repository's **Settings → Pages**, add your custom domain
2. Create a `CNAME` file in the `public/` folder containing just your domain:
   ```
   enduranceprotectiongroup.com
   ```
3. Update `astro.config.mjs`:
   ```javascript
   export default defineConfig({
     site: 'https://enduranceprotectiongroup.com',
     base: '/',
   });
   ```
4. Configure your domain's DNS settings to point to GitHub Pages:
   - For apex domain: Add A records pointing to GitHub's IPs
   - For www subdomain: Add a CNAME record pointing to `YOUR_USERNAME.github.io`

See GitHub's documentation for detailed DNS setup: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

---

## Need Help?

- Astro Documentation: https://docs.astro.build
- GitHub Pages Documentation: https://docs.github.com/en/pages
