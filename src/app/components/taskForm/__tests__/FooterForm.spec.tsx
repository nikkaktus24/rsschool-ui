import { shallow } from 'enzyme';
import * as React from 'react';
import FooterForm from '../FooterForm';

describe('FooterForm', () => {
    it('renders correctly if no data', () => {
        const output = shallow(<FooterForm taskId={0} courseId={''} submitForm={jest.fn()} />);
        expect(output).toMatchSnapshot();
    });
});
