import { ASSIGNMENT } from '../constants';
import { getAssignmentsByCourseId, updateAssignment } from '../api';
import { IAssignment } from '../models';

export function fetchAssignments(courseId: string) {
    return async (dispatch: any) => {
        dispatch({
            type: ASSIGNMENT.LOADING,
        });

        try {
            const assignmentsResult = await getAssignmentsByCourseId(courseId);
            dispatch({
                type: ASSIGNMENT.FETCH_ASSIGNMENTS_OK,
                payload: assignmentsResult,
            });
        } catch (e) {
            dispatch({
                type: ASSIGNMENT.FAIL,
                payload: e,
            });
        }
    };
}

export function submitAssignment(assignment: IAssignment) {
    return async (dispatch: any) => {
        dispatch({
            type: ASSIGNMENT.LOADING,
        });

        try {
            const assignmentResult = await updateAssignment(assignment);
            dispatch({
                type: ASSIGNMENT.SUBMIT_SOLUTION_OK,
                payload: assignmentResult,
            });
        } catch (e) {
            dispatch({
                type: ASSIGNMENT.FAIL,
                payload: e,
            });
        }
    };
}
