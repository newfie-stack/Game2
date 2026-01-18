# GitHub Copilot Instructions for Game2

This file provides guidelines and instructions for GitHub Copilot coding agent when working on this repository.

## Project Overview

Game2 is a game development project. This repository is in its early stages and will be developed using modern JavaScript/TypeScript practices.

## Project Structure

```
Game2/
├── .github/              # GitHub configuration and workflows
├── .gitignore           # Git ignore rules
└── README.md            # Project documentation
```

## Technology Stack

- **Primary Language**: JavaScript/TypeScript (Node.js)
- **Package Manager**: npm or yarn
- **Version Control**: Git

## Code Style Guidelines

### General Principles
- Write clean, readable, and maintainable code
- Follow established JavaScript/TypeScript best practices
- Use meaningful variable and function names
- Add comments only when necessary to explain complex logic
- Keep functions small and focused on a single responsibility

### JavaScript/TypeScript Specific
- Use `const` by default, `let` when reassignment is needed, avoid `var`
- Use arrow functions for callbacks and short functions
- Prefer template literals over string concatenation
- Use async/await over raw promises for better readability
- Use modern ES6+ features appropriately

### Formatting
- Use 2 spaces for indentation
- Use single quotes for strings (unless template literals are needed)
- Always use semicolons
- Max line length: 100 characters
- Use trailing commas in multi-line arrays and objects

## Git Workflow

### Branches
- `main` - Production-ready code
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Commit Messages
Follow conventional commits format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `refactor:` - Code refactoring without feature changes
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependency updates

Example: `feat: add player movement system`

### Pull Requests
- Provide clear PR titles and descriptions
- Reference related issues
- Ensure all tests pass before requesting review
- Keep PRs focused and reasonably sized

## Commands

> **Note**: The following are example commands that should be configured in `package.json` as the project develops. Update these scripts based on the actual project setup.

### Setup
```bash
npm install          # Install dependencies
```

### Development
```bash
npm start           # Start development server
npm run dev         # Run in development mode
```

### Testing
```bash
npm test            # Run all tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Building
```bash
npm run build       # Build for production
npm run lint        # Run linter
npm run format      # Format code
```

## Testing Guidelines

- Write tests for all new features
- Maintain or improve test coverage
- Use descriptive test names that explain the expected behavior
- Follow AAA pattern: Arrange, Act, Assert
- Mock external dependencies appropriately

## File Organization

### Naming Conventions
- Use **camelCase** for variables and functions: `playerHealth`, `calculateScore()`
- Use **PascalCase** for classes and components: `Player`, `GameEngine`
- Use **kebab-case** for file names: `player-controller.js`, `game-engine.ts`
- Use **UPPER_CASE** for constants: `MAX_PLAYERS`, `DEFAULT_SPEED`

### Directory Structure Guidelines
> **Note**: These conventions should be established as the project structure evolves.

- Group related files together by feature
- Keep configuration files in the root directory
- Place source code in `src/` directory
- Place tests alongside source files or in `__tests__/` directories

## Boundaries and Restrictions

### Do Not Modify
- `.git/` - Git internal files
- `node_modules/` - Dependency files (managed by package manager)
- `dist/` or `build/` - Built artifacts
- `.env` files - Environment configuration (use `.env.example` as template)

### Security
- Never commit secrets, API keys, or credentials
- Use environment variables for sensitive configuration
- Validate and sanitize all user inputs
- Follow OWASP security best practices

## Documentation

- Keep README.md up to date with project setup and usage instructions
- Document public APIs and complex functions with JSDoc comments
- Update this instructions file as the project evolves
- Include inline comments for complex algorithms or business logic

## Dependencies

### Adding Dependencies
- Prefer well-maintained, popular packages
- Check package size and bundle impact
- Review security advisories before adding
- Keep dependencies up to date
- Document why each dependency is needed

## Code Review Standards

### What to Look For
- Code correctness and logic errors
- Test coverage and quality
- Security vulnerabilities
- Performance implications
- Code readability and maintainability
- Adherence to project conventions

### Review Process
- Be respectful and constructive
- Ask questions to understand intent
- Suggest improvements, don't just criticize
- Approve when standards are met

## Best Practices for Copilot Coding Agent

When working on tasks in this repository:

1. **Understand Before Changing**: Review existing code and patterns before making changes
2. **Minimal Changes**: Make the smallest possible changes to achieve the goal
3. **Test Your Changes**: Always run tests after making code changes
4. **Follow Conventions**: Adhere to the established patterns and style in the codebase
5. **Document When Needed**: Update documentation if your changes affect usage or setup
6. **Ask for Clarification**: If requirements are unclear, ask before implementing
7. **Security First**: Always consider security implications of your changes
8. **Incremental Progress**: Break large tasks into smaller, testable increments

## Additional Resources

- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript reference
- [Node.js Documentation](https://nodejs.org/docs/) - Node.js API reference
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide
- [GitHub Copilot Best Practices](https://docs.github.com/en/copilot/tutorials/coding-agent/get-the-best-results)

---

**Note**: This instructions file should be updated as the project grows and conventions are established. Keep it accurate and relevant to ensure Copilot provides the best assistance.
