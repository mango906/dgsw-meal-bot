const { RTMClient } = require("@slack/client");
const axios = require("axios");
const moment = require("moment");

const botAPIToken = "{YOUR_API_TOKEN}";
const { apiServerPath } = require("./config");

const token = process.env.SLACK_TOKEN || botAPIToken;

const rtm = new RTMClient(token);

rtm.start();

rtm.on("message", message => {
  var text = message.text;

  if (text.includes("아침")) {
    if (text === "아침") {
      axios.get(`${apiServerPath}/today`).then(async res => {
        const { meal } = res.data.data;
        const msg = meal.breakfast.menu;
        rtm.sendMessage(replaceChar(msg), message.channel);
      });
    } else {
      if (!text.includes(" ")) return;
      axios.get("http://dodam.b1nd.com/api/v1/meal").then(res => {
        const { meal } = res.data.data;
        let date = text.replace(" 아침", "");

        const msg = dateOfMeal(meal, convertDate(date), "아침");
        rtm.sendMessage(replaceChar(msg), message.channel);
      });
    }
  }

  if (text.includes("점심")) {
    if (text === "점심") {
      axios.get("http://dodam.b1nd.com/api/v1/meal/today").then(async res => {
        const { meal } = res.data.data;
        const msg = meal.lunch.menu;
        rtm.sendMessage(replaceChar(msg), message.channel);
      });
    } else {
      if (!text.includes(" 점심")) return;
      axios.get("http://dodam.b1nd.com/api/v1/meal").then(res => {
        const { meal } = res.data.data;
        let date = text.replace(" 점심", "");

        const msg = dateOfMeal(meal, convertDate(date), "점심");
        rtm.sendMessage(replaceChar(msg), message.channel);
      });
    }
  }

  if (text.includes("저녁")) {
    if (text === "저녁") {
      axios.get("http://dodam.b1nd.com/api/v1/meal/today").then(async res => {
        const { meal } = res.data.data;
        const msg = meal.dinner.menu;
        rtm.sendMessage(replaceChar(msg), message.channel);
      });
    } else {
      if (!text.includes(" 저녁")) return;
      axios.get("http://dodam.b1nd.com/api/v1/meal").then(res => {
        const { meal } = res.data.data;
        let date = text.replace(" 저녁", "");

        const msg = dateOfMeal(meal, convertDate(date), "저녁");
        rtm.sendMessage(replaceChar(msg), message.channel);
      });
    }
  }

  if (text.includes("급식")) {
    if (text === "급식") {
      axios.get("http://dodam.b1nd.com/api/v1/meal/today").then(res => {
        const { meal } = res.data.data;
        const msg =
          `-----------아침----------- \n ${meal.breakfast.menu} \n\n` +
          `-----------점심----------- \n ${meal.lunch.menu} \n\n` +
          `-----------저녁----------- \n ${meal.dinner.menu}`;
        rtm.sendMessage(replaceChar(msg), message.channel);
      });
    } else {
      axios.get("http://dodam.b1nd.com/api/v1/meal").then(res => {
        const { meal } = res.data.data;
        const date = message.text.replace(" 급식", "");
        const msg = dateOfMeal(meal, convertDate(date), "급식");
        rtm.sendMessage(replaceChar(msg), message.channel);
      });
    }
  }

  if (text.includes("상희")) {
    rtm.sendMessage("바보", message.channel);
  }

  if (text.includes("바보")) {
    rtm.sendMessage("상희", message.channel);
  }
});

const dateOfMeal = (meal, date, type) => {
  const data = meal.filter(el => el.date == date);

  if (!data.length) return "날짜 제대로 입력해요 ㅡㅡ";
  else if (!data[0].exists) return "급식이 업소용";
  else {
    if (type === "아침") return data[0].breakfast;
    else if (type === "점심") return data[0].lunch;
    else if (type === "저녁") return data[0].dinner;
    else if (type === "급식") {
      const msg =
        `-----------아침----------- \n ${data[0].breakfast} \n\n` +
        `-----------점심----------- \n ${data[0].lunch} \n\n` +
        `-----------저녁----------- \n ${data[0].dinner}`;
      return msg;
    } else return "에러 발생!! 그냥 다이어트 하세요.";
  }
};

const convertDate = text => {
  if (text === "내일")
    return moment(new Date())
      .add(1, "days")
      .format("YYYY-MM-DD");
  else if (text === "모레")
    return moment(new Date())
      .add(2, "days")
      .format("YYYY-MM-DD");
  else return text;
};

const replaceChar = string => {
  return string.replace(/<br\/>/g, "\n");
};
