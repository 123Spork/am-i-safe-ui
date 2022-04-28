interface Language {
  siteHeader: string
  instructions: {
    header: string
    getUpdate: string
    sendUpdate: string
  }
  tabs: {
    getUpdate: string
    sendUpdate: string
  }
  buttons: {
    getUpdate: string
    sendUpdate: string
    copyUrl: string
    copiedUrl: string
  }
  inputs: { username: string; password: string }
  information: {
    header: string
    default: string
    getUpdateProgressMessage: string
    getUpdateValidationError: string
    createUserSuccess: string
    getUpdateSuccess: string
    getUpdateURL: string
    getUpdate500Fail: string
    getUpdate404Fail: string
    sendUpdateProgressMessage: string
    sendUpdateValidationError: string
    sendUpdateSuccess: string
    sendUpdate500Fail: string
    sendUpdate400Fail: string
    sendUpdate401Fail: string
  }
  server: {
    header: string
    statusMessage: string
    serverError: string
  }
}

interface Config {
  host: string
  defaultLanguage: string
  languages: {
    [key: string]: Language
  }
}

export default {
  host: 'https://api.amisafe.info',
  defaultLanguage: 'ua',
  languages: {
    uk: {
      instructions: {
        header: 'Instructions',
        getUpdate:
          "To check the safety of your loved one, simply enter their username in the field above and click the 'Check' button.",
        sendUpdate:
          "To send an update on your own safety, enter a username and a password above and click the 'I Am Safe' button. If you do not have an account this will create one for you. If you already have an account this will update your status."
      },
      siteHeader: 'Am I Safe?',
      tabs: {
        getUpdate: 'Get Update',
        sendUpdate: 'Send Update'
      },
      inputs: { username: 'Username', password: 'Password' },
      buttons: {
        getUpdate: 'Check',
        sendUpdate: 'I am Safe',
        copyUrl: 'Copy',
        copiedUrl: 'Copied',
      },
      information: {
        header: 'Information',
        default: 'Do something and I will update.',
        getUpdateProgressMessage: 'Checking',
        getUpdateValidationError: 'You must fill the username field.',
        getUpdateSuccess: 'said they were last safe at:',
        getUpdateURL: 'You can check this status again in future by using this link:',
        getUpdate500Fail: 'Check request failed.',
        getUpdate404Fail:
          'That username has not been found. This could be because the server reset recently. See the date in the server information below for the last time the server was reset.',
        sendUpdateProgressMessage: 'Sending',
        sendUpdateValidationError:
          'You must fill both username and password fields.',
        createUserSuccess: 'Created new user and updated status.',
        sendUpdateSuccess: 'Status updated.',
        sendUpdate500Fail: 'Update request failed.',
        sendUpdate400Fail:
          'Request failed because the wrong information was sent. Please check you have filled the username and password fields.',
        sendUpdate401Fail:
          'A user already exists with this username and you have entered the wrong password.'
      },
      server: {
        header: 'Server Information',
        statusMessage: 'Server last cleared at',
        serverError: 'Failed to get status from server'
      }
    },
    ua: {
      instructions: {
        header: 'Інструкції',
        getUpdate:
          'Щоб перевірити безпеку близької людини, просто введіть їхнє ім’я користувача в поле вище та натисніть кнопку «Перевірте».',
        sendUpdate:
          'Щоб надіслати оновлення щодо власної безпеки, введіть ім’я користувача та пароль вище та натисніть кнопку «Я в безпеці». Якщо у вас немає облікового запису, це створить його для вас. Якщо у вас уже є обліковий запис, це оновить ваш статус.'
      },
      siteHeader: 'Чи я в безпеці?',
      tabs: {
        getUpdate: 'Отримати оновлення',
        newUser: 'Новий користувач',
        sendUpdate: 'Надіслати оновлення'
      },
      inputs: { username: "Ім'я користувача", password: 'Пароль' },
      buttons: {
        getUpdate: 'Перевірте',
        newUser: 'Створюйте',
        sendUpdate: 'Я в безпеці',
        copyUrl: 'копія',
        copiedUrl: 'скопійовано',
      },
      information: {
        header: 'Інформація',
        default: 'Зробіть щось, і я оновлю.',
        getUpdateProgressMessage: 'Перевірка',
        getUpdateValidationError:
          'Ви повинні заповнити поле імені користувача.',
        createUserSuccess: 'Створено нового користувача та оновлено статус.',
        getUpdateSuccess: 'сказали, що востаннє були в безпеці в:',
        getUpdateURL: 'Ви можете знову перевірити цей статус у майбутньому за цим посиланням:',
        getUpdate500Fail: 'Не вдалося перевірити запит.',
        getUpdate404Fail:
          'Це ім’я користувача не знайдено. Це може бути тому, що сервер нещодавно скинувся. Перегляньте дату останнього скидання сервера в наведеній нижче інформації про сервер.',
        sendUpdateProgressMessage: 'Відправлення',
        sendUpdateValidationError:
          'Ви повинні заповнити поля імені користувача та пароля.',
        sendUpdateSuccess: 'Статус оновлено.',
        sendUpdate500Fail: 'Помилка запиту на оновлення.',
        sendUpdate400Fail:
          'Запит не виконано, оскільки надіслано неправильну інформацію. Будь ласка, переконайтеся, що ви заповнили поля імені користувача та пароля.',
        sendUpdate401Fail:
          'Користувач уже існує з цим іменем користувача, і ви ввели неправильний пароль.'
      },
      server: {
        header: 'Інформація про сервер',
        statusMessage: 'Сервер востаннє очищений о',
        serverError: 'Не вдалося отримати статус із сервера'
      }
    }
  }
} as Config
