const shows = require("./ShowModel");
const members = require("./MemberModel");
const subscriptions = require("./SubscriptionModel");
const subsBl = require("./SubscriptionBl");

exports.getShows = () => {
  return shows
    .find()
    .populate({ path: "subscriptions", populate: { path: "member_id" } })
    .exec();
};

//for loading show's info before editing
exports.getShow = (showId) => {
  return shows
    .find({ _id: showId })
    .populate({ path: "subscriptions", populate: { path: "member_id" } })
    .exec();
};

exports.editShow = (showId, showObj) => {
  return new Promise((resolve, reject) => {
    shows.findByIdAndUpdate(
      showId,
      {
        name: showObj.name,
        genres: showObj.genres,
        imageUrl: showObj.imageUrl,
        premiered: showObj.premiered,
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

exports.addShow = (showObj) => {
  const newShow = new shows({
    name: showObj.name,
    genres: showObj.genres,
    imageUrl: showObj.imageUrl,
    premiered: showObj.premiered,
  });
  return new Promise((resolve, reject) => {
    newShow.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Created!");
      }
    });
  });
};

exports.deletShow = (showId) => {
  return new Promise((resolve, reject) => {
    shows
      .findById(showId)
      .then((show) => {
        // Delete all subscriptions from show's subscriptions list
        show.subscriptions.forEach((subId) => {
          subsBl.deleteSubscription(subId);
        });
        shows.findByIdAndDelete(showId, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("Deleted!");
          }
        });
      })
      .catch((err) => reject(err));
  });
};
