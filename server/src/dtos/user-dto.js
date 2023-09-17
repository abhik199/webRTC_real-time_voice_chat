const url = "http://localhost:1200";
class UserDto {
  _id;
  phone;
  name;
  avatar;
  activated;
  createdAt;

  constructor(user) {
    this._id = user._id;
    this.phone = user.phone;
    this.name = user.name;
    this.avatar = user.avatar ? `${url}${user.avatar}` : null;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
  }
}

export default UserDto;
