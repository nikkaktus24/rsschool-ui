import { fetchAssignments, submitAssignment } from '../';
import { ASSIGNMENT } from '../../constants';
import { AssignmentStatus } from '../../models';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions test', () => {
    let store: any;
    // set up a fake store for all our tests
    beforeEach(() => {
        store = mockStore({});
    });

    describe('fetchAssignments test', () => {
        it('Fetch assignments ok', () => {
            store
                .dispatch(fetchAssignments('test'))
                .then(() => expect(store.getActions()).toContainEqual({ type: ASSIGNMENT.LOADING }))
                .then(() => expect(store.getActions()).toContainEqual({ type: ASSIGNMENT.FETCH_ASSIGNMENTS_OK }))
                .catch(() => expect(store.getActions()).toContainEqual({ type: ASSIGNMENT.FAIL }));
        });
    });

    describe('submitSolution test', () => {
        it('submit assignment ok', () => {
            store
                .dispatch(
                    submitAssignment({
                        taskId: 11,
                        courseId: 'string',
                        studentId: 'string',
                        mentorId: 'string',
                        studentComment: 'string',
                        mentorComment: 'string',
                        score: 0,
                        assignmentRepo: 'string',
                        deadlineDate: 0,
                        completeDate: 0,
                        checkDate: 0,
                        status: AssignmentStatus.Assigned,
                    }),
                )
                .then(() => expect(store.getActions()).toContainEqual({ type: ASSIGNMENT.LOADING }))
                .then(() => expect(store.getActions()).toContainEqual({ type: ASSIGNMENT.SUBMIT_SOLUTION_OK }))
                .catch(() => expect(store.getActions()).toContainEqual({ type: ASSIGNMENT.FAIL }));
        });
    });
});
