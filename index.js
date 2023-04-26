let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];

const {Editor} = toastui;

const editor = new Editor({
    el: document.querySelector("#editor"),
    height: "600px",
    initialEditType: "markdown",
    previewStyle: "vertical",
});

function darkMode(){
    const ui_class = document.querySelector('#editor').firstChild.classList,
    body = document.querySelector('body'),
    btn = document.querySelector('.btn-dark'),
    memo_wrap = document.querySelectorAll('.memo-content-wrap'),
    editing = find_edit(memo_wrap)
    console.log(editing)

    if (ui_class.contains('toastui-editor-dark')){
        ui_class.remove('toastui-editor-dark')
        body.style.setProperty('background-color','white')
        body.style.setProperty('color','black')
        document.querySelectorAll('.memo-content-wrap')
            .forEach(e => e.style.setProperty('background-color','white'))
            
        btn.innerText='🌙'

        document.querySelector('.view').style.setProperty('background-color','#d4d8e8')

        document.querySelector('.btn-dark').style.setProperty('background-color','#eee')

        document.querySelectorAll('.header-input').forEach((e)=>{
            e.style.setProperty('background',"#fff")
            e.style.setProperty('border','2px solid #ddd')
            e.style.setProperty('color','black')
        })
        document.documentElement.style.setProperty('--placeholder-color', '#222');

        document.querySelectorAll('.btn').forEach(e => {
            e.style.setProperty('background','#3b5fad')
        })
        console.log(editing)
        if(editing!==undefined){
            memo_wrap[editing].style.setProperty('box-shadow', '0 0 0 8px #3b5fad')
        }
    }else{
        ui_class.add('toastui-editor-dark')
        body.style.setProperty('background-color','#333')
        body.style.setProperty('color','white')
        document.querySelectorAll('.memo-content-wrap')
            .forEach(e => e.style.setProperty('background-color','#222'))
        btn.innerText='☀️'
        
        document.querySelector('.view').style.setProperty('background-color','#333')

        document.querySelector('.btn-dark').style.setProperty('background-color','#555')
        
        document.querySelectorAll('.header-input').forEach((e)=>{
            e.style.setProperty('background',"#333")
            e.style.setProperty('border','2px solid white')
            e.style.setProperty('color','white')
        })
        document.documentElement.style.setProperty('--placeholder-color', '#eee');

        document.querySelectorAll('.btn').forEach(e => {
            e.style.setProperty('background','#46516a')
        })

        if(editing!==undefined){
            memo_wrap[editing].style.setProperty('box-shadow', '0 0 0 8px #46516a')
        }
    }
}
render();

function render() {
    const display = document.getElementById("display");
    display.innerHTML = "";

    for (const item of allMemo) {

        const saveTitle = document.createElement("h2"),
                saveContent = document.createElement("div"),
                saveId = document.createElement("h3"),
                saveTime = document.createElement('time'),
                deleteMemoBtn = document.createElement("button"),
                editMemoBtn = document.createElement("button"),
                wrap = document.createElement('div')

        wrap.classList.add('memo-content-wrap')

        saveTitle.textContent = item.title;
        saveTitle.classList.add('memo-title')

        saveContent.innerHTML = item.content;
        saveContent.classList.add('memo-content')

        saveId.textContent = item.id;
        saveId.classList.add('memo-id')

        saveTime.textContent = item.Time
        saveTime.setAttribute('datetime',item.Time)
        saveTime.classList.add('memo-time')

        deleteMemoBtn.textContent = "삭제";
        deleteMemoBtn.setAttribute("id", item.len);
        deleteMemoBtn.setAttribute("onclick", "remove()");
        deleteMemoBtn.className = 'content-btn'

        editMemoBtn.textContent = "수정";
        editMemoBtn.setAttribute("id", item.len);
        editMemoBtn.setAttribute("onclick", "edit()");
        editMemoBtn.className = 'content-btn'

        
        const memo_header = document.createElement('div'),
        memo_btns = document.createElement('div');

        memo_header.className='memo-header';
        memo_btns.className='memo-btns'

        memo_header.appendChild(saveId)
        memo_header.appendChild(saveTime)

        memo_btns.appendChild(deleteMemoBtn)
        memo_btns.appendChild(editMemoBtn)
        
        wrap.appendChild(saveTitle)
        wrap.appendChild(memo_header);
        wrap.appendChild(saveContent);
        wrap.appendChild(memo_btns);

        display.appendChild(wrap)
    }
}

