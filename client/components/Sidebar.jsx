import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { AppContext } from "./ContextProvider";

function Sidebar() {
  let match = useRouteMatch();
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios("http://localhost:3000/api/schools").then((res) =>
      setSchools(res.data)
    );
  }, []);

  function selectSchool(school_id) {
    const query = school_id;
    axios("http://localhost:3000/api/classes/school/" + query).then((res) =>
      setClasses(res.data)
    );
  }

  return (
    <AppContext.Consumer>
      {({
        currentSchool_id,
        currentClass_id,
        setCurrentSchool_id,
        setCurrentClass_id,
      }) => (
        <div className="sidebar_container">
          <div className="sidebar_subcontainer">
            <div className="sidebar_title">School</div>
            {schools.map((school) => {
              return (
                <Link
                  className="sidebar_link"
                  to={`${match.path}/schoollanding`}
                >
                  <div
                    onClick={() => {
                      selectSchool(school.school_id);
                      setCurrentSchool_id(school.school_id);
                      return;
                    }}
                    className="sidebar_item"
                  >
                    {school.school_name}
                  </div>
                </Link>
              );
            })}

            <button className="sidebar_button">Add new School</button>
          </div>
          <div className="sidebar_subcontainer">
            <div className="sidebar_title">Classes</div>

            {classes.map((data) => {
              return (
                <Link
                  className="sidebar_link"
                  to={`${match.path}/eventlanding`}
                >
                  <div
                    onClick={() => {
                      setCurrentClass_id(data.class_id);
                      return;
                    }}
                    className="sidebar_item"
                  >
                    {data.class_name}
                  </div>
                </Link>
              );
            })}

            <button className="sidebar_button">Add new Class</button>

            <p>currentSchool_id:{currentSchool_id}</p>
            <p>currentClass_id:{currentClass_id}</p>
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
}

export default Sidebar;
