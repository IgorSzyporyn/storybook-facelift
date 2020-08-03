import React from 'react'
import { shallow } from 'enzyme'
import SocialMediaIcon from './SocialMediaIcon'

it('should render correctly with no props', () => {
  const component = shallow(<SocialMediaIcon />)

  expect(component).toMatchSnapshot()
})
