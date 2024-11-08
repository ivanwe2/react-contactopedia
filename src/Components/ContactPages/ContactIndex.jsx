import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import AddRandomContact from "./AddRandomContact";
import RemoveAllContacts from "./RemoveAllContacts";
import AddContact from "./AddContact";
import FavouriteContacts from "./FavouriteContacts";
import GeneralContacts from "./GeneralContact";

class ContactIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: [
        {
          id: 1,
          name: "Ben Parker",
          phone: "09988477293",
          email: "email@abv.bg",
          isFavourite: false,
        },
        {
          id: 2,
          name: "Ivan Rusev",
          phone: "09988477293",
          email: "email@abv.bg",
          isFavourite: true,
        },
        {
          id: 3,
          name: "Toshe Makedonski",
          phone: "09988477293",
          email: "email@abv.bg",
          isFavourite: false,
        },
      ],
      selectedContact: undefined,
      isEdit: false,
    };
  }

  handleAddContact = (newContact) => {
    if (newContact.name === "") {
      return { status: "failure", msg: "Please enter a valid Name" };
    } else if (newContact.phone === "") {
      return { status: "failure", msg: "Please enter a valid Phone Number" };
    }

    const duplicateCandidate = this.state.contactList.filter((c) => {
      return c.name === newContact.name || c.phone === newContact.phone;
    });

    if (duplicateCandidate.length > 0) {
      return { status: "failure", msg: "Duplicate candidate" };
    } else {
      const newFinalContact = {
        ...newContact,
        id: this.state.contactList[this.state.contactList.length - 1].id + 1,
        isFavourite: false,
      };
      this.setState((prevState) => {
        return {
          contactList: prevState.contactList.concat([newFinalContact]),
        };
      });

      return { status: "success", msg: "Contact was added successfully" };
    }
  };

  handleAddRandomContact = (newContact) => {
    const newFinalContact = {
      ...newContact,
      id: this.state.contactList[this.state.contactList.length - 1].id + 1,
      isFavourite: false,
    };
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.concat([newFinalContact]),
      };
    });
  };

  handleUpdateContact = (updatedContact) => {
    console.log(updatedContact);
    if (updatedContact.name === "") {
      return { status: "failure", msg: "Please Enter a valid Name" };
    } else if (updatedContact.phone === "") {
      return { status: "failure", msg: "Please Enter a valid Phone Number" };
    }

    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.map((obj) => {
          if (obj.id === updatedContact.id) {
            return {
              ...obj,
              name: updatedContact.name,
              email: updatedContact.email,
              phone: updatedContact.phone,
            };
          }
          return obj;
        }),
        isUpdating: false,
        selectedContact: undefined,
      };
    });
    return { status: "success", msg: "Contact was updated successfully" };
  };

  handleEditClick = (contact) => {
    this.setState(() => {
      return {
        selectedContact: contact,
        isEdit: true,
      };
    });
  };

  handleCancelEditClick = () => {
    this.setState(() => {
      return {
        selectedContact: undefined,
        isEdit: false,
      };
    });
  };

  handleToggleFavourite = (contact) => {
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.map((obj) => {
          if (obj.id === contact.id) {
            return { ...obj, isFavourite: !obj.isFavourite };
          }
          return obj;
        }),
      };
    });
  };

  handleDeleteContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.filter(
          (item) => item.id !== contactId
        ),
      };
    });
  };

  handleDeleteAllContacts = () => {
    this.setState(() => {
      return {
        contactList: [],
      };
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ minHeight: "85vh" }}>
          <div className="row py-3">
            <div className="col-4 offset-2 row">
              <AddRandomContact
                handleAddRandomContact={this.handleAddRandomContact}
              />
            </div>
            <div className="col-4 row">
              <RemoveAllContacts
                handleDeleteAllContacts={this.handleDeleteAllContacts}
              />
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <AddContact
                  handleAddContact={this.handleAddContact}
                  isEdit={this.state.isEdit}
                  selectedContact={this.state.selectedContact}
                  cancelClick={this.handleCancelEditClick}
                  handleUpdateContact={this.handleUpdateContact}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <FavouriteContacts
                  contacts={this.state.contactList.filter(
                    (c) => c.isFavourite === true
                  )}
                  favouriteClick={this.handleToggleFavourite}
                  deleteClick={this.handleDeleteContact}
                  editClick={this.handleEditClick}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <GeneralContacts
                  contacts={this.state.contactList.filter(
                    (c) => c.isFavourite === false
                  )}
                  favouriteClick={this.handleToggleFavourite}
                  deleteClick={this.handleDeleteContact}
                  editClick={this.handleEditClick}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ContactIndex;
