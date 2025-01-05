import { useState } from "react";
import "./form.css";

function FormValidation() {
    const [ formData, setFormData ] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [ errors, setErrors ] = useState({
        username: '',
        email: '',
        password: ''
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validateInput(name, value);
    }

    function validateInput(name, value) {
        switch (name) {
            case 'username': {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: value.length < 3 ? 'Username must be atleast 3 characters' : ''
                }));
                break;
            }
            case 'email': {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid Email'
                }));
                break;
            }
            case 'password': {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: value.length < 5 ? 'Password must contain atleast 5 characters' : ''
                }));
                break;
            }
            default:
                break;
        };
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        // const validationErrors = {};
        // Object.keys(formData).forEach(dataKey => {
        //     validateInput(dataKey, formData[dataKey]);
        //     if (errors[dataKey]) {
        //         validationErrors[dataKey] = errors[dataKey];
        //     };
        // });

        // setErrors((prevErrors) => ({
        //     ...prevErrors,
        //     ...validationErrors
        // }));

        // if (Object.values(validationErrors).every(error => error === '')) {
        //     // perform your form submission logic.
        // }
        // else {
        //     console.log('Please fix the input errors to submit the data')
        // }
    }

    return (
        <div className="form-validation-container">
            <h1>Form Validation</h1>
            <form className="form" onSubmit={handleFormSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    <span>{errors?.username}</span>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <span>{errors?.email}</span>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <span>{errors?.password}</span>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FormValidation;