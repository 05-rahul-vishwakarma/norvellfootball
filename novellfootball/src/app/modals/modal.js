import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    Session: { type: String, required: true },
    UserName: { type: String, required: true },
    Password: { type: String, required: true },
    PhoneNumber: { type: String },
    EmailId: { type: String },
    InvitationCode: { type: Number, required: true, unique: true },
    ParentInv: { type: Number, default: 0 },
    Parent: { type: String, default: "" },
    Balance: { type: Number, default: 0 }, // balance * 100 is being stored
    ValidAmount: { type: Number, default: 0 },
    ValidDeposit: { type: Number, default: 0 },
    Deposited: { type: Number, default: 0 },
    Members: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const BetSchema = new Schema(
  {
    Team_a: { type: String, required: true },
    Team_b: { type: String, required: true },
    Team_a_logo: { type: String, required: true },
    Team_b_logo: { type: String, required: true },
    League: { type: String, required: true },
    StakeId: { type: Number, required: true },
    BetAmount: { type: Number, required: true }, //amount * 100
    Percentage: { type: Number, required: true },
    Date: { type: String, required: true },
    Score_a: { type: Number, required: true },
    Score_b: { type: Number, required: true },
    Status: { type: Number, default: 0 }, //0->pending 1->settled 2->canceled
    Remark: { type: String }, //win / lose
    ParentInv: { type: Number, default: 0 },
    UserName: { type: String, required: true },
    InvitationCode: { type: Number, required: true },
  },
  { timestamps: true }
);

const CommissionSchema = new Schema(
  {
    UserName: { type: String, required: true },
    Commission: { type: Number, required: true },
    Date: { type: String, required: true }, //dd/mm/yyy
    Claimed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TransactionSchema = new Schema(
  {
    Amount: { type: Number, required: true },
    TransactionId: { type: String, required: true },
    Method: { type: String, required: true },
    Status: { type: Number, default: 0 }, // 0->pending , 1->done , 2->canceled
    Remark: { type: String, required: true },
    Type: { type: String, required: true }, //withdrawal / deposit
  },
  { timestamps: true }
);

const RewardsSchema = new Schema({
  Type: { type: String, required: true }, //any , invReward , weeklyCommission
  Amount: { type: Number, required: true }, //*100
  Status: { type: Number, default: 0 }, //0->pending , 1->done
});

const USER = mongoose?.models?.users || mongoose?.model("users", UserSchema);
const BET = mongoose?.models?.bets || mongoose.model("bets", BetSchema);
const COMMISSION =
  mongoose?.models?.commissions ||
  mongoose?.model("commissions", CommissionSchema);
const TRANSACTION =
  mongoose?.models?.transactions ||
  mongoose?.model("transactions", TransactionSchema);
const REWARD =
  mongoose?.models?.rewards || mongoose.model("rewards", RewardsSchema);

module.exports = { USER, BET, COMMISSION, TRANSACTION, REWARD };
