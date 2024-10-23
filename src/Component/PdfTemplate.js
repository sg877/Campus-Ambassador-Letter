import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import CA from "../Image/CA.jpg";
import { MdClose } from "react-icons/md";

const PdfTemplate = () => {
  const printRef = useRef(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    dateStart: "",
    name: "",
    college: "",
    payPer: "",
  });
  const [detailsList, setDetailsList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addDetails = () => {
    setDetailsList((prevList) => [...prevList, formData]);

    // Clear form data
    setFormData({
      dateStart: "",
      name: "",
      college: "",
      payPer: "",
    });
    setPopupOpen(false);
  };

  const handlePrint = () => {
    const element = printRef.current;
    const pdfName = formData.name ? `${formData.name.replace(/\s+/g, "_")}.pdf` : "document.pdf";

    const options = {
      filename: pdfName,
      image: { type: "jpeg", quality: 2 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="mx-5">
      <div className="mb-5 p-5 shadow">
        <button onClick={handlePrint} className="border px-4 rounded mx-5 py-2 fs-5 bg-primary text-white">
          Print PDF
        </button>
        <button onClick={() => setPopupOpen(true)} className="border px-4 rounded mx-5 py-2 fs-5 bg-primary text-white">
          Add Details
        </button>
      </div>

      {isPopupOpen && (
        <div className="shadow px-2 py-2">
          <div className="title">
            <div className="icon-cross" onClick={() => setPopupOpen(false)}>
              <MdClose style={{ cursor: "pointer", fontSize: "24px" }} />
            </div>
          </div>
          <div className="container">
            <div className="forms">
              <input
                type="text"
                name="dateStart"
                value={formData.dateStart}
                onChange={handleInputChange}
                placeholder="Date"
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                placeholder="College Name"
              />
              <input
                type="text"
                name="payPer"
                value={formData.payPer}
                onChange={handleInputChange}
                placeholder="Pay per Registrations"
              />
            </div>
            <div className="text-center py-3">
              <button onClick={addDetails} className="border px-4 rounded py-2 fs-5 bg-primary text-white">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="background_color">
        <div className="container-fluid image-container" ref={printRef}>
          <div className="image-overlay">
            <img className="image" src={CA} alt=""/>
            <div className="container text-overlay">
              <div className="row my-5">
                <div className="container px-4">
                  <div className="container content px-5">
                    <div className="text-center pt-5">
                      <span className="fs-5 fw-bold">CAMPUS AMBASSADOR LETTER</span>
                    </div>

                    {detailsList.length > 0 && (
                      <>
                        <div className="pt-3 fw-bold">
                          {detailsList.map((item, index) => (
                            <div key={index}>
                              <ul>
                                <li>DATE: {item.dateStart}</li>
                                <li className="pt-3">Dear {item.name},</li>
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div>
                          {detailsList.map((item, index) => (
                            <p className="pt-3" key={index}>
                              <b>Congratulations,</b> you have successfully made it through the selection process, and
                              <b> InternsElite</b> is pleased to offer you the <b>Campus Ambassador</b> opportunity. You
                              will be the official representative of our organization at your college <b>{item.college}</b>.
                            </p>
                          ))}
                        </div>

                        <ul className="pt-3 list">
                          <li>
                            <b>APPOINTMENT</b>
                            <p>
                              You are appointed as a Campus Ambassador by <b>InternsElite</b>. You will be assigned
                              different tasks from time to time. Responsibilities include digital marketing, awareness,
                              word of mouth, meetings, and registrations.
                            </p>
                          </li>

                          <li className="pt-3">
                            <b>BENEFITS</b>
                            <p>You will receive various perks and benefits:</p>
                            <div className="list1">
                            <ul>
                              <li>A certificate of Campus Ambassador Internship from <b>InternsElite.</b></li>
                              <li>A letter of recommendation.</li>
                              <li>A chance to <b>Get a Free Internship/Stipend.</b></li>
                              <li>Training and development sessions.</li>
                              <li>Placement opportunity (based on performance).</li>
                            </ul>
                            </div>
                          </li>

                          <li className="pt-3">
                            <b>PAY</b>
                            <p>You will be paid (Stipend) based on your task completion:</p>
                            {detailsList.map((item, index) => (
                              <div className="list1" key={index}>
                                <ul>
                                <li>Minimum Eligibility: <b>10 Registrations</b></li>
                                <li>Pay per Registration: <b>INR {item.payPer}</b></li>
                                <li>Maximum registrations: Unlimited</li>
                              </ul>
                              </div>
                            ))}
                          </li>
                        </ul>
                      </>
                    )}

                    <div className="pt-5 pl-4">
                      <h3 className="pb-5 pt-1">
                        <b>With Regards</b>
                      </h3>
                      <h4 className="pt-5">
                        <b>InternsElite</b>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfTemplate;
