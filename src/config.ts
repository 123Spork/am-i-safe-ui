interface Language {
  siteHeader: string
  tabs: {
    getUpdate: string
    newUser: string
    sendUpdate: string
  }
  buttons: {
    getUpdate: string
    newUser: string
    sendUpdate: string
  }
  inputs: { username: string; password: string }
  information: {
    header: string
    default: string
    getUpdateProgressMessage: string
    getUpdateValidationError: string
    getUpdateSuccess: string
    getUpdateFail: string
    newUserProgressMessage: string
    newUserValidationError: string
    newUsersSuccess: string
    newUserFail: string
    sendUpdateProgressMessage: string
    sendUpdateValidationError: string
    sendUpdateSuccess: string
    sendUpdateFail: string
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
      siteHeader: 'Am I Safe?',
      tabs: {
        getUpdate: 'Get Update',
        newUser: 'New User',
        sendUpdate: 'Send Update'
      },
      inputs: { username: 'Username', password: 'Password' },
      buttons: {
        getUpdate: 'Check',
        newUser: 'Create',
        sendUpdate: 'I am Safe'
      },
      information: {
        header: 'Information',
        default: 'Do something and I will update.',
        getUpdateProgressMessage: 'Checking',
        getUpdateValidationError: 'You must fill the username field.',
        getUpdateSuccess: 'said they were last safe at:',
        getUpdateFail: 'Check request failed.',
        newUserProgressMessage: 'Creating',

        newUserValidationError:
          'You must fill both username and password fields.',
        newUsersSuccess: 'User created',
        newUserFail: 'Create request failed.',
        sendUpdateProgressMessage: 'Sending',
        sendUpdateValidationError:
          'You must fill both username and password fields.',
        sendUpdateSuccess: 'Status updated.',
        sendUpdateFail: 'Update request failed.'
      },
      server: {
        header: 'Server Information',
        statusMessage: 'Server last cleared at',
        serverError: 'Failed to get status from server'
      }
    },
    ua: {
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
        sendUpdate: 'Я в безпеці'
      },
      information: {
        header: 'Інформація',
        default: 'Зробіть щось, і я оновлю.',
        getUpdateProgressMessage: 'Перевірка',
        getUpdateValidationError: 'Ви повинні заповнити поле імені користувача.',
        getUpdateSuccess: 'сказали, що востаннє були в безпеці в:',
        getUpdateFail: 'Не вдалося перевірити запит.',
        newUserProgressMessage: 'Створення',
        newUserValidationError:
          'Ви повинні заповнити поля імені користувача та пароля.',
        newUsersSuccess: 'Користувач створений',
        newUserFail: 'Не вдалося створити запит.',
        sendUpdateProgressMessage: 'Відправлення',
        sendUpdateValidationError:
          'Ви повинні заповнити поля імені користувача та пароля.',
        sendUpdateSuccess: 'Статус оновлено.',
        sendUpdateFail: 'Помилка запиту на оновлення.'
      },
      server: {
        header: 'Інформація про сервер',
        statusMessage: 'Сервер востаннє очищений о',
        serverError: 'Не вдалося отримати статус із сервера'
      }
    }
  }
} as Config
