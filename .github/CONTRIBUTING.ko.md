# React-hooks Contributing 가이드

커뮤니티의 모든 분들의 Contribution을 환영합니다.
[영어](https://github.com/Rapiders/react-hooks/tree/main/.github/CONTRIBUTING.md)와 한국어 중 편한 언어를 사용하면 됩니다.

## 테스트 코드 정책

라이브러리의 품질을 보증하기위해 다음의 정책이 적용됩니다.
하나의 기능에 대해

1. branches의 coverage는 80%를 넘어야합니다. (추후 개선 100%로 변경예정)
2. functions의 coverage는 80%를 넘어야합니다. (추후 개선 100%로 변경예정)
3. lines는 반드시 100%여야합니다.

해당 정책을 만족하지 못하는 경우 `git push`가 이뤄지지 않습니다.

## Fork

1.  기여하고 싶은 경우 우선 이 레포지토리를 fork 합니다.
2.  npm install을 진행합니다.
3.  작업이 완료되었다면 main 브랜치로 PR을 오픈합니다.
4.  merge 되기 위해서는 반드시 maintainer 중 한 명이 이상의 approve를 받아야 합니다.

## Issue

라이브러리에 기여하는 방법:

1. 문서 개선하기 (README.md 또는 Storybook)
2. 이슈 탭에 버그 신고하기
3. 새로운 기능이나 패키지 요청하기(테스트코드 추가하기)
4. 이슈의 todo 목록에서 할당받기

## Pull Request

### Commit Convention

```
<type> : <description>

(body)

(#issue number)
```

괄호부분은 생략될 수 있습니다.

배포된 코드를 변경하는 경우

- feat
- fix
- refactor

배포된 코드를 변경하지 않는 경우

- docs (Storybook 이나 README)
- test

이외 모든 변경

- chore

### feature

#### 시작하기

feature 이슈를 생성한 후, 원한다면 해당 이슈를 할당받을 수 있습니다.

작업을 완료한 경우, `index.tsx`에 추가하고 싶은 훅(기능)의 구현체를 export해주세요.

### Storybook & Docs & Test

기능을 추가하는 경우 `Storybook 컴포넌트`, `README 문서`, 그리고 `테스트 코드`를 포함해야 합니다. 추가하고 싶지 않은 경우, 반드시 Issue의 feature 섹션에 남은 할 일을 남겨주세요.

Storybook 컴포넌트를 작성할 때, CSS는 vanilla-extract를 사용합니다.
