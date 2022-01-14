"use strict"

// Налаштування зображення формату webp

// Опис функції testWebP
function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

// Перевіряємо підтримку зображень формату webp
testWebP(function (support) { 
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }else{
        document.querySelector('body').classList.add('no-webp');
    }
});

// =================== Хедер ====================
// Отримуємо всі об’єкти для анімації
const animItems = document.querySelectorAll('.-anim-items');

// Перевіряємо їх наявність
if (animItems.length > 0) {
    // Даємо вікну подію скрол
    window.addEventListener('scroll', animOnScroll)
    // Опис функції animOnScroll
    function animOnScroll() {
        // Перебираємо всі отримані об’єкти
        for (let index = 0; index < animItems.length; index++) {
            // Отримуємо сам об’єкт
            const animItem = animItems[index];
            // Отримуємо його висоту
            const animItemHeight = animItem.offsetHeight;
            // Отримуємо позицію об’єкта відносно верху сторінки
            const animItemOffset = offset(animItem).top;
            // Коефіцієнт старту анімації
            const animStart = 4;

            // Вираховуємо момент старту анімації
            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            // Вираховуємо момент старту анімації коли висота об’єкта більша за висоту вікна
            if (animItemHeight > window.innerHeight) {
                let animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            // Визначаємо момент присвоєння класу активності
            if (pageYOffset > (animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('-active');
            }
            else {
                // Запобігаємо повторній анімації
                if (!animItem.classList.contains('-anim-no-hide')) {
                    animItem.classList.remove('-active');
                }
            }
        }
    }
    // Опис функції offset
    function offset(el) {
        // Отримуємо позицію об’єкта відносно верху сторінки
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    animOnScroll();
}

// =================== Хедер ====================
// Отримуємо константи
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const headerRow = document.querySelector('.header__row');
const menu = document.querySelector(".menu__list");

// Перевіряємо наявність елемента іконки бургер меню
if (iconMenu) {
  // Даємо іконці подію клік
  iconMenu.addEventListener('click', function (e) {
    // Маніпулюємо класами елементів
    // document.body.classList.toggle('-lock');
    iconMenu.classList.toggle('-active');
    menuBody.classList.toggle('-active');
    headerRow.classList.toggle('-active');
  });
}

// Перевіряємо наявність списку меню
if (menu) {
  // Даємо списку подію наведення миші
  menu.addEventListener("mouseover", (event) => {
    // Перевіряємо чи містить наведений елемент елемнт menu__link
    if (event.target.classList.contains("menu__link")) {
      // Змінюємо властивості в css
      menu.style.setProperty(
        // Задаємо значення змінної --underline-width для зміни
        "--underline-width",
        // Задаємо зміну значення змінної, що співпадає з шириною елемента menu__link
        `${event.target.offsetWidth}px`
      );
      menu.style.setProperty(
        // Задаємо значення змінної --underline-width-x для зміни
        "--underline-offset-x",
        // Задаємо зміну значення змінної, що відповідає зміщенню з лівого боку батьківського меню
        `${event.target.offsetLeft}px`
      );
    }
  });
  // Даємо списку подію покидання мишею елемент
  menu.addEventListener("mouseleave", () =>
    // Змінюємо значення змінної --underline-width на 0
    menu.style.setProperty("--underline-width", "0")
  );
}

// Прокрутка
// Отримуємо всі посилання в меню
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

// Перевіряємо їх наявність
if (menuLinks.length > 0) {
  // Перебираємо посилання
  menuLinks.forEach(menuLink => {
    // Даємо функцію клік
    menuLink.addEventListener("click", onMenuClick);
  });

  // Опис функції onMenuClick
  function onMenuClick(e) {
    // Отримуємо натиснутий елемент
    const menuLink = e.target;
    // Перевіряємо наявність дата-атрибута goto
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      // Отримуємо блок, на який вказує посилання 
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      // Отримуємо положення цього блока
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

      // Забираємо клас активності
      document.body.classList.remove('-lock');
      iconMenu.classList.remove('-active');
      menuBody.classList.remove('-active');
      headerRow.classList.remove('-active');

      // Прокрутка вікна
      window.scrollTo({
        // Вказуємо значення положення блока
        top: gotoBlockValue,
        // Задаємо плавну прокрутку
        behavior: "smooth"
      });

      // Відміняємо роботу посилання
      e.preventDefault();
    }
  }

}


// Отримуєно кнопку
const fullscrBtn = document.querySelector(".fullscreen__button");

// Задаємо подію клік 
fullscrBtn.addEventListener("click", (e) => {
  // Отримуємо блок, на який вказує кнопка
  const gotoBlock = document.querySelector(fullscrBtn.dataset.goto);
  // Отримуємо положення цього блока
  const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

  // Прогортаємо вікно
  window.scrollTo({
    // Вказуємо значення положення блока
    top: gotoBlockValue,
    // Задаємо плавну прокрутку
    behavior: "smooth"
  });

  // Відміняємо роботу посилання
  e.preventDefault();
})


// =================== Паралакс ====================
// перевіряємо чи пристрій touch screen
const isMobile = {
    Android: () => {
        return navigator.userAgent.match(/Android/i);
    },
    iOS: () => {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: () => {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: () => {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: () => {
        return (
            isMobile.Android() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
}

// чекаємо завантаження контенту
window.onload = function() {
    const parallax = document.querySelector('.fullscreen');

    // перевірки чи існує такий елемент
    if (parallax) {
        // оголошення констант
        // const content = document.    querySelector('.fullscreen__main');
        const bigGrass = document.querySelector('.parallax__big-grass');
        const smallGrass = document.querySelector('.parallax__small-grass');

        // коефіцієнти
        const forBigGrass = 20;
        const forSmallGrass = 40;

        // швидкість анімації
        const speed = 0.05;

        // оголошення змінних
        let positionX = 0;
        let coordXprocent = 0;

        // опис анімації
        function setMouseParallaxStyle() {
            // різниця в положенні
            const distX = coordXprocent - positionX;

            // заповнюємо значення змінної positionX
            positionX = positionX + (distX * speed);

            // передаємо стилі
            bigGrass.style.cssText = `transform: translate(${-(positionX / forBigGrass)}%);`;
            smallGrass.style.cssText = `transform: translateX(${positionX / forSmallGrass}%);`;

            // виклик функції
            window.requestAnimationFrame(setMouseParallaxStyle);

        }
        // виклик функції
        setMouseParallaxStyle();

        
        // перевіряємо, щоб пристрій не був touch screen
        if (!isMobile.any()) {
            // вираховуємо відсотки в змінну coordXprocent:
            parallax.addEventListener("mousemove", e => { // додаємо паралакс блоку подію рух миші
                // отримання ширини блока
                const parallaxWidth = parallax.offsetWidth;
    
                // початкова позиція, коли курсор по середині
                const coordX = e.pageX - parallaxWidth / 2;
    
                // отримуємо відсотки
                coordXprocent = coordX / parallaxWidth * 100;
            });
        } 
    }
}

// ================= Кнопка вверх ===================
// Даємо вікну подію скрол
window.addEventListener("scroll", (e) => {
    // Перевіряємо чи проскролили сторінку більше ніж на 300px
    if (window.scrollY > 300) {
        upButton.classList.add("active");
    } else if (window.scrollY < 300) {
        upButton.classList.remove("active");
    }

    // Даємо кнопці подію клік
    upButton.addEventListener("click", (e) => {
        window.scrollTo({
            // Вказуємо верх сторінки
            top: 0,
            // Задаємо плавну прокрутку
            behavior: "smooth"
          });
        // Забороняємо переходити посиланню
        e.preventDefault();
    });
});

// =================== Слайдер ====================
// ініціалізуємо слайдер Swiper
let swiper = new Swiper(".slider__swiper", {
    // центруємо слайди
    centeredSlides: true,
    // задаємо відстань між слайдами
    spaceBetween: 30,
    // адаптив за допомогою breakpoint
    breakpoints: {
        // задаємо кількість слайдів на показ
        320: {
            slidesPerView: 1,
        },    
        600: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
        
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable : true
    },

    // додаємо стрілки навігації
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // прокрутка колесом миші
    // mousewheel:{
    //     sensitivy: 1.5,
    // },
    // автопрокрутка
    autoplay: {
        // пауза між прокруткою
        delay: 3000,
        // завершення на останньому слайді
        // stopOnLastSlide: true,
        // вимкнути після ручного переключення
        disableOnInteraction: true
    },
});


// =================== Поп-апи ====================
// Отримуємо константи
const popuplinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');

// Змінна для відстеження стану поп-апа
let unlock = true;

// Затримка
const timeout = 800;

// Перевіряємо чи існують посилання на поп-ап
if (popuplinks.length > 0) {
    // Перебираємо всі посилання
    for (let index = 0; index < popuplinks.length; index++){
        const popupLink = popuplinks[index];

        // Надаємо посиланням подію клік
        popupLink.addEventListener("click", function (e) {
            // Отримуємо чисте ім’я поп-апа
            const popupName = popupLink.getAttribute("href").replace("#", "");
            // Отримуємо сам поп-ап
            const curentPopup = document.getElementById(popupName);
            // Передаємо поп-ап в функцію popupOpen
            popupOpen(curentPopup);
            // Забороняємо перезавантажувати сторінку і блокуємо майбутню роботу посилання
            e.preventDefault();
        });
    }
}
// Отримуємо константи
const popupCloseIcon = document.querySelectorAll(".close-popup");
// Перевіряємо наявність елементів, що закривають поп-ап
if (popupCloseIcon.length > 0){
    // Перебираємо всі елементи
    for (let index = 0; index < popupCloseIcon.length; index++){
        const el = popupCloseIcon[index];

        // Надаємо елементам подію клік
        el.addEventListener("click", function (e){
            // Передаємо найближчий батьківський поп-ап в функцію popupClose
            popupClose(el.closest(".popup"));
            // Забороняємо перезавантажувати сторінку і блокуємо майбутню роботу
            e.preventDefault();
        });
    }
}
// Опис функції popupOpen
function popupOpen(curentPopup){
    // Перевіряємо чи існує поп-ап чи вже якийсь поп-ап відкритий
    if (curentPopup && unlock) {
        const popupActive = document.querySelector(".popup.open");
        if (popupActive) {

            popupClose(popupActive, false);
        } else {
            // Викликаємо функцію bodyLock
            bodyLock();
        }
        // Додаємо поп-апу клас open
        curentPopup.classList.add("open");
        // Передаємо в функцію popupClose всю частину екрану крім поп-апа 
        curentPopup.addEventListener("click", function (e){
            // Перевірямо чи НЕ наявний в батьківському блоці popup__content 
            if (!e.target.closest(".popup__content")) {
                popupClose(e.target.closest(".popup"));
            }
        })

    }
}
// Опис фун-ї popupClose
function popupClose(popupActive, doUnlock = true) {
    if (unlock){
        popupActive.classList.remove("open");
        bodyUnLock();
    }
}

// Опис функції bodyLock()
function bodyLock() {
    // Отримуємо ширину скролу в px
    const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    // Даємо body відступ, щоб запобігти зміщенню контента
    body.style.paddingRight = lockPaddingValue;
    // Блокуємо скрол через клас lock в css
    body.classList.add("lock");
    
    unlock = false;
    setTimeout(function(){
        unlock = true;
    }, timeout);

}

// Опис функції bodyUnLock
function bodyUnLock() {
    // Забираємо у body padding та даємо йому скрол
    setTimeout(function () {
        body.style.paddingRight = "0px";
        body.classList.remove("lock");
    }, timeout);

    unlock = false;
    setTimeout(function(){
        unlock = true;
    }, timeout)
}

// Закриття поп-апа клавішею Esc
document.addEventListener("keydown", function (e){
    if (e.which === 27) {
        const popupActive = document.querySelector(".popup.open");
        popupClose(popupActive);
    }
})

// =================== Прогрес бари ====================
// let weightProcent = 75;
// let temperatureProcent = 48;
// let humidityProcent = 80;
// let countProcent = 69;

// Оголошуємо константи
const pointers = document.querySelectorAll(".vidgets__pointer");
const progressAll = document.querySelectorAll(".vidgets__progress");
const progressNames = document.querySelectorAll(".vidgets__name");

// Описуємо функцію scrollAnim
let scrollAnim = function() {
    // Обчислюємо повну висоту всього контенту
    let fullHeight = document.body.scrollHeight;
    // Отоимуємо значення скільки вже прогорнуто
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // Отримуємо блок до якого нам треба прокрутити
    let rect = document.querySelector(".vidgets").getBoundingClientRect();
    // Перевіряємо чи доскролили сторінку до блока
    if ((rect.top) + scrollTop <= fullHeight - (rect.top * 3)) {
        // Викликаємо функцію vidgetsValue
        vidgetsValue();
    }
}

// Задаємо об’єкту window подію скролу
window.addEventListener("scroll", scrollAnim);

// Опис функції vidgetsValue, що передається addEventListener
function vidgetsValue() {
    // Забираємо в об’єкта window подію скролу
    window.removeEventListener("scroll", scrollAnim);
    // Перевіряємо чи існують елементи прогрес бара
    if (pointers.length > 0 && progressAll.length > 0 && progressNames.length > 0){
        // Перебираємо всі елементи
        for (let i = 0; i < pointers.length; i++) {
            // Отримуємо окремі елементи
            let pointer = pointers[i];
            let progress = progressAll[i];
            let progressName = progressNames[i];

            // Отримуємо відсотка
            let procent = progress.getAttribute("data-procent");

            // Отримуємо ширину прогрес бара
            let progressWidth = document.querySelector(".vidgets__bars").offsetWidth;

            // Рахуємо середину вказівника у %
            let epsPointer = ((pointer.offsetWidth * 100)  / progressWidth)/2;
            // Рахуємо ширину назви у %
            let widthName = (progressName.offsetWidth * 100)  / progressWidth;
            
            // Перевіряємо значення відсотка
            if (procent < 0) {
                procent = 0;

                // Заповнюємо значення прогрес бара
                progress.style.width = procent  + "%";
                // Заповнюємо значення вказівника
                pointer.innerHTML = procent + "%";
                // Задаємо вказівнику відступ
                pointer.style.marginLeft = ((procent - epsPointer)  + "%");
            } else{
                // Перевіряємо значення відсотка
                if (procent > 100) {
                    procent = 100;
                }

                // Оголошуємо початкове значення прогрес бара
                let k = -1;
                // Створюємо setInterval
                let anim = setInterval(progressStatus, 20);
                // Опис функції progressStatus, що передається setInterval
                function progressStatus() {
                    // Якщо змінна k набула фінального значення, то зупинити анімацію 
                    if (k >= procent) {
                        clearInterval(anim);
                    } else {
                        k++;
                        // Заповнюємо прогрес бар 
                        progress.style.width = k  + "%";
                        // Заповнюємо значення вказівника
                        pointer.innerHTML = k + "%";
                        // Задаємо вказівнику відступ
                        pointer.style.marginLeft = ((k - epsPointer)  + "%");
                    } 
                    
                }
            }

            // Перевіряємо чи не накладається вказівник(повний, не половина) на назву
            if ((procent - epsPointer*2) < widthName) {
                progressName.style.marginLeft = (procent - epsPointer + ((3500) / progressWidth))  + "%";
            }
        }
    }
}


// =================== Діаграми ====================
// Отримуємо батьківський блок заголовків табів
const tabs = document.querySelector(".tabs__items")
// Отримуємо таби
const tabsAll = document.querySelectorAll(".tabs__item");

// Перебираємо таби
tabsAll.forEach((tab) => {
    tab.addEventListener("click", (event) => {
        event.preventDefault();
        // Змінюємо властивості в css
        tabs.style.setProperty(
            // Задаємо значення змінної --underline-tab-width для зміни
            "--underline-tab-width",
            // Задаємо зміну значення змінної, що співпадає з шириною елемента tabs__item
            `${tab.offsetWidth}px`
        );
        tabs.style.setProperty(
            // Задаємо значення змінної --underline-tab-offset-x для зміни
            "--underline-tab-offset-x",
            // Задаємо зміну значення змінної, що відповідає зміщенню з лівого боку елемента tabs__item
            `${tab.offsetLeft}px`
        );
        // Забираємо у всіх 
        document.querySelectorAll(".tabs__content").forEach((child) => {
            child.classList.remove("--active");
        });

        // Отримуємо id на яке вказує посилання
        const id = tab.getAttribute("href");
        // Шукаємо елемент по id і надаємо клас активності
        document.querySelector(id).classList.add("--active");


    });

})
// Робимо активним перший таб за замовчуванням
document.querySelector(".tabs__item").click();

// Змінна з даними
let allData = {
    weight : [380, 380, 350, 610, 480, 620, 800],
    temperature : [280, 340, 360, 620, 470, 650, 800],
    humidity : [380, 380, 350, 610, 480, 620, 800],
    count : [580, 340, 370, 690, 480, 720, 900]
}

// Константи
const canvasWeight = document.querySelector("#chart-weight").getContext("2d");
const canvasTemperature = document.querySelector("#chart-temperature").getContext("2d");
const canvasHumidity = document.querySelector("#chart-humidity").getContext("2d");
const canvasCount = document.querySelector("#chart-count").getContext("2d");

// Робимо градієнт
let gradientFill = canvasWeight.createLinearGradient(0, 300, 0, 500);
gradientFill.addColorStop(0, "#F1B236");
gradientFill.addColorStop(1, "#F5C62266");

// Створюємо діаграму для weight
// Ініціалізуаємо Chart
const weightChart = new Chart(canvasWeight, {
    // Задаємо тип діаграми
    type: 'bar',
    // Вказуємо дані
    data: {
        // Вказуємо підписи стовпця
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [{
            // Вказуємо масив з даними
            data : allData.weight,
            // Задаємо фоновий колір стовпця
            backgroundColor: [gradientFill]
        }],
    },
    // Вказуємо налаштування
    options : {
        // Вимикаємо вертикальні лінії
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: true
                }
            },
        },
        // Вимикаємо легенду
        plugins: {
            legend: {
                display: false,
            }
        }
    }
});

// Створюємо діаграму для temperature
// Ініціалізуаємо Chart
const temperatureChart = new Chart(canvasTemperature, {
    // Задаємо тип діаграми
    type: 'bar',
    // Вказуємо дані
    data: {
        // Вказуємо підписи стовпця
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [{
            // Вказуємо масив з даними
            data : allData.temperature,
             // Задаємо фоновий колір стовпця
            backgroundColor: [gradientFill]
        }],
    },
    // Вказуємо налаштування
    options : {
        // Вимикаємо вертикальні лінії
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: true
                }
            },
        },
        plugins: {
            // Вимикаємо легенду
            legend: {
                display: false,
            }
        }
    }
});

// Створюємо діаграму для humidity
// Ініціалізуаємо Chart
const humidityChart = new Chart(canvasHumidity, {
    type: 'bar',
    // Задаємо тип діаграми
    type: 'bar',
    // Вказуємо дані
    data: {
        // Вказуємо підписи стовпця
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [{
            // Вказуємо масив з даними
            data : allData.humidity,
            // Задаємо фоновий колір стовпця
            backgroundColor: [gradientFill]
        }],
    },
    // Вказуємо налаштування
    options : {
        // Вимикаємо вертикальні лінії
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: true
                }
            },
        },
        // Вимикаємо легенду
        plugins: {
            legend: {
                display: false,
            }
            
        },   
    }
});

// Створюємо діаграму для count
// Ініціалізуаємо Chart
const countChart = new Chart(canvasCount, {
    // Задаємо тип діаграми
    type: 'bar',
    // Вказуємо дані
    data: {
        // Вказуємо підписи стовпця
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [{
            // Вказуємо масив з даними
            data : allData.count,
            // Задаємо фоновий колір стовпця
            backgroundColor: [gradientFill]
        }],
    },
    // Вказуємо налаштування
    options : {
        // Вимикаємо вертикальні лінії
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: true
                }
            },
        },
        // Вимикаємо легенду
        plugins: {
            legend: {
                display: false,
            } 
        }     
    }
});


