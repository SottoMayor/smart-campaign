import React from 'react'
import { Menu } from 'semantic-ui-react'

const Header = () => {
  return (
    <Menu>
        <Menu.Item
          name='crowncoin'
        >
          CrownCoin
        </Menu.Item>

        <Menu.Menu 
          position='right'
        >
          <Menu.Item
            name='campaigns'
          >
            Campaigns
          </Menu.Item>

          <Menu.Item
            name='+'
          >
            +
          </Menu.Item>
          
        </Menu.Menu>

    </Menu>
  )
}

export default Header