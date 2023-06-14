import mongoose from "mongoose";

const tipSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    title: String,
    description: String,
    videoPath: String,
    userPicturePath: String,
    category: {
      type: String,
      required: true,
    },
    components: {
      type: Array,
      of: String,
      default: [],
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Tip = mongoose.model("Tip", tipSchema);

export default Tip;