import * as React from 'react';
import FooterForm from './FooterForm';
import HeaderForm from './HeaderForm';
import { classNames } from 'core/styles';
import { AssignmentStatus, IAssignment } from 'core/models';
import { getFormTitle, getFormStyle } from './utils';

const cn = classNames(require('./index.scss'));

type Props = {
    title: string;
    urlToDescription: string;
    status: string;
    taskId: number;
    score: number;
    courseId: string;
    submitForm: (assignment: IAssignment) => void;
};

const TaskForm = (props: Props) => {
    const { taskId, title, urlToDescription, submitForm, status, score, courseId } = props;
    const { Assigned } = AssignmentStatus;

    const formTitle = getFormTitle(status, score);
    const formStyle = getFormStyle(status, score);
    const isSubmit = status !== Assigned;

    return (
        <div className={cn('card', `border-${formStyle} mb-3`)}>
            <div className={cn('card-header', `bg-${formStyle}`)}>{formTitle}</div>
            <HeaderForm title={title} urlToDescription={urlToDescription} />
            <div className={cn('card-footer')}>
                {isSubmit ? null : <FooterForm submitForm={submitForm} taskId={taskId} courseId={courseId} />}
            </div>
        </div>
    );
};

export default TaskForm;
