window.addEventListener('load',()=>{
    //jp-font
    (function(d) {
        var config = {
          kitId: 'pvp1oor',
          scriptTimeout: 3000,
          async: true
        },
        h = d.documentElement,
        t = setTimeout(function () {
          h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
        }, config.scriptTimeout),
        tk = d.createElement("script"),
        f = false,
        s = d.getElementsByTagName("script")[0],
        a;
        h.className += " wf-loading";
        tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
        tk.async = true;
        tk.onload = tk.onreadystatechange = function() {
            a = this.readyState;
            if (f || a && a != "complete" && a != "loaded") 
                return;
            f = true;
            clearTimeout(t);
            try {
                Typekit.load(config)
            } catch (e) {}
        };
        s.parentNode.insertBefore(tk,s)
      })(document);




      //reserve
      const reserve=document.querySelector('#reserve');
      const btn=document.querySelector('.reserve_btn');
      const home=document.querySelector('.home_btn');
      const body=document.querySelector('#wrap');

      btn.addEventListener('click',()=>{
          window.scrollTo({top: 0, behavior:'smooth'});
          reserve.style.display='block';
          body.style='height:100vh; overflow:hidden;';
          btn.style.display='none';
      });
      home.addEventListener('click',()=>{
          reserve.style.display='none';
          body.style='height:auto; overflow:none;';
          btn.style.display='block';
      });

      
      // result 증감
      const result=document.querySelector('.result>p');
      const plus=document.querySelector('.plus');
      const minus=document.querySelector('.minus');
      let count=Number(result.textContent);

      plus.addEventListener('click',()=>{
        if(count<4){
          count+=1;
          result.textContent=count;
        }
      });
      minus.addEventListener('click',()=>{
        if(count>0){
          count-=1;
          result.textContent=count;
        };
      });



        // calendar
        const calendarDays = document.querySelectorAll(".calendar_days"),
        calendarTitle = document.querySelector(".title"),
        leftButton = document.querySelector(".left_button"),
        rightButton = document.querySelector(".right_button"),
        calendar = document.querySelector(".calendar");
      

        class Calendar {
            constructor(year, month) {
                this.today = new Date(year, month);
                this.year = this.today.getFullYear(),
                this.month = this.today.getMonth(),
                this.date = this.today.getDate(),
                this.day = this.today.getDay()
            }

        getFirstDay() {
            const firstDate = new Date(this.year, this.month);
            return firstDate.getDay();
        }

        getLastDay() {
            let wholeDays = [];
            if ((this.year % 4 === 0 && this.year % 100 !== 0) || (this.year % 400 === 0)) {
                wholeDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            } else {
                wholeDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            }
            return wholeDays[this.month];
        }

        fillCalendar() {
            this.initCalendar();
            calendarTitle.innerHTML = `${this.year}. ${this.month + 1}`
            const firstDay = this.getFirstDay();
            const lastDay = this.getLastDay();
            let day = 1;
            for (let i = firstDay; i < calendarDays.length; i++) {
                if (day <= lastDay) {
                    calendarDays[i].innerHTML = `<button class = "day_button">${day}</button>`;
                    day++;
                }
              };
        }

        initCalendar() {
            calendarDays.forEach((e) => {
                e.innerHTML = "";
            });
        }

        drawCalendar() {
            let change = 0;
            const today = new Date();
            let calendarInstance = new Calendar(today.getFullYear(), today.getMonth() + change);

            calendarInstance.fillCalendar();

            leftButton.addEventListener("click", (e) => {
                e.stopPropagation();
                change--;
                calendarInstance = new Calendar(today.getFullYear(), today.getMonth() + change);
                calendarInstance.fillCalendar();
                this.updateCalendarStyle();
            });
            rightButton.addEventListener("click", (e) => {
                e.stopPropagation();
                change++;
                calendarInstance = new Calendar(today.getFullYear(), today.getMonth() + change);
                calendarInstance.fillCalendar();
                this.updateCalendarStyle();
            });
        }

        updateCalendarStyle() {
            const dayButtons = document.querySelectorAll(".day_button");
            let firstSelectedDay = 0;
            let lastSelectedDay = 0;
            let clickCount = 0;

            // 달력 스타일 초기화
            dayButtons.forEach((element) => {
                element.classList.remove("day_selected");
                calendarDays.forEach((e) => e.classList.remove("gray"));
            })

            // 달력 날짜들에 클릭 이벤트 추가
            dayButtons.forEach((element) => {
                element.addEventListener("click", (event) => {
                  event.target.classList.toggle("day_selected");
                  clickCount++;
                  // 선택 일자 타입 변환
                  if (firstSelectedDay === 0) {
                      firstSelectedDay = Number(event.target.innerText);
                  } else {
                      lastSelectedDay = Number(event.target.innerText);
                  }
                  // 클릭 횟수 2회 넘어가면 달력 스타일 초기화
                  if (clickCount > 2) {
                      dayButtons.forEach((e) => {
                          e.parentNode.classList.remove("gray");
                          e.classList.remove("day_selected");
                          clickCount = 0;
                          firstSelectedDay = 0;
                          lastSelectedDay = 0;
                      });
                  }

                  // 선택 일자 사이에 회색 배경 적용
                  if (firstSelectedDay !== 0 && lastSelectedDay !== 0) {
                      dayButtons.forEach((e) => {
                          const day = Number(e.innerText);
                          if (day >= firstSelectedDay && day <= lastSelectedDay) {
                              e.parentNode.classList.toggle("gray");
                          }
                      });
                  }

                  // 선택 일자 중 왼쪽값이 오른쪽 값보다 크면 회색 배경 삭제 
                  if (firstSelectedDay > lastSelectedDay) {
                    dayButtons.forEach((e) => {
                        e.parentNode.classList.remove("gray");
                    });
                  }
              });
            });

            // 달력 날짜들에 호버링 이벤트 추가
            dayButtons.forEach((element) => {
                element.addEventListener("mouseenter", (event) => {
                    event.target.classList.add("day_hover")
                });
            });

            dayButtons.forEach((element) => {
                element.addEventListener("mouseleave", (event) => {
                    event.target.classList.remove("day_hover")
                });
            });
        }

        handleEvents() {
            this.drawCalendar();
            this.updateCalendarStyle();
        }

      }

      const cal = new Calendar();
      cal.handleEvents();

       
});