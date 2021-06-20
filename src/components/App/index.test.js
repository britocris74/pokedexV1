import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import App from '.'
import Header from '../Header'

configure({adapter: new Adapter()});

describe('<App/>', () => {

  it('Should render', ()=> {
    const instance = shallow(<App/>);
      expect(instance).toHaveLength(1);
  });
  
  it('Should render a Header', ()=> {
    const instance = shallow(<App/>);
      expect(instance.find(Header)).toHaveLength(1);
  });
});

