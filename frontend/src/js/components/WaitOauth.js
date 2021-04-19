
import React from 'react'
import queryString from 'query-string'
import { useCode } from '../actions'

export default class WaitOauth extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: `
        Please do hold.
        Fancy your inner peace.
      `,
      cls: 'oauth_wait'
    }
    const params = queryString.parse(props.location.search)
    if (params.code) {
      useCode(params.code).then(() => {
        this.setState({
          message: 'OAuth login successful! redirecting to devices...',
          cls: 'oauth_success'
        })
        setTimeout(() => {
          this.props.history.push('/devices')
        }, 2000)
      }).catch(err => {
        console.log('Error:', err)
        this.setState({
          message: 'OAuth login failed. redirecting to login...',
          cls: 'oauth_fail'
        })
        setTimeout(() => {
          this.props.history.push('/')
        }, 2000)
      })
    } else {
      this.state = {
        message: 'No code provided, go back home youuu!',
        cls: 'oauth_fail'
      }
    }
  }

  render () {
    return (
      <div className='something'>
        <p className={this.state.cls}> {this.state.message} </p>
      </div>
    )
  }
};
