import Page from '../layout/Page';

const Agreement = () => (
  <Page>
    <div className="container">
      <h2>Договір публічної оферти про надання благодійної пожертви</h2>
      <section>
        Ця Публічна оферта про надання благодійної пожертви (надалі – Оферта) спрямована на невизначене коло
        фізичних осіб (надалі – Благодійник) та є публічною пропозицією Громадської організації «Молодіжна громадська
        організація КОВО», в особі Голови Шмельова Романа Валерійовича, який діє на підставі Статуту
        (надалі  — Організація), укласти договір щодо надання благодійної пожертви, на зазначених нижче умовах.
      </section>
      <p>Поняття, що вживаються в цьому Договорі:</p>
      <section>s
        <strong>Публічна оферта</strong>
        <span> – дійсна пропозиція Організації, що
          розміщена на сайті: <a href={process.env.APP_URL}>{process.env.APP_URL}</a>, про
          надання благодійної пожертви, спрямована на невизначене коло фізичних осіб.
        </span>
      </section>
      <section>
        <strong>Акцепт </strong>
        <span>– повне та безумовне прийняття Оферти шляхом вчинення дій, направлених на здійснення грошового
          переказу за допомогою платіжних форм та засобів, як розміщених на сайті, так і шляхом перерахування
          грошових коштів на поточний рахунок Організації через установи банків. Оферта вважається акцептованою
          з дати зарахування грошових коштів на поточний рахунок Організації.
        </span>
      </section>
      <section>
        <strong>Благодійна пожертва</strong>
        <span> – безоплатна передача Благодійником коштів у власність Організації для наступної передачі
          Бенефіціарам  для досягнення певних цілей, передбачених Статутом або програмами Організації,
          відповідно до Статуту Організації та цього Договору.
        </span>
      </section>
      <section>
        <strong>Благодійник </strong>
        <span> – дієздатна фізична особа, яка добровільно здійснює один чи декілька видів благодійної
          діяльності. Для цілей цього Договору Благодійником є фізична особа, яка акцептувала Оферту.
        </span>
      </section>
      <h3>ПРЕДМЕТ ДОГОВОРУ</h3>
      <section>
        1. Предметом цього Договору є безоплатна та добровільна передача Благодійником у власність
        Організації грошових коштів шляхом здійснення благодійної пожертви на забезпечення статутної
        діяльності Організації. Благодійник самостійно визначає обсяг та напрями використання
        благодійної пожертви.
      </section>
      <section>
        2. Виконання сторонами цього Договору не має на меті отримання прибутку або будь-яких
        благ для жодної із сторін.
      </section>
      <section>
        3. Сторони підтверджують, що предметом цього Договору не є пряме чи опосередковане отримання
        прибутку жодною із Сторін.
      </section>
      <h3>Акцепт</h3>
      <section>
        1. Акцептом Оферти Благодійник зазначає, що він згоден зі всіма умовами Оферти,
        повною мірою усвідомлює та згоден з предметом Договору, ціллю публічного збирання коштів,
        а також підтверджує право Організації використати частину Благодійної пожертви на адміністративні
        витрати Організації.
      </section>
      <h3>ПРАВА ТА ОБОВ’ЯЗКИ СТОРІН</h3>
      <section>
        1. Благодійник має право без обмежень за розміром та кількістю разів надавати
        Організації Благодійну пожертву протягом всього строку дії цього Договору.
      </section>
      <section>
        2. Сторони мають право використовувати та поширювати інформацію про надання Благодійної пожертви
        Благодійником та про його участь у сприянні Організації в реалізації цілей, визначених Статутом.
      </section>
      <section>
        3. Організація зобов’язується володіти, користуватися та розпоряджатися Благодійною пожертвою
        для реалізації цілей, визначених Статутом.
      </section>
      <section>
        4. Організація зобов’язується надавати на вимогу Благодійника звіт щодо спрямування та
        цілей використання Благодійної пожертви.
      </section>
      <h3>СТРОК ЗБИРАННЯ КОШТІВ</h3>
      <section>
        1. Публічне збирання коштів триває до моменту припинення діяльності Організації
        (в т.ч. шляхом ліквідації), якщо інший строк не буде визначений рішенням Організації,
        про що Благодійник буде повідомлений шляхом розміщення відповідної інформації на сайті:&nbsp;
        <a href={process.env.APP_URL}>{process.env.APP_URL}</a>
      </section>
      <h3>ВІДПОВІДАЛЬНІСТЬ ОРГАНІЗАЦІЇ</h3>
      <section>
        1. Організація несе відповідальність за порушення умов цього Договору та використання
        Благодійних пожертв всупереч порядку, передбаченому статутною діяльністю Організації
        та законодавством України.
      </section>
      <h3>ІНШІ УМОВИ</h3>
      <section>
        1. Витрати, пов’язані з перерахуванням Благодійних пожертв (комісії за перерахування коштів,
        податки, збори, тощо) несе Благодійник.
      </section>
      <section>
        2. Шляхом акцептування Оферти Благодійник підтверджує, що цілком і повністю ознайомлений та
        згоден з його умовами, а також дає дозвіл на обробку своїх персональних даних з метою можливості
        виконання умов Оферти. Дозвіл на обробку персональних даних діє протягом усього строку дії Оферти.
        Крім цього, укладанням Оферти, Благодійник підтверджує, що йому повідомлено (без додаткового повідомлення)
        про права, встановлені Законом України «Про захист персональних даних». Обсяг прав Благодійника,
        як суб’єкта персональних даних відповідно до Закону України «Про захист персональних даних»,
        йому відомий і зрозумілий.
      </section>
      <section>
        3. Благодійник надає згоду на те, що після внесення інформації про себе на сайті
        Організації та здійснення реєстрації на сайті, його контактна інформація може бути
        використана Організацією для направлення листів та повідомлень, в тому числі в електронному
        вигляді. При цьому, Організація зобов’язується не надавати інформацію про контактні дані
        Благодійника третім особам, крім випадків, прямо передбачених законодавством України. Крім того,
        Благодійник надає свою згоду, що інформація про нього (зокрема, прізвище, ім’я, по батькові)
        може бути використана Організацією в засобах масової інформації або на сайті Організації:&nbsp;
        <a href={process.env.APP_URL}>{process.env.APP_URL}</a>
      </section>
    </div>
    <style jsx>
      {
        `
         a {
          color: green;
         }
         section {
          margin: 20px 0;
         }
        `
      }
    </style>
  </Page>
);

export default Agreement;
