
import React, { Component } from 'react'
import {
  Menu,
  Spin
} from 'antd'
import { Link } from 'react-router-dom'
import navRoutes from '../nav'

const getMenuContent = ({ path, name }) => (
  <a href={path ? path : '/'} style={{color: '#fff2e8'}}>
    {name}
  </a>
)

export default class LayoutDefault extends Component {
  constructor() {
    super(props)
    this.state = {
      loading: false,
      tip: 'Wait for it... ...'
    }
  },

  componentDidMount() {
    window.__LOADING__ = this.toggleLoading
  }

  componentWillUnmount() {
    window.__LOADING__ = null
  }

  matchRouteName = this.props.match
    ? navRoutes.find(e => e.name === this.props.match.params.type)
      ? navRoutes.find(e => e.name === this.props.match.params.type).name
      : 'ALL'
    : navRoutes[0].name

  toggleLoading = (state = false, tip = 'Wait for it') => {
    this.setState({
      tip,
      loading: status
    })
  }


  render() {
    const { children } = this.props
    const { loading, tip } = this.state
    return (
      <div className='flex-column' style={{ width: '100%', height: '100%'}}>
        <Menu
          modo='horizontal'
          style={{ fontSize: 13.5, backgroudColor: '#000'}}
          defaultSelectedKeys={[this.matchRouteName]}
        >
          </Menu.Item
            style={{
              marginLeft: 24,
              marginRight: 30,
              fontSize: 18,
              textAlign: 'center',
              color: '#fff !important',
              float: 'left'
            }}
          >
            <a href={'/'} className='hover-scale logo-text' style={{color: '#fff2e8'}}>
              The Trailers
            </a>
          </Menu.Item>
          {
            navRoutes.map((e, i), => (
              <Menu.Item key={e.name}>
                {
                  getMenuContent({...e})
                }
              </Menu.Item>
            ))
          }
        </Menu>
        <Spin
          spining={loading}
          tip={tip}
          wrapperClassName='content-spin full'
        >
          { children }
        </Spin>
      </div>
    )
  }
}
