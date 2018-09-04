import { shallow } from 'enzyme';
import * as React from 'react';
import Tasks from '../index';
import TaskForm from 'components/TaskForm';
const { __stateGetter } = require('react-redux');

type TasksType = any;
const mockAssignments = [
    {
        taskId: {
            _id: 0,
            title: 'Test task',
            urlToDescription: 'Test description',
        },
        studentId: 'nikkaktus24',
        status: 'Assigned',
        score: 0,
        courseId: 'rs-course-2018q3',
    },
];

const mockProps = {
    title: 'Test task',
    urlToDescription: 'Test description',
    taskId: 0,
    studentId: 'nikkaktus24',
    status: 'Assigned',
    score: 0,
    courseId: 'rs-course-2018q3',
};

const resultValue = <TaskForm key="0" submitForm={jest.fn()} {...mockProps} />;

describe('Tasks', () => {
    beforeEach(() => {
        __stateGetter.mockImplementation(() => ({}));
    });

    it('test generateTasks function ', () => {
        const output = shallow(
            <Tasks
                submitForm={jest.fn()}
                studentId={'nikkaktus24'}
                courseId={'rs-course-2018q3'}
                isLoading={false}
                error={false}
                assignments={mockAssignments}
            />,
        );
        const instance = output.dive().instance() as TasksType;
        const result = instance.generateTasks();
        expect(JSON.stringify(resultValue)).toEqual(JSON.stringify(result[0]));
    });

    it('renders correctly if no data', () => {
        const output = shallow(<Tasks studentId={''} courseId={''} isLoading={false} error={false} />);
        expect(output).toMatchSnapshot();
    });
});
