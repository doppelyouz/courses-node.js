const keys = require('../keys')

module.exports = function(email) {
    return {
        email: email,
        sender_name: 'nodejs-courses',
        sender_email: keys.EMAIL_FROM,
        subject: "Аккаунт создан",
        body: `
            <h1>Добро пожаловать в наш магазин</h1>
            <p>Вы успешно создали аккаунт с email - ${email}</p>
            <hr/>
            <a href="${keys.BASE_URL}">Магазин курсов</a>
        `,
        list_id: {}
    }
}