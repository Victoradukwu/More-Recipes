import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
global.filereader = {
  readAsDataURL: jest.fn(file => file),
  onload: jest.fn()
};
