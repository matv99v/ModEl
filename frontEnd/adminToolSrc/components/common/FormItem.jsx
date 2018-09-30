import React from 'react';
import { Field } from 'redux-form';


const FormItem = (props) => (
    <div className="form-group">
        <label htmlFor={props.id} className="col-sm-3 control-label" >{props.label}</label>
        <div className="col-sm-9">
            <Field
                id={props.id}
                name={props.id}
                component={props.component}
                type={props.type}
                className={props.type === 'checkbox' ? 'checkbox' : 'form-control'}
                disabled={props.disabled}
            />
        </div>

    </div>
);


{/* <div className="form-group">
    <label htmlFor="idProducttttt">1 idProduct</label>
    <Field
        id='idProducttttt'
        name="nameeeee"
        component="input"
        type="number"
        className="form-control"
    />
</div> */}




export default FormItem;