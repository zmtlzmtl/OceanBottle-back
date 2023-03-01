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

    return scripts;
  };

  //getDetail
  getDetailService = async ({ scriptId }) => {
    const script = await this.scriptsRepository.getDetailRepo({ scriptId });

    return script;
  };

  //update
  updateService = async ({ scriptId, genre, title, content }) => {
    await this.scriptsRepository.updateRepo({
      scriptId,
      genre,
      title,
      content,
    });
    return;
  };

  //delete
  deleteService = async ({ scriptId }) => {
    await this.scriptsRepository.deleteRepo({ scriptId });
    return;
  };

  //getRandom
  getRandomService = async () => {
    const randomScripts = await this.scriptsRepository.getRandomRepo();

    return randomScripts;
  };
}

module.exports = ScriptsService;