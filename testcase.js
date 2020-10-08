const puppeteer = require('puppeteer');

const URL_TEST = 'https://kistochki.ru/akcii';

async function testKistochki() {
    console.log('Запуск браузера');
    const browser = await puppeteer.launch({headless: false, slowMo: 110});

    console.log('Создание новой вкладки в браузере');
    const page = await browser.newPage();

    console.log('Переход по ссылке');
    await page.goto(URL_TEST);

    console.log('Шаг 1: переходим на страницу акции по фото Маникюр');
      await Promise.all([
        page.click('.More[href="/akcii/manikyur-s-pokrytiem-gel-lak-za-770-rub"]'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
    await page.waitFor(2000)

    console.log('Шаг 1: Возвращаемся на предыдущую страницу');
      await Promise.all([
        page.click('.nuxt-link-exact-active[href="/akcii"]'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        await page.waitFor(2000)
    ]);

    console.log('Получение строки с результатом');
    const text = await page.$eval('.CardPopular__Title[href="/akcii/manikyur-s-pokrytiem-gel-lak-za-770-rub"]',
     element => element.textContent);

    console.log('Проверка условия тест-кейса');
        if (text.startsWith('Маникюр с покрытием гель-лак за 770 руб.')) {
        console.log('Успех. Текст содержит: ' + text);
    } else {
          console.log(`Ошибка. Текст не начинается со слова 'Маникюр'`)
    }

    console.log('Закрытие браузера');
    await browser.close();
}

testKistochki();
