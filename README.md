# MyNewTab - A Modern, Customizable New Tab Page

MyNewTab is a sleek and customizable new tab page built with React, TypeScript, and Vite. It allows you to organize your favorite websites into categories and access them quickly. It features a built-in JSON editor to easily manage your bookmarks.

## Features

- **Customizable Bookmarks**: Organize your bookmarks into categories.
- **Built-in JSON Editor**: A powerful Monaco-based editor to manage your bookmarks with ease.
- **Favicon Support**: Automatically fetches and displays favicons for your bookmarks*.
- **Fast and Lightweight**: Built with Vite for a speedy development experience and a fast production build.

Note: The favicon support can't fetch favicons for subdomains, but there's an option to manually set favicons for bookmarks in the JSON editor.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mynewtab-v2.git
   cd mynewtab-v2
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
   The application will be available at `http://localhost:5173`.

## How to Use

1. **Adding and Editing Bookmarks**:
   - Click on the "Edit" button on the top right.
   - A modal with a JSON editor will appear.
   - You can add, remove, or edit bookmarks directly in the JSON structure.
   - The structure is a dictionary where keys are category names and values are lists of bookmarks.
   - Each bookmark has a `title`, `url`, and an optional `description`.

   **Example JSON structure:**
   ```json
   {
     "Social Media": [
       {
         "title": "Twitter",
         "url": "https://twitter.com"
       },
       {
         "title": "Reddit",
         "url": "https://reddit.com",
         "description": "The front page of the internet."
       }
     ],
     "Development": [
       {
         "title": "GitHub",
         "url": "https://github.com"
       }
     ]
   }
   ```
2. **Custom Favicon**:
   - You can manually set favicons for bookmarks by adding a `favicon` property to each bookmark object.
   - Example:
   ```json
   {
     "title": "My Site",
     "url": "https://mysite.com",
     "customIconUrl": "https://mysite.com/favicon.ico"
   }
   ```

3. **Saving Changes**:
   - Click the "Save" button in the editor modal.
   - Your bookmarks will be updated and saved to your browser's local storage.

4. **Backing Up or Restoring Bookmarks**:
   - You can copy the JSON structure from the editor to back up your bookmarks.
   - To restore, paste the JSON back into the editor and save.

## Building for Production

To create a production build, run:
```bash
pnpm build
```
The production-ready files will be in the `dist` directory. You can serve them with a static file server.

## Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Editor**: Monaco Editor (`@monaco-editor/react`)

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## Questions or Issues

If you have any questions or encounter issues, please open an issue on the GitHub repository or contact me directly at [idanfath.link](https://idanfath.link).
