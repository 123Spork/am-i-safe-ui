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

class Main extends React.Component {
  state: any = {
    createTab: 'send',
    ipAddress: config.ip,
    statusMessage: 'Do something and I will update.',
    statusType: 'primary'
  }

  async sendCreate() {
    this.setState({ statusMessage: 'Creating', statusType: 'primary' })

    const username = (document.getElementById('create_id') as HTMLInputElement)
      .value
    const password = (document.getElementById(
      'create_password'
    ) as HTMLInputElement).value
    if (username.length < 1 || password.length < 1) {
      this.setState({
        statusMessage: 'You must fill both username and password fields.',
        statusType: 'warning'
      })
      return
    }
    const ip = (document.getElementById(
      'ip'
    ) as HTMLInputElement).value || this.state.ipAddress
    try {
      await axios.request({
        url: `http://${ip}`,
        method: 'POST',
        data: { username, password }
      })
      this.setState({ statusMessage: 'User created', statusType: 'success' })
    } catch (e) {
      this.setState({
        statusMessage: 'Create request failed.',
        statusType: 'danger'
      })
    }
  }

  async sendStatus() {
    this.setState({ statusMessage: 'Sending', statusType: 'primary' })
    const username = (document.getElementById('send_id') as HTMLInputElement)
      .value
    const password = (document.getElementById(
      'send_password'
    ) as HTMLInputElement).value
    if (username.length < 1 || password.length < 1) {
      this.setState({
        statusMessage: 'You must fill both username and password fields.',
        statusType: 'warning'
      })
      return
    }
    const ip = (document.getElementById(
      'ip'
    ) as HTMLInputElement).value || this.state.ipAddress
    try {
      await axios.request({
        url: `http://${ip}`,
        method: 'PUT',
        data: { username, password }
      })
      this.setState({ statusMessage: 'Status updated', statusType: 'success' })
    } catch (e) {
      this.setState({
        statusMessage: 'Update request failed.',
        statusType: 'danger'
      })
    }
  }

  async checkStatus() {
    this.setState({ statusMessage: 'Checking', statusType: 'primary' })

    const username = (document.getElementById('check_id') as HTMLInputElement)
      .value
    if (username.length < 1) {
      this.setState({
        statusMessage: 'You must fill the username field.',
        statusType: 'warning'
      })
      return
    }
    const ip = (document.getElementById(
      'ip'
    ) as HTMLInputElement).value || this.state.ipAddress

    try {
      const response = await axios.request({
        url: `http://${ip}?username=${username}`,
        method: 'GET',
      })
      this.setState({ statusMessage: `${username} said they were last safe at: ${(new Date(response.data.lastupdated).toLocaleDateString())} ${(new Date(response.data.lastupdated).toLocaleTimeString())}`})
    } catch (e) {
      this.setState({
        statusMessage: 'Check request failed.',
        statusType: 'danger'
      })
    }
  }

  flipTab() {
    this.setState({
      createTab: this.state.createTab == 'create' ? 'send' : 'create',
      statusMessage: 'Do something and I will update.',
      statusType: 'primary'
    })
  }

  render(): any {
    return (
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Am I Safe? </Navbar.Brand>
          <Navbar.Text>
            {' '}
            <InputGroup className="mb-2">
              <FormControl
                maxLength={14}
                id="ip"
                placeholder={this.state.ipAddress}
                type="string"
              />
            </InputGroup>{' '}
          </Navbar.Text>
        </Navbar>
        <Card>
          <Card.Body>
            {' '}
            <Tabs
              id="controlled-tab-example"
              activeKey={this.state.advancedTab}
              onSelect={this.flipTab.bind(this)}
              className="mb-3"
            >
              <Tab eventKey="create" title="Create User">
                <Row className="align-items-center">
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <FormControl
                        maxLength={14}
                        id="create_id"
                        placeholder="Username"
                        type="string"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <FormControl
                        maxLength={14}
                        id="create_password"
                        placeholder="Password"
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
                        Create
                      </Button>
                    </InputGroup>{' '}
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="send" title="Send Update">
                <Row className="align-items-center">
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <FormControl
                        maxLength={14}
                        id="send_id"
                        placeholder="Username"
                        type="string"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <FormControl
                        maxLength={14}
                        id="send_password"
                        placeholder="Password"
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
                        I am Safe
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </Tab>{' '}
              <Tab eventKey="check" title="Check for Update">
                <Row className="align-items-center">
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <FormControl
                        maxLength={14}
                        id="check_id"
                        placeholder="Username"
                        type="string"
                      />
                    </InputGroup>
                  </Col>{' '}
                  <Col xs="auto">
                    <InputGroup className="mb-2">
                      <Button
                        variant="success"
                        onClick={this.checkStatus.bind(this)}
                      >
                        Check
                      </Button>
                    </InputGroup>{' '}
                  </Col>
                </Row>
              </Tab>
            </Tabs>{' '}
            <Alert variant={this.state.statusType}>
              <Alert.Heading>Information</Alert.Heading>
              {this.state.statusMessage}
            </Alert>
          </Card.Body>
        </Card>{' '}
      </Container>
    )
  }
}
ReactDOM.render(<Main />, document.getElementById('app'))
