import React from 'react'
import { Redirect } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import axios from 'axios'

const styles = {
  root: {
    width: 400,
    margin: '20px auto 0',
    padding: 20,
    textAlign: 'center'
  },
  button: {
    marginTop: 20
  },
  field: {
    marginTop: 20
  }
}

class Connect extends React.Component {
  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
    registered: false,
    confirmationError: false,
    disabled: true
  }

  validateState = () => {
    this.setState((prevState, props) => {
      const {
        username,
        password,
        passwordConfirmation
      } = prevState
      if (
        username
        && password === passwordConfirmation
        && password.length >= 8
      ) {
        return {disabled: false}
      }
    })
  }
  onUsernameChange = e => {
    this.setState({
      username: e.target.value
    })
    this.validateState()
  }
  onPasswordChange = e => {
    this.setState({
      password: e.target.value,
      passwordConfirmation: '',
      disabled: true
    })
    this.validateState()
  }
  onPasswordConfirmChange = e => {
    const {password} = this.state
    const passwordConfirmation = e.target.value
    this.setState({
      passwordConfirmation,
      confirmationError: password !== passwordConfirmation
    })
    this.validateState()
  }

  onRegister = () => {
    const address = localStorage.address
    const {username, password} = this.state
    axios.post(`${address}/user`, {
      username,
      password
    }).then(res => {
      const {token} = res.data
      if (token) {
        localStorage.token = token
        this.setState({
          registered: true
        })
      }
    })
  }

  render() {
    const {classes} = this.props
    const {
      registered,
      disabled,
      confirmationError
    } = this.state
    return registered ? (
      <Redirect to="/todo" />
    ) : (
      <div className={classes.root}>
        <Typography align="center" type="title">
          회원 가입
        </Typography>
        <TextField
          className={classes.field}
          fullWidth
          label="사용자 이름"
          value={this.state.username}
          onChange={this.onUsernameChange}
        />
        <TextField
          className={classes.field}
          fullWidth
          type="password"
          label="암호"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <TextField
          error={confirmationError}
          className={classes.field}
          fullWidth
          type="password"
          label="암호 확인"
          helperText={confirmationError ? "암호가 일치하지 않습니다." : null}
          value={this.state.passwordConfirmation}
          onChange={this.onPasswordConfirmChange}
        />
        <Button
          className={classes.button}
          raised
          color="primary"
          onClick={this.onRegister}
          disabled={disabled}
        >
          접속
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(Connect)
