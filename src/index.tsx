import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Navbar,
  Row,
  Tab,
  Tabs
} from 'react-bootstrap'
import axios from 'axios'
import config from './config'

interface MainState {
  createTab: string
  host: string
  language: string
  statusMessage: string
  statusType: string
  lastStarted?: Date
  advancedTab?: string
}

class Main extends React.Component {
  state: MainState = {
    createTab: 'send',
    host: config.host,
    language: config.defaultLanguage,
    statusMessage: config.languages[config.defaultLanguage].information.default,
    statusType: 'primary',
    lastStarted: undefined
  }

  async getStartupDateFromServer(address: string) {
    try {
      const response = await axios.request({
        url: `${address}/status`,
        method: 'GET'
      })
      if (response?.data?.startupTime) {
        const d = new Date(response.data.startupTime)
        return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
      }
    } catch (err) {
      console.log(config.languages[this.state.language].server.serverError, err)
    }
    return undefined
  }

  async componentDidMount() {
    const lastStarted = await this.getStartupDateFromServer(config.host)
    this.setState({ lastStarted })
  }

  async updateAddress(event: React.ChangeEvent<HTMLInputElement>) {
    const address = event.target.value
    if (address === '') {
      return
    }
    const lastStarted = await this.getStartupDateFromServer(address)
    this.setState({ host: address, lastStarted })
  }

  async sendCreate() {
    this.setState({
      statusMessage:
        config.languages[this.state.language].information
          .newUserProgressMessage,
      statusType: 'primary'
    })

    const username = (document.getElementById('create_id') as HTMLInputElement)
      .value
    const password = (document.getElementById(
      'create_password'
    ) as HTMLInputElement).value
    if (username.length < 1 || password.length < 1) {
      this.setState({
        statusMessage:
          config.languages[this.state.language].information
            .newUserValidationError,
        statusType: 'warning'
      })
      return
    }
    try {
      await axios.request({
        url: `${this.state.host}`,
        method: 'POST',
        data: { username, password }
      })
      this.setState({
        statusMessage:
          config.languages[this.state.language].information.newUsersSuccess,
        statusType: 'success'
      })
    } catch (e) {
      this.setState({
        statusMessage:
          config.languages[this.state.language].information.newUserFail,
        statusType: 'danger'
      })
    }
  }

  async sendStatus() {
    this.setState({
      statusMessage:
        config.languages[this.state.language].information
          .sendUpdateProgressMessage,
      statusType: 'primary'
    })
    const username = (document.getElementById('send_id') as HTMLInputElement)
      .value
    const password = (document.getElementById(
      'send_password'
    ) as HTMLInputElement).value
    if (username.length < 1 || password.length < 1) {
      this.setState({
        statusMessage:
          config.languages[this.state.language].information
            .sendUpdateValidationError,
        statusType: 'warning'
      })
      return
    }
    try {
      await axios.request({
        url: `${this.state.host}`,
        method: 'PUT',
        data: { username, password }
      })
      this.setState({
        statusMessage:
          config.languages[this.state.language].information.sendUpdateSuccess,
        statusType: 'success'
      })
    } catch (e) {
      this.setState({
        statusMessage:
          config.languages[this.state.language].information.sendUpdateFail,
        statusType: 'danger'
      })
    }
  }

  async checkStatus() {
    this.setState({
      statusMessage:
        config.languages[this.state.language].information
          .getUpdateProgressMessage,
      statusType: 'primary'
    })

    const username = (document.getElementById('check_id') as HTMLInputElement)
      .value
    if (username.length < 1) {
      this.setState({
        statusMessage:
          config.languages[this.state.language].information
            .getUpdateValidationError,
        statusType: 'warning'
      })
      return
    }

    try {
      const response = await axios.request({
        url: `${this.state.host}?username=${username}`,
        method: 'GET'
      })
      this.setState({
        statusMessage: `${username} ${
          config.languages[this.state.language].information.getUpdateSuccess
        } ${new Date(
          response.data.lastupdated
        ).toLocaleDateString()} ${new Date(
          response.data.lastupdated
        ).toLocaleTimeString()}`
      })
    } catch (e) {
      this.setState({
        statusMessage:
          config.languages[this.state.language].information.getUpdateFail,
        statusType: 'danger'
      })
    }
  }

