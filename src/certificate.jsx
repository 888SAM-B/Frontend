import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import place from './assets/place.png';
import { useNavigate } from "react-router-dom";
const Certificate = () => {
  const [course,setCourse]=useState("")
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    course: "",
  });
   const navigate = useNavigate();

   useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Unauthorized. Please log in again.");
      return;
    }
  
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8001/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const result = await response.json();
  
        if (response.ok) {
          setUserData({
            firstname: result.user.firstname,
            lastname: result.user.lastname,
            course: result.user.course,
          });
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Something went wrong!");
      }
    };
    fetchProfile();
  }, []);
  
  useEffect(() => {
    if (userData.course === 'advancedjava') {
      setCourse("java");
    } else if (userData.course === 'advancedpython') {
      setCourse("python");
    } else {
      setCourse(userData.course);
    }
  }, [userData]); // Run this effect whenever `userData` changes  

  const downloadCertificate = () => {
    // Create a dynamic container for the certificate
    const element = document.createElement('div');
    element.style.width = '1122px'; // A4 landscape width
    element.style.height = '793px'; // A4 landscape height
    element.style.padding = '50px';
    element.style.border = '1px solid #ddd';
    element.style.backgroundColor = '#fff';
    element.style.fontFamily = 'Arial, sans-serif';
    element.style.textAlign = 'center';
    element.style.boxSizing = 'border-box';
    element.style.display = 'flex';
    element.style.flexDirection = 'column';
    element.style.justifyContent = 'space-between';
    element.style.alignItems = 'center';

    // Add certificate content
    element.innerHTML = `
      <h2 style="text-align: center; font-size: 28px; font-weight: bold; margin-bottom: 20px;">
        COURSE COMPLETION CERTIFICATE
      </h2>
      <p style="font-size: 18px; line-height: 1.8; margin: 20px 0; width: 80%;">
        This is to certify that <strong>${userData.firstname} ${userData.lastname}</strong> has
        successfully completed the <strong>${course}</strong> course provided by 
        <strong>Decode Your Course - AI powered learning platform for programming </strong>. They have showcased exceptional commitment and a strong grasp of the concepts taught during the course. We extend our heartfelt congratulations and wish them success in their future endeavors.
      </p>
      <img src="${place}" alt="Seal or Logo" width="150" style="margin-bottom: 20px;" />
      <p style="font-size: 14px; color: #666; margin-top: 20px;">
        Issued by <strong>Decode Your Course</strong> - Empowering Learners Everywhere
      </p>
    `;

    document.body.appendChild(element); // Temporarily add the element to the DOM

    const options = {
      margin: 0,
      filename: 'certificate.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 3,
        useCORS: true,
      },
      jsPDF: { unit: 'px', format: [1122, 793], orientation: 'landscape' },
    };

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        document.body.removeChild(element); // Remove the element after the PDF is downloaded
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        document.body.removeChild(element); // Ensure cleanup even on error
      });
  };

  return (
    <div className='mainCertificateContainer'>
      {/* Download Button */}
      <div className="certificatePreview">

        <h2
          className='certificate-title'
        >
          COURSE COMPLETION CERTIFICATE
        </h2>
        <p className='certificate-text' >
       
  This is to certify that <strong>{userData.firstname} {userData.lastname}</strong> has successfully completed the <strong>{course}</strong> course provided by <strong>Decode Your Course - AI powered learning platform for programming</strong>. They have showcased exceptional commitment and a strong grasp of the concepts taught during the course. We extend our heartfelt congratulations and wish them success in their future endeavors.


        </p>
        <img
          src={place}
          alt="Seal or Logo"
          style={{
            marginBottom: "20px",
          }}
        />
        <p
  className='certificateFooter'
        >
          Issued by <strong>Decode Your Course</strong> - Empowering Learners Everywhere
        </p>


      </div>
      <button
        onClick={()=>{
          downloadCertificate();
          navigate("/initial-test")

        }}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;
