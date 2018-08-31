import { shallow } from 'enzyme';
import * as React from 'react';
import TaskForm from '../index';

describe('TaskForm', () => {
    it('renders correctly if no data', () => {
        const output = shallow(
            <TaskForm
                courseId={''}
                title={''}
                urlToDescription={''}
                status={''}
                taskId={0}
                score={0}
                submitForm={jest.fn()}
            />,
        );
        expect(output).toMatchSnapshot();
    });
});
