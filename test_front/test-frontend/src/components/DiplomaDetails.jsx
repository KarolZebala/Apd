import React, { useState, useEffect } from "react";
import { getUserById } from "../api/userApi";
import "../styles/details.css";

const DiplomaDetails = ({ diploma }) => {
  const [studentName, setStudentName] = useState("-");
  const [promoterName, setPromoterName] = useState("-");
  const [reviewerName, setReviewerName] = useState("-");

  useEffect(() => {
    if (!diploma) return;

    const fetchUserDetails = async () => {
      try {
        if (diploma.studentId) {
          const student = await getUserById(diploma.studentId);
          setStudentName(student?.userName || "-");
        }
        if (diploma.promoterId) {
          const promoter = await getUserById(diploma.promoterId);
          setPromoterName(promoter?.userName || "-");
        }
        if (diploma.reviewerId) {
          const reviewer = await getUserById(diploma.reviewerId);
          setReviewerName(reviewer?.userName || "-");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [diploma]);

  return (
    <table className="selected-diploma-table">
      <thead>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Title</td>
          <td>{diploma?.title || "-"}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>{diploma?.type || "-"}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{diploma?.description || "-"}</td>
        </tr>
        <tr>
          <td>Department</td>
          <td>{diploma?.departmentName || "-"}</td>
        </tr>
        <tr>
          <td>Course</td>
          <td>{diploma?.course || "-"}</td>
        </tr>
        <tr>
          <td>Create Date</td>
          <td>{diploma?.createDate || "-"}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>{diploma?.status || "-"}</td>
        </tr>
        <tr>
          <td>Student</td>
          <td>{studentName}</td>
        </tr>
        <tr>
          <td>Promoter</td>
          <td>{promoterName}</td>
        </tr>
        <tr>
          <td>Reviewer</td>
          <td>{reviewerName}</td>
        </tr>
        <tr>
          <td>Tags</td>
          <td>{diploma?.tag || "-"}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DiplomaDetails;
