# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Setup

### Prerequisites
- Node.js version 14+ 
- npm version 8+
- WordPress local environment (using Local by Flywheel or similar)

### Getting Started
1. Navigate to the build directory: `cd _gulp`
2. Install dependencies: `npm i`
3. Start development: `npx gulp` (or just `gulp`)

### Build Commands

**Development Mode:**
```bash
cd _gulp
npx gulp
```
This starts the development server with BrowserSync, file watching, and auto-compilation.

**Production Build:**
```bash
cd _gulp
npx gulp build
```
This cleans the output directories and builds all assets for production.

**BrowserSync Configuration:**
- Proxy URL: `retreat.local` (configured in gulpfile.js line 173)
- Watches PHP, SCSS, JS, and HTML files for changes

## Architecture Overview

### Directory Structure
```
WordPressTheme/          # Main WordPress theme files
├── assets/             # Compiled assets (auto-generated)
│   ├── css/           # Compiled CSS files
│   ├── js/            # Compiled JavaScript files
│   └── images/        # Optimized images
├── parts/             # Reusable template parts
└── *.php              # WordPress template files

src/                    # Source files (edit these)
├── sass/              # SCSS source files
│   ├── base/          # Base styles and reset
│   ├── global/        # Global variables and mixins
│   ├── module/        # Reusable components
│   └── page/          # Page-specific styles
├── js/                # JavaScript source files
└── images/            # Source images (auto-optimized)

dist/                   # Static HTML output (if needed)
_gulp/                  # Build system
```

### Build System Architecture
- **Gulp-based build system** with Sass compilation, JavaScript transpilation, and image optimization
- **Dual output**: Builds to both `dist/` (static) and `WordPressTheme/assets/` (WordPress)
- **BrowserSync integration** for live reloading during development
- **WebP conversion** for all images automatically
- **Babel transpilation** for JavaScript ES6+ → ES5 compatibility

### WordPress-Specific Features

**Custom Post Types:**
- `campaign` - Marketing campaigns with custom taxonomy `campaign_category`
- `voice` - Customer testimonials with custom taxonomy `voice_category`

**Admin Customizations:**
- Posts renamed to "ブログ" (Blog) in Japanese
- Custom archive displays with year/month navigation
- Visual editor formatting disabled for cleaner HTML output
- Contact Form 7 auto-paragraph removal

**Theme Features:**
- Custom fields support (ACF and Smart Custom Fields)
- Post view counting functionality
- Responsive breakpoint system with mobile/desktop-first toggle

### Responsive Design System
Located in `src/sass/global/_breakpoints.scss`:
- **Toggle variable**: `$startFrom: sp` (sp = mobile-first, pc = desktop-first)
- **Breakpoints**: sm(600px), md(768px), lg(1024px), xl(1440px)
- **Utility classes**: `.u-mobile` and `.u-desktop` for show/hide based on device

### JavaScript Libraries
**Included via WordPress functions.php:**
- jQuery 3.6.0 (CDN)
- GSAP 3.12.5 + ScrollTrigger (local files)
- Swiper.js 9.0.0 (CDN)
- MicroModal 1.0.1 (CDN)
- Custom inview library (local)

### Image Optimization
- Automatic JPEG/PNG/SVG optimization
- WebP conversion for all image formats
- Dual output to both static and WordPress directories

## Development Guidelines

### Working with Files
- **Edit only** files in the `src/` directory - never edit `dist/` or `WordPressTheme/assets/` directly
- SCSS files use `@forward` imports for better organization
- PHP template files follow WordPress coding standards

### Breakpoint Usage
Change responsive approach by updating `$startFrom` variable in `_breakpoints.scss`:
```scss
$startFrom: sp; // for mobile-first
$startFrom: pc; // for desktop-first
```

### Custom Fields Setup
The theme supports both ACF and Smart Custom Fields:
- Gallery images managed through `gallery_options` 
- Price lists through `price_options`
- FAQ content through `FAQ_options`

### Before Submission/Deployment
1. Run `gulp build` to clean and rebuild all assets
2. Delete `_gulp/node_modules/` folder before submission
3. Ensure all source files are properly formatted and optimized