# Han Zhao — academic website

A personal academic website based on Han Zhao’s supplied CV, with responsive layouts, journal and conference filters, and expandable doctoral research. You own the files and can update everything through GitHub. No installation or build step is required.

The site includes employment, all 13 publication entries (including the manuscript under review), education, doctoral research, teaching, honors, mentoring, and journal reviewing. Your email and the Google Scholar URL come from the CV. `assets/cv.pdf` is an unchanged copy of the supplied CV, including its contact details. The portrait is an HZ monogram that you can replace with a photo. Personal hobbies, GitHub and LinkedIn profiles, article URLs, and abstracts were not supplied and have not been invented.

## Get your website online — no terminal needed

### 1. Create your repository

Sign in at https://github.com and visit https://github.com/new.

- Name the repository `YOUR_USERNAME.github.io`, replacing `YOUR_USERNAME` with your actual GitHub username in lowercase. For example, username `alexsmith` means repository `alexsmith.github.io`.
- Choose **Public** for the free GitHub Pages route.
- Turn **Add README** on, then create the repository. The included README will replace that initial file when uploaded.

Already have a repository with that name? Use it, or name this one `personal-website`. With the latter name, the address will be `https://YOUR_USERNAME.github.io/personal-website/`.

### 2. Upload the website files

Extract `academic-website-template.zip` on your computer first. On the repository page, select **Add file → Upload files**. Drag the extracted files and the `assets` folder into the upload area, then select **Commit changes**.

Upload the contents of the extracted folder, not a wrapper folder or the ZIP itself. Your repository should look like:

```text
YOUR_USERNAME.github.io/
├── index.html
├── profile.js          ← your content
├── script.js           ← website behavior
├── styles.css          ← colors, typography, and layout
├── assets/
│   ├── portrait.svg
│   └── favicon.svg
├── README.md
├── .gitignore
└── .nojekyll
```

Hidden files may not appear in your file picker. The visible files are enough for this template to work. If you use Git, include the hidden files too.

### 3. Enable GitHub Pages

Open **Settings → Pages** in the repository. Under **Build and deployment**, set:

| Setting | Value |
| --- | --- |
| Source | Deploy from a branch |
| Branch | main, or the branch containing your uploaded files |
| Folder | / (root) |

Select **Save**. GitHub automatically publishes that branch and republishes future changes. A custom workflow file is unnecessary for this template.

The final URL appears in **Settings → Pages → Visit site**. Publication can take up to 10 minutes. With the example username above, the main personal site would be `https://alexsmith.github.io/`.

Official instructions: [Create a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [configure the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Update your site later

Most updates only require editing `profile.js`:

1. Open `profile.js` in your GitHub repository.
2. Click the pencil icon to edit it.
3. Change the content, keeping quotation marks, commas, and brackets intact.
4. Select **Commit changes** and commit to the publishing branch. If GitHub creates a pull request, merge it into that branch.
5. Wait for the Pages deployment to finish, then refresh your website.

Your website URL stays the same. The repository's **Actions** tab shows deployment progress and errors.

### Name, bio, and links

Replace the sample values near the top of `profile.js`. For example:

```js
name: "Alex Smith",
initials: "AS",
role: "Ph.D. Student · Computer Science",
affiliation: "Example University",
location: "Boston, USA",
```

Update each paragraph inside `bio`. Add your actual links inside `links`:

```js
links: [
  { label: "Email", url: "mailto:alex@example.com" },
  { label: "GitHub", url: "https://github.com/alexsmith" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/YOUR_PROFILE/" }
],
```

These are illustrative editing examples; the current file already contains Han Zhao’s details. Commented lines beginning with `//` do not appear on the site. Links are only shown when configured.

### Add your photo and CV

Open the `assets` folder on GitHub, then use **Add file → Upload files** to add `photo.jpg` and `cv.pdf`. In `profile.js`, change:

```js
portrait: "assets/photo.jpg",
portraitAlt: "Portrait of Alex Smith",
```

Also change `cv: ""` to `cv: "assets/cv.pdf"`. Until you provide a CV path, the page displays “CV coming soon.” File names are case-sensitive; paths must match uploaded file names exactly.

### Add publications, projects, and news

Update the objects in `publications`, `news`, `experience`, and `education`. Doctoral projects are in `research`; teaching, awards, mentoring, and journal reviewing are in `teaching`, `awards`, `service`, and `reviewing`. Duplicate an object to add another entry, with a comma between entries. Set a publication's `type` to `"journal"` or `"conference"` for filtering. Publication links can look like:

```js
links: [
  { label: "PDF", url: "assets/my-paper.pdf" },
  { label: "Code", url: "https://github.com/YOUR_USERNAME/YOUR_PROJECT" }
]
```

Upload linked PDF files to `assets` first. Optionally set `personalNote` to your interests; it is currently empty and hidden. The publication status and dates follow the supplied CV; edit them when they change.

### Change the appearance

Edit the color variables at the beginning of `styles.css`. Update the description in `index.html` for your own short bio and replace `assets/favicon.svg` if you want a different browser icon. The page title follows your name automatically.

## Make this a reusable GitHub template (optional)

In the repository's **Settings → General**, check **Template repository**. GitHub will offer **Use this template → Create a new repository**, so you or others can start another site from these files. Each new repository needs its own Pages configuration.

See [GitHub's template repository instructions](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository).

## Preview locally (optional)

Open `index.html` in your browser. Or, from this folder, run:

```sh
python3 -m http.server 8000
```

Visit http://localhost:8000. Refresh after edits. No packages or external assets are required.

## Troubleshooting

| Issue | What to check |
| --- | --- |
| Website shows 404 | Pages is enabled, the right branch is selected, and `index.html` is at the repository root. Check deployment status under Actions. |
| You see the README instead of the site | Make sure `index.html` was uploaded at the root, not inside another folder. |
| Content disappears after an edit | Check the punctuation in `profile.js`, especially commas, quotes, and brackets. Use the file history to restore the previous working version. |
| A photo or PDF is missing | Check its uploaded path and capitalization against the value in `profile.js`. |
| An update has not appeared | Wait for the deployment to complete, then hard refresh the browser. |

Relative asset paths let the site work at either a username domain or a repository subdirectory.
