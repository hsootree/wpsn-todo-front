import React from 'react'
import { Redirect } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

const styles = {
  root: {
    width: 400,
    margin: '20px auto 0',
    padding: 20,
    textAlign: 'center'
  },
  button: {
    marginTop: 20
  }
}

class Connect extends React.Component {
  state = {
    address: '',
    redirect: false
  }

  onAddressChange = e => {
    this.setState({
      address: e.target.value
    })
  }

  onConnect = () => {
    localStorage.address = this.state.address
    this.setState({
      redirect: true
    })
  }

  render() {
    const {classes} = this.props
    const {redirect} = this.state
    return redirect ? (
      <Redirect to="/login" />
    ) : (
      <div className={classes.root}>
        <Typography align="center" type="title">
          Todo App
        </Typography>
        <TextField fullWidth label="서버 주소" value={this.state.address} onChange={this.onAddressChange} />
        <Button className={classes.button} raised color="primary" onClick={this.onConnect}>접속</Button>
      </div>
    )
  }
}

export default withStyles(styles)(Connect)
