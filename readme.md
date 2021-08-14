# showpedia

## 배포

[🎈쇼피디아 배포 링크](http://www.showpedia.xyz/)

> Microsoft Azure에서 IaaS 방식으로 가상머신을 만들어 배포하였습니다. 

## 소개

### Showpedia

> 문화 공연 커뮤니티 플랫폼

연뮤덕들을 위한 문화 공연 정보와 커뮤니티 공간을 제공하는 플랫폼입니다.

### 기획의도

국내 공연 시장은 매년 규모가 증가하고 있습니다. 그 규모는 이미 세계 뮤지컬 시장 4위를 차지할 정도입니다.

그에 반해, 취미를 공유할 장소는 많이 부족합니다. 다양한 주제가 섞인 SNS가 아닌 공연만을 다루는 커뮤니티 플랫폼이 필요하다고 생각했습니다.

따라서 사람들이 공연 정보를 쉽게 검색할 수 있고, 공연에 대한 생각을 자유롭게 나눌 수 있는 커뮤니티 플랫폼인 쇼피디아를 만들기로 결정했습니다.

---

## ⏲️개발 기간

- `2021.07.23 ~ 2021.08.05` 약 2주

## 🛠사용 기술

**프론트엔드**

- React
- Redux, React-Redux
- React-router
- React-Bootstrap , Bootstrap5
- React-Quill

**백엔드**

- Node.js
- Sequelize
- express
- MySQL
- passport.js
- jwt

**etc**

- Azure
- Nginx

## ✨기획&설계

- **화면 구성**

    🔹[화면 구성 설계](https://hminah.notion.site/355e9c7083154c8a87cbbc7f8d217973)

- 기능명세서

    🔹[기능명세서](https://hminah.notion.site/3f6a651b7cd14dc893cfb43da8818472)

- DB 명세서

    🔹[DB 명세서](https://hminah.notion.site/DB-dd3533691ba44948835222872a9e14a3)

- API 설계도

    🔹[API 명세서](https://hminah.notion.site/API-dd5240f158ed49d996879fb66dc4faa2)

---

## 👩‍💻역할 분담

- **[현민아](https://github.com/hminah0215)**

  - **인증**

    - 로컬 회원가입, 로컬 로그인, 카카오 OAuth

  - **게시판 페이지**
    - 댓글 CRUD, 게시글 CRUD, 게시글 신고기능, 게시글 카테고리별 리스트, Quill 에디터

- **[안아영](https://github.com/12Ahn22)**

  - **메인 페이지**

    - 공연 박스오피스 정보 제공

  - **공연 페이지**

    - 공연 검색 기능, 공연 상세정보 제공

  - **리뷰 페이지**

    - 리뷰 CRUD, 리뷰 좋아요 기능, 리뷰 신고 기능

  - **CSS, 리액트 컴포넌트 전체 정리**

## 기능 GIF


| 메인페이지 |
| --- |
|![메인페이지](http://drive.google.com/uc?export=view&id=14LObIyr0-SDi0m4C02bFOwP2LPgigf1d) | 

| 로컬회원가입 | 로컬로그인 |
| --- | --- |
| <img src='http://drive.google.com/uc?export=view&id=1xNrdZPNAPcOiggWXJEmyALp4JToYlwRf' /> | <img src='http://drive.google.com/uc?export=view&id=1xNrdZPNAPcOiggWXJEmyALp4JToYlwRf' /> |

| 카카오 로그인 |
| --- |
|![카카오로그인](http://drive.google.com/uc?export=view&id=1WpB_NB_y0DdchDWHcJ83DH1ydgh-725v) | 


| 조건 검색 | 검색 결과 X |
| --- | --- |
|<img src='http://drive.google.com/uc?export=view&id=10DbgCXMdvLpqHs0pmbSUj4BvqDQpkRTw' /> | <img src='http://drive.google.com/uc?export=view&id=1gR3vMZWFmhbVNcK0J2_95u6VImuNziEh' /> |

| 리뷰 작성 | 리뷰 수정 | 리뷰 삭제 | 리뷰 좋아요 |
| --- | --- | --- | --- |
|<img src='http://drive.google.com/uc?export=view&id=1Pdd-Q5vQOOw8TTXHNyMBfFVmIjqAul-S' /> | <img src='http://drive.google.com/uc?export=view&id=1xDDI1uKduOPwaKgW1PkGzv0iBrr8Am0E' /> | <img src='http://drive.google.com/uc?export=view&id=1zI4M0cMIAh-ENU9iIZ5ktrAb7yu0kN5j' /> | <img src='http://drive.google.com/uc?export=view&id=1SWsFDy6B5qnNkwwVbydxqIGHULxkV6sq' /> |
 
| 게시글 작성 | 게시글 수정 | 게시글 삭제 | 게시글 신고 |
| --- | --- | --- | --- |
| <img src='http://drive.google.com/uc?export=view&id=1I6y8NP3EQxuxxQ7bunRsk3uaEpyi4V3n' /> | <img src='http://drive.google.com/uc?export=view&id=1SFL9ewidk3nYhHMxr0duVizYBWGIJnXg' /> |<img src='http://drive.google.com/uc?export=view&id=1afvOsWA0t1MUY5f4IWU7JQJVHFh7ceIu' /> | <img src='http://drive.google.com/uc?export=view&id=1guOKgkj5D7FnJhQmze1M93WW5hi5liui' />|

| 댓글 작성 | 댓글 수정 | 댓글 삭제 | 
| --- | --- | --- | 
|<img src='http://drive.google.com/uc?export=view&id=1xdUp9-vTe96sTm0-TCXyqoSAypyuPdxO' />| <img src='http://drive.google.com/uc?export=view&id=1GcFlWFOH_XACcNRNbvGbEAU3slCWaiOD' /> | <img src='http://drive.google.com/uc?export=view&id=1Hv8HTzCUPRzSFYS9H3tanum3jCnW0JIj' />|

 



## 후기

- **현민아**

  짧다면 짧은 2주간의 프로젝트 작업 시간동안 프로젝트 기획부터 개발까지 잘 마무리하고 완성했다고 생각합니다.

  전체 기간이 짧아서 초기에 기획했던 기능을 줄여나가게 되었지만, 주요기능들은 완성할 수 있어서 만족스러웠습니다.

  리액트는 특히 일주일 가량 배운 후 바로 프로젝트를 시작하게 되어 걱정이 많았으나, 프론트단 작업 진행시에 react 경험자인 팀원의 도움이 더해져서 걱정과 달리 좋은 결과물을 낼 수 있었던것 같아요. 코로나 상황이 심해져서 온라인으로 소통하며 작업을 진행하였는데, 오히려 시간에 제약을 받지않고 실시간으로 화면 공유 및 음성채팅 등으로 소통하며 진행할 수 있었던 점도 좋았습니다.

- **안아영**

  짧은 프로젝트 기간임에도 주요 기능을 완성할 수 있어서 기뻤습니다.

  다만, 2주라는 너무 짧은 시간이였기때문에, 전체적인 개발 과정 하나하나에 시간을 오래 쓰지 못한 점이 매우 아쉽습니다. 특히, 프로젝트를 진행하면서 기획 과정이 얼마나 중요한 지를 크게 깨닫게 되는 좋은 경험이였습니다.

  코로나 상황으로 직접 만나서 함께 프로젝트를 진행하지 못했지만, 디스코드를 사용해 화면을 공유하고 서로 소통하면서 프로젝트를 진행했습니다. 간접적으로 재택 근무를 하는 기분이여서 재미있었습니다.

---

## 시연 영상
[영상 링크](https://www.youtube.com/watch?v=lWJo7KoLkz4)
