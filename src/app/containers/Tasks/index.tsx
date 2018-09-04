import { fetchAssignments, submitAssignment } from 'core/actions';
import { IAssignment, IAssignmentDestructuringState, IAssignmentDispatchAction, IAssignmentProps } from 'core/models';
import { RootState } from 'core/reducers';
import { classNames } from 'core/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import TaskForm from 'components/TaskForm';
import { CardDeck } from 'reactstrap';

const cn = classNames(require('./index.scss'));

const Temp = {
    github: 'fdfs',
    score: 100,
};

class Tasks extends React.Component<IAssignmentProps> {
    async componentDidMount() {
        const { courseId } = this.props;
        await this.props.onLoad(courseId);
    }

    generateTasks() {
        const { assignments, submitForm, isLoading, error } = this.props;
        if (!isLoading && !error) {
            if (assignments && assignments.length > 0) {
                return assignments.map((item: any, i: number) => {
                    const props = {
                        title: item.taskId.title,
                        urlToDescription: item.taskId.urlToDescription,
                        taskId: item.taskId._id,
                        studentId: item.studentId,
                        status: item.status,
                        score: item.score,
                        courseId: item.courseId,
                        submitForm,
                    };
                    return <TaskForm key={i} {...props} />;
                });
            } else {
                return 'There is no one task';
            }
        } else {
            return null;
        }
    }

    render() {
        const { isLoading } = this.props;
        return (
            <div className={cn('tasks')}>
                <h2>Tasks</h2>
                {isLoading ? (
                    <h3>Loading...</h3>
                ) : (
                    <section>
                        <div className="row">
                            <div className="col-6">
                                <p>
                                    Your github private repository{' '}
                                    <a className="badge badge-dark" href={Temp.github}>
                                        here
                                    </a>
                                </p>
                            </div>
                            <div className="col-6 text-right">
                                <p>You are in the TOP 50 students!</p>
                                <p>Full Score: {Temp.score}</p>
                            </div>
                        </div>
                        <CardDeck>{this.generateTasks()}</CardDeck>
                    </section>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, props: any): IAssignmentDestructuringState => {
    if (props == null) {
        return props;
    }
    return {
        isLoading: state.assignments.isLoading,
        courseId: props.match.params.id,
        studentId: state.user.username,
        assignments: state.assignments.assignments,
    };
};

const mapDispatchToProps = (dispatch: any): IAssignmentDispatchAction => {
    return {
        onLoad: (courseId: string) => {
            dispatch(fetchAssignments(courseId));
        },
        submitForm: (assignment: IAssignment) => {
            dispatch(submitAssignment(assignment));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tasks);
