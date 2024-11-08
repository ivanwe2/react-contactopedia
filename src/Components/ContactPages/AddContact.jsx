import React from "react";

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: undefined,
      successMessage: undefined,
    };
  }

  handleCancel = () => {
    this.props.cancelClick();
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.contactName.value.trim();
    const email = e.target.elements.contactEmail.value.trim();
    const phone = e.target.elements.contactPhone.value.trim();
    const id = e.target.elements.contactId.value.trim();
    let response = undefined;
    if (this.props.isUpdating) {
      response = this.props.handleUpdateContact({
        name: name,
        email: email,
        phone: phone,
        id: id,
      });
    } else {
      response = this.props.handleAddContact({
        name: name,
        email: email,
        phone: phone,
      });
    }

    if (response.status === "success") {
      this.setState({ errorMessage: undefined, successMessage: response.msg });
      document.querySelector(".contact-form").reset();
    } else {
      this.setState({ errorMessage: response.msg, successMessage: undefined });
    }
  };

  render() {
    return (
      <div className="border col-12 text-white p-2">
        <form
          onSubmit={
            // props.isEdit
            //   ? this.handleEditContactFormSubmit
            this.handleFormSubmit
          }
        >
          <div className="row p-2">
            <div className="col-12 text-white-50">
              {this.props.isEdit ? "Update" : "Add new"} Contact
            </div>
            <input
              hidden
              name="contactId"
              defaultValue={
                this.props.isUpdating ? this.props.selectedContact.id : ""
              }
            ></input>
            <div className="col-12 col-md-4 p-1">
              <input
                className="form-control form-control-sm"
                placeholder="Name..."
                name="contactName"
                defaultValue={
                  this.props.isEdit ? this.props.selectedContact.name : ""
                }
              ></input>
            </div>
            <div className="col-12 col-md-4 p-1">
              <input
                className="form-control form-control-sm"
                placeholder="Email..."
                name="contactEmail"
                defaultValue={
                  this.props.isEdit ? this.props.selectedContact.email : ""
                }
              ></input>
            </div>
            <div className="col-12 col-md-4 p-1">
              <input
                className="form-control form-control-sm"
                placeholder="Phone..."
                name="contactPhone"
                defaultValue={
                  this.props.isEdit ? this.props.selectedContact.phone : ""
                }
              ></input>
            </div>

            {this.state.errorMessage === undefined ? (
              <div></div>
            ) : (
              <div className="col-12 text-center text-danger">
                {this.state.errorMessage}
              </div>
            )}

            {this.state.successMessage === undefined ? (
              <div></div>
            ) : (
              <div className="col-12 text-center text-success">
                {this.state.errorMessage}
              </div>
            )}

            <div
              className={`col-12 p-1 ${
                this.props.isEdit
                  ? "col-md-4 offset-md-2"
                  : "col-md-6 offset-md-3"
              }`}
            >
              <button className="btn btn-primary btn-sm form-control">
                {this.props.isEdit ? "Update" : "Add"}
              </button>
            </div>
            {this.props.isEdit && (
              <div className="col-12 p-1 col-md-4">
                <button
                  onClick={() => this.handleCancel()}
                  className="btn btn-secondary form-control btn-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default AddContact;
