# Practice Repository

Organized practice environment for code challenges and UI projects.

## 📁 Structure

```
practice/
├── code/              # Code practice & algorithms
├── ui/                # Frontend Mentor challenges
```

## 🎯 Quick Start

### Code Practice

```bash
cd code
pnpm dev <filename>     # Run any TypeScript/JavaScript file
pnpm watch <filename>   # Run with auto-reload
pnpm lint               # Check code quality
pnpm format             # Format code
```

### Frontend Mentor or any UI Challenges

```bash
cd ui
# Set up new challenge (coming soon)
```

## 🛠️ Code Folder

**Purpose:** Quick code practice, algorithms, and concept exploration

**Tech Stack:**
- TypeScript/JavaScript
- Node.js
- tsx (run without compilation)

**Features:**
- ✅ Run files instantly with `pnpm dev`
- ✅ Watch mode for quick iteration
- ✅ ESLint + Prettier configured
- ✅ Strict TypeScript checking

**Example:**
```bash
cd code
echo 'console.log("Hello!")' > test.ts
pnpm dev test.ts
```

See [code/README.md](./code/README.md) for details.

## 🎨 UI Folder

**Purpose:** Frontend Mentor challenges

**Tech Stack:**
- Tailwind CSS
- Vanilla JavaScript (+ libs as needed per project)
- Vite (fast dev server)

**Structure:**
Each challenge is independent with its own dependencies:
```
ui/
├── challenge-1/
│   ├── package.json
│   ├── src/
│   └── ...
└── challenge-2/
    └── ...
```
## 🚀 Workflow

### Starting a new code practice file:
```bash
cd code
touch binary-search.ts
pnpm dev binary-search.ts
```

### Starting a new Frontend Mentor challenge:
```bash
cd ui
mkdir challenge-name
cd challenge-name
# Copy or set up Vite + Tailwind
```

## 🔧 Tools Used

- **pnpm** - Fast, disk-efficient package manager
- **tsx** - Run TypeScript without compilation
- **ESLint** - Catch errors and enforce standards
- **Prettier** - Consistent code formatting
- **TypeScript** - Type safety
- **Vite** - Fast dev server (for UI projects)
- **Tailwind** - Utility-first CSS (for UI projects)
