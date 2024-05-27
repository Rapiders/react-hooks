# Contributing to React-hooks

We welcome contribution from everyone in the community.
you can use English and [Korean](https://github.com/Rapiders/react-hooks/tree/main/.github/CONTRIBUTING.ko.md)

## Issue

You can contribute to library via:

1. Improving our docs (README.md or Storybook)
2. Reporting a bug in our issues tab
3. Requesting a new feature or package (adding test code)
4. Having a look at our issue list to see what's to be fixed

## Pull Request

### Commit Convention

```
<type> : <description>

(body)

(#issue number)
```

The part in parentheses is optional.

If you change the deployed code

- feat
- fix
- refactor

If you do not change the deployed code

- docs (Storybook or README)
- test

ETC

- chore

### feature

#### How to start

When requesting a feature, you can create an issue and then be assigned to that issue.

If you have completed your work, please export the implementation of the feature you want to add in `index.tsx`.

#### Storybook & Docs & Test

When adding a feature, you must include `Storybook components`, `update README.md`, and `test code`. If you prefer not to add them, please leave a task in the Issue's feature section.

When writing Storybook components, use vanilla-extract for CSS.
