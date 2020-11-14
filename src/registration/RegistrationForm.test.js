import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';

import RegistrationForm from './RegistrationForm';

describe('The RegistrationForm', () => {
  test('render the empty registration form', () => {
    // This very simple test just ensures that the RegistrationForm
    // component is able to be successfully rendered.
    render(<RegistrationForm />);

    // Expansion of the simple test -- ensures that the
    // items that we expect to see within the RegistrationForm
    // component (buttons, fields, etc.) are visible.
    expect(screen.getByText('Registration')).toBeVisible();
    expect(screen.getByText('Register')).toBeDisabled();
    expect(screen.getByLabelText('First Name')).toBeVisible();
    expect(screen.getByLabelText('Last Name')).toBeVisible();
    expect(screen.getByLabelText('Country')).toBeVisible();
    expect(screen.queryByLabelText('State')).not.toBeInTheDocument();
  });

  // More complex test that checks whether the RegistrationForm
  // component is populated with specific data for a person
  // from the Netherlands.
  test('render the populated registration form for person in Netherlands', () => {
    const testPerson = {
      firstName: "Avalon",
      lastName: "Matthew",
      country: "Netherlands",
      state: ''
    }
    render(
      <RegistrationForm person={testPerson} />);

    expect(screen.getByText('Registration')).toBeVisible();
    expect(screen.getByText('Register')).toBeEnabled();
    expect(screen.getByLabelText('First Name')).toHaveValue("Avalon");
    expect(screen.getByLabelText("Last Name")).toHaveValue("Matthew");
    expect(screen.getByLabelText("Country")).toHaveValue("Netherlands");
    expect(screen.queryByLabelText("State")).not.toBeInTheDocument();
  });

  // Checks whether the RegistrationForm component is populated with
  // specific data for a person from the USA.
  test('render the populated registration form for person in USA', () => {
    const testPerson = {
      firstName: "Chuck",
      lastName: "Norris",
      country: "USA",
      state: "Texas"
    }
    render(<RegistrationForm person={testPerson} />);

    expect(screen.getByText('Registration')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeEnabled();
    expect(screen.getByLabelText('First Name')).toHaveValue("Chuck");
    expect(screen.getByLabelText("Last Name")).toHaveValue("Norris");
    expect(screen.getByLabelText("Country")).toHaveValue("USA");
    expect(screen.getByLabelText("State")).toHaveValue("Texas");
  });

  test('register a person', () => {
    const testRegister = jest.fn();

    render(<RegistrationForm testRegister={testRegister} />);

    fireEvent.change(screen.getByLabelText("First Name"), {target: { name: "firstName", value: "Mike"}});
    fireEvent.change(screen.getByLabelText("Last Name"), {target: { name: "lastName", value: "Harris"}});

    fireEvent.click(screen.getByText("Register"));

    expect(testRegister).toHaveBeenCalledWith ({
      firstName: "Mike",
      lastName: "Harris",
      country: "{Country Not Given}",
      state: ""
    });
  });
});