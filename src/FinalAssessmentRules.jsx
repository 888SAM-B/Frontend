import React from "react";
import "./FinalAssessmentRules.css"; // Import the CSS file for styling

const FinalAssessmentRules = () => {
  return (
    <div className="rule-body">
      <div className="container1">
        <h2 className="title">📜 Final Assessment Rules & Regulations</h2>
        <div className="table-container1">
          <table className="rules-table">
            <thead className="table-header">
              <tr className="header-row">
                <th className="header-cell">Category</th>
                <th className="header-cell">Details</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr className="table-row">
                <td className="category"><strong>Assessment Format</strong></td>
                <td className="details">20 Multiple-choice questions (MCQs)</td>
              </tr>
              <tr className="table-row">
                <td className="category"><strong>Time Limit</strong></td>
                <td className="details">
                  - The test must be completed within the allocated time (20 mins). <br />
                  - If time exceeds, the test will be automatically submitted.
                </td>
              </tr>
              <tr className="table-row">
                <td className="category"><strong>Passing Criteria</strong></td>
                <td className="details">
                  - <strong>Below 50%</strong> → Retake the course and reattempt. <br />
                  - <strong>50% - 79%</strong> → Certificate awarded. <br />
                  - <strong>80% & above</strong> → Certificate + Interview Questions.
                </td>
              </tr>
              <tr className="table-row">
                <td className="category"><strong>Cheating & Plagiarism</strong></td>
                <td className="details">Copying answers, using external help, or cheating results should be avoided.</td>
              </tr>
              <tr className="table-row">
                <td className="category"><strong>Retake Policy</strong></td>
                <td className="details">If failed, the user must restart and complete the course before reattempting.</td>
              </tr>
              <tr className="table-row">
                <td className="category"><strong>Certificate Issuance</strong></td>
                <td className="details">Digital certificate auto-generated upon passing the test.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default FinalAssessmentRules;