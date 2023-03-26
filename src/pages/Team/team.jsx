import React, { useState, useEffect, useContext } from "react";
import "antd/dist/antd.css";
import { ClipLoader } from "react-spinners";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { message } from "antd";

import AuthContext from "../../context/auth";
import Header from "../../components/Header/header";
import { Box, useTheme, Button } from "@mui/material";
import { ConfirmationModal } from "../../components/modal/confirmation";
import { MemberModal } from "../../components/modal/member";
import { SaveChanges } from "../../components/button/savechanges";
import { TeamCard } from "../../components/card/team";
import { tokens } from "../../theme";
import { useFetchTemplate } from "../../customHooks/useFetchTemplate";
import { uploadImage } from "../../helpers/cms";

import "../styles/styles.css";

export const Team = () => {
  const [fetching, setFetching] = useState(false);
  const [template] = useFetchTemplate({ setFetching });
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [title, setTitle] = useState();
  const [experience, setExperience] = useState();
  const [designation, setDesignation] = useState();
  const [profileImage, setProfileImg] = useState();
  const [stars, setStars] = useState([]);
  const [team, setTeam] = useState([]);
  const [selected, setSelected] = useState();
  const [members, setMembers] = useState([]);
  const [uploaded, setUploaded] = useState(null);
  const [process, setProcess] = useState(0);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let { check, setCheck } = useContext(AuthContext);

  useEffect(() => {
    if (template.length !== 0) {
      setTeam(template.team);
      setMembers(template.team);
    }
  }, [fetching]);

  const handleOpen = (index) => {
    setOpen(true);
    setSelected(team[index]);
    setTitle(team[index].title);
    setDesignation(team[index].designation);
    setStars(team[index].stars);
    setExperience(team[index].experience);
    setProfileImg(team[index].image);
  };

  const addMemberTemplate = () => {
    if (process === 0) {
      setProcess(1);
      setEditable(true);
      setMembers([
        ...members,
        {
          id: members.length,
          editable: true,
        },
      ]);
    } else {
      message.warning("Add one member at a time");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <div className="d-flex w-100">
        <div className="col-md-3 col-sm-0"></div>
        <div className="col-md-6 col-sm-6">
          <Header
            className="text-center"
            title="Your Team"
            subtitle="Team Members"
          />
        </div>

        <div className="col-md-3 col-sm-6">
          <Button
            type="submit"
            color="success"
            variant="contained"
            onClick={() => addMemberTemplate()}
          >
            Add Memeber
          </Button>
        </div>
      </div>

      {!fetching ? (
        <div className=" d-flex flex-wrap row w-100 p-3">
          {members &&
            members.map((item, index) => (
              <div className="col-md-4 col-sm-6 col-xs-6 mt-4">
                <div
                  className="team-card p-4"
                  backgroundColor={`${colors.primary[400]} !important`}
                >
                  {team[index] && process !== 1 && (
                    <div className="crud-actions w-25">
                      <EditOutlinedIcon
                        className="edit-button align-self-end"
                        onClick={() => handleOpen(index)}
                      />
                      <DeleteOutlineOutlinedIcon
                        className="edit-button icon"
                        onClick={() => {
                          setDeleteModal(!deleteModal);
                          setSelected(team[index]);
                        }}
                      />
                    </div>
                  )}

                  <TeamCard
                    member={team[index]}
                    title={item.title}
                    setTitle={setTitle}
                    profileImage={profileImage}
                    setProfileImg={setProfileImg}
                    designation={item.designation}
                    setDesignation={setDesignation}
                    experience={item.experience}
                    setExperience={setExperience}
                    stars={stars}
                    setStars={setStars}
                    editable={editable}
                    colors={colors}
                  />

                  {!team[index] && (
                    <button
                      className="btn btn-success w-100"
                      style={{ backgroundColor: colors.greenAccent[600] }}
                      onClick={() =>
                        uploadImage({
                          team,
                          setTeam,
                          stars,
                          title,
                          profileImage,
                          designation,
                          editable,
                          setEditable,
                          setProcess,
                          setLoading,
                          experience,
                          setUploaded,
                          check,
                          setCheck,
                        })
                      }
                    >
                      {loading ? <ClipLoader color="white" size={20} /> : "Add"}
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <ClipLoader color="white" />
      )}

      {open && (
        <MemberModal
          open={open}
          stars={stars}
          title={title}
          team={team}
          colors={colors}
          member={selected}
          setOpen={setOpen}
          setTeam={setTeam}
          setStars={setStars}
          setTitle={setTitle}
          experience={experience}
          designation={designation}
          setMember={setSelected}
          profileImage={profileImage}
          setProfileImg={setProfileImg}
          setExperience={setExperience}
          setDesignation={setDesignation}
        />
      )}

      {uploaded && (
        <>
          <SaveChanges team={team} setState={setUploaded} state={uploaded} />
        </>
      )}

      {deleteModal && (
        <ConfirmationModal
          content="team"
          team={team}
          colors={colors}
          setTeam={setTeam}
          open={deleteModal}
          current={selected}
          setMembers={setMembers}
          setOpen={setDeleteModal}
          setCurrent={setSelected}
        />
      )}
    </Box>
  );
};
