import { useState } from "react";
import { useDispatch } from "react-redux";
import { SetAlert, DisableAlert } from "../../actions";
import axios from "axios";
export default function AddQuiz() {
  const dispatch = useDispatch();
  const [Open, SetOpen] = useState("AddQuiz__Form");
  const [Title, SetTitle] = useState("");
  const [Desc, SetDesc] = useState("");
  const [Percentage, SetPercentage] = useState("");
  const [isLoading,setLoading] = useState(false)

  function SaveData() {

    if (Title == "" || Desc == "" || Percentage == "") {
      dispatch(SetAlert("Please Fill All Fields"));

      const timer = setTimeout(() => {
        dispatch(DisableAlert());
      }, 1000);
      return;
    }
    setLoading(true)
    axios
      .post(process.env.REACT_APP_BASE_URL, {
        questions: [],
        title: Title,
        description: Desc,
        percentage: Percentage,
      })
      .then((resp) => {
        SetTitle("");
        SetDesc("");
        SetPercentage("");
        SetOpen("AddQuiz__Form");
        setLoading(false)
        dispatch(SetAlert("Quiz Added."));

        const timer = setTimeout(() => {
          dispatch(DisableAlert());
        }, 1000);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="AddQuiz">
      {
        isLoading ? ( 
          <div class="loader"></div>
        ):(
          <div className={Open}>
        <input
          value={Title}
          onChange={(e) => {
            SetTitle(e.target.value);
          }}
          placeholder="Title"
        ></input>
        <input
          value={Desc}
          onChange={(e) => {
            SetDesc(e.target.value);
          }}
          placeholder="Description"
        ></input>
        <input
          type="number"
          min="1"
          max="100"
          value={Percentage}
          onChange={(e) => {
            SetPercentage(e.target.value);
          }}
          placeholder="Pass Percentage (Only Number Is Required.)"
        ></input>
        <div>
          <button
            onClick={() => {
              SaveData();
            }}
          >
            Add
          </button>
          <button
            onClick={() => {
              SetOpen("AddQuiz__Form");
            }}
          >
            Close
          </button>
        </div>
      </div>
        )
      }
      <div className="AddQuiz__Button">
        <button
          onClick={() => {
            SetOpen("AddQuiz__Form Open__Form");
          }}
        >
          Add Quiz
        </button>
      </div>
    </div>
  );
}
