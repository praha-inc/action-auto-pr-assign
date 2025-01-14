# action-auto-pr-assign

[![license](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/praha-inc/action-auto-pr-assign/blob/main/LICENSE)
[![Github](https://img.shields.io/github/followers/praha-inc?label=Follow&logo=github&style=social)](https://github.com/orgs/praha-inc/followers)

This action assigns reviewers to the pull request only created by the user.

## 👏 Getting Started

Create a workflow file under ```.github/workflows``` directory.

```yaml
name: Assign Reviewer
on:
  pull_request_target:
    types: [opened]

jobs:
  auto-pr-assign:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: praha-inc/action-auto-pr-assign@v1.2.0
        with:
          exclude: |
            dependabot[bot]
            renovate[bot]
          reviewers: |
            octocat
          token: ${{ secrets.GITHUB_TOKEN }}
```

## 🔧 Configurations

### `exclude`

If the author of the pull request is included in the list, the action will not assign reviewers.

### `reviewers`

The action assigns reviewers to the pull request.

## 🤝 Contributing

Contributions, issues and feature requests are welcome.

Feel free to check [issues page](https://github.com/praha-inc/action-auto-pr-assign/issues) if you want to contribute.

## 📝 License

Copyright © 2020 [PrAha](https://www.praha-inc.com/).

This project is [```MIT```](https://github.com/praha-inc/action-auto-pr-assign/blob/main/LICENSE) licensed.
