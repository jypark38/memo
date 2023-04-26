# memo

### 기능 구현 예정
1. 일괄 삭제
2. 수정 
- title, id, content 내용을 에디터로 다시 돌려보내고, 수정할 메모 highlight 
- 메모 -> 수정으로 변경한 뒤 수정누르면 내용 변경
3. 작성중인 메모로 가는 버튼
4. 다크모드
5. 작성 시간 추가
6. 정렬 (최신순, 오래된순)
7. 입력 -> title, id, content 모두 입력해야만 저장가능
8. 초기화

### issue
1. 디자인
2. 작성중인 메모로 가는 버튼 추후에 추가..
3. 반응형ㅠ
4. 코드 리팩토링

### 변동사항
1. id,pw -> 메모장 프로그램 취지에 안맞으니 삭제 (20230425)


### 구현 기능
1. 작성 시간 yy-mm-dd h:m 로 기록
2. 입력 (누락이 있으면 alert)
3. 수정 (위에 적힌대로 구현함)
4. 일괄 삭제 (로컬스토리지 빈 배열로 초기화)
5. 정렬 (최신순, 오래된순에 따라 메모 작성시 알맞게 들어가게 구현함)
6. 다크모드 : 배경색 + 글씨색만 바뀌게 일단 구현
7. 초기화