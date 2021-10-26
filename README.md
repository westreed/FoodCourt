# Graduation Project (React-Native + Firebase)

This repository was used as a graduation project and submitted before an interview.

## What is this?
* Through the application, students can order food tickets and use them in the food court.
* Food courts can use this application instead of kiosks to reduce paper waste and improve waiting lines.

## Runbook
* React-Native 0.64.1
* Android Studio
* Python
* Node.js

Test Run Command
```js
npm run android
```
```js
react-native run-android
```

## Current Task
1. ~Create a Firebase Login Screen.~
2. ~Improving the screen structure by building a login function.~
3. ~Create a Signup Screen.~
4. Create a Profile Settings Screen.
5. Create a Food Order Screen.
6. ~Create a Search Screen.~
7. Create a Order Screen.
8. Fill in the contents of the Settings Screen.

## Module in Use
┌ react-navigation : RN 네비게이션 모듈로, 앱하단에 있는 네비게이션 바를 제작하는데 사용. <br>
├ @react-navigation/native <br>
├ @react-navigation/bottom-tabs : 하단탭 제작을 위한 모듈. <br>
└ @react-navigation/stack : 네비게이션을 스택구조로 구현해주는 모듈. <br>
┌ react-native-qrcode-scanner : QR코드를 스캔할 수 있는 카메라 모듈. <br>
└ react-native-camera : QR코드 스캐너 모듈을 사용하기 위한 종속모듈. <br>
┌ firebase : 파이어베이스 모듈. <br>
├ react-native-firebase <br>
├ @react-native-firebase/app <br>
└ @react-native-firebase/auth <br>
┌ @react-native-community/masked-view <br>
├ @react-native-community/checkbox : 체크박스를 구현하기 위한 모듈. <br>
└ @react-native-community/blur : 화면을 블러처리하기 위한 모듈. <br>
┌ react-native-svg : SVG 벡터 아이콘을 사용하기 위한 모듈. <br>
└ react-native-svg-transformer : 종속모듈. <br>
─ react-native-keyboard-aware-scroll-view : 키보드 소환시 스크롤 화면으로 전환해주는 모듈. <br>
─ react-native-naver-map : 네이버 지도 모듈. <br>
─ react-native-qrcode : QR코드 생성 모듈. 미지원이라 변경될 수 있음. <br>
─ react-native-make : App 아이콘과 Splash 이미지를 관리하는 모듈. <br>

## Study Link
* [Git과 GitHub](https://brunch.co.kr/@anonymdevoo/3)
* [Git 시작해보기](https://brunch.co.kr/@anonymdevoo/4)
* [성공적인 Git Branch 관리모델](http://amazingguni.github.io/blog/2016/03/git-branch-%EA%B7%9C%EC%B9%99)
* [ReadMe 문서 작성법](https://happybono.wordpress.com/2018/01/03/tip-markdown-%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-readme-%EB%AC%B8%EC%84%9C-%EC%9E%91%EC%84%B1%EB%B2%95/)
* [React Native Docu](https://reactnative.dev/docs/0.64/getting-started)
* [Building a RN Development Environment](https://dev-yakuza.posstree.com/ko/react-native/install-on-windows/)
* [Bottom Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/)
* [React Native Firebase Login Authentication](https://www.youtube.com/watch?v=cFgoSrOui2M)
* [React Native Firebase Docu](https://rnfirebase.io/)
* [React Native AutoLogin & AutoLogout](https://wordbe.tistory.com/entry/React-Native-Auth-%EC%9E%90%EB%8F%99%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%9E%90%EB%8F%99%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83)
* [React Naitve Firebase Login Authentication Code](https://github.com/itzpradip/react-native-firebase-social-app)
* [React Firebase Login Persistence](https://velog.io/@cyongchoi/Firebase-%EB%A1%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-1)
* [JavaScript Syntax](https://blex.me/@baealex/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8javascript-%EA%B8%B0%EB%B3%B8-%EB%AC%B8%EB%B2%95-%EC%A0%95%EB%A6%AC)
* [Firebase Auth ErrorCode](https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#error-codes_3)
* [React Native Image-Modal](https://dev-yakuza.posstree.com/ko/react-native/react-native-image-modal/)
* [React Native Mpas](https://dev-yakuza.posstree.com/ko/react-native/react-native-maps/)
* [ppt제작용 색상추천 사이트](https://colors.lol/)
* [ppt제작용 픽토그램 사이트](https://www.flaticon.com/)
* [JavaScript HashMap](https://m.blog.naver.com/PostView.nhn?blogId=newacadia&logNo=110147183901&proxyReferer=https:%2F%2Fwww.google.com%2F)
* [HashMap으로 중복없는 쿠폰번호 생성하기](https://blog.naver.com/alwaysblue15/221782308244)
* [React Native QRCode Generator](https://github.com/cssivision/react-native-qrcode)
* [React Native에서 App 아이콘 & Splash 이미지 만들기](https://dev-yakuza.posstree.com/ko/react-native/react-native-make/)
* [App Splash 스크린](https://dev-yakuza.posstree.com/ko/react-native/react-native-splash-screen/)

## Screenshot
![텍스트](https://github.com/westreed/FoodCourt/blob/master/screenshot.png)
![회원가입 키보드](https://github.com/westreed/FoodCourt/blob/master/Register%20Keyboard%20Layout.gif)
