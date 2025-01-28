import { model, Model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

enum UserRoles {
  Teacher = "teacher",
  Student = "student",
  DepartmentHead = "departmentHead",
  SystemAdmin = "systemAdmin",
  RegistralHead = "registralHead",
  RegistralWorker = "registralWorker",
}

enum DisabilityStatus {
  None = "none",
  Physical = "physical",
  Visual = "visual",
  Hearing = "hearing",
  Cognitive = "cognitive",
  Other = "other",
}

interface IUser extends Document {
  name: {
    firstName: String;
    fatherName: string;
    grandFatherName: string;
    motherName: string;
  };
  email: string;
  userName: string;
  phoneNumber: string[];
  address: {
    street1: string;
    street2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  password: string;
  roles: UserRoles[];
  nationalIdNumber: string;
  active: boolean;
  verified: boolean;
  birthDate: Date;
  disabilityStatus: DisabilityStatus;
}

const userSchema = new Schema<IUser>({
  name: {
    firstName: String,
    fatherName: String,
    grandFatherName: String,
    motherName: String,
  },
  email: { type: String, unique: true },
  userName: { type: String, unique: true, required: true },
  phoneNumber: [String],
  address: {
    street1: String,
    street2: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  password: String,
  roles: [{ type: String, enum: Object.values(UserRoles) }],
  nationalIdNumber: { type: String, unique: true },
  active: { type: Boolean, default: true },
  verified: { type: Boolean, default: false },
  birthDate: Date,
  disabilityStatus: {
    type: String,
    enum: Object.values(DisabilityStatus),
    default: DisabilityStatus.None,
  },
});

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
