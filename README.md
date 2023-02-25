# OceanBottle-back

미니프로젝트 백엔드 저장소

.env로 인해 config폴더 생성 후, config.json 파일을 만들어서
신동윤에게 해당 내용을 요청한다.

https://developer88.tistory.com/270
를 통해서 package.josn 을 다운로드 받는다.

##저장소 연결하기
https://teamsparta.notion.site/2-4-SQL-9afbf504e37347c7b34523745452ecae 00. 선행 지식

VS Code 좌측 사이드바 → 탐색기 → MYSQL 탭 우측 → ﹢버튼 클릭

MySQL 서버 접속 정보 입력
﹢버튼을 누르면 아래처럼 입력 상자가 뜨는데, 위에서 설정한 접속 정보 그대로 입력합니다!

host: 나의 엔드포인트
user: 나의 마스터 사용자 이름
password: 나의 마스터 암호
port: 3306
certificate file path: 그냥 엔터

서버 등록된것 확인하기

파란 아이콘의 좌측 > 아이콘을 누르면 위 사진처럼 펼쳐지며 보입니다!
결국 위처럼 express-database … 서버에 존재하는 데이터베이스 목록이 보여져야 합니다.
저희가 RDS를 설정할 때 생성한 express_db 데이터베이스를 확인할 수 있습니다.
.
