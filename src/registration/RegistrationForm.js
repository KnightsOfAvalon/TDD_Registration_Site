import React from 'react';
import Alert from 'react-bootstrap/Alert';

// Removed unnecessary testRegister function from params
// - Ava 11/14/2020
const RegistrationForm = ({ person: initialPerson, text: initialText }) => {
  const [person, setPerson] = React.useState(initialPerson);
  const [text, setText] = React.useState(initialText);
  const [show, setShow] = React.useState(false);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPerson((p) => ({ ...p, [name]: value }));
  }

  const onRegister = () => {
    setText(
      person.firstName + " " + person.lastName + 
      ' has successfully registered! '
    );
    setShow(true);
  }

  return (
    <div>
    
    <div className="card" style={{ marginTop: 24 }}>
      <div className="card-header">
        <h2>Registration</h2>
      </div>

      <div className="card-body">
        <div className="form-group">
          <span style={{ color: "red" }}>*</span>
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName"
            value={person.firstName}
            onChange={handleChange}
          />
        </div>

        <div className= "form-group">
          <span style={{ color: "red" }}>*</span>
          <label htmlFor="lastName">Last Name</label>
          <input 
            type="text" 
            id="lastName"
            name="lastName"
            value={person.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select 
            id="country" 
            name="country"
            value={person.country}
            onChange={handleChange}
          >
            <option value="Country Not Given"></option>
            <option value="Netherlands">Netherlands</option>
            <option value="USA">USA</option>
          </select>
        </div>

        {person.country === "USA" && (
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input 
              type="text" 
              id="state" 
              name="state"
              value={person.state}
              onChange={handleChange}
            />
          </div>
        )}

        <p style={{ color: "red" }}>* indicates required field</p>

        {
          /* Simplified onClick method by removing
          unnecessary testRegister method 
          - Ava 11/14/2020 */
        }
        <div className="float-right">
          <button
            disabled={!person.firstName || !person.lastName}
            onClick={() => {onRegister(person)}}
            className="btn btn-primary"
          >Register</button>
        </div>
      </div>
    </div>

    <Alert 
      variant="success" 
      style={!show ? { display: "none"} : {display: "block"}}
      data-testid="alert"
      onClose={() => setShow(false)}
      dismissible
    >
      <p>
        {text}
      </p>
    </Alert>

    </div>
  )
}

RegistrationForm.defaultProps = {
  person: {
    firstName: '',
    lastName: '',
    country: '{Country Not Given}',
    state: ''
  },
  text: ''
}

export default RegistrationForm;