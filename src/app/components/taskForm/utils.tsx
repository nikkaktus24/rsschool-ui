import * as React from 'react';
import { classNames } from 'core/styles';
import { AssignmentStatus, AssignmentTitle, AssignmentStyle } from 'core/models';

const cn = classNames(require('./index.scss'));

declare type StyleKey = keyof typeof AssignmentStyle;
declare type TitleKey = keyof typeof AssignmentTitle;

function isChecked(status: string) {
    const { Checked } = AssignmentStatus;
    return status === Checked;
}

export function getFormStyle(status: string, score: number) {
    if (isChecked(status)) {
        return score >= 100 ? AssignmentStyle.Full : AssignmentStyle.Half;
    } else {
        return AssignmentStyle[status as StyleKey];
    }
}

export function getFormTitle(status: string, score: number) {
    if (isChecked(status)) {
        return (
            <span>
                {AssignmentTitle[status as TitleKey]}
                <span className={cn('score')}>{score}%</span>
            </span>
        );
    } else {
        return AssignmentTitle[status as TitleKey];
    }
}
