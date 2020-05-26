# 슬랙 급식 알리미

## ☠주의☠
### 이 프로그램 코드는 난잡합니다.
### 오류가 많을 수도 있습니다. PR 환영합니다. 피드백 환영합니다.

## Stack
- Node.js


## 사용 방법

### 실행

#### 1. 프로젝트 클론
```
   $ git clone https://github.com/mango906/meal-bot
```


#### 2. 모듈 설치
```
   $ yarn install
```

#### 3. 실행
```
   $ node app.js
```

### 봇 만들기 및 토큰 생성

#### 1. 자신이 속한 Slack > Administration > Manage Apps > Custom Integrations > Bots

![Image 1](/img/2.png)

![Image 2](/img/1.png)

#### 2. Add to Slack > username 입력 후 Add bot integration 클릭

<br />

#### 3. 토큰을 복사해 잘 저장합니다.
![Image 3](/img/3.png)

#### 4. 프로필 사진도 바꿀수 있습니다. gif는 안되더군요
**저장하는거 잊지 마세요!**
![Image 4](/img/4.png)

#### 5. app.js 5번째 줄의 토큰 값을 변경해줍니다.

```javascript
   const botAPIToken = "{YOUR_API_TOKEN}";
```

### 6. 원하는 채널에 Bot을 추가해줍니다.
![Image 5](/img/5.png)


## 완성입니다! 이제 Bot이 여러분을 도와줄거에요!



## 입력 폼
```급식```

![Image 6](/img/6.png)
<p style="opacity: 0.65">오늘의 아침, 점심, 저녁을 불러옵니다.</p>


```아침, 점심, 저녁```

![Image 7](/img/7.png)
<p style="opacity: 0.65">오늘의 아침을 불러옵니다. 점심, 저녁도 가능합니다!</p>

```내일, 모레```

![Image 8](/img/8.png)
<p style="opacity: 0.65">내일, 모레의 식사를 불러옵니다. 점심, 저녁, 급식도 가능합니다! 어제, 아레꺼는... 필요할까요...?</p>

```YYYY-MM-DD``` 

![Image 9](/img/9.png)

<p style="opacity: 0.65">지정된 날짜의 급식을 불러옵니다. 아침, 점심, 저녁도 가능합니다! 아쉽게도 YYYY-MM-DD의 형태만 불러올수 있어요.. 이 달의 메뉴만 불러올 수 있어요.</p>

```급식이 없을 때```

![Image 10](/img/10.png)
<p style="opacity: 0.65">주말이든, 공휴일이든 급식이 없을수가 있죠. 급식이 업소용</p>



## 오류
![Image 10](/img/err.png)

<p style="opacity: 0.65">이렇게 예기치 않은 오류가 발생할 수 있어요. 많이 많이 찾아주세요.</p>
