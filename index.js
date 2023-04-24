// toast ui editor 적용 script
const Editor = toastui.Editor;

const editor = new Editor({
        el: document.querySelector('#editor'),
        height: '500px',
        initialEditType: 'markdown',
        previewStyle: 'vertical'
    });

editor.getMarkdown();

// 메모장 기능 script
// localStorage.clear()

const memoBtn = document.querySelector(".memo-btn"),
    memoSection = document.querySelector(".savememo-section"),
    postText = document.querySelector(".toastui-editor-contents"),
    titleText = document.querySelector(".title"),
    d = new Date();

let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? []

// 작성하기 버튼 눌렀을시에 로컬 스토리지 내용을 HTML에 뿌려주는 함수
function post() {
    if(titleText.value === ''){
        alert("제목을 작성해주세요")
    } else if(postText.innerText === ''){
        alert("내용을 작성해주세요")
    } else {
        inputMemo()
        memoSection.innerHTML = ''
        paintMemo()
    }
}

// 로컬 스토리지에 제목/내용 저장하는 함수
function inputMemo(){
    const {...memo} = {title: titleText.value, posttext: postText.innerHTML, time: `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 ${d.getHours()}시${d.getMinutes()}분`}
    allMemo.push({...memo})
    localStorage.setItem('allMemo', JSON.stringify(allMemo))
}

// 로컬 스토리지 내용 HTML 인입하는 함수
function paintMemo(){
    allMemo.forEach(item => {
        memoSection.insertAdjacentHTML("beforeend", 
        `
        <article class="memo-wrap">
            <header>
                <h3>${item['title']}</h3>
                <time>${item['time']}</time>
            </header>
            <p>${item['posttext']}</p>
            <button class="del-btn">삭제</button>
        </article>
        `
        )
    })
    const delBtns = document.querySelectorAll(".del-btn");
    for (let i = 0; i < delBtns.length; i++) {
        delBtns[i].addEventListener('click', () => delMemo(i))
    }
}


function delMemo(i) {
    const user = confirm("삭제하시겠습니까?");
    if (user) {
        allMemo.splice(i, 1);
        localStorage.setItem("allMemo", JSON.stringify(allMemo));
        memoSection.innerHTML = "";
        paintMemo();
    }
}
// 삭제버튼 노드리스트로 받아오는 부분

    

paintMemo()