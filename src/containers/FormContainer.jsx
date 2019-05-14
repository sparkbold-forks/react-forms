import React, { Component } from "react";

/* Import Components */
import CheckBox from "../components/CheckBox";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Select from "../components/Select";
import Button from "../components/Button";

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newEmail: {
        yourEmail: "",
        departmentEmail: "",
        deparment: "",
        topics: [],
        content: ""
      },

      departmentOptions: [
        "Client Experience Center of Excellence",
        "Community Involvement",
        "Corporate Human Resources",
        "Corporate Real Estate & Facility Solutions",
        "Employment Screening",
        "Executive Office Group",
        "Field Payroll Operations",
        "Field Service Operations",
        "Finance",
        "Financial Solutions",
        "Gross Profit Enhancement",
        "Health & Welfare",
        "Human Capital Solutions, Middle Market",
        "Information Governance",
        "Insurance Services",
        "Legal",
        "Marketing & Business Development",
        "Payroll Service Operations",
        "Payroll Services",
        "Performance & Organizational Management",
        "Pricing & Cost Analysis",
        "Property & Casualty",
        "Records Administration",
        "Recruiting Services",
        "Retirement Services",
        "Sales - Business Performance Solutions",
        "Sales - Executive VP",
        "Sales - Inside Sales Support",
        "Sales - Marketing",
        "Sales - Office Management",
        "Sales - Remote",
        "Sales Operations",
        "Service Operations",
        "Service Operations - Contact Center",
        "Service Operations - EEO",
        "Service Operations - HR/COE",
        "Service Operations Executive",
        "Support Executive Group",
        "Technology - Business Applications",
        "Technology - Business Performance Solutions Tech",
        "Technology - Enterprise Project Management",
        "Technology - Infrastructure & Services",
        "Technology - Product Innovation",
        "Technology - VP",
        "Time and Attendance",
        "Traditional Employment Services"
      ],
      topicOptions: ["Programming", "Development", "Design", "Testing"]
    };
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleDepartmentEmail = this.handleDepartmentEmail.bind(this);
    this.handleYourEmail = this.handleYourEmail.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleYourEmail(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({ newEmail: { ...prevState.newEmail, yourEmail: value } }),
      () => console.log(this.state.newEmail)
    );
  }

  handleDepartmentEmail(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newEmail: { ...prevState.newEmail, departmentEmail: value }
      }),
      () => console.log(this.state.newEmail)
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({ newEmail: { ...prevState.newEmail, [name]: value } }),
      () => console.log(this.state.newEmail)
    );
  }

  handleTextArea(e) {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(
      prevState => ({
        newEmail: {
          ...prevState.newEmail,
          content: value
        }
      }),
      () => console.log(this.state.newEmail)
    );
  }

  handleCheckBox(e) {
    const newSelection = e.target.value;
    let newSelectionArray;

    if (this.state.newEmail.topics.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newEmail.topics.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.newEmail.topics, newSelection];
    }

    this.setState(prevState => ({
      newEmail: { ...prevState.newEmail, topics: newSelectionArray }
    }));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newEmail;

    fetch("http://example.com", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
      });
    });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newEmail: {
        yourEmail: "",
        departmentEmail: "",
        department: "",
        topics: [],
        content: ""
      }
    });
  }

  render() {
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <Input
          inputType={"text"}
          title={"Your Email"}
          name={"yourEmail"}
          value={this.state.newEmail.yourEmail}
          placeholder={"firstname.lastname@insperity.com"}
          handleChange={this.handleInput}
        />{" "}
        {/* yourEmail of the user */}
        <Input
          inputType={"number"}
          name={"departmentEmail"}
          title={"Department Email"}
          value={this.state.newEmail.departmentEmail}
          placeholder={"community.involvement@insperity.com)"}
          handleChange={this.handleDepartmentEmail}
        />{" "}
        {/* departmentEmail */}
        <Select
          title={"Department"}
          name={"department"}
          options={this.state.departmentOptions}
          value={this.state.newEmail.department}
          placeholder={"Select department"}
          handleChange={this.handleInput}
        />{" "}
        {/* departmentEmail Selection */}
        {/* <CheckBox
          title={"topics"}
          name={"topics"}
          options={this.state.topicOptions}
          selectedOptions={this.state.newEmail.topics}
          handleChange={this.handleCheckBox}
        />{" "} */}
        {/* Skill */}
        <TextArea
          title={"Email Content"}
          rows={10}
          value={this.state.newEmail.content}
          name={"currentPetInfo"}
          handleChange={this.handleTextArea}
          placeholder={"Compose your message"}
        />
        {/* content of your message */}
        <Button
          action={this.handleFormSubmit}
          type={"primary"}
          title={"Submit"}
          style={buttonStyle}
        />{" "}
        {/*Submit */}
        <Button
          action={this.handleClearForm}
          type={"secondary"}
          title={"Clear"}
          style={buttonStyle}
        />{" "}
        {/* Clear the form */}
      </form>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default FormContainer;
