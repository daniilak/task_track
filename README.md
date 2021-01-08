# PMS Task tracker

Проектная работа студентов группы 11-922 Института информационных технологий и интеллектуальных систем.

## Члены команды

- Алексей Бирюков (PM)
- Даниил Агниашвили (DevLead/Architect)
- Данил Хайрисламов (LeadAnalyst/Analyst)
- Алексей Никонов (DEV)
- Родион Китов (QA/TST)

## Роли
- Менеджер проекта
- Аналитик
- Разработчик
- Тестировщик

## Функционал

### Авторизация
Авторизация производится через аккаунт VK.

### Создание проекта
Любой авторизованный пользователь может открывать новые проекты.
Для этого необходимо в нажать кнопку <b>Создать проект</b>.
Создатель проекта автоматически назначается <b>Менеджером проекта</b>.

### Присоединение к проекту
Для того, чтобы присоединиться к проекту, Вам необходимо получить <b>Код проекта</b> от своего Менеджера проекта.
Полученный код необходимо ввести в окно, открывающееся при нажатии на <b>Подключиться по коду</b>.
При подключении к проекту новый член Проекта получает псевдо-роль <b>Не выбрано</b>.
Пока новому члену Проекту не будет назначена его роль, он не будет иметь доступа ни к какому функционалу проекта и не будет видеть никаких задач.

### Возможности ролей

#### Менеджер проекта
1. Настройка проекта
    1. Изменение названия
    2. Изменение кода подключения к проекту
    3. Архивирование проекта
2. Управление членами команды
    1. Назначение ролей членам проекта
    2. Измененией ролей
    3. Исключение людей из проекты
3. Создание задач
4. Изменение параметров созданных задач
5. Возвращение задачи из <b>Выполненно</b>
6. Общение с членами проекта через окно Комментариев

#### Аналитик
1. Создание задач
2. Изменение параметров созданных задач
3. Управление задачами (перемещение между состояниями), назначенными на себя
4. Общение с членами проекта через окно Комментариев

#### Разработчик
1. Видит задачи, назначенные на него
2. Передаёт задачу на <b>Тестирование</b>
3. У задачи видит только <b>Редлайн</b> в качестве <b>Дедлайна</b>
4. Общение с членами проекта через окно Комментариев

#### Тестировщик
1. Видит только те задачи, которые переданы на <b>Тестирование</b>
2. Может вернуть задачу на доработку с обязательным комментарием
3. Может перенести задачу в Выполнено с обязательным комментарием

### Нефункциональные требования

#### Советы
Всем членам проекта отображается один из случайных советов. При обновлении страницы совет меняется.

#### Диаграмма Ганта
Всем членам проекта доступна диаграмма Ганта по проекту.
Она представляет собой декомпозицию задач по оси времени.
Связь между дочерними и родительскими задачами отображается на диаграмме стрелками.
Доступны следующие представления:
- в виде Дерева
- группировка по Приоритету
- группировка по Исполнителю
- группировка по Статусу

## Рекомендации по разворачиванию
- чтобы задеплоить, необходимо прописать константы: https://raw.githubusercontent.com/daniilak/task_track..
- `vk_app_id`, `vk_app_secret`: https://vk.com/dev/vkapp_create
- `chuvsu_api_key`: https://vkhost.github.io/
