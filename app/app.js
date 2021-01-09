window.onresize = function() {
    resizewrap()
}
const page = document.getElementById("page")
var full = false
document.getElementById("font-size").value = 2
resizewrap()
setfont()
document.execCommand('styleWithCSS', false, true);
if (!"canShare" in navigator) {
    document.getElementById("share-btn").style.display = "none"
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
    if (event.keyCode === 73 && event.shiftKey === true && event.ctrlKey === true) {
        event.preventDefault()
    } else if (event.keyCode === 83 && event.ctrlKey === true) {
        event.preventDefault()
        savetofile()
    }
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
function setfont() {
    var font = document.getElementById("font").value
    if (font == "default") {
        font = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
    document.execCommand('fontName', false, font);
}
function setfontsize() {
    var size = parseInt(document.getElementById("font-size").value) * 10
    if (size > 70) {
        document.getElementById("font-size").value = 7
    } else if (size < 10) {
        document.getElementById("font-size").value = 1
    }
    //document.getElementById("page").style.fontSize = size + "px"
    document.execCommand("fontSize", false, size / 10);
    var fontElements = document.getElementsByTagName("font");
    for (var i = 0, len = fontElements.length; i < len; ++i) {
        fontElements[i].removeAttribute("size");
        fontElements[i].style.fontSize = size;
    }
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
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
function addimg() {
    openmodal(`
    <div style="text-align: center;">
    <br><br><br><br><br>
    <label style="border: 1px solid lightgrey; cursor: pointer; padding: 10px;">
    Upload Image<img src="files/icons/add_img.svg" style="width: 15px;">
    <input type="file" style="visibility: hidden; width: 0;" id="img-file" accept="image/*" onchange="addimage()">
    </label>
    </div>
    `)
}
async function addimage() {
    closethemodal()
    const imgfile = document.querySelector('#img-file').files[0];
    var img = await toBase64(imgfile)
    page.focus()
    document.execCommand('insertHTML', false, "<img width='100%' src='" + img  + "'>");
}
async function addvideo() {
    closethemodal()
    const vidfile = document.querySelector('#vid-file').files[0];
    var vid =  await toBase64(vidfile)
    page.focus()
    document.execCommand('insertHTML', false, "<video width='100%' controls><source src='" + vid  + "'>Your Browser Dosn't Support Video</video>");
}
function addvid() {
    openmodal(`
        <div style="text-align: center;">
        <br><br><br><br><br>
        <label style="border: 1px solid lightgrey; cursor: pointer; padding: 10px;">
        Upload Video<img src="files/icons/add_vid.svg" style="width: 15px;">
        <input type="file" style="visibility: hidden; width: 0;" id="vid-file" accept="video/*" onchange="addvideo()">
        </label>
        </div>
        `)
}

function addiframe() {
    let link = prompt("Link to website: ")
    document.execCommand('insertHTML', false, "<iframe width='100%' height='300px'src='" + link + "'/>")
}
function readMode() {
    if (page.contentEditable == "true") {
        page.contentEditable = "false"
    } else if (page.contentEditable == "false") {
        page.contentEditable = "true"
    }
}
setInterval(function() {
    document.getElementById("html-output").value = page.innerHTML
    document.querySelector("title").innerHTML = "Wave Docs | " + document.getElementById("files-name").value
}, 500)
async function savetofile() {
    if (document.getElementById("files-name").value == "") {
        openmodal("<h1>Unable To Save</h1><p>we can not svae the file because there is no name of the file</p>")
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
}
function share() {
    const blob = new Blob([page.innerHTML], { type: 'text/plain' });
    const filesArray = new File([blob], document.getElementById("files-name").value + ".wdoc", {
        type: "text/plain",
    });
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
          full = false
        }
}