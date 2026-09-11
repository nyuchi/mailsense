# MailSense - AI Email Intelligence

![MailSense Logo](icon128.png)

**Transform Gmail with AI-powered tabs, smart categorization, and intelligent email insights.**

MailSense is a Chrome extension that brings artificial intelligence to your Gmail experience, helping you organize, prioritize, and manage your emails more efficiently.

## 🚀 Features

- **AI-Powered Email Categorization**: Automatically sort emails into intelligent categories
- **Smart Tabs**: Organize your inbox with AI-driven tab system
- **Email Intelligence**: Get insights about your email patterns and productivity
- **Gmail Integration**: Seamlessly integrates with Gmail interface
- **Productivity Analytics**: Track and improve your email management efficiency

## 📦 Installation

### From Chrome Web Store

1. Visit the Chrome Web Store (coming soon)
2. Click "Add to Chrome"
3. Confirm the installation

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. The MailSense extension should now appear in your extensions

## 🛠️ Development

### Prerequisites

- Node.js 16+
- Chrome browser
- Gmail account

### Setup

```bash
# Clone the repository
git clone https://github.com/nyuchitech/mailsense-extension.git
cd mailsense-extension

# Install dependencies
npm install

# Validate the extension
npm run validate

# Package for distribution
npm run package
```

### Loading in Chrome

1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the project directory

## 📁 Project Structure

```
mailsense-extension/
├── manifest.json          # Extension manifest
├── background.js          # Service worker
├── content.js            # Content script for Gmail
├── ai-service.js         # AI intelligence service
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── options.html          # Options/settings page
├── options.js            # Options functionality
├── styles.css            # Extension styles
├── welcome.html          # Welcome/onboarding page
├── ICONS.md              # Icon documentation
└── README.md             # This file
```

## 🔧 Configuration

Access extension options by:

1. Right-clicking the MailSense icon
2. Selecting "Options"
3. Configure your AI preferences and email categories

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with Gmail
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/nyuchitech/mailsense-extension/issues)
- **Email**: <hello@nyuchi.com>
- **Documentation**: [Wiki](https://github.com/nyuchitech/mailsense-extension/wiki)

## 🏢 About Nyuchi

MailSense is developed by [Nyuchi Web Services](https://nyuchi.com), a technology company focused on AI-powered productivity tools.

---

**Made with ❤️ by [Nyuchi Web Services](https://nyuchi.com)**
