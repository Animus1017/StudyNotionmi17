import React, { useState } from "react";
import { PiTrashBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../services/operations/settingsAPI";
import Modal from "../../../common/Modal";
const DeleteAccount = () => {
  const [modalConfirmation, setModalConfirmation] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleDelete() {
    dispatch(deleteAccount(token, navigate));
  }
  return (
    <div className="bg-pink-900 border border-pink-700 rounded-lg p-6 flex gap-5 items-start">
      <div
        className="p-[14px] rounded-full bg-pink-700 cursor-pointer"
        onClick={() =>
          setModalConfirmation({
            text1: "Are you sure?",
            text2: "Your account will be deleted permanently",
            btn1: {
              text: "Delete",
              action: handleDelete,
            },
            btn2: {
              text: "Cancel",
              action: () => {
                setModalConfirmation(null);
              },
            },
          })
        }
      >
        <PiTrashBold className="text-2xl text-pink-200" />
      </div>
      <div className="flex flex-col gap-2">
        <h6 className="text-pink-5 font-bold text-lg">Delete Account</h6>
        <div className="flex flex-col gap-[2px] text-sm font-medium text-pink-25">
          <p>Would you like to delete account?</p>
          <p>
            This account contains Paid Courses. Deleting your account will
            remove all the <br /> contain associated with it.
          </p>
        </div>
        <p
          className="text-pink-300 font-medium italic cursor-pointer"
          onClick={() =>
            setModalConfirmation({
              text1: "Are you sure?",
              text2: "Your account will be deleted permanently",
              btn1: {
                text: "Delete",
                action: handleDelete,
              },
              btn2: {
                text: "Cancel",
                action: () => {
                  setModalConfirmation(null);
                },
              },
            })
          }
        >
          I want to delete my account.
        </p>
      </div>
      {modalConfirmation && (
        <Modal {...modalConfirmation} setHandler={setModalConfirmation} />
      )}
    </div>
  );
};

export default DeleteAccount;
