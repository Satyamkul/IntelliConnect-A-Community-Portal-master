import "./editProfile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


export default function EditProfile() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useParams().username;
  const navigate = useNavigate();


  // const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    profilePicture: "",
    coverPicture: "",
    desc: "",
    college: "",
    role: "",
    course: "",
    city: "",
  });

  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [coverPictureFile, setCoverPictureFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/users?username=${username}`
        );
        // setUser(res.data);
        setFormData({
          profilePicture: res.data.profilePicture || "",
          coverPicture: res.data.coverPicture || "",
          desc: res.data.desc || "",
          college: res.data.college || "",
          role: res.data.role || "",
          course: res.data.course || "",
          city: res.data.city || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      userId: user._id,
      desc: formData.desc,
      college: formData.college,
      role: formData.role,
      course: formData.course,
      city: formData.city,
    };

    // Handle Profile Picture Upload
    if (profilePictureFile) {
      const profileData = new FormData();
      const fileName = Date.now() + profilePictureFile.name;
      profileData.append("name", fileName);
      profileData.append("file", profilePictureFile);
      updatedData.profilePicture = fileName;

      try {
        await axios.post("http://localhost:8800/api/upload", profileData);
        dispatch({ type: "UPDATE_USER", payload: { ...user, profilePicture: fileName } });
      } catch (err) {
        console.error("Error uploading profile picture:", err);
      }
    }

    // Handle Cover Picture Upload
    if (coverPictureFile) {
      const coverData = new FormData();
      const fileName = Date.now() + coverPictureFile.name;
      coverData.append("name", fileName);
      coverData.append("file", coverPictureFile);
      updatedData.coverPicture = fileName;

      try {
        await axios.post("http://localhost:8800/api/upload", coverData);
      } catch (err) {
        console.error("Error uploading cover picture:", err);
      }
    }

    // Update User Data
    try {
      await axios.put(
        `http://localhost:8800/api/users/${user._id}`,
        updatedData
      );
      alert("Profile updated successfully!");
      navigate(`/profile/${username}`);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <>
      <Topbar />
      <div className="editProfile">
        <Sidebar />
        <div className="editProfileWrapper">
          <h2>Edit Profile</h2>
          <form className="editProfileForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <input
              type="file"
              onChange={(e) => setProfilePictureFile(e.target.files[0])}
            />

            <label>Cover Picture</label>
            <input
              type="file"
              onChange={(e) => setCoverPictureFile(e.target.files[0])}
            />

            <label>Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              placeholder="Write about yourself..."
            />

            <label>College</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              placeholder="Enter your college"
            />

            <label>Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="Enter your role"
            />

            <label>Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              placeholder="Enter your course"
            />

            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter your city"
            />

            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
}
