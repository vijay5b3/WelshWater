# Contributing to Welsh Government Data Chatbot

Thank you for your interest in contributing! 

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit: `git commit -m "Add: description of changes"`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Guidelines

### Code Style
- Use TypeScript
- Follow existing code formatting
- Use meaningful variable names
- Add comments for complex logic

### Widget Development
- Place custom widgets in `client/your-extensions/widgets/`
- Follow ArcGIS Experience Builder widget structure
- Update manifest.json with widget metadata

### Testing
Test your changes with these scenarios:
- Basic commands (zoom, print, layers)
- School queries (by town, postcode, code)
- Navigation (addresses, postcodes)
- Edge cases (invalid inputs, empty results)
- Welsh language queries

### Commit Messages
Use clear, descriptive commit messages:
- `Add: new feature description`
- `Fix: bug description`
- `Update: what was updated`
- `Refactor: code improvement description`

## Pull Request Process

1. Update README.md if needed
2. Test all existing functionality
3. Describe your changes in PR description
4. Link related issues
5. Wait for review

## Questions?

Open an issue for:
- Bug reports
- Feature requests
- Questions about the code
- Documentation improvements

## Code of Conduct

- Be respectful
- Be constructive
- Focus on the code, not the person
- Help others learn

Thank you for contributing! 🙏
