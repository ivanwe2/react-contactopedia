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
    };
  }

  handleAddContact = (newContact) => {
    const newFinalContact = {
      ...newContact,
      id: this.state.contactList[this.state.contactList.length - 1].id + 1,
      isFavourite: false,
    };
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.concat([newFinalContact]),
      };
    })
    alert("added");
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ minHeight: "85vh" }}>
          <div className="row py-3">
            <div className="col-4 offset-2">
              <AddRandomContact />
            </div>
            <div className="col-4">
              <RemoveAllContacts />
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <AddContact handleAddContact={this.handleAddContact} />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <FavouriteContacts
                  contacts={this.state.contactList.filter(
                    (c) => c.isFavourite === true
                  )}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <GeneralContacts
                  contacts={this.state.contactList.filter(
                    (c) => c.isFavourite === false
                  )}
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
