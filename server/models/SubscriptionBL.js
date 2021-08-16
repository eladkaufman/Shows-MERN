const subscriptions = require("./SubscriptionModel");
const shows = require("./ShowModel");
const members = require("./MemberModel");

exports.getAllSubscriptions = () => {
  return new Promise((resolve, reject) => {
    subscriptions.find({}, (err, subscriptionsArray) => {
      if (err) {
        reject(err);
      } else {
        resolve(subscriptionsArray);
      }
    });
  });
};

// get all subscriptions of a specific member
exports.getMemberSubscriptions = (memberId) => {
  return new Promise((resolve, reject) => {
    subscriptions.findOne(
      { member_id: memberId },
      (err, subscriptionsArray) => {
        if (err) {
          reject(err);
        } else {
          resolve(subscriptionsArray);
        }
      }
    );
  });
};

// adding new subscription to a member
exports.addSubscription = (sub) => {
  const newSub = new subscriptions({
    show_id: sub.show_id,
    member_id: sub.member_id,
    date: sub.date,
  });
  return new Promise((resolve, reject) => {
    newSub
      // save subscription to "subscriptions" collections
      .save()
      // add subscription to show's subscriptions-list
      .then(
        shows
          .findOneAndUpdate(
            { _id: sub.show_id },
            { $push: { subscriptions: newSub._id } },
            { new: true }
          )
          .then(
            // add subscription to members's subscriptions-list
            resolve(
              members.findOneAndUpdate(
                { _id: sub.member_id },
                { $push: { subscriptions: newSub._id } },
                { new: true }
              )
            )
          )
      )
      .catch(reject(err));
  });
};

exports.deleteSubscription = (subId) => {
  let showId;
  return new Promise((resolve, reject) => {
    subscriptions.findById(subId, (err, subToDelete) => {
      if (err) {
        reject(err);
      }
      if (subToDelete) {
        showId = subToDelete.show_id;
        memId = subToDelete.member_id._id;

        // delete subscription from "subscriptions" collection
        subscriptions
          .findByIdAndDelete(subId)
          // remove subscription from member's subscriptions-list
          .then(
            members
              .findOneAndUpdate(
                { _id: memId },
                { $pull: { subscriptions: subId } },
                { new: true }
              )
              // remove subscription from show's subscriptions-list
              .then(
                shows.findOneAndUpdate(
                  { _id: showId },
                  { $pull: { subscriptions: subId } },
                  { new: true }
                )
              ),
            resolve("deleted")
          )

          .catch(reject(err));
      }
    });
  });
};
