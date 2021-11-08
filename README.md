# 2021 졸업작품 프로젝트 (React-Native + Firebase)

이 리포지토리는 졸업작품 프로젝트로 사용되었습니다.

## 목적
* 학생들은 어플리케이션을 통해 음식쿠폰을 주문하고 푸드코트에서 사용할 수 있습니다.
* 키오스크 대신 이 어플리케이션을 사용하여 종이 낭비를 줄이고 대기시간을 개선할 수 있습니다.
* 기존 학식 정보를 제공해 주는 시스템의 불편함을 개선할 수 있습니다.
* 학생들의 학식 접근을 높이기 위한 다양한 홍보 방식 및 피드백을 위한 공간을 제공할 수 있습니다.

## 환경
* React-Native 0.64.1
* Android Studio
* Android SDK 29.0.3
* Python
* Node.js

Test Run Command
```js
npm run android
```
```js
react-native run-android
```

## 작업 진척
1. 주문내역에서 '쿠폰 저장' 및 '구매 취소'기능 제작하기
2. 더보기 화면의 '마이페이지' 제작하기
3. 더보기 화면의 '버전정보' 제작하기
4. 스플래시 제작하기

## 사용된 모듈
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
├ react-native-svg-transformer : 종속모듈. <br>
└ react-native-qrcode-svg : QR코드 생성 모듈. <br>
─ react-native-keyboard-aware-scroll-view : 키보드 소환시 스크롤 화면으로 전환해주는 모듈. <br>
┌ react-native-map : 구글 지도 모듈. <br>
└ react-native-geolocation-service : 사용자의 현재위치 정보를 불러오는 모듈. <br>
─ react-native-make : App 아이콘과 Splash 이미지를 관리하는 모듈. <br>
┌ Buffer : Node.js 에서 제공하는 Binary 의 데이터를 담을 수 있는 Object. <br>
└ buffer-crc32 : 이진데이터(버퍼)를 signed 혹은 unsigned 데이터로 출력해주는 모듈. <br>

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
* [Next Input Focus on React Native](https://dev.to/rvznkmrllh/next-input-focus-on-react-native-2cb9)

## Screenshot
![텍스트](https://github.com/westreed/FoodCourt/blob/master/screenshot.png)
![회원가입 키보드](https://github.com/westreed/FoodCourt/blob/master/Register%20Keyboard%20Layout.gif)
