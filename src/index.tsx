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
  tab: "getUpdate" | "sendUpdate"
  host: string
  language: string
  statusMessage: string
  statusType: string
  lastStarted?: Date
  advancedTab?: string
}

class Main extends React.Component {
  state: MainState = {
    tab: 'getUpdate',
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

  async sendStatus() {
    this.setState({
      statusMessage:
        config.languages[this.state.language].information
          .sendUpdateProgressMessage,
      statusType: 'primary'
    })
    const username = (document.getElementById('id') as HTMLInputElement).value
    const password = (document.getElementById('password') as HTMLInputElement)
      .value
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
      const response = await axios.request({
        url: `${this.state.host}`,
        method: 'POST',
        data: { username, password }
      })
      debugger;
      switch (response.status) {
        default:
          this.setState({
            statusMessage:
              config.languages[this.state.language].information
                .sendUpdateSuccess,
            statusType: 'success'
          })
          break
        case 201:
          this.setState({
            statusMessage:
              config.languages[this.state.language].information
                .createUserSuccess,
            statusType: 'success'
          })
          break
      }
    } catch (e) {
      switch ((e as any).response.status as number) {
        default:
          this.setState({
            statusMessage:
              config.languages[this.state.language].information
                .sendUpdate500Fail,
            statusType: 'danger'
          })
          break
        case 400:
          this.setState({
            statusMessage:
              config.languages[this.state.language].information
                .sendUpdate400Fail,
            statusType: 'danger'
          })
          break
        case 401:
          this.setState({
            statusMessage:
              config.languages[this.state.language].information
                .sendUpdate401Fail,
            statusType: 'danger'
          })
          break
      }
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
      switch ((e as any).response.status as number) {
        default:
          this.setState({
            statusMessage:
              config.languages[this.state.language].information
                .getUpdate500Fail,
            statusType: 'danger'
          })
          break
        case 404:
          this.setState({
            statusMessage:
              config.languages[this.state.language].information
                .getUpdate404Fail,
            statusType: 'danger'
          })
          break
        }
    }
  }

  flipTab() {
    this.setState({
      tab: this.state.tab == 'getUpdate' ? 'sendUpdate' : 'getUpdate',
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
      statusMessage: config.languages['uk'].information.default
    })
  }

  changeLanguageUA() {
    this.setState({
      language: 'ua',
      statusMessage: config.languages['ua'].information.default
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
            activeKey={this.state.tab}
            onSelect={this.flipTab.bind(this)}
            className="mb-4"
          >
            <Tab
              eventKey="getUpdate"
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
              eventKey="sendUpdate"
              title={config.languages[this.state.language].tabs.sendUpdate}
            >
              {' '}
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <FormControl
                        maxLength={14}
                        id="id"
                        placeholder={
                          config.languages[this.state.language].inputs.username
                        }
                        type="string"
                      />
                    </InputGroup>
                    <InputGroup className="mb-2">
                      <FormControl
                        maxLength={14}
                        id="password"
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
                        className="btn-i-am-safe"
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
            {config.languages[this.state.language].instructions.header}
          </Card.Header>
          <Card.Body>
            {config.languages[this.state.language].instructions[this.state.tab]}
          </Card.Body>
        </Card>
        <br/>
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
