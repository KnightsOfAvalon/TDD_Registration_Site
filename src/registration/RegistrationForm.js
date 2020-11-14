import React from 'react';
import Alert from 'react-bootstrap/Alert';

const RegistrationForm = ({ person: initialPerson, text: initialText, testRegister }) => {
  const [person, setPerson] = React.useState(initialPerson);
  const [text, setText] = React.useState(initialText);
  const [showAlert, setShowAlert] = React.useState(false);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPerson((p) => ({ ...p, [name]: value }));
  }

  const onRegister = () => {
    setText(
      person.firstName + " " + person.lastName + 
      ' has successfully registered! '
    );
    setShowAlert(true);
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

        <div className="float-right">
          <button
            disabled={!person.firstName || !person.lastName}
            onClick={() => {
              if (typeof testRegister === "function") {
                testRegister(person)
              } else {
                onRegister(person);
            }}}
            className="btn btn-primary"
          >Register</button>
        </div>
      </div>
    </div>

    {showAlert &&
    <Alert variant="success">
      <p>
        {text}
        <br />
        You may now close this window.
      </p>
    </Alert>}

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