const bar = document.querySelector('.fa-bars');
const menu_col = document.getElementById('menu_col');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');
const menu_display = getComputedStyle(menu_col, null).getPropertyValue('overflow');
const addBtn = document.getElementById('btn');
const watermark = document.getElementById('watermark');
const note_container = document.getElementById('note_container');
const write_btn = document.getElementById('write');
const theme_btn = document.getElementById('theme');
const delete_btn = document.getElementById('delete');
const delete_div = document.getElementById('delete_div');
const delAll = document.getElementById('delAll');
const cancel = document.getElementById('cancel');
const selNote = document.getElementById('selNote');
let delete_active = false;
const showMenu = ()=>{
    menu_col.style.whiteSpace = 'unset';
    menu_col.style.width = '195px';
    menu_col.style.overflow ='visible';
    menu_col.style.textOverflow = 'unset';
    menu.style.boxShadow = '5px 2px 8px rgba(0,0,0,0.5)';
    
}
const hideMenu = ()=>{
    menu_col.style.whiteSpace = 'nowrap';
    menu_col.style.width = '68px';
    menu_col.style.overflow ='hidden';
    menu_col.style.textOverflow = 'ellipses';
    menu.style.boxShadow = 'none';
    
}
const mainmenu = ()=>{
    const menu_display = getComputedStyle(menu_col, null).getPropertyValue('overflow');
    if (menu_display == 'hidden') {
        menu_col.removeEventListener('mouseover',showMenu);
        menu_col.removeEventListener('mouseout', hideMenu);
        write_btn.removeEventListener('click', hideMenu);
        theme_btn.removeEventListener('click', hideMenu);
        delete_btn.removeEventListener('click', hideMenu);
        menu_col.style.whiteSpace = 'unset';
        menu_col.style.width = '195px';
        menu_col.style.overflow ='visible';
        menu_col.style.textOverflow = 'unset';
        menu.style.boxShadow = '5px 2px 8px rgba(0,0,0,0.5)';
        overlay.style.display = 'block';
    }else{
        menu_col.addEventListener('mouseover', showMenu);
        menu_col.addEventListener('mouseout', hideMenu);
        write_btn.addEventListener('click', hideMenu);
        theme_btn.removeEventListener('click', hideMenu);
        delete_btn.removeEventListener('click', hideMenu);
        menu_col.style.whiteSpace = 'nowrap';
        menu_col.style.width = '68px';
        menu_col.style.overflow ='hidden';
        menu_col.style.textOverflow = 'ellipses';
        menu.style.boxShadow = 'none';
        overlay.style.display = 'none';
    }
}
const updateLSData = () =>{
    const textData = document.querySelectorAll('textarea');
    const msg =[];
    textData.forEach((data)=>{
        return msg.push(data.value);
    })
    localStorage.setItem('note', JSON.stringify(msg));
    if (msg == "") {
        watermark.style.display = 'block';
    }
}
const checkNote = ()=>{
    const datas = document.querySelectorAll('.note');
    if(datas.length != 0){
        showDelDiv();
    }else{
        alert('No notes to delete,\nAdd note');
        delete_active = false;
    }
}
const countSelected = ()=>{
    let noteSelected = document.getElementsByClassName('selected');
    selNote.innerHTML =`selected: ${noteSelected.length}`;
    if (noteSelected.length == 0) {
        cancel.style.display = 'block';
        delAll.style.display = 'none';
        if (cancel.innerText === 'cancel') {
            const note_overlay = document.querySelectorAll('.note_overlay');
            cancel.addEventListener('click',()=>{
                // console.log('value is cancel');
                note_overlay.forEach((data)=>{
                    data.style.display = 'none';
                });
                delete_div.style.display = 'none';
                delete_active = false;
                menu.style.display = 'block';
            });
        }
    }else{
        cancel.style.display = 'none';
        delAll.style.display = 'block';
        if (delAll.innerText === 'delete') {
            delAll.addEventListener('click', ()=>{
                const note_overlay = document.querySelectorAll('.note_overlay');
                for (let i = 0; i < noteSelected.length; i++) {
                    noteSelected[i].remove();
                    updateLSData();
                }
                note_overlay.forEach((data)=>{
                    data.style.display = 'none';
                });
                delete_div.style.display = 'none';
                delete_active = false;
                menu.style.display = 'block';
            });
        }
    }

    // console.log(noteSelected);

}
const addNote = (text ="")=>{
    watermark.style.display = 'none';
    const note = document.createElement('div')
    note.classList.add('note');
    const htmlData = `<div class="tools">
    <button class="edit"><i class="fas fa-pen"></i></button>
    <button class="delete"><i class="fas fa-minus-circle"></i></button>
</div>
<div class="main ${text ? "" : "hidden" }"></div>
<textarea class="${text ? "hidden" : "" }"></textarea>
<div class="note_overlay">
<i class="fas fa-check-circle tick"></i>
</div> `;
    note.innerHTML = htmlData;
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');
    const note_overlay = note.querySelector('.note_overlay');
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
        checkNote;
    });
    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });
    textArea.addEventListener('change', (event) =>{
        mainDiv.innerHTML = event.target.value;
        updateLSData();
        checkNote;
    });
    note_overlay.children[0].addEventListener('click', ()=>{
        note.classList.toggle('selected');
        countSelected();
    })

    note_container.appendChild(note);
}
const storedData = JSON.parse(localStorage.getItem('note'));
    if (storedData) {
    storedData.forEach((data)=> addNote(data))
    };
const darkTheme = ()=>{
    const element = document.body;
    element.classList.toggle("dark-mode");
}
const checkActive = ()=>{
    if (!delete_active) {
        checkNote();
    }
}
const showDelDiv = ()=>{
    const note_overlay = document.querySelectorAll('.note_overlay');
    note_overlay.forEach((data)=>{
        data.style.display = 'block';
    });
    delete_div.style.display = 'block';
    delete_active = true;
    countSelected();
}
menu_col.addEventListener('mouseover', showMenu);
menu_col.addEventListener('mouseout', hideMenu);
bar.addEventListener('click', mainmenu);
addBtn.addEventListener('click', () => addNote());
write_btn.addEventListener('click', () => addNote());
write_btn.addEventListener('click', hideMenu);
theme_btn.addEventListener('click', darkTheme);
theme_btn.addEventListener('click', hideMenu);
delete_btn.addEventListener('click', checkActive);
delete_btn.addEventListener('click', hideMenu);