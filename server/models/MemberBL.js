const shows = require("./ShowModel");
const subscriptions = require("./SubscriptionModel");
const members = require("./MemberModel");
const subsBl = require("./SubscriptionBl");

exports.getMembers = () => {
  return members
    .find()
    .populate({ path: "subscriptions", populate: { path: "show_id" } })
    .exec();
};

exports.getMember = (memberId) => {
  return members
    .find({ _id: memberId })
    .populate({ path: "subscriptions", populate: { path: "show_id" } })
    .exec();
};

exports.editMember = (memberId, memberObj) => {
  return new Promise((resolve, reject) => {
    members.findByIdAndUpdate(
      memberId,
      {
        name: memberObj.name,
        email: memberObj.email,
        city: memberObj.city,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Updated!");
        }
      }
    );
  });
};

exports.addMember = (memberObj) => {
  const newMember = new members({
    name: memberObj.name,
    email: memberObj.email,
    city: memberObj.city,
  });
  return new Promise((resolve, reject) => {
    newMember.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Created!");
      }
    });
  });
};

exports.deletMember = (memberId) => {
  return new Promise((resolve, reject) => {
    members
      .findById(memberId)
      .then((member) => {
        member.subscriptions.forEach((subId) => {
          subsBl.deleteSubscription(subId);
        });
        members.findByIdAndDelete(memberId, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("deleted!");
          }
        });
      })
      .catch((err) => reject(err));
  });
};
