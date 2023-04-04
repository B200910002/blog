const { Token } = require("../model/token.model");
const { User } = require("../model/User.model");
const { UserGroup } = require("../model/UserGroup.model");

exports.register = async (req, res, next) => {
  try {
    const { name , email, password, repeatPassword } = req.body;
    const response = await User.register(name, email, password, repeatPassword);
    res.status(201).json("An Email sent to your account please verify");
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.emailVerify = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Invalid link");
    }
    const tk = await Token.findOne({
      userId: user._id,
      token: token,
    });
    if (!tk) {
      throw new Error("Invalid link");
    }
    await user.updateOne({ verified: true });
    await tk.remove();

    res.status(200).json("Email verified successfully");
  } catch (e) {
    res.status(400).json(e.message);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await User.login(email, password);
    res.status(200).json({ email, token });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    req.user = await User.checkToken(token);
    next();
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, repeatNewPassword } = req.body;
    const repsonse = await User.changePassword(
      req.user,
      oldPassword,
      newPassword,
      repeatNewPassword
    );
    res.status(200).json(repsonse);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.follow = async (req, res, next) => {
  try {
    const user1 = req.user;
    const user2 = await User.findOne({ email: req.params.email });
    const response = await User.follow(user1, user2);
    res.status(200).json("followed");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.unFollow = async (req, res, next) => {
  try {
    const user1 = req.user;
    const user2 = await User.findOne({ email: req.params.email });
    const response = await User.unfollow(user1, user2);
    res.status(200).json("unfollowed");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.uploadPic = (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were upload.");
  }

  sampleFile = req.files.photo;
  uploadPath = process.cwd() + "/public/img/" + sampleFile.name;

  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    res.send(process.env.LOCAL_HOST_PORT + "public/img/" + sampleFile.name);
  });
};

exports.getUser = async (req, res, next) => {
  try {
    const me = req.user;
    const { email } = req.params;
    var status = 203;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not Found");
    }
    if (me.email == user.email) {
      status = 200;
    }
    const followers = await UserGroup.findById(user.followers);
    const following = await UserGroup.findById(user.following);
    const isFollowing = await followers.users.find(function (element) {
      return element + "" === me._id + "";
    });
    res.status(200).json({
      status: status,
      isFollowing: isFollowing ? true : false,
      user: {
        name: user.name,
        photo: user.photo,
        bio: user.bio,
        email: user.email,
        followers: followers.users,
        following: following.users,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, photo, bio } = req.body;
    user.name = name ? name : user.name;
    user.photo = photo ? photo : user.photo;
    user.bio = bio ? bio : user.bio;
    user.save();
    res.status(200).json({
      name: user.name,
      photo: user.photo,
      bio: user.bio,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getFollowers = async (req, res, next) => {
  try {
    const me = req.user;
    const { email } = req.params;
    const user = await User.findOne({ email: email });
    const followers = await UserGroup.findById(user.followers);
    const myFollowing = await UserGroup.findById(me.following);
    const users = [];
    for (let u of followers.users) {
      const use = await User.findById(u);
      const isFollowing = await myFollowing.users.find(function (element) {
        return element + "" === use._id + "";
      });
      users.push({
        email: use.email,
        name: use.name,
        photo: use.photo,
        bio: use.bio,
        isFollowing: isFollowing ? true : false,
      });
    }
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getFollowing = async (req, res, next) => {
  try {
    const me = req.user;
    const { email } = req.params;
    const user = await User.findOne({ email: email });
    const following = await UserGroup.findById(user.following);
    const myFollowing = await UserGroup.findById(me.following);
    const users = [];
    for (let u of following.users) {
      const use = await User.findById(u);
      const isFollowing = await myFollowing.users.find(function (element) {
        return element + "" === use._id + "";
      });
      users.push({
        email: use.email,
        name: use.name,
        photo: use.photo,
        bio: use.bio,
        isFollowing: isFollowing ? true : false,
      });
    }
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
