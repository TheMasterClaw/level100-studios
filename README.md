# Level 100 Studios 🎮

Parent organization — shared components, design system, branding, and documentation hub.

## Design System

### Components

```jsx
import { 
  Button, Card, Input, Select, Switch, Avatar, Badge, 
  Modal, ModalHeader, ModalBody, ModalFooter, 
  Tooltip, ToastProvider, useToastContext, Spinner 
} from '@level100/studios';

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

// Select - Basic dropdown
<Select
  label="Choose a model"
  value={selectedModel}
  onChange={setSelectedModel}
  options={[
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5', label: 'GPT-3.5 Turbo' },
    { value: 'claude', label: 'Claude 3' },
  ]}
  placeholder="Select a model..."
/>

// Select - With icons and clear button
<Select
  label="Environment"
  value={env}
  onChange={setEnv}
  options={[
    { value: 'dev', label: 'Development', icon: '🔧' },
    { value: 'staging', label: 'Staging', icon: '🧪' },
    { value: 'prod', label: 'Production', icon: '🚀' },
  ]}
  clearable
/>

// Select - Searchable
<Select
  label="Search users"
  value={userId}
  onChange={setUserId}
  onSearch={handleUserSearch}
  options={users}
  searchable
  placeholder="Type to search..."
/>

// Switch - Basic toggle
<Switch
  checked={darkMode}
  onChange={setDarkMode}
  label="Dark Mode"
/>

// Switch - With helper text and sizes
<Switch
  checked={notifications}
  onChange={setNotifications}
  label="Enable Notifications"
  helperText="Receive alerts about important events"
  size="medium"
/>

<Switch
  checked={autoSave}
  onChange={setAutoSave}
  label="Auto-save"
  size="small"
/>

<Switch
  checked={betaFeatures}
  onChange={setBetaFeatures}
  label="Beta Features"
  size="large"
  labelPosition="left"
/>

// Switch - Loading and disabled states
<Switch
  checked={syncEnabled}
  onChange={setSyncEnabled}
  label="Sync Data"
  loading={isSyncing}
/>

<Switch
  checked={featureFlag}
  onChange={setFeatureFlag}
  label="Premium Feature"
  disabled={!isPremium}
  helperText="Upgrade to enable this feature"
/>

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

// Tooltip - Basic usage
<Tooltip content="Click to save your changes">
  <Button variant="primary">Save</Button>
</Tooltip>

// Tooltip - Different placements
<Tooltip content="Appears above" placement="top">
  <span>Hover me (top)</span>
</Tooltip>
<Tooltip content="Appears below" placement="bottom">
  <span>Hover me (bottom)</span>
</Tooltip>
<Tooltip content="Appears to the left" placement="left">
  <span>Hover me (left)</span>
</Tooltip>
<Tooltip content="Appears to the right" placement="right">
  <span>Hover me (right)</span>
</Tooltip>

// Tooltip - Variants
<Tooltip content="Default style tooltip" variant="default">
  <Button variant="secondary">Default</Button>
</Tooltip>
<Tooltip content="Light background tooltip" variant="light">
  <Button variant="secondary">Light</Button>
</Tooltip>
<Tooltip content="Dark background tooltip" variant="dark">
  <Button variant="secondary">Dark</Button>
</Tooltip>
<Tooltip content="Success!" variant="success">
  <Badge variant="success">✓</Badge>
</Tooltip>
<Tooltip content="Something went wrong" variant="error">
  <Badge variant="error">✗</Badge>
</Tooltip>

// Toast - Wrap app with ToastProvider
function App() {
  return (
    <ToastProvider position="top-right" maxToasts={5}>
      <YourApp />
    </ToastProvider>
  );
}

// Toast - Use in any component
function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo } = useToastContext();
  
  const handleSave = async () => {
    try {
      await saveData();
      showSuccess('Changes saved successfully');
    } catch (err) {
      showError('Failed to save changes');
    }
  };
  
  return <Button onClick={handleSave}>Save</Button>;
}

// Toast - With titles and custom duration
showSuccess('Profile updated', 'Success!', { duration: 3000 });
showError('Connection failed', 'Network Error', { duration: 10000 });
showWarning('Session expires in 5 minutes');
showInfo('New version available', 'Update', { duration: 8000 });

// Spinner - Loading indicator
<Spinner />                                    // Default medium spinner
<Spinner size="small" />                       // Small spinner for inline use
<Spinner size="large" />                       // Large spinner for page loading
<Spinner variant="primary" />                  // Primary color spinner
<Spinner variant="success" label="Saving..." /> // With label
<Spinner centered />                           // Centered in container
<Spinner variant="light" centered label="Loading..." /> // Light variant, centered with label

// Progress - Completion status indicator
<Progress value={45} />                        // Basic progress (45%)
<Progress value={75} showLabel />              // With percentage label
<Progress value={30} label="Uploading..." />   // Custom label text
<Progress value={100} variant="success" label="Complete!" /> // Success state
<Progress indeterminate label="Processing..." /> // Indeterminate mode
<Progress value={60} striped animated />       // Striped animated bar
<Progress value={50} size="small" />           // Small size
<Progress value={50} size="large" showLabel /> // Large size with label
<Progress value={25} variant="warning" />      // Warning color
<Progress value={90} variant="error" />        // Error color

// Skeleton - Loading placeholder
<Skeleton />                                   // Basic text skeleton
<Skeleton width="60%" height={20} />          // Custom dimensions
<Skeleton variant="circle" size={40} />       // Circle (avatar placeholder)
<Skeleton.Circle size={50} />                 // Circle shorthand
<Skeleton.Text lines={3} />                   // Multiple text lines
<Skeleton.Card>                               // Card container
  <Skeleton.Circle size={40} />
  <Skeleton width="80%" />
</Skeleton.Card>
<Skeleton.Article hasImage textLines={5} />   // Article layout
<Skeleton.ListItem showAvatar lines={2} />    // List item layout
<Skeleton animated={false} />                 // Disable animation

// Accordion - Collapsible content sections
<Accordion>
  <Accordion.Item id="1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content for section 1</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item id="2">
    <Accordion.Trigger>Section 2</Accordion.Trigger>
    <Accordion.Content>Content for section 2</Accordion.Content>
  </Accordion.Item>
</Accordion>

// Tabs - Tabbed content interface
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content for tab 1</Tabs.Content>
  <Tabs.Content value="tab2">Content for tab 2</Tabs.Content>
  <Tabs.Content value="tab3">Content for tab 3</Tabs.Content>
</Tabs>

// Divider - Visual content separator
<Divider />                                    // Basic horizontal divider
<Divider>OR</Divider>                          // Divider with text
<Divider variant="dashed" />                   // Dashed style
<Divider variant="dotted" />                   // Dotted style
<Divider thickness="thick" />                  // Thick line
<Divider spacing="lg" />                       // Large spacing
<Divider orientation="vertical" />             // Vertical divider
<Divider.Text>Section Title</Divider.Text>     // Text divider shorthand
<Divider.Horizontal spacing="md" />            // Horizontal shorthand
<Divider.Vertical height={100} />              // Vertical shorthand

// Kbd - Keyboard key representation
<Kbd>Enter</Kbd>                               // Single key
<Kbd size="sm">Esc</Kbd>                       // Small key
<Kbd size="lg">Space</Kbd>                     // Large key
<Kbd.Combo>                                    // Key combination
  <Kbd>Ctrl</Kbd>
  <Kbd>C</Kbd>
</Kbd.Combo>
<Kbd.Shortcut cmd>C</Kbd.Shortcut>            // Platform-aware: ⌘C or Ctrl+C
<Kbd.Shortcut shift>Tab</Kbd.Shortcut>        // Shift+Tab
<Kbd.Shortcut cmd shift>S</Kbd.Shortcut>      // ⌘⇧S or Ctrl+Shift+S

// Breadcrumbs - Navigation path indicator
<Breadcrumbs>
  <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
  <Breadcrumbs.Item href="/products">Products</Breadcrumbs.Item>
  <Breadcrumbs.Item current>Item</Breadcrumbs.Item>
</Breadcrumbs>

<Breadcrumbs                           // Data-driven
  items={[
    { label: 'Home', href: '/' },
    { label: 'Category', href: '/category' },
    { label: 'Item', current: true },
  ]}
/>

<Breadcrumbs separator="›">            // Custom separator
  <Breadcrumbs.Item href="/" icon="🏠">Home</Breadcrumbs.Item>
  <Breadcrumbs.Item href="/settings" icon="⚙️">Settings</Breadcrumbs.Item>
</Breadcrumbs>

// Tabs - Vertical orientation
<Tabs orientation="vertical" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Settings</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Profile</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Settings content</Tabs.Content>
  <Tabs.Content value="tab2">Profile content</Tabs.Content>
</Tabs>

// Tabs - Simple data-driven API
<Tabs.Simple
  tabs={[
    { value: '1', label: 'Overview', content: 'Overview content' },
    { value: '2', label: 'Details', content: 'Details content', badge: 3 },
    { value: '3', label: 'Settings', content: 'Settings content', icon: '⚙️' },
  ]}
/>
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
│   ├── Select/         # Dropdown selection component
│   ├── Switch/         # Toggle switch component
│   ├── Avatar/
│   ├── Badge/          # Status indicators and labels
│   ├── Modal/          # Dialog and overlay component
│   ├── Tooltip/        # Hover information tooltips
│   ├── Toast/          # Notification toasts and alerts
│   ├── Spinner/        # Loading indicators
│   ├── Progress/       # Progress bars
│   ├── Skeleton/       # Loading placeholders
│   ├── Accordion/      # Collapsible content sections
│   ├── Tabs/           # Tabbed content interface
│   ├── Divider/        # Visual content separators
│   ├── Kbd/            # Keyboard key representations
│   └── Breadcrumbs/    # Navigation path indicators
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
