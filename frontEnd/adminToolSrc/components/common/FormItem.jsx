import React from 'react';
import { Field } from 'redux-form';


const renderField = ({input, label, type, meta: { touched, error, warning }, disabled, step }) => (
    <div>
        <input {...input}
            placeholder={label}
            type={type}
            className={type === 'checkbox' ? 'checkbox' : 'form-control'}
            disabled={disabled}
            step={step}
        />
        {touched &&
      ((error && <span className='text-danger'>{error}</span>) ||
      (warning && <span className='text-warning'>{warning}</span>))}
    </div>
);


const FormItem = (props) => (
    <div className="form-group">
        <label htmlFor={props.id} className="col-sm-3 control-label" >{props.label}</label>
        <div className="col-sm-9">
            <Field
                id={props.id}
                name={props.id}
                type={props.type}
                component={renderField}
                {...{
                    disabled: props.disabled,
                    step: props.step
                }}
            />
        </div>

    </div>
);

export default FormItem;
