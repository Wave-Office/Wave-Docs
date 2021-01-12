window.onresize = function() {
    resizewrap()
}
var caret
var curfile
const page = document.getElementById("page")
var full = false
resizewrap()
document.execCommand('styleWithCSS', false, true);
if (!"canShare" in navigator) {
    document.getElementById("share-btn").style.display = "none"
}
document.getElementById("font-btn").onclick = function() {
    document.getElementById("font-selector").classList.toggle("hide")
}
document.getElementById("font-size-btn").onclick = function() {
    document.getElementById("font-size-sel").classList.toggle("hide")
}
var modal = document.getElementById("modal");
var modal_text = document.getElementById("modal-text");
var closemodal = document.getElementsByClassName("close-modal")[0];
document.getElementById("file").onclick = function() {
    document.getElementById("file-menu").classList.toggle("hide-menu")
    document.querySelector(".menu-opt[hide=no]").setAttribute("hide", "yes")
    document.getElementById("file-opt").setAttribute("hide", "no")
}
document.getElementById("wave-app").onclick = function() {
    document.getElementById("file-menu").classList.toggle("hide-menu")
    document.querySelector(".menu-opt[hide=no]").setAttribute("hide", "yes")
    document.getElementById("app-opt").setAttribute("hide", "no")
}
document.body.onkeydown = function(event) {
    //console.log(event.keyCode)
    /*if (event.keyCode === 73 && event.shiftKey === true && event.ctrlKey === true) {
        event.preventDefault()
    } else*/ if (event.keyCode === 83 && event.ctrlKey === true) {
        event.preventDefault()
        savetofile()
    }
}
page.oncontextmenu = function(event) {
    event.preventDefault()
    document.getElementById("con-menu").style.left = event.pageX + "px";
    document.getElementById("con-menu").style.top = event.pageY - 45 + "px";
    document.getElementById("con-menu").style.display = "block"
}
document.getElementById("con-menu").onclick = function(event) {
    event.stopPropagation();
}
document.onclick = function(event) {
    document.getElementById("con-menu").style.display = "none"
}
page.focus()
function openmodal(inner) {
    modal_text.innerHTML = inner
    modal.style.display = "block";
}
closemodal.onclick = function() {
  modal.style.display = "none";
}
function closethemodal() {
    modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function resizewrap() {
    document.getElementById("wrapper").style.height = window.innerHeight - 30 + "px"
    document.getElementById("top-bar").style.width = document.getElementById("wrapper").style.width - 5 + "px"
    document.getElementById("page-holder").style.height = window.innerHeight - 90 + "px"
}
function srbon(openr) {
    var openri = "r-" + openr
    document.querySelector(".rbon[hide=no]").setAttribute("hide", "yes")
    document.getElementById(openri).setAttribute("hide", "no")
}
function setfont(that) {
    document.getElementById("font-selector").classList.toggle("hide")
    var font = that.dataset.value
    if (font == "default") {
        font = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
    document.execCommand('fontName', false, font);
    document.getElementById("font-btn").innerHTML = that.dataset.value
}
function setfontsize(that) {
    document.getElementById("font-size-sel").classList.toggle("hide")
    var size = that.dataset.value
    document.execCommand("fontSize", false, size);
    var fontElements = document.getElementsByTagName("font");
    /*
    for (var i = 0, len = fontElements.length; i < len; ++i) {
        fontElements[i].removeAttribute("size");
        fontElements[i].style.fontSize = size * 10;
    }
    */
    document.getElementById("font-size-btn").innerHTML = that.dataset.value
}
function execCode(that, value) {
    if(that.dataset.action == "code") {
        document.execCommand('insertHTML', false, "<pre><code>Code Goes here</code></pre>");
    } else if(that.dataset.action == "link") {
        execLinkAction()
    } else if(that.dataset.action == "read_mode") {
        readMode()
    } else if(that.dataset.action == "addimg") {
        addimg()
    } else if(that.dataset.action == "addvid") {
        addvid()
    } else if(that.dataset.action == "iframe") {
        addiframe()
    } else if(that.dataset.action == "heading") {
        addheading()
    } else if(that.dataset.action == "share") {
        share()
    } else if(that.dataset.action == "full") {
        Full()
    } else if(that.dataset.action == "textarea") {
        document.execCommand('insertHTML', false, "<div id='textarea' contenteditable='true' placeholder='TextArea'></div>");
    } else {
        execCodeformat(that.dataset.action, value)
    }
}
function execLinkAction() {
    let linkValue = prompt('Insert Link: ');
    document.execCommand('createLink', false, linkValue);
}
function execCodeformat(format, value) {
    document.execCommand(format, false, value);
}
function addheading() {
    if (document.execCommand('heading', false, "H1") == false) {
        openmodal("<br><br><br>Heading is not supported in your browser")
    }
}
var thecaret
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
function addimg() {
    thecaret = caret
    openmodal(`
    <div style="text-align: center;">
    <br><br><br><br>
    <label style="border: 1px solid lightgrey; cursor: pointer; padding: 10px;">
    Upload Image<img src="files/icons/add_img.svg" style="width: 15px;">
    <input type="file" style="visibility: hidden; width: 0;" id="img-file" accept="image/*" onchange="addimage()">
    </label>
    <br>
    <br>
    or
    <br>
    <br>
    <input type="url" placeholder="URL to Image" style="border: 1px solid lightgrey; padding: 5px;" id="img-url">
    </div>
    `)
    document.getElementById("img-url").onkeypress = function(e) {
        if(e.keyCode === 13) {
            addurlimg()
        }
    }
}
async function addimage() {
    closethemodal()
    const imgfile = document.querySelector('#img-file').files[0];
    var img = await toBase64(imgfile)
    page.focus
    selectRange(thecaret)
    document.execCommand('insertHTML', false, "<img width='100%' src='" + img  + "'>");
}
function addurlimg() {
    closethemodal()
    const img = document.querySelector('#img-url').value;
    page.focus
    selectRange(thecaret)
    document.execCommand('insertHTML', false, "<img width='100%' src='" + img  + "'>");
}
function addvid() {
    thecaret = caret
    openmodal(`
        <div style="text-align: center;">
        <br><br><br><br>
        <label style="border: 1px solid lightgrey; cursor: pointer; padding: 10px;">
        Upload Video<img src="files/icons/add_vid.svg" style="width: 15px;">
        <input type="file" style="visibility: hidden; width: 0;" id="vid-file" accept="video/*" onchange="addvideo()">
        </label>
        <br>
        <br>
        or
        <br>
        <br>
        <input type="url" placeholder="URL to Video" style="border: 1px solid lightgrey; padding: 5px;" id="vid-url">
        </div>
        </div>
        `)
        document.getElementById("vid-url").onkeypress = function(e) {
            if(e.keyCode === 13) {
                addurlvid()
            }
        }
}

async function addvideo() {
    closethemodal()
    const vidfile = document.querySelector('#vid-file').files[0];
    var vid =  await toBase64(vidfile)
    selectRange(thecaret)
    document.execCommand('insertHTML', false, "<video width='100%' controls><source src='" + vid  + "'>Your Browser Dosn't Support Video</video>");
}
function addurlvid() {
    closethemodal()
    const vid = document.querySelector('#vid-url').value;
    page.focus()
    selectRange(thecaret)
    document.execCommand('insertHTML', false, "<video width='100%' controls><source src='" + vid  + "'>Your Browser Dosn't Support Video</video>");
}

function addiframe() {
    let link = prompt("Link to website: ")
    document.execCommand('insertHTML', false, "<iframe width='100%' height='300px'src='" + link + "'/>")
}
function readMode() {
    if (page.contentEditable == "true") {
        page.contentEditable = "false"
        document.querySelector("[data-action=read_mode]").querySelector("img").src = "files/icons/edit_mode.svg"
    } else if (page.contentEditable == "false") {
        page.contentEditable = "true"
        document.querySelector("[data-action=read_mode]").querySelector("img").src = "files/icons/read_mode.svg"
    }
}
setInterval(function() {
    document.getElementById("html-output").value = page.innerHTML
    document.querySelector("title").innerHTML = "Wave Docs | " + document.getElementById("files-name").value
    caret = getCaretPosition().start
}, 50)
async function savetofile() {
    if (document.getElementById("files-name").value == "") {
        openmodal("<h1>Unable To Save</h1><p>we can not save the file because there is no name of the file</p>")
        document.getElementById("files-name").focus()
    } else {
        if ("showSaveFilePicker" in window) {
            const textFile = new File([page.innerHTML], document.getElementById("files-name").value + ".wdoc", {
                type: "text/plain",
            });
            const handle = await window.showSaveFilePicker({
                types: [
                  {
                    description: 'Wave Docs',
                    accept: {
                      'text/wdoc': ['.wdoc']
                    }
                  },
                ]
              });
            const writable = await handle.createWritable();
            await writable.write(textFile);
            await writable.close();
        } else {
            var element = document.createElement('a');
            var text = page.innerHTML
            var filename = document.getElementById("files-name").value + ".wdoc"
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    }
}
async function openfile() {
    if ("showOpenFilePicker" in window) {
        const [handle] = await window.showOpenFilePicker({
            types: [
              {
                description: 'Wave Docs',
                accept: {
                  'text/wdoc': ['.wdoc']
                }
              },
            ],
            excludeAcceptAllOption: true,
            multiple: false
          });
        const file = await handle.getFile();
        var contents = await file.text();
        page.innerHTML = contents
        document.getElementById("files-name").value = file.name.substr(0, file.name.length - 5)
    } else {
        openmodal(`
        <div style="text-align: center;">
        <br><br><br><br><br>
        <label style="border: 1px solid lightgrey; cursor: pointer; padding: 10px;">
        Upload .wdoc File<img src="files/icons/upload.svg" style="width: 15px;">
        <input type="file" style="visibility: hidden; width: 0;" id="open-file" accept=".wdoc" onchange="uploadfile(this)">
        </label>
        </div>
        `)
    }
}
function uploadfile(that) {
    closethemodal()
    if(that.files && that.files[0]){
        var reader = new FileReader();
        reader.onload = function (e) {  
            var output = e.target.result;
            page.innerHTML = output
        };
        reader.readAsText(that.files[0]);
    }
    document.getElementById("files-name").value = that.files[0].name.substr(0, that.files[0].name.length - 5)
    console.log(that.files[0])
    curfile = that.files[0]
}
function share() {
    const blob = new Blob([page.innerHTML], { type: 'text/plain' });
    const filesArray = [new File([blob], document.getElementById("files-name").value +  ".wdoc", {//document.getElementById("files-name").value + 
        type: "text/plain", lastModified: Date.now()
    })];
    //console.log(filesArray)
    //console.log(blob)
    if (navigator.canShare) {
        navigator.share({
            files: filesArray,
            title: document.getElementById("files-name").value,
            text: 'A Wave Doc file made with "wave-office.github.io/Wave-Docs/app/"',
        })
    }
}
async function email() {
    const blob = new Blob([page.innerHTML], { type: 'text/plain' });
    const file = new File([blob], document.getElementById("files-name").value + ".wdoc", {
        type: "text/plain",
    });
    window.open(`mailto:someone@yoursite.com?cc=&bcc=&subject=` + document.getElementById('files-name').value + `&body=` + document.getElementById("email").innerHTML)
}
function Full() {
    var elem = document.documentElement
    if (full == false) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
          }
          document.querySelector("[data-action=full]").querySelector("img").src = "files/icons/exit_fullscreen.svg"
          full = true
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
          }
          document.querySelector("[data-action=full]").querySelector("img").src = "files/icons/fullscreen.svg"
          full = false
        }
}
function getCaretPosition() {
    var start = 0;
    var end = 0;
    var doc = page.ownerDocument || page.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(page);
            preCaretRange.setEnd(range.startContainer, range.startOffset);
            start = preCaretRange.toString().length;
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            end = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToStart", textRange);
        start = preCaretTextRange.text.length;
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        end = preCaretTextRange.text.length;
    }
    return { start: start, end: end };
}
function selectRange(pos) {
    page.focus();
    if (typeof page.selectionStart != "undefined") {
        page.selectionStart = pos;
        page.selectionEnd = pos + 1;
    } else if (document.selection && document.selection.createRange) {
        // IE branch
        page.select();
        var range = document.selection.createRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
    }
}