const repo = new (require('../repositories/ProductRepository'))();
exports.getAll = async (req,res) => res.json(await repo.getAll());
exports.getById = async (req,res) => {
  const p = await repo.getById(req.params.id);
  if(!p) return res.sendStatus(404);
  res.json(p);
};
exports.create = async (req,res) => res.status(201).json(await repo.create(req.body));
exports.update = async (req,res) => res.json(await repo.update(req.params.id,req.body));
exports.delete = async (req,res) => res.sendStatus((await repo.delete(req.params.id))?204:404);