  flipTab() {
    this.setState({
      createTab: this.state.createTab == 'create' ? 'send' : 'create',
      statusMessage: config.languages[this.state.language].information.default,
      statusType: 'primary'
    })
  }

  getClearedMessage(): string {
    if (this.state.lastStarted) {
      return `${
        config.languages[this.state.language].server.statusMessage
      } ${this.state.lastStarted.toString()}`
    }
    return config.languages[this.state.language].server.serverError
  }

  changeLanguageUK() {
    this.setState({
      language: 'uk',
      statusMessage:
        config.languages['uk'].information.default
    })
  }

  changeLanguageUA() {
    this.setState({
      language: 'ua',
      statusMessage:
        config.languages['ua'].information.default
    })
  }

  render(): any {
    return (
      <Container className="container-fluid">
        <Navbar expand="lg">
          <Navbar.Brand className="page-title">
            {config.languages[this.state.language].siteHeader}
          </Navbar.Brand>
        </Navbar>

        <div className="language-container">
          <a href="#" onClick={this.changeLanguageUA.bind(this)}>
            <img className="language-flag" src="./ua.png" />
          </a>
          <a href="#" onClick={this.changeLanguageUK.bind(this)}>
            <img className="language-flag" src="./uk.png" />
          </a>
        </div>
        <Card>
          <Tabs
            id="page-tabs"
            activeKey={this.state.advancedTab}
            onSelect={this.flipTab.bind(this)}
            className="mb-4"
          >
            <Tab
              eventKey="check"
              title={config.languages[this.state.language].tabs.getUpdate}
            >
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <FormControl
                        maxLength={14}
                        id="check_id"
                        placeholder={
                          config.languages[this.state.language].inputs.username
                        }
                        type="string"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <Button
                        variant="success"
                        onClick={this.checkStatus.bind(this)}
                      >
                        {
                          config.languages[this.state.language].buttons
                            .getUpdate
                        }
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Tab>
            <Tab
              eventKey="create"
              title={config.languages[this.state.language].tabs.newUser}
            >
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <FormControl
                        maxLength={14}
                        id="create_id"
                        placeholder={
                          config.languages[this.state.language].inputs.username
                        }
                        type="string"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <FormControl
                        maxLength={14}
                        id="create_password"
                        placeholder={
                          config.languages[this.state.language].inputs.password
                        }
                        type="password"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <Button
                        variant="success"
                        onClick={this.sendCreate.bind(this)}
                      >
                        {config.languages[this.state.language].buttons.newUser}
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Tab>
            <Tab
              eventKey="send"
              title={config.languages[this.state.language].tabs.sendUpdate}
            >
              {' '}
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <FormControl
                        maxLength={14}
                        id="send_id"
                        placeholder={
                          config.languages[this.state.language].inputs.username
                        }
                        type="string"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <FormControl
                        maxLength={14}
                        id="send_password"
                        placeholder={
                          config.languages[this.state.language].inputs.password
                        }
                        type="password"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <Button
                        variant="success"
                        onClick={this.sendStatus.bind(this)}
                      >
                        {
                          config.languages[this.state.language].buttons
                            .sendUpdate
                        }
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Tab>{' '}
          </Tabs>{' '}
          <Card.Body>
            <Alert variant={this.state.statusType}>
              <Alert.Heading>
                {config.languages[this.state.language].information.header}
              </Alert.Heading>
              {this.state.statusMessage}
            </Alert>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header>
            {config.languages[this.state.language].server.header}
          </Card.Header>
          <Card.Body>
            {this.getClearedMessage()}
            <InputGroup className="mb-2">
              <FormControl
                id="ip"
                placeholder={this.state.host}
                type="string"
                onChange={this.updateAddress.bind(this)}
              />
            </InputGroup>{' '}
          </Card.Body>
        </Card>
      </Container>
    )
  }
}
ReactDOM.render(<Main />, document.getElementById('app'))
