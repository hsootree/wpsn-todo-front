import React from 'react'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import ClearIcon from 'material-ui-icons/Clear'
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
  newTodoWrap: {
    marginTop: 20
  }
}

class TodoScreen extends React.Component {
  state = {
    loading: true,
    todos: [],
    title: '',
    validTitle: false
  }

  componentDidMount() {
    const {address, token} = localStorage
    this.axios = axios.create({
      baseURL: address,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    this.axios.get('/todos')
      .then(res => {
        this.setState({
          loading: false,
          todos: res.data
        })
      })
  }

  handleToggle = (id, complete) => async () => {
    await this.axios.patch(`/todos/${id}`, {
      complete: !complete
    })
    const res = await this.axios.get('/todos')
    this.setState({
      todos: res.data
    })
  }

  handleDelete = (id) => async () => {
    await this.axios.delete(`/todos/${id}`)
    const res = await this.axios.get('/todos')
    this.setState({
      todos: res.data
    })
  }

  onTitleChange = e => {
    const title = e.target.value
    this.setState({
      title,
      validTitle: title.length > 0
    })
  }

  onTitleSubmit = async () => {
    await this.axios.post('/todos', {
      title: this.state.title
    })
    const res = await this.axios.get('/todos')
    this.setState({
      title: '',
      todos: res.data
    })
  }

  render() {
    const {classes} = this.props
    const {loading, todos} = this.state
    return loading ? (
      <div>loading...</div>
    ) : (
      <div className={classes.root}>
        <Typography align="center" type="title">
          Todo
        </Typography>
        <div className={classes.newTodoWrap}>
          <Typography align="center" type="subheading">
            새 할일
          </Typography>
          <TextField
            fullWidth
            value={this.state.title}
            onChange={this.onTitleChange}
          />
          <Button
            className={classes.button}
            raised
            color="primary"
            disabled={!this.state.validTitle}
            onClick={this.onTitleSubmit}
          >만들기</Button>
        </div>
        <List>
          {todos.map(todo => (
            <ListItem
              key={todo.id}
              dense
              button
              onClick={this.handleToggle(todo.id, todo.complete)}
              className={classes.listItem}
            >
              <Checkbox
                checked={todo.complete}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={todo.title} />
              <ListItemSecondaryAction>
                <IconButton onClick={this.handleDelete(todo.id)}>
                  <ClearIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(TodoScreen)
