import * as React from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { requiredFieldError, requiredFieldSuccess, githubUrlFieldError } from 'core/validation';
import ReduxFormInput from 'components/ReduxFormInput';
import { InjectedFormProps, reduxForm, Field } from 'redux-form';

type Props = {
    submitForm: (assignment: any) => void;
    taskId: number;
    courseId: string;
};

export type FormData = {
    assignmentRepo: string;
    studentComment: string;
};

class FooterForm extends React.Component<Props & InjectedFormProps<FormData, Props>, any> {
    handleFormSubmit = (event: any) => {
        const { submitForm, taskId, courseId } = this.props;
        const { assignmentRepo, studentComment } = event;
        submitForm({
            courseId,
            taskId,
            assignmentRepo,
            studentComment,
        });
    };

    handleChange = (event: any) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { handleSubmit } = this.props;
        return (
            <small className="text-muted">
                <Form>
                    <FormGroup>
                        <Field
                            name="assignmentRepo"
                            label="Choose repo"
                            placeholder="Enter link"
                            component={ReduxFormInput}
                            required={true}
                            type="text"
                            validate={[requiredFieldError, githubUrlFieldError]}
                            warn={requiredFieldSuccess}
                            className="form-control form-control-sm"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            name="studentComment"
                            label="Comments"
                            placeholder="Write comments here"
                            component={ReduxFormInput}
                            required={false}
                            type="textarea"
                            className="form-control form-control-sm"
                        />
                    </FormGroup>
                    <Button onClick={handleSubmit(this.handleFormSubmit)} type="submit" color="primary" size="sm">
                        Submit
                    </Button>
                </Form>
            </small>
        );
    }
}

export default reduxForm<FormData, Props>({
    form: 'footerForm',
    enableReinitialize: true,
})(FooterForm);
