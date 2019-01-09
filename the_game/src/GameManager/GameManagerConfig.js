

import ArithmeticTask from '../screens/ArithmeticTask/ArithmeticTask';
import TranslationTask from '../screens/TranslationTask/TranslationTask';

const GameManagerConfig = {
  defaultScreenSize: { x: 840, y: 350 },
  groundLvl: 280,
  HUDPos: { x: 840, y: 420 },
  enemyNameCollection: {
    names: ['Шкурочафк', 'Могилогной', 'Адорыш', 'Адогной', 'Чернодемон', 'Могилочервь', 'Хмурорыш', 'Черночафк', 'Дуборыш', 'Злослон', 'Огнедемон', 'Хмурочервь', 'Демонотрон', 'Краснотрон', 'Хмурогной', 'Шкурокоп', 'Могилочерт', 'Могилохрум', 'Некрослон', 'Воздухомет', 'Землекол', 'Светорез', 'Дубинозавр', 'Светомонстр', 'Булавотерз', 'Ножетерз', 'Водозавр', 'Топоробур', 'Молотобур', 'Черепомаг', 'Астралокид', 'Светобур', 'Воздухорез', 'Копьебур', 'Экспокид', 'Астраломаг', 'Черепотык', 'Ножебур', 'Мечебур', 'Плотокол', 'Темнокол', 'Плотоед', 'Головолом', 'Булавотерз', 'Копьелом', 'Астралокид', 'Землемах', 'Темнобур', 'Молотозавр', 'Некродемон', 'Мегаужас', 'Шкуромерз', 'Некроцап', 'Рогокоп', 'Плотомаг', 'Костемонстр', 'Костелом', 'Экспокид', 'Темнорез', 'Астралобур', 'Плотокол', 'Топоротерз', 'Палицомаг', 'Костелом', 'Дубинотык', 'Пикомаг', 'Пикотерз', 'Огнекид', 'Мечелом', 'Палицомаг', 'Плотобур', 'Светотерз', 'Копьебур', 'Палицозавр', 'Водомонстр', 'Молотомах', 'Мечемаг', 'Пикомах', 'Молотомонстр', 'Палицолом', 'Копьетык', 'Костебур', 'Головотык', 'Темнолом', 'Демоноужас', 'Мегаед', 'Злослон', 'Могилодемон', 'Некротрон', 'Дуборыш', 'Шкуроцап', 'Смерточафк', 'Рогогной', 'Мегачервь', 'Рогозавр', 'Хмурослон', 'Огнецап', 'Злокоп', 'Роготрон', 'Адопуз', 'Хмуродемон', 'Бякокоп', 'Смертозавр', 'Рогохрум', 'Огнедемон', 'Адослон', 'Чернорыш', 'Адогной', 'Бякохрум', 'Демонохрум', 'Кровомерз', 'Дуботруп', 'Кроворыш', 'Грязетрон', 'Бякоужас', 'Кровоцап', 'Демонотрон', 'Адочерт', 'Кровослон', 'Бякохрум'],
    types: ['Движухаотик', 'Светохаос', 'Килотрон', 'Коксотрон', 'Вспыходрыг', 'Яркотрой', 'Неотрой', 'Криотрой', 'Гиперслон', 'Гексоглюк', 'Неотрон', 'Гипертаракан', 'Битотрон', 'Килотаракан', 'Психомуха', 'Трансвирус', 'Коксоноль', 'Цифрозомби', 'Роботаракан', 'Гамманоль', 'Бетасталкер', 'Гаммахаотик', 'Мегавирус', 'Робосталкер', 'Темноглюк', 'Яркотаракан', 'Технокрыл', 'Коксобаг', 'Робозомби', 'Килохаос', 'Трансмуха', 'Килокрыл', 'Диждикрыл', 'Роботрой', 'Рободрыг', 'Киломуха', 'Гексохаотик', 'Гаммаснег', 'Битокрыл', 'Терраслон', 'Коксослон', 'Террахаотик', 'Робослон', 'Психолёт', 'Цифроплыв', 'Альфазомби', 'Бетатаракан', 'Движудрыг', 'Гексоноль', 'Трансглюк', 'Терратрой', 'Гексослон', 'Роботаракан', 'Диждиглюк', 'Битовирус', 'Психотрой', 'Темнозомби', 'Рободрыг', 'Светохаос', 'Вспыхотрон', 'Светохаотик', 'Битотрой', 'Бетабаг', 'Ярконоль', 'Вспыхотрой', 'Рободрыг', 'Гамматрон', 'Светокрыл', 'Бетадрыг', 'Психоновик', 'Психовирус', 'Трансзомби', 'Движуснег', 'Трансвирус', 'Битодрыг', 'Темнохаотик', 'Дельтасталкер', 'Робобаг', 'Движуслон', 'Темнохаотик', 'Гаммадрыг', 'Криобаг', 'Движуновик', 'Бетановик', 'Психоснег', 'Неоплыв', 'Темноновик', 'Бетатрой', 'Гаммалёт', 'Вспыхомуха'],
    adjectives: ['Гыгышный', 'Аццкый', 'Пафассный', 'Гламурный', 'Нимецкая', 'Газенвагенскый', 'Пафассный', 'Миталлюгскый', 'Ржачный', 'Падонкаффский', 'Йадовитый', 'Пятибальный', 'Лольный', 'Имошный', 'Анимэшный', 'Албанский', 'Онглискый', 'Ипаццкый', 'Сапожный', 'Онглиский', 'Злобный', 'Сопливый', 'Ужасный', 'Мерзкий', 'Зеленый', 'Плановый', 'Фиолетовый', 'Укуренный', 'Косяковый', 'Оранжевый', 'Косячный', 'Aгрессивный', 'Aзартный', 'Aморальный', 'Безумный', 'Жадный', 'Железный', 'Злой', 'Занудный', 'Коварный', 'Ловкий', 'Наглый', 'Медлительный', 'Осторожный', 'Подозрительный', 'Сумашедший', 'Твердолобы', 'Тупой', 'Тресливый', 'Угрюмый', 'Холодный', 'Цельнометаллический', 'Юродивый', 'Мутный', 'Ловкий', 'Одноглазый', 'Быстрый', 'Пьяный', 'Смертоносный', 'Ловкий', 'Танцующий', 'Черный', 'Дерзкий', 'Бесшумный', 'Ирладский', 'Бешеный ', 'Меткий'],
  },
  taskCollection: {},
};

GameManagerConfig.taskCollection.ArithmeticTask = ArithmeticTask;
GameManagerConfig.taskCollection.TranslationTask = TranslationTask;

export default GameManagerConfig;