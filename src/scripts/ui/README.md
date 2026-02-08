# UI Components

Modular UI component system for better code organization and maintainability.

## Structure

```
ui/
├── index.js        # Main export file - import from here
├── icons.js        # SVG icon library
├── templates.js    # Reusable template functions
├── header.js       # Header component & navigation logic
└── footer.js       # Footer component
```

## Usage

### Import Components

```javascript
// Import everything
import { initComponents, templates, ICONS } from "./ui/index.js";

// Import specific template functions
import { templates } from "./ui/index.js";
const badgeHTML = templates.badge("Active", "success");
const cardHTML = templates.card(data, "project");

// Import header/footer separately if needed
import { headerHTML, initMobileMenu } from "./ui/header.js";
import { footerHTML } from "./ui/footer.js";
```

### Initialize Components

```javascript
import { initComponents } from "./ui/index.js";

// This will automatically inject header and footer
initComponents();
```

## Components

### Templates (`templates.js`)

- **badge(label, type, extraClass)** - Status/category badges
- **fact(fact, index)** - Stat cards with hover effects
- **skillGroup(group)** - Skill category groups
- **certification(cert, index)** - Certification items
- **card(data, layout)** - Polymorphic card (project/note/resource)
- **skeleton(type)** - Loading skeletons

### Header (`header.js`)

- **headerHTML** - Navigation markup
- **initMobileMenu()** - Mobile menu functionality
- **setActiveNavLink()** - Highlight current page in nav

### Footer (`footer.js`)

- **footerHTML** - Footer markup with links and info

### Icons (`icons.js`)

- **ICONS** - Object containing SVG icon strings (map, grad, code, bolt)

## Migration

Files updated to use the new structure:

- `app.js` - Uses `initComponents`
- `view.js` - Uses `templates`
- `viewUtils.js` - Uses `templates`

The old `components.js` file is deprecated and can be removed once all dependencies are migrated.
