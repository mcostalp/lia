import { useState, useEffect } from "react";
import data from "../db/courses.js";
import "./Home.css";

export default function Home() {
  const [show, setShow] = useState([]);
  const [showAll, setShowAll] = useState([]);

  const [courses, setCourses] = useState("");
  const [course, setCourse] = useState("");

  const [level, setLevel] = useState("");
  const [levelSelector, setLevelSelector] = useState("");

  const [shift, setShift] = useState("");
  const [shiftSelector, setShiftSelector] = useState("");

  useEffect(() => {
    setCourses(Object.keys(data));
    const toPush = [];
    for (const k in data) {
      for (const l in data[k]) {
        for (const m in data[k][l]) {
          data[k][l][m].map((id) => {
            toPush.push(Object.values(id));
          });
        }
      }
    }
    const toShow = toPush.filter((element, index) => {
      return toPush.indexOf(element) === index;
    });

    setShow(toShow);
    setShowAll(toShow);
  }, []);

  function handleCourseChange(event) {
    if (event.target.value !== "") {
      setCourse(event.target.value);
      setLevel(Object.keys(data[event.target.value]));
      const toPush = [];
      for (const k in data) {
        if (k === event.target.value) {
          for (const l in data[k]) {
            for (const m in data[k][l]) {
              data[k][l][m].map((id) => {
                toPush.push(Object.values(id));
              });
            }
          }
        }
      }
      const toShow = toPush.filter((element, index) => {
        return toPush.indexOf(element) === index;
      });

      setShow(toShow);
    } else {
      setCourse("");
      setLevelSelector("");
      setShiftSelector("");
      setLevel("");
      setShift("");
      setShow(showAll);
    }
  }

  function handleLevelChange(event) {
    setShift(Object.keys(data[course][event.target.value]));
    setLevelSelector(event.target.value);
    const toPush = [];
    for (const k in data) {
      if (k === course) {
        for (const l in data[k]) {
          if (l === event.target.value) {
            for (const m in data[k][l]) {
              data[k][l][m].map((id) => {
                toPush.push(Object.values(id));
              });
            }
          }
        }
      }
    }
    const toShow = toPush.filter((element, index) => {
      return toPush.indexOf(element) === index;
    });
    setShow(toShow);
  }

  function handleShiftChange(event) {
    if (shiftSelector === "") {
      handleLevelChange;
    }
    setShiftSelector(event.target.value);
    console.log(data[course][levelSelector][event.target.value]);
    const toPush = data[course][levelSelector][event.target.value].map((id) => {
      return Object.values(id).flat(1);
    });
    console.log(toPush);
    const toShow = toPush.filter((element, index) => {
      return toPush.indexOf(element) === index;
    });
    setShow(toShow);
  }

  return (
    <div id="search">
      <h1>Busca</h1>
      <div>
        <div id="selectors">
          Curso:
          <select name={course} id="" onChange={handleCourseChange}>
            <option value=""></option>
            {courses ? (
              courses.map((key, i) => (
                <option key={i} value={key}>
                  {key.toUpperCase()}
                </option>
              ))
            ) : (
              <option value=""></option>
            )}
          </select>
          Nível:
          <select
            name={levelSelector}
            id=""
            onChange={handleLevelChange}
            disabled={course === ""}
          >
            <option value=""></option>
            {level !== "" ? (
              level.map((key, i) => (
                <option key={i} value={key}>
                  {key.toUpperCase()}
                </option>
              ))
            ) : (
              <option value=""></option>
            )}
          </select>
          Período:
          <select
            name={shiftSelector}
            id=""
            onChange={handleShiftChange}
            disabled={levelSelector === ""}
          >
            <option value=""></option>
            {shift !== "" ? (
              shift.map((key, i) => (
                <option key={i} value={key}>
                  {key.toUpperCase()}
                </option>
              ))
            ) : (
              <option value=""></option>
            )}
          </select>
        </div>
        <div>
          <ul>
            {show.length > 0 ? (
              show.map((s, i) => (
                <li key={i} value={s}>
                  {s}
                </li>
              ))
            ) : (
              <h2>Loading...</h2>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
