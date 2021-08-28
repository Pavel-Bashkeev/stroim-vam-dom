if(document.querySelector('.quiz')){
  const quizData = [{
    number: 1,
    title: "Какой дом Вы предпочитаете?",
    answer_alias: "money",
    answers: [{
      answer_title: "Из бруса",
      urlImg: "./images/dest/domBrus.webp",
      type: "checkbox",
    },
    {
      answer_title: "Из блоков",
      urlImg: "./images/dest/domBlock.webp",
      type: "checkbox",
    },
    ],
  },
  {
    number: 2,
    title: "Какой размер дома Вам подходит",
    answer_alias: "great",
    answers: [{
      answer_title: "10м на 10м",
      urlImg: "./images/dest/plan10.webp",
      type: "radio",
    },
    {
      answer_title: "8м на 8м",
      urlImg: "./images/dest/plan8.webp",
      type: "radio",
    },
    {
      answer_title: "10м на 6м",
      urlImg: "./images/dest/plan6.webp",
      type: "radio",
    },
    ],
  },
  {
    number: 3,
    title: "Оставьте свой телефон, мы вам перезвоним",
    answer_alias: "phone",
    answers: [{
      answer_title: "Введите телефон",
      type: "tel",
    },],
  },
  ];
  
  const quizTemplate = (data = [], dataLength = 0, options) => {
    const {
      number,
      title
    } = data;
    const {
      nextBtnText
    } = options;
    const answers = data.answers.map((item) => {
      return `
        <label class="quiz-question__label">
          ${item.urlImg !== undefined ? `<img class="quiz-question__viewHouse" src="${item.urlImg}" />` : ''}
          <div class="quiz-question__info">
            <input 
            type="${item.type}" 
            data-valid="false" 
            class="quiz-question__answer ${item.type !== "tel" ? "checkbox-hide" : ''}"
            name="${data.answer_alias}" 
            ${item.type == "tel" ? 'placeholder="Введите ваш телефон"' : ""} 
            value="${item.type !== "tel" ? item.answer_title : ""}" />
            ${item.type !== "tel" ? `<span class="quiz-question__checkbox"></span> <span>${item.answer_title}</span>` : ""}
            
          </div>
        </label>
      `;
    });
  
    return `
      <div class="quiz__content">
        <div class="quiz-question">
          <h3 class="quiz-question__title">${title}</h3>
          <div class="quiz-question__answers">
            ${answers.join("")}
          </div>
        </div>
        <div class="quiz-navigation">
          <div class="quiz__questions">${number} из ${dataLength}</div>
          <button type="button" class="quiz-question__btn btn-reset" data-next-btn>${nextBtnText}</button>
        </div>
      </div>
    `;
  };
  
  class Quiz {
    constructor(selector, data, options) {
      this.$el = document.querySelector(selector);
      this.options = options;
      this.data = data;
      this.counter = 0;
      this.dataLength = this.data.length;
      this.resultArray = [];
      this.tmp = {};
      this.init();
      this.events();
    }
  
    init() {
      console.log("init!");
      this.$el.innerHTML = quizTemplate(
        this.data[this.counter],
        this.dataLength,
        this.options
      );
    }
  
    nextQuestion() {
      console.log("next question!");
  
      if (this.valid()) {
        if (this.counter + 1 < this.dataLength) {
          this.counter++;
          this.$el.innerHTML = quizTemplate(
            this.data[this.counter],
            this.dataLength,
            this.options
          );
  
          if (this.counter + 1 == this.dataLength) {
            this.$el.insertAdjacentHTML(
              "beforeend",
              `<button type="button" class="quiz-question__btn final-btn btn-reset" data-send>${this.options.sendBtnText}</button>`
            );
            this.$el.querySelector("[data-next-btn]").remove();
          }
        } else {
          console.log("А все! конец!");
        }
      } else {
        console.log("Не валидно!");
      }
    }
  
    events() {
      console.log("events!");
      this.$el.addEventListener("click", (e) => {
        if (e.target == document.querySelector("[data-next-btn]")) {
          this.addToSend();
          this.nextQuestion();
        }
  
        if (e.target == document.querySelector("[data-send]")) {
          this.send();
        }
      });
  
      this.$el.addEventListener("change", (e) => {
        if (e.target.tagName == "INPUT") {
          if (e.target.type !== "checkbox" && e.target.type !== "radio") {
            let elements = this.$el.querySelectorAll("input");
  
            elements.forEach((el) => {
              el.checked = false;
            });
          }
          this.tmp = this.serialize(this.$el);
        }
      });
    }
  
    valid() {
      let isValid = false;
      let elements = this.$el.querySelectorAll("input");
      elements.forEach((el) => {
        switch (el.nodeName) {
          case "INPUT":
            switch (el.type) {
              case "tel":
                if (el.value) {
                  isValid = true;
                } else {
                  el.classList.add("error");
                }
              case "checkbox":
                if (el.checked) {
                  isValid = true;
                } else {
                  el.classList.add("error");
                }
              case "radio":
                if (el.checked) {
                  isValid = true;
                } else {
                  el.classList.add("error");
                }
            }
        }
      });
  
      return isValid;
    }
  
    addToSend() {
      this.resultArray.push(this.tmp);
    }
  
    send() {
      if (this.valid()) {
        const formData = new FormData();
  
        for (let item of this.resultArray) {
          for (let obj in item) {
            formData.append(obj, item[obj].substring(0, item[obj].length - 1));
          }
        }
  
        const response = fetch("../serverMail/mail.php", {
          method: "POST",
          body: formData,
        });
      }
    }
  
    serialize(form) {
      let field,
        s = {};
      let valueString = "";
      if (typeof form == "object" && form.nodeName == "FORM") {
        let len = form.elements.length;
        for (let i = 0; i < len; i++) {
          field = form.elements[i];
  
          if (
            field.name &&
            !field.disabled &&
            field.type != "file" &&
            field.type != "reset" &&
            field.type != "submit" &&
            field.type != "button"
          ) {
            if (field.type == "select-multiple") {
              for (j = form.elements[i].options.length - 1; j >= 0; j--) {
                if (field.options[j].selected)
                  s[s.length] =
                    encodeURIComponent(field.name) +
                    "=" +
                    encodeURIComponent(field.options[j].value);
              }
            } else if (
              (field.type != "checkbox" &&
                field.type != "radio" &&
                field.value) ||
              field.checked
            ) {
              valueString += field.value + ",";
  
              s[field.name] = valueString;
            }
          }
        }
      }
      return s;
    }
  }
  
  window.quiz = new Quiz(".quiz", quizData, {
    nextBtnText: "Далее",
    sendBtnText: "Отправить",
  });
}