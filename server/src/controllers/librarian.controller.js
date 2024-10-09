import { users } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/AsyncHandler.utils.js";

const getAllMembers = asyncHandler(async (req, res) => {
  const members = await users.find({ role: "MEMBER", status: "ACTIVE" });

  if (!members || members.length === 0) {
    throw new ApiError(404, "No members found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, members, "Members retrieved successfully"));
});

const deleteMember = asyncHandler(async (req, res) => {
  const { memberId } = req.params;

  const member = await users.findByIdAndUpdate(
    memberId,
    { status: "DELETED" },
    { new: true }
  );

  if (!member) {
    throw new ApiError(404, "Member not found");
  }

  res.status(200).json(new ApiResponse(200, {}, "Member deleted successfully"));
});

export { getAllMembers, deleteMember };
