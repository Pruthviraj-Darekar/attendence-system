import User from '../models/User.js';
export async function me(req, res) {
  const u = await User.findById(req.user.sub).select('-passwordHash');
  res.json(u);
}
export async function list(req, res) {
  const users = await User.find().select('name email role studentId');
  res.json(users);
}
