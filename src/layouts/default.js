
import React, { Component } from 'react'
import {
  Menu,
  Spin
} from 'antd'
import { Link } from 'react-router-dom'
import navRoutes from '../nav'

const getMenuContent = ({ path = '/', name }) => (
  <a href={path} style={{color: '#fff2e8'}}>
    {name}
  </a>
)

export default class LayoutDefault extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      tip: 'Wait for loading please... ...'
    }
  }

  componentDidMount () {
    window.__LOADING__ = this.toggleLoading
  }

  componentWillUnMount () {
    window.__LOADING__ = null
  }

  matchRouteName = this.props.match
    ? navRoutes.find(e => e.name === this.props.match.params.type)
      ? navRoutes.find(e => e.name === this.props.match.params.type).name
      : '全部'
    : navRoutes[0].name

  toggleLoading = (status = false, tip = 'One more secend') => {
    this.setState({
      tip,
      loading: status
    })
  }

  render () {
    const { children } = this.props
    const { loading, tip } = this.state

    return (
      <div className='flex-column' style={{ width: '100%', height: '100%' }}>
        <Menu
          style={{ fontSize: 13.5, backgroundColor: '#000' }}
          mode='horizontal'
          defaultSelectedKeys={[this.matchRouteName]}
        >
          <Menu.Item
            style={{
              marginLeft: 24,
              marginRight: 30,
              fontSize: 18,
              textAlign: 'center',
              color: '#fff !important',
              float: 'left'
            }}
          >
            <a href={'/'} className='hover-scale logo-text' style={{
              color: '#fff2e8'
            }}>Trailers</a>
          </Menu.Item>
          {
            navRoutes.map((e, i) => (
              <Menu.Item key={e.name}>
                {
                  getMenuContent({...e})
                }
              </Menu.Item>
            ))
          }
        </Menu>
        <Spin
          spinning={loading}
          tip={tip}
          wrapperClassName='content-spin full'
        >
          { children }
        </Spin>
      </div>
    )
  }
}
