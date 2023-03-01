const ScriptsRepository = require('../repositories/scripts.repository')
const PlusScriptRepository = require('../repositories/plusscript.repository')


class ScriptsService {
  constructor() {
    this.scriptsRepository = new ScriptsRepository();
    this.plusScriptRepository = new PlusScriptRepository();
  }

  //create
  createScript = async ({ userId, genre, title, content, contributors }) => {
    await this.scriptsRepository.createScript({
      userId,
      genre,
      title,
      content,
      contributors
    });

    return;
  };

  //getAll
  getAllService = async () => {
    const scripts = await this.scriptsRepository.getAllRepo();

    return scripts.map((data) => {
      return {
        scriptId: data.scriptId,
        genre: data.genre,
        title: data.title,
        UserId: data.UserId,
        id: data["User.id"],
        plusCount: data.plusCount,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });
  };

  //getDetail
  getDetailService = async ({ scriptId }) => {
    const script = await this.scriptsRepository.getDetailRepo({ scriptId });

    return script;
  };

  //update
  updateService = async ({ userId, scriptId, genre, title, content }) => {
    await this.scriptsRepository.updateRepo({
      userId,
      scriptId,
      genre,
      title,
      content,
    });
    return;
  };

  //delete
  deleteService = async ({ userId, scriptId }) => {
    await this.scriptsRepository.deleteRepo({ userId, scriptId });
    return;
  };

  //getRandom
  getRandomService = async () => {
    const randomScripts = await this.scriptsRepository.getRandomRepo();

    return randomScripts;
  };
}

module.exports = ScriptsService;