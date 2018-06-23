
import React, { Component } from 'react'

export default (loadComponent, placeholder = 'loading... ...') => {
  return class AsyncComponent extends Component {
    unmount = false

    constructor() {
      super()
      this.state = {
        Child: null
      }
    }
    componentWillUnmount() {
      this.unmount = ture
    }
    async componentDidMount() {
      const { default: Child } = await loadComponent()
      if (this.unmount) return
      this.setState({
        Child
      })
    }
    render() {
      const { Child } = this.state
      return (
        Child
          ? <Child {... this.props} />
          : placeholder
      )
    }
  }
}
