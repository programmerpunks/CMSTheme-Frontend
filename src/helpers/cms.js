import "antd/dist/antd.css";
import { message } from "antd";
import StarRateIcon from "@mui/icons-material/StarRate";

import { applycms } from "../api";

export const save = async ({ team, setState, setCheck, check }) => {
  try {
    let response = await applycms({ data: { team } });
    if (response.status === 202) {
      setCheck(!check);
      setState(false);
      message.success("Changes Saved");
    }
  } catch (err) {
    message.error(err.response.data.error);
  }
};

export const removeStar = ({ setStars, key, stars }) => {
  let filteredStars = stars.filter((item) => item.id !== key);
  setStars(filteredStars);
};

export const addReview = ({ stars, setStars }) => {
  if (stars.length < 5)
    setStars([
      ...stars,
      {
        id: stars.length,
      },
    ]);
};

export const ReviewStars = ({ setStars, stars }) => {
  let reviewstars = [];
  stars.map((item, index) => {
    return reviewstars.push(
      <StarRateIcon
        key={item.id}
        className="review-star fs-5"
        onClick={() => {
          removeStar({ setStars, key: item.id, stars });
        }}
      />
    );
  });
  return reviewstars;
};

export const addNewMember = ({
  image,
  team,
  setTeam,
  title,
  designation,
  stars,
  setEditable,
  editable,
  setProcess,
  setLoading,
  experience,
  setUploaded,
}) => {
  setEditable(!editable);
  const id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  let data = { id, title, designation, stars, image, experience };
  setTeam([...team, data]);
  setProcess(0);
  setUploaded(true);
  setLoading(false);
};

export const uploadImage = async (props) => {
  let teamData = props;
  const { setLoading, setUploaded, profileImage } = teamData;
  setLoading(true);
  setUploaded(false);
  if (profileImage) {
    const data = new FormData();
    data.append("file", profileImage);
    data.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_PRESET_FOLDER
    );
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        teamData.image = data.url;
        addNewMember(teamData);
      })
      .catch((err) => console.log("err:", err.message));
  }
};

export const deleteMember = async ({
  team,
  setTeam,
  setMembers,
  id,
  setOpen,
}) => {
  let filteredMembers = team.filter((member) => member.id !== id);
  let response = await applycms({ data: { team: filteredMembers } });

  try {
    if (response.status === 202) {
      setTeam(response.data.template.team);
      setMembers(response.data.template.team);
      setOpen(false);
      message.success("Deleted");
    }
  } catch (err) {
    message.error(err.response.data.error);
  }
};

export const deleteAnalytic = async ({
  analytics,
  setAnalytics,
  id,
  setOpen,
  setCurrent,
}) => {
  let filteredAnalytics = analytics.filter((item) => item.id !== id);

  try {
    let response = await applycms({ data: { analytics: filteredAnalytics } });
    if (response.status === 202) {
      setAnalytics(response.data.template.analytics);
      setOpen(false);
      setCurrent({ analytic: "", count: "" });
      message.success("Deleted");
    }
  } catch (err) {
    message.error(err.response.data.error);
  }
};

export const addAnalytics = ({
  values,
  analytics,
  setAnalytics,
  setAdded,
  setError,
}) => {
  if (values.count) {
    let duplicate = analytics.filter(
      (item) => item.analytic === values.analytic
    );
    if (!duplicate.length) {
      setError();
      const id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
      setAnalytics([
        ...analytics,
        { id, analytic: values.analytic, count: values.count },
      ]);
      values.count = "";
      values.analytic = "";
      setAdded(true);
    } else {
      setError(`${values.analytic},  has already been added`);
    }
  } else {
    setError("Count is required");
  }
};