// 작성
function saveNote() {
    const title = document.getElementById("title").value;
    // const content = document.getElementById("content").value;
    const id = document.querySelector("#id").value
    const content = editor.getHTML();

    function addZero(e){
        return `${(e)<10?`0${e}`:`${e}`}`
    }
    if(title && id && editor.preview.el.innerText ){
        if(event.target.innerText !== '수정'){

            const date = new Date();
            year = date.getFullYear()
            month = addZero(date.getMonth()+1)
            day = addZero(date.getDate())
            hour = addZero(date.getHours())
            minutes = addZero(date.getMinutes())
            seconds = addZero(date.getSeconds())

            Time = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`

            if(document.querySelector('.former')){
                allMemo.unshift({ title, content, id, len: allMemo.length, Time})
            }
            if(document.querySelector('.recent')){
                allMemo.push({ title, content, id, len: allMemo.length, Time});
            }

            localStorage.setItem("allMemo", JSON.stringify(allMemo));

            render();

            reset()
        }else{
            let idx = find_edit(document.querySelectorAll('.memo-content-wrap'));
            const memo_btn =document.querySelector('.memo-btn')

            allMemo[idx].title = title
            allMemo[idx].id = id
            allMemo[idx].content = content

            memo_btn.classList.remove('memo-editing')
            memo_btn.innerText='메모'

            render();

            reset()
        }
    }else{
            alert('입력하지 않은 값이 있습니다')
            document.querySelector('#title').focus()
    }
}

//수정
function find_edit(wraps){
    let idx
    for(let i=0; i<wraps.length ;i++){
        if(wraps[i].classList.contains('editing')){
            idx = i
            break
        }
    }
    return idx
}
function edit(){
    const memo_btn = document.querySelector('.memo-btn'),
    wrap = event.target.parentNode.parentNode,
    title = wrap.querySelector('.memo-title'),
    content = wrap.querySelector('.memo-content'),
    inpTitle = document.querySelector('#title'),
    inpId = document.querySelector('#id');
    console.log(title)
    inpTitle.value = title.innerHTML
    inpId.value = wrap.querySelector('.memo-id').innerHTML
    editor.setHTML(content.innerHTML)

    if (memo_btn.innerText !== '수정'){
        memo_btn.classList.add('memo-editing')
        memo_btn.innerText = '수정'
    }
    else{
        const wraps = document.querySelectorAll('.memo-content-wrap')
        let idx = find_edit(wraps);
        
        wraps[idx].classList.remove('editing')
        wraps[idx].style.setProperty('box-shadow', 'none')
    }
    wrap.classList.add('editing')
    if( document.querySelector('#editor')
                    .firstChild
                    .classList
                    .contains('toastui-editor-dark')){
        wrap.style.setProperty('box-shadow', '0 0 0 8px #46516a')
    }
    else{
        wrap.style.setProperty('box-shadow', '0 0 0 8px #3b5fad')
    }

}

// 삭제
function remove() {
    const idx = allMemo.find(
        (item) => item.len == event.srcElement.id
    );

    if(confirm(`제목 : ${idx.title} 을 삭제하시겠습니까?`)){
        if (idx) {
            allMemo.splice(
                allMemo.findIndex((item) => item.len == idx.len),
                1
            );
        }
        localStorage.setItem("allMemo", JSON.stringify(allMemo));
        render();
    }
}

// 일괄 삭제
function removeAll(){
    if(confirm('작성된 메모를 모두 삭제하시겠습니까?')){
        allMemo = []
        localStorage.setItem("allMemo", JSON.stringify(allMemo));
        render()
    }
}

// 초기화
function reset(){
    document.querySelector('#title').value=''
    document.querySelector("#id").value=''
    document.querySelectorAll('.ProseMirror').forEach(e=>{
        e.innerHTML = ''
    })
}

// 정렬
function sortMemo(){
    if(event.target.className==='former'){
        event.target.className='recent'
        event.target.innerHTML='최신순으로 정렬'
    }else{
        event.target.className='former'
        event.target.innerHTML='오래된 순으로 정렬'
    }

    allMemo.reverse()
    render()
}