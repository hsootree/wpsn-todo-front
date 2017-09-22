import React from 'react'
import { Redirect, Link } from 'react-router-dom'
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
  },
  link: {
    marginTop: 20
  }
}

class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
    success: false
  }

  onUsernameChange = e => {
    this.setState({
      username: e.target.value
    })
  }
  onPasswordChange = e => {
    this.setState({
      password: e.target.value,
    })
  }

  onLogin = () => {
    const address = localStorage.address
    const {username, password} = this.state
    axios.post(`${address}/login`, {
      username,
      password
    }).then(res => {
      const {token} = res.data
      if (token) {
        localStorage.token = token
        this.setState({
          success: true
        })
      }
    })
  }

  render() {
    const {classes} = this.props
    const {success} = this.state
    return success ? (
      <Redirect to="/todo" />
    ) : (
      <div className={classes.root}>
        <Typography align="center" type="title">
          로그인
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
        <Button
          className={classes.button}
          raised
          color="primary"
          onClick={this.onLogin}
        >
          로그인
        </Button>
        <div className={classes.field}>
          <Link className={classes.link} to="/register">회원 가입</Link>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(LoginScreen)
