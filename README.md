# Level 100 Studios 🎮

Parent organization — shared components, design system, branding, and documentation hub.

## Design System

### Components

```jsx
import { Button, Card, Input, Avatar, Badge, Modal, ModalHeader, ModalBody, ModalFooter } from '@level100/studios';

// Button
<Button variant="primary" size="medium" onClick={handleClick}>
  Click me 🐾
</Button>

// Card
<Card variant="elevated">
  <CardHeader>Title</CardHeader>
  <CardBody>Content here</CardBody>
  <CardFooter>
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Save</Button>
  </CardFooter>
</Card>

// Avatar
<Avatar state="thinking" size="large" />

// Badge - Status indicator
<Badge variant="success">Active</Badge>
<Badge variant="error" size="small">Failed</Badge>
<Badge variant="primary" pill>New</Badge>

// Badge - Dot indicator
<Badge variant="success" dot />  {/* Online status */}
<Badge variant="warning" dot size="small" />  {/* Warning state */}

// Modal - Basic usage
<Modal isOpen={isOpen} onClose={handleClose} size="medium">
  <ModalHeader>
    <h2>Confirm Action</h2>
  </ModalHeader>
  <ModalBody>
    <p>Are you sure you want to proceed? This action cannot be undone.</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={handleClose}>Cancel</Button>
    <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>

// Modal - Fullscreen for detailed content
<Modal isOpen={isOpen} onClose={handleClose} size="fullscreen">
  <ModalHeader>
    <h2>Detailed View</h2>
  </ModalHeader>
  <ModalBody>
    {/* Large content here */}
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={handleClose}>Close</Button>
  </ModalFooter>
</Modal>
```

### Design Tokens

```js
import tokens from '@level100/studios/design-tokens';

// Colors
console.log(tokens.colors.primary[500]); // #6366f1

// Typography
console.log(tokens.typography.fontSize.lg); // 1.125rem

// Spacing
console.log(tokens.spacing[4]); // 1rem
```

## Brand

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Primary 500 | `#6366f1` | Main brand color |
| Primary 400 | `#818cf8` | Hover states |
| Secondary 400 | `#a78bfa` | Accents |
| Dark BG | `#0f172a` | Background |
| Dark Surface | `#1e293b` | Cards, surfaces |

### Voice

- **Confident** but not arrogant
- **Capable** but approachable
- **Tech-forward** but human

See [brand/guidelines.md](./brand/guidelines.md)

## Structure

```
.
├── components/          # React components
│   ├── Button/
│   ├── Card/
│   ├── Input/
│   ├── Avatar/
│   ├── Badge/          # Status indicators and labels
│   └── Modal/          # Dialog and overlay component
├── design-tokens/       # Colors, typography, spacing
├── brand/              # Logo, guidelines, voice
└── docs/               # Documentation
```

## Related

- [MasterClawInterface](https://github.com/TheMasterClaw/MasterClawInterface)
- [masterclaw-infrastructure](https://github.com/TheMasterClaw/masterclaw-infrastructure)
- [masterclaw-core](https://github.com/TheMasterClaw/masterclaw-core)

---

*Level 100 — Maxed out and ready.* 🐾
