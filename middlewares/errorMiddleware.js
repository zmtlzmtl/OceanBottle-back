const errorMiddleware = (error, req, res, next) => {
  switch (error.name) {
    case "401":
      return res.status(401).json({ message: error.message }); //권한X
    case "404":
      return res.status(404).json({ message: error.message }); //저장소에 없으면 
    case "412":
      return res.status(412).json({ message: error.message }); //값을 안들고옴
    default:
      return res.status(500).json({ message: "알 수 없는 error가 발생하였습니다." });
  }
};

module.exports = errorMiddleware;  //return을 권장      
