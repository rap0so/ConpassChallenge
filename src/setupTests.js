import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// mocking document
Object.defineProperty(document, 'currentScript', {
    value: document.createElement('script'),
});
