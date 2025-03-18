const mailSender = require("../utils/mailSender");
const Contact = require("../models/Contact");
const { contactUsConfirmation } = require("../mailTemplates/contactTemplate");
require("dotenv").config();
exports.contactUs = async (req, res) => {
  const { firstName, lastName, email, phoneNo, countryCode, message } =
    req.body;
  if (!firstName || !lastName || !email || !phoneNo)
    return res
      .status(400)
      .json({ success: false, message: "Please fill all required fields" });
  const existingContact = await Contact.findOne({ email });
  if (existingContact) {
    existingContact.firstName = firstName;
    existingContact.lastName = lastName;
    existingContact.phoneNo = phoneNo;
    if (message) existingContact.message = message;
    if (countryCode) existingContact.countryCode = countryCode;
    await existingContact.save();
  } else {
    const contactMessage = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      countryCode: countryCode,
      phoneNo: phoneNo,
      message: message,
    };
    const newContact = new Contact(contactMessage);
    await newContact.save();
  }
  const userMailResponse = mailSender(
    email,
    "We’ve Received Your Message!",
    contactUsConfirmation(`${firstName} ${lastName}`)
  );
  if (!userMailResponse)
    return res
      .status(500)
      .json({ success: false, message: "Failed to send email" });
  return res.status(200).json({ success: true, message: "Message sent" });
};
